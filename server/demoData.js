/**
 * Pre-seeded realistic demo complaints and demo authority personas.
 */

const INITIAL_DEMO_COMPLAINTS = [
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

const DEMO_AUTHORITIES = {
  HOD: {
    id: 'auth-hod-1',
    name: 'Dr. Rajeshwari Menon',
    email: 'hod.cse@campus.edu',
    role: 'HOD',
    department: 'Computer Science & Engineering',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
  },
  Dean: {
    id: 'auth-dean-1',
    name: 'Prof. Arvind Kulkarni',
    email: 'dean.studentaffairs@campus.edu',
    role: 'Dean',
    department: 'Dean of Student Welfare & Discipline',
    avatar_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
  },
  'Higher Authority': {
    id: 'auth-vc-1',
    name: 'Justice (Retd.) K. S. Murthy',
    email: 'antiragging.committee@campus.edu',
    role: 'Higher Authority',
    department: 'Apex Campus Anti-Ragging Committee / Vice Chancellor Oversight',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  Admin: {
    id: 'auth-admin-1',
    name: 'System Administrator',
    email: 'admin.safety@campus.edu',
    role: 'Admin',
    department: 'Campus Security & Digital Safety Operations',
    avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  }
};

module.exports = {
  INITIAL_DEMO_COMPLAINTS,
  DEMO_AUTHORITIES
};
