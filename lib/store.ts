'use client';

import { Complaint, AuthorityRole, ComplaintStatus, EscalationLevel, ComplaintUpdate, AuthorityUser } from './types';
import { evaluateComplaintEscalation, generateComplaintId } from './escalationEngine';

const STORAGE_KEY = 'campussafe_complaints_v1';
const ROLE_KEY = 'campussafe_active_role_v1';

export const INITIAL_DEMO_COMPLAINTS: Complaint[] = [
  {
    id: 'demo-1',
    complaint_id: 'CS-2026-8F42K',
    type: 'ONLINE_RAGGING',
    subcategory: 'Fake Accounts & Impersonation',
    description: 'Anonymous Instagram handle @campus_spill_24 created using my photographs and posting derogatory and defamatory claims in the college fresher comments section.',
    incident_date: '2026-09-24',
    incident_time: '21:30',
    location: 'Online / Instagram & Telegram Batch Group',
    frequency: 'First time',
    is_ongoing: true,
    status: 'Under Review',
    escalation_level: 1,
    assigned_authority: 'HOD',
    repeat_count: 1,
    created_at: new Date(Date.now() - 4 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    victim: {
      anonymous: false,
      name: 'Rohan Sharma',
      student_id: 'STU-2024-CSE-084',
      department: 'Computer Science & Engineering',
      class_year: '2nd Year (Semester 3)',
      phone: '+91 98765 43210',
      email: 'rohan.sharma@campus.edu',
    },
    suspect: {
      name: 'Unknown / Account Handler',
      department: 'Computer Science',
      class_year: '3rd Year',
      phone: '',
      additional_info: 'Account followers seem to be predominantly from CS Block 3.',
    },
    evidence: [
      {
        id: 'ev-1',
        file_name: 'instagram_impersonation_proof.png',
        file_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
        file_type: 'image/png',
        uploaded_at: new Date(Date.now() - 4 * 86400000).toISOString(),
      }
    ],
    updates: [
      {
        id: 'up-1',
        complaint_id: 'CS-2026-8F42K',
        authority: 'System',
        status: 'Submitted',
        note: 'Complaint successfully registered. Assigned to HOD (Computer Science) under Level 1 safety procedure.',
        escalation_level: 1,
        created_at: new Date(Date.now() - 4 * 86400000).toISOString(),
      },
      {
        id: 'up-2',
        complaint_id: 'CS-2026-8F42K',
        authority: 'HOD',
        status: 'Under Review',
        note: 'Cyber cell faculty liaison notified to issue takedown report and request IP logs from IT admin.',
        escalation_level: 1,
        created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
      }
    ]
  },
  {
    id: 'demo-2',
    complaint_id: 'CS-2026-91AB2',
    type: 'OFFLINE_RAGGING',
    subcategory: 'Following / Stalking',
    description: 'A group of seniors repeatedly blocked path near North Cafeteria and Mechanical Lab exit, demanding junior students salute them and perform humiliating tasks in public.',
    incident_date: '2026-09-22',
    incident_time: '17:15',
    location: 'North Cafeteria & Mech Lab Walkway',
    frequency: 'Happened before',
    is_ongoing: true,
    status: 'Escalated',
    escalation_level: 2,
    assigned_authority: 'Dean',
    repeat_count: 2,
    created_at: new Date(Date.now() - 6 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    victim: {
      anonymous: true,
      name: '',
      student_id: '',
      department: 'Mechanical Engineering',
      class_year: '1st Year',
      phone: '+91 99000 11223',
      email: '',
    },
    suspect: {
      name: 'Vikas R. & 3 Senior Associates',
      department: 'Mechanical Engineering',
      class_year: 'Final Year',
      phone: '',
      additional_info: 'Driving black motorcycle with registration ending in 4492.',
    },
    evidence: [
      {
        id: 'ev-2',
        file_name: 'corridor_cctv_timestamp_notes.pdf',
        file_url: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80',
        file_type: 'application/pdf',
        uploaded_at: new Date(Date.now() - 6 * 86400000).toISOString(),
      }
    ],
    updates: [
      {
        id: 'up-3',
        complaint_id: 'CS-2026-91AB2',
        authority: 'System',
        status: 'Submitted',
        note: 'Complaint received and initially dispatched to Mechanical HOD.',
        escalation_level: 1,
        created_at: new Date(Date.now() - 6 * 86400000).toISOString(),
      },
      {
        id: 'up-4',
        complaint_id: 'CS-2026-91AB2',
        authority: 'System',
        status: 'Escalated',
        note: '[AUTOMATIC ESCALATION] Second report detected involving suspect group "Vikas R." in North Cafeteria zone. Automatically escalated to Dean of Student Affairs (Level 2).',
        escalation_level: 2,
        created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
      },
      {
        id: 'up-5',
        complaint_id: 'CS-2026-91AB2',
        authority: 'Dean',
        status: 'Escalated',
        note: 'Campus security chief alerted to monitor cafeteria cameras 17:00-18:30 daily. Suspects summoned for inquiry tomorrow 11:00 AM.',
        escalation_level: 2,
        created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
      }
    ]
  },
  {
    id: 'demo-3',
    complaint_id: 'CS-2026-7XY92',
    type: 'ONLINE_RAGGING',
    subcategory: 'Threatening Messages',
    description: 'Threatening WhatsApp messages demanding money under pretext of unofficial fresher party fees, accompanied by threats of hostel exclusion.',
    incident_date: '2026-09-15',
    incident_time: '23:45',
    location: 'Boys Hostel Wing B',
    frequency: 'Repeated frequently',
    is_ongoing: false,
    status: 'Resolved',
    escalation_level: 3,
    assigned_authority: 'Higher Authority',
    repeat_count: 3,
    created_at: new Date(Date.now() - 14 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    victim: {
      anonymous: false,
      name: 'Aditya Verma',
      student_id: 'STU-2025-EE-112',
      department: 'Electrical Engineering',
      class_year: '1st Year',
      phone: '+91 91234 56789',
      email: 'aditya.v@campus.edu',
    },
    suspect: {
      name: 'Hostel Committee Secretary & 2 others',
      department: 'Electrical Engineering',
      class_year: '3rd Year',
      phone: '+91 94567 89012',
      additional_info: 'Threats delivered in Room B-204 and through WhatsApp audio notes.',
    },
    evidence: [
      {
        id: 'ev-3',
        file_name: 'chat_screenshot_threat.jpg',
        file_url: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=600&q=80',
        file_type: 'image/jpeg',
        uploaded_at: new Date(Date.now() - 14 * 86400000).toISOString(),
      }
    ],
    updates: [
      {
        id: 'up-6',
        complaint_id: 'CS-2026-7XY92',
        authority: 'System',
        status: 'Submitted',
        note: 'Critical complaint registered with frequency: Repeated frequently.',
        escalation_level: 1,
        created_at: new Date(Date.now() - 14 * 86400000).toISOString(),
      },
      {
        id: 'up-7',
        complaint_id: 'CS-2026-7XY92',
        authority: 'Dean',
        status: 'Escalated',
        note: 'Escalated to Higher Authority Anti-Ragging Standing Committee following physical extortion threat confirmation.',
        escalation_level: 3,
        created_at: new Date(Date.now() - 10 * 86400000).toISOString(),
      },
      {
        id: 'up-8',
        complaint_id: 'CS-2026-7XY92',
        authority: 'Higher Authority',
        status: 'Resolved',
        note: 'Disciplinary Committee convened. Perpetrators suspended for 1 semester, evicted from hostel premises. Victim placed under safe protection protocol.',
        escalation_level: 3,
        created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
      }
    ]
  },
  {
    id: 'demo-4',
    complaint_id: 'CS-2026-3M87Q',
    type: 'OFFLINE_RAGGING',
    subcategory: 'Unwanted Behaviour',
    description: 'Forced attendance at midnight hostel roll call by senior wing members with verbal abuse and physical exercise mandates.',
    incident_date: '2026-09-25',
    incident_time: '00:30',
    location: 'Girls Hostel Block A - 2nd Floor Corridor',
    frequency: 'First time',
    is_ongoing: false,
    status: 'Action Taken',
    escalation_level: 1,
    assigned_authority: 'HOD',
    repeat_count: 1,
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    victim: {
      anonymous: true,
      department: 'Biotechnology',
      class_year: '1st Year',
      email: '',
      phone: '',
    },
    suspect: {
      name: 'Block A Floor Reps',
      department: 'Biotechnology',
      class_year: '3rd Year',
      additional_info: 'Warden informed unofficially.',
    },
    evidence: [],
    updates: [
      {
        id: 'up-9',
        complaint_id: 'CS-2026-3M87Q',
        authority: 'HOD',
        status: 'Action Taken',
        note: 'Warden conducted surprise round with faculty anti-ragging squad. Warning letters issued to floor representatives.',
        escalation_level: 1,
        created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
      }
    ]
  },
  {
    id: 'demo-5',
    complaint_id: 'CS-2026-5K19R',
    type: 'ONLINE_RAGGING',
    subcategory: 'Obscene or Abusive Content',
    description: 'Derogatory memes and abusive voice notes circulated in an unofficial department Discord server mocking fresher students.',
    incident_date: '2026-09-28',
    incident_time: '14:20',
    location: 'Discord / Department Community Server',
    frequency: 'First time',
    is_ongoing: true,
    status: 'Submitted',
    escalation_level: 1,
    assigned_authority: 'HOD',
    repeat_count: 1,
    created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    victim: {
      anonymous: false,
      name: 'Ananya Deshmukh',
      student_id: 'STU-2025-IT-045',
      department: 'Information Technology',
      class_year: '1st Year',
      phone: '+91 97654 32190',
      email: 'ananya.d@campus.edu',
    },
    suspect: {
      name: 'Discord User "ShadowWolf_99"',
      department: 'Information Technology',
      additional_info: 'Moderator in official IT club server as well.',
    },
    evidence: [],
    updates: [
      {
        id: 'up-10',
        complaint_id: 'CS-2026-5K19R',
        authority: 'System',
        status: 'Submitted',
        note: 'New complaint registered and assigned to IT Department Head for verification.',
        escalation_level: 1,
        created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
      }
    ]
  }
];

export { DEMO_AUTHORITIES } from './authorities';

export class ComplaintStore {
  private static isClient(): boolean {
    return typeof window !== 'undefined';
  }

  public static getComplaints(): Complaint[] {
    if (!this.isClient()) return INITIAL_DEMO_COMPLAINTS;
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_COMPLAINTS));
        return INITIAL_DEMO_COMPLAINTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_DEMO_COMPLAINTS;
    }
  }

  public static saveComplaints(complaints: Complaint[]) {
    if (!this.isClient()) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
      window.dispatchEvent(new Event('campussafe_storage_updated'));
    } catch (e) {
      console.error('Failed to save complaints to localStorage', e);
    }
  }

  public static getComplaintById(complaintId: string): Complaint | undefined {
    const list = this.getComplaints();
    const cleanId = complaintId.trim().toUpperCase();
    return list.find(c => c.complaint_id.toUpperCase() === cleanId);
  }

  public static async syncWithServer(): Promise<Complaint[]> {
    if (!this.isClient()) return INITIAL_DEMO_COMPLAINTS;
    try {
      const res = await fetch('/api/complaints?role=Admin');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(json.data));
          window.dispatchEvent(new Event('campussafe_storage_updated'));
          return json.data;
        }
      }
    } catch (err) {
      console.warn('[ComplaintStore] Offline or server sync unavailable, using local cache:', err);
    }
    return this.getComplaints();
  }

  public static submitComplaint(data: {
    type: Complaint['type'];
    subcategory: Complaint['subcategory'];
    description: string;
    incident_date: string;
    incident_time: string;
    location: string;
    frequency: Complaint['frequency'];
    is_ongoing: boolean;
    victim: Complaint['victim'];
    suspect?: Complaint['suspect'];
    evidence?: Complaint['evidence'];
  }): Complaint {
    const complaints = this.getComplaints();
    const complaintId = generateComplaintId();

    // Run Automatic Escalation Engine
    const escalation = evaluateComplaintEscalation(data, complaints);

    const newComplaint: Complaint = {
      id: `complaint-${Date.now()}`,
      complaint_id: complaintId,
      type: data.type,
      subcategory: data.subcategory,
      description: data.description,
      incident_date: data.incident_date,
      incident_time: data.incident_time,
      location: data.location,
      frequency: data.frequency,
      is_ongoing: data.is_ongoing,
      status: escalation.is_auto_escalated ? 'Escalated' : 'Submitted',
      escalation_level: escalation.escalation_level,
      assigned_authority: escalation.assigned_authority,
      repeat_count: escalation.repeat_count,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      victim: data.victim,
      suspect: data.suspect,
      evidence: data.evidence || [],
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
      newComplaint.updates?.push({
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
    this.saveComplaints(updatedList);

    // Asynchronously push to backend server
    if (this.isClient()) {
      fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).catch(e => console.warn('[ComplaintStore] Background server sync error:', e));
    }

    return newComplaint;
  }

  public static updateComplaintStatus(
    complaintId: string,
    status: ComplaintStatus,
    note: string,
    authority: AuthorityRole,
    newEscalationLevel?: EscalationLevel
  ): Complaint | null {
    const complaints = this.getComplaints();
    const index = complaints.findIndex(c => c.complaint_id.toUpperCase() === complaintId.toUpperCase());
    if (index === -1) return null;

    const current = complaints[index];
    const updatedEscalation = newEscalationLevel !== undefined ? newEscalationLevel : current.escalation_level;

    // Calculate new assigned authority if escalated
    let updatedAssigned = current.assigned_authority;
    if (updatedEscalation === 1) updatedAssigned = 'HOD';
    else if (updatedEscalation === 2) updatedAssigned = 'Dean';
    else if (updatedEscalation === 3) updatedAssigned = 'Higher Authority';

    const newUpdate: ComplaintUpdate = {
      id: `up-${Date.now()}`,
      complaint_id: current.complaint_id,
      authority: authority,
      status: status,
      note: note,
      escalation_level: updatedEscalation,
      created_at: new Date().toISOString(),
    };

    const updatedComplaint: Complaint = {
      ...current,
      status: status,
      escalation_level: updatedEscalation,
      assigned_authority: updatedAssigned,
      updated_at: new Date().toISOString(),
      updates: [...(current.updates || []), newUpdate],
    };

    complaints[index] = updatedComplaint;
    this.saveComplaints(complaints);

    // Asynchronously update server
    if (this.isClient()) {
      fetch(`/api/complaints/${encodeURIComponent(complaintId)}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          note,
          authority,
          newEscalationLevel: updatedEscalation
        }),
      }).catch(e => console.warn('[ComplaintStore] Background status update server error:', e));
    }

    return updatedComplaint;
  }

  public static escalateComplaint(
    complaintId: string,
    targetAuthority: AuthorityRole,
    note: string,
    callerRole: AuthorityRole
  ): Complaint | null {
    let targetLevel: EscalationLevel = 2;
    if (targetAuthority === 'Higher Authority') targetLevel = 3;
    if (targetAuthority === 'Dean') targetLevel = 2;
    if (targetAuthority === 'HOD') targetLevel = 1;

    return this.updateComplaintStatus(
      complaintId,
      'Escalated',
      note || `Escalated by ${callerRole} to ${targetAuthority}`,
      callerRole,
      targetLevel
    );
  }

  public static getActiveRole(): AuthorityRole {
    if (!this.isClient()) return 'HOD';
    try {
      const role = localStorage.getItem(ROLE_KEY) as AuthorityRole;
      if (role && ['HOD', 'Dean', 'Higher Authority', 'Admin'].includes(role)) {
        return role;
      }
      return 'HOD';
    } catch {
      return 'HOD';
    }
  }

  public static setActiveRole(role: AuthorityRole) {
    if (!this.isClient()) return;
    try {
      localStorage.setItem(ROLE_KEY, role);
      window.dispatchEvent(new Event('campussafe_role_updated'));
    } catch (e) {
      console.error(e);
    }
  }

  public static resetDemoData() {
    if (!this.isClient()) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_COMPLAINTS));
    window.dispatchEvent(new Event('campussafe_storage_updated'));

    // Reset server database
    fetch('/api/reset', { method: 'POST' })
      .catch(e => console.warn('[ComplaintStore] Server reset error:', e));
  }
}
