const express = require('express');
const router = express.Router();
const storage = require('../storage');

const AUTHORIZED_ROLES = ['HOD', 'Dean', 'Higher Authority', 'Admin'];

/**
 * GET /api/complaints
 * Query params: role, status, type, search
 */
router.get('/', (req, res) => {
  try {
    const { role, status, type, search } = req.query;
    let list = storage.getAllComplaints();

    const isAuthority = role && AUTHORIZED_ROLES.includes(role);

    // Apply role-based jurisdiction filtering if requested by an authority
    if (isAuthority && role !== 'Admin') {
      list = list.filter((c) => {
        if (role === 'HOD') return c.assigned_authority === 'HOD';
        if (role === 'Dean') return c.assigned_authority === 'Dean' || c.escalation_level >= 2;
        if (role === 'Higher Authority') return c.assigned_authority === 'Higher Authority' || c.escalation_level >= 3;
        return true;
      });
    }

    // Status filter
    if (status && status !== 'ALL') {
      list = list.filter(c => c.status === status);
    }

    // Category type filter
    if (type && type !== 'ALL') {
      list = list.filter(c => c.type === type);
    }

    // Search query filter
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(c => 
        c.complaint_id.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        (c.suspect?.name && c.suspect.name.toLowerCase().includes(q)) ||
        (c.subcategory && c.subcategory.toLowerCase().includes(q)) ||
        (c.description && c.description.toLowerCase().includes(q))
      );
    }

    // If caller is not an authority, sanitize victim personal details
    if (!isAuthority) {
      list = list.map(c => storage.sanitizeForPublic(c));
    }

    res.json({
      success: true,
      count: list.length,
      data: list
    });
  } catch (err) {
    console.error('Error fetching complaints:', err);
    res.status(500).json({ success: false, error: 'Internal server error fetching complaints' });
  }
});

/**
 * GET /api/complaints/:id
 * Query param: role (optional)
 */
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.query;

    const complaint = storage.getComplaintById(id);
    if (!complaint) {
      return res.status(404).json({
        success: false,
        error: `Complaint with ID "${id}" was not found.`
      });
    }

    const isAuthority = role && AUTHORIZED_ROLES.includes(role);

    if (isAuthority) {
      // Authorized staff sees full incident details
      return res.json({ success: true, data: complaint });
    }

    // Public tracking view: strictly sanitize victim identity
    return res.json({
      success: true,
      data: storage.sanitizeForPublic(complaint)
    });
  } catch (err) {
    console.error('Error fetching complaint by ID:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

/**
 * POST /api/complaints
 * Submit a new incident complaint
 */
router.post('/', (req, res) => {
  try {
    const data = req.body;

    if (!data.type || !data.description || !data.location) {
      return res.status(400).json({
        success: false,
        error: 'Missing required incident fields: type, description, and location are required.'
      });
    }

    const created = storage.createComplaint(data);

    res.status(201).json({
      success: true,
      message: 'Complaint submitted successfully.',
      complaint_id: created.complaint_id,
      escalation_level: created.escalation_level,
      assigned_authority: created.assigned_authority,
      data: created
    });
  } catch (err) {
    console.error('Error creating complaint:', err);
    res.status(500).json({ success: false, error: 'Internal server error creating complaint' });
  }
});

/**
 * PATCH /api/complaints/:id/status
 * Update complaint status & log audit update
 */
router.patch('/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status, note, authority, newEscalationLevel } = req.body;

    if (!status && !note) {
      return res.status(400).json({
        success: false,
        error: 'At least status or note must be provided.'
      });
    }

    const updated = storage.updateStatus(id, status, note, authority, newEscalationLevel);
    if (!updated) {
      return res.status(404).json({
        success: false,
        error: `Complaint with ID "${id}" was not found.`
      });
    }

    res.json({
      success: true,
      message: `Status successfully updated to ${updated.status}`,
      data: updated
    });
  } catch (err) {
    console.error('Error updating status:', err);
    res.status(500).json({ success: false, error: 'Internal server error updating complaint status' });
  }
});

/**
 * POST /api/complaints/:id/escalate
 * Escalate complaint to Dean or Higher Authority
 */
router.post('/:id/escalate', (req, res) => {
  try {
    const { id } = req.params;
    const { targetAuthority, note, callerRole } = req.body;

    if (!targetAuthority) {
      return res.status(400).json({
        success: false,
        error: 'targetAuthority (e.g. "Dean" or "Higher Authority") is required.'
      });
    }

    const updated = storage.escalate(id, targetAuthority, note, callerRole);
    if (!updated) {
      return res.status(404).json({
        success: false,
        error: `Complaint with ID "${id}" was not found.`
      });
    }

    res.json({
      success: true,
      message: `Complaint escalated to ${targetAuthority} (Level ${updated.escalation_level})`,
      data: updated
    });
  } catch (err) {
    console.error('Error escalating complaint:', err);
    res.status(500).json({ success: false, error: 'Internal server error escalating complaint' });
  }
});

/**
 * POST /api/complaints/:id/notes
 * Add internal authority note
 */
router.post('/:id/notes', (req, res) => {
  try {
    const { id } = req.params;
    const { note, authority } = req.body;

    if (!note || !note.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Note content is required.'
      });
    }

    const updated = storage.addNote(id, note.trim(), authority);
    if (!updated) {
      return res.status(404).json({
        success: false,
        error: `Complaint with ID "${id}" was not found.`
      });
    }

    res.json({
      success: true,
      message: 'Note added to audit trail.',
      data: updated
    });
  } catch (err) {
    console.error('Error adding note:', err);
    res.status(500).json({ success: false, error: 'Internal server error adding note' });
  }
});

module.exports = router;
