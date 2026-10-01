const fs = require('fs');
const path = require('path');
const { INITIAL_DEMO_COMPLAINTS } = require('./demoData');
const { evaluateComplaintEscalation, generateComplaintId } = require('./escalationEngine');

const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'complaints.json');

function initStorage() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_DEMO_COMPLAINTS, null, 2), 'utf-8');
    console.log(`[Storage] Initialized database with ${INITIAL_DEMO_COMPLAINTS.length} demo complaints.`);
  } else {
    try {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_DEMO_COMPLAINTS, null, 2), 'utf-8');
      }
    } catch {
      fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_DEMO_COMPLAINTS, null, 2), 'utf-8');
    }
  }
}

function getAllComplaints() {
  initStorage();
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('[Storage] Error reading complaints.json:', err);
    return INITIAL_DEMO_COMPLAINTS;
  }
}

function saveComplaints(complaints) {
  initStorage();
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(complaints, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('[Storage] Error saving complaints.json:', err);
    return false;
  }
}

function getComplaintById(complaintId) {
  if (!complaintId) return null;
  const list = getAllComplaints();
  const normalized = complaintId.trim().toUpperCase();
  return list.find(c => c.complaint_id.toUpperCase() === normalized || c.id === complaintId) || null;
}

function createComplaint(data) {
  const complaints = getAllComplaints();
  const complaintId = generateComplaintId();
  const escalation = evaluateComplaintEscalation(data, complaints);

  const newComplaint = {
    id: `complaint-${Date.now()}`,
    complaint_id: complaintId,
    type: data.type || 'ONLINE_RAGGING',
    subcategory: data.subcategory || 'General Report',
    description: data.description || '',
    incident_date: data.incident_date || new Date().toISOString().split('T')[0],
    incident_time: data.incident_time || '12:00',
    location: data.location || 'Campus',
    frequency: data.frequency || 'First time',
    is_ongoing: Boolean(data.is_ongoing),
    status: escalation.is_auto_escalated ? 'Escalated' : 'Submitted',
    escalation_level: escalation.escalation_level,
    assigned_authority: escalation.assigned_authority,
    repeat_count: escalation.repeat_count,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    victim: data.victim || { anonymous: true },
    suspect: data.suspect || {},
    evidence: Array.isArray(data.evidence) ? data.evidence : [],
    updates: [
      {
        id: `up-${Date.now()}-1`,
        complaint_id: complaintId,
        authority: 'System',
        status: 'Submitted',
        note: `Complaint received. ${escalation.escalation_reason}`,
        escalation_level: escalation.escalation_level,
        created_at: new Date().toISOString(),
      }
    ]
  };

  if (escalation.is_auto_escalated) {
    newComplaint.updates.push({
      id: `up-${Date.now()}-2`,
      complaint_id: complaintId,
      authority: 'System',
      status: 'Escalated',
      note: `[AUTOMATIC ESCALATION TRIGGERED] Repeated incident count (${escalation.repeat_count}) reached threshold. Promoted directly to ${escalation.assigned_authority}.`,
      escalation_level: escalation.escalation_level,
      created_at: new Date(Date.now() + 1000).toISOString(),
    });
  }

  const updatedList = [newComplaint, ...complaints];
  saveComplaints(updatedList);
  return newComplaint;
}

function updateStatus(complaintId, status, note, authority = 'HOD', newEscalationLevel) {
  const complaints = getAllComplaints();
  const normalized = complaintId.trim().toUpperCase();
  const index = complaints.findIndex(c => c.complaint_id.toUpperCase() === normalized || c.id === complaintId);
  if (index === -1) return null;

  const current = complaints[index];
  const updatedEscalation = newEscalationLevel !== undefined ? Number(newEscalationLevel) : current.escalation_level;

  let updatedAssigned = current.assigned_authority;
  if (updatedEscalation === 1) updatedAssigned = 'HOD';
  else if (updatedEscalation === 2) updatedAssigned = 'Dean';
  else if (updatedEscalation === 3) updatedAssigned = 'Higher Authority';

  const newUpdate = {
    id: `up-${Date.now()}`,
    complaint_id: current.complaint_id,
    authority: authority,
    status: status || current.status,
    note: note || `Status updated to ${status} by ${authority}`,
    escalation_level: updatedEscalation,
    created_at: new Date().toISOString(),
  };

  const updatedComplaint = {
    ...current,
    status: status || current.status,
    escalation_level: updatedEscalation,
    assigned_authority: updatedAssigned,
    updated_at: new Date().toISOString(),
    updates: [...(current.updates || []), newUpdate],
  };

  complaints[index] = updatedComplaint;
  saveComplaints(complaints);
  return updatedComplaint;
}

function escalate(complaintId, targetAuthority, note, callerRole = 'HOD') {
  let targetLevel = 2;
  if (targetAuthority === 'Higher Authority') targetLevel = 3;
  if (targetAuthority === 'Dean') targetLevel = 2;
  if (targetAuthority === 'HOD') targetLevel = 1;

  const escalateNote = note || `Escalated by ${callerRole} to ${targetAuthority}`;
  return updateStatus(complaintId, 'Escalated', escalateNote, callerRole, targetLevel);
}

function addNote(complaintId, note, authority = 'HOD') {
  const complaints = getAllComplaints();
  const normalized = complaintId.trim().toUpperCase();
  const index = complaints.findIndex(c => c.complaint_id.toUpperCase() === normalized || c.id === complaintId);
  if (index === -1) return null;

  const current = complaints[index];
  const newUpdate = {
    id: `up-${Date.now()}`,
    complaint_id: current.complaint_id,
    authority: authority,
    status: current.status,
    note: note,
    escalation_level: current.escalation_level,
    created_at: new Date().toISOString(),
  };

  const updatedComplaint = {
    ...current,
    updated_at: new Date().toISOString(),
    updates: [...(current.updates || []), newUpdate],
  };

  complaints[index] = updatedComplaint;
  saveComplaints(complaints);
  return updatedComplaint;
}

function resetToDemo() {
  saveComplaints(INITIAL_DEMO_COMPLAINTS);
  return INITIAL_DEMO_COMPLAINTS;
}

function sanitizeForPublic(complaint) {
  if (!complaint) return null;
  const clone = JSON.parse(JSON.stringify(complaint));
  // Strictly redact victim personal details for public tracking endpoints
  clone.victim = {
    anonymous: true,
    masked: true,
    department: complaint.victim?.department || 'Restricted',
    class_year: complaint.victim?.class_year || 'Restricted',
  };
  return clone;
}

module.exports = {
  initStorage,
  getAllComplaints,
  getComplaintById,
  saveComplaints,
  createComplaint,
  updateStatus,
  escalate,
  addNote,
  resetToDemo,
  sanitizeForPublic,
  DATA_FILE
};
