export type ComplaintCategory = 'OFFLINE_RAGGING' | 'ONLINE_RAGGING';

export type OfflineSubcategory = 
  | 'Following / Stalking'
  | 'Unwanted Behaviour'
  | 'Threats / Intimidation'
  | 'Physical Harassment'
  | 'Hostel Bullying'
  | 'Other Offline Incidents';

export type OnlineSubcategory =
  | 'Fake Accounts & Impersonation'
  | 'Threatening Messages'
  | 'Obscene or Abusive Content'
  | 'Cyber Harassment'
  | 'Social Media Doxxing'
  | 'Other Online Incidents';

export type IncidentFrequency = 'First time' | 'Happened before' | 'Repeated frequently';

export type ComplaintStatus = 
  | 'Submitted'
  | 'Under Review'
  | 'Escalated'
  | 'Action Taken'
  | 'Resolved'
  | 'Closed';

export type AuthorityRole = 'HOD' | 'Dean' | 'Higher Authority' | 'Admin';

export type EscalationLevel = 1 | 2 | 3; // 1: HOD, 2: Dean, 3: Higher Authority

export interface VictimDetails {
  id?: string;
  complaint_id?: string;
  anonymous: boolean;
  name?: string;
  student_id?: string;
  department?: string;
  class_year?: string;
  phone?: string;
  email?: string;
}

export interface SuspectDetails {
  id?: string;
  complaint_id?: string;
  name?: string;
  department?: string;
  class_year?: string;
  phone?: string;
  additional_info?: string;
}

export interface EvidenceItem {
  id: string;
  complaint_id?: string;
  file_name: string;
  file_url: string; // Base64 preview or Supabase storage URL
  file_type: string;
  file_size?: number;
  uploaded_at: string;
}

export interface ComplaintUpdate {
  id: string;
  complaint_id: string;
  authority: AuthorityRole | 'System';
  status: ComplaintStatus;
  note: string;
  escalation_level?: EscalationLevel;
  created_at: string;
}

export interface Complaint {
  id: string;
  complaint_id: string; // E.g. CS-2026-8F42K
  type: ComplaintCategory;
  subcategory: OfflineSubcategory | OnlineSubcategory;
  description: string;
  incident_date: string;
  incident_time: string;
  location: string;
  frequency: IncidentFrequency;
  is_ongoing: boolean;
  status: ComplaintStatus;
  escalation_level: EscalationLevel;
  assigned_authority: AuthorityRole;
  repeat_count: number; // calculated count of related reports
  created_at: string;
  updated_at: string;
  
  // Relations
  victim?: VictimDetails;
  suspect?: SuspectDetails;
  evidence?: EvidenceItem[];
  updates?: ComplaintUpdate[];
}

export interface AuthorityUser {
  id: string;
  name: string;
  email: string;
  role: AuthorityRole;
  department?: string;
  avatar_url?: string;
}
