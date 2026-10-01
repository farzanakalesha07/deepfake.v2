const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const UPLOADS_DIR = path.join(__dirname, '../../uploads');

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Configure storage with sanitized filenames
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADS_DIR);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    cb(null, `${baseName}-${uniqueSuffix}${ext}`);
  }
});

// 25MB max file limit
const upload = multer({
  storage: storage,
  limits: { fileSize: 25 * 1024 * 1024 }
});

/**
 * POST /api/upload
 * Multi-part form-data with field name 'file' or 'evidence'
 */
router.post('/', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file was uploaded. Please provide a file in the "file" field.'
      });
    }

    const host = req.get('host');
    const protocol = req.protocol;
    const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;

    res.status(201).json({
      success: true,
      data: {
        id: `ev-${Date.now()}`,
        file_name: req.file.originalname,
        file_url: fileUrl,
        file_type: req.file.mimetype,
        file_size: req.file.size,
        uploaded_at: new Date().toISOString()
      }
    });
  } catch (err) {
    console.error('Error handling file upload:', err);
    res.status(500).json({ success: false, error: 'File upload failed' });
  }
});

module.exports = router;
