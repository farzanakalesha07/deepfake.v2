require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const storage = require('./storage');
const complaintsRouter = require('./routes/complaints');
const statsRouter = require('./routes/stats');
const authRouter = require('./routes/auth');
const uploadRouter = require('./routes/upload');

const app = express();
const PORT = process.env.PORT || 5000;
const startTime = Date.now();

// Initialize JSON database
storage.initStorage();

// Ensure uploads folder exists
const UPLOADS_DIR = path.join(__dirname, '../uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Global Middlewares
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Simple logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// Serve uploaded files statically
app.use('/uploads', express.static(UPLOADS_DIR));

// Root API Information Endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'CampusSafe Backend API Server',
    version: '1.0.0',
    description: 'REST API & Automated Escalation Server for Campus Anti-Ragging and Harassment Reporting',
    status: 'ONLINE',
    documentation: {
      health: 'GET /api/health',
      complaints: 'GET /api/complaints',
      complaint_by_id: 'GET /api/complaints/:id',
      submit_complaint: 'POST /api/complaints',
      update_status: 'PATCH /api/complaints/:id/status',
      escalate: 'POST /api/complaints/:id/escalate',
      add_note: 'POST /api/complaints/:id/notes',
      stats: 'GET /api/stats',
      auth: 'POST /api/auth/login',
      upload: 'POST /api/upload',
      reset: 'POST /api/reset'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  const complaints = storage.getAllComplaints();
  res.json({
    status: 'HEALTHY',
    uptime_seconds: Math.floor((Date.now() - startTime) / 1000),
    timestamp: new Date().toISOString(),
    node_version: process.version,
    port: PORT,
    database: {
      type: 'JSON_STORE',
      file: storage.DATA_FILE,
      complaints_count: complaints.length
    }
  });
});

// Reset database endpoint
app.post('/api/reset', (req, res) => {
  const resetComplaints = storage.resetToDemo();
  res.json({
    success: true,
    message: 'Complaints database reset to default demo dataset.',
    count: resetComplaints.length
  });
});

// Mount Routes
app.use('/api/complaints', complaintsRouter);
app.use('/api/stats', statsRouter);
app.use('/api/auth', authRouter);
app.use('/api/upload', uploadRouter);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Cannot ${req.method} ${req.originalUrl} - Endpoint not found.`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Error]', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

// Start Server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(` CampusSafe Backend Server is running!`);
  console.log(` URL: http://localhost:${PORT}`);
  console.log(` Health Check: http://localhost:${PORT}/api/health`);
  console.log(` API Base: http://localhost:${PORT}/api`);
  console.log(`=======================================================`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const fallbackPort = Number(PORT) + 1;
    console.warn(`[Server] Port ${PORT} is in use, attempting fallback port ${fallbackPort}...`);
    app.listen(fallbackPort, '0.0.0.0', () => {
      console.log(`[Server] CampusSafe Backend running on fallback port ${fallbackPort}`);
    });
  } else {
    console.error('[Server] Fatal listen error:', err);
  }
});

module.exports = app;
