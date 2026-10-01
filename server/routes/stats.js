const express = require('express');
const router = express.Router();
const storage = require('../storage');

/**
 * GET /api/stats
 * Aggregate key metrics, status distributions, and escalation statistics
 */
router.get('/', (req, res) => {
  try {
    const complaints = storage.getAllComplaints();

    const total = complaints.length;
    const pending = complaints.filter(c => c.status === 'Submitted').length;
    const underReview = complaints.filter(c => c.status === 'Under Review').length;
    const actionTaken = complaints.filter(c => c.status === 'Action Taken').length;
    const escalated = complaints.filter(c => c.status === 'Escalated' || c.escalation_level > 1).length;
    const resolved = complaints.filter(c => c.status === 'Resolved').length;

    const onlineRagging = complaints.filter(c => c.type === 'ONLINE_RAGGING').length;
    const offlineRagging = complaints.filter(c => c.type === 'OFFLINE_RAGGING').length;

    const level1Count = complaints.filter(c => c.escalation_level === 1).length;
    const level2Count = complaints.filter(c => c.escalation_level === 2).length;
    const level3Count = complaints.filter(c => c.escalation_level === 3).length;

    const anonymousReports = complaints.filter(c => c.victim?.anonymous === true).length;
    const confidentialReports = complaints.filter(c => c.victim?.anonymous === false).length;

    res.json({
      success: true,
      stats: {
        total,
        pending,
        underReview,
        actionTaken,
        escalated,
        resolved,
        anonymousReports,
        confidentialReports
      },
      categoryBreakdown: [
        { name: 'Online Ragging', count: onlineRagging, color: '#06B6D4' },
        { name: 'Offline Ragging', count: offlineRagging, color: '#8B5CF6' }
      ],
      escalationBreakdown: [
        { level: 'Level 1 (HOD)', count: level1Count, fill: '#8B5CF6' },
        { level: 'Level 2 (Dean)', count: level2Count, fill: '#6366F1' },
        { level: 'Level 3 (Higher Authority)', count: level3Count, fill: '#06B6D4' }
      ]
    });
  } catch (err) {
    console.error('Error computing stats:', err);
    res.status(500).json({ success: false, error: 'Internal server error computing stats' });
  }
});

module.exports = router;
