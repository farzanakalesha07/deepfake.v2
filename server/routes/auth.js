const express = require('express');
const router = express.Router();
const { DEMO_AUTHORITIES } = require('../demoData');

/**
 * GET /api/auth/authorities
 * List all available demo authority personas
 */
router.get('/authorities', (req, res) => {
  res.json({
    success: true,
    data: DEMO_AUTHORITIES
  });
});

/**
 * POST /api/auth/login
 * Body: { role } or { email }
 */
router.post('/login', (req, res) => {
  const { role, email } = req.body;

  let matchedUser = null;

  if (role && DEMO_AUTHORITIES[role]) {
    matchedUser = DEMO_AUTHORITIES[role];
  } else if (email) {
    const list = Object.values(DEMO_AUTHORITIES);
    matchedUser = list.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
  }

  if (!matchedUser) {
    return res.status(401).json({
      success: false,
      error: 'Invalid credentials or unknown role.'
    });
  }

  // Return session profile and mock bearer token
  res.json({
    success: true,
    user: matchedUser,
    token: `cs_session_${Buffer.from(matchedUser.email).toString('base64')}`
  });
});

module.exports = router;
