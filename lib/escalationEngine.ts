import { Complaint, EscalationLevel, AuthorityRole, ComplaintUpdate } from './types';

export interface EscalationResult {
  repeat_count: number;
  escalation_level: EscalationLevel;
  assigned_authority: AuthorityRole;
  escalation_reason: string;
  is_auto_escalated: boolean;
  system_log: string;
}

/**
 * Escalation Engine based on CampusSafe Safety Charter:
 * 1st Report: Student -> HOD (Level 1)
 * 2nd Repeated Report: HOD -> Dean (Level 2)
 * 3rd+ Repeated Report: Dean -> Higher Authority (Level 3)
 */
export function evaluateComplaintEscalation(
  newComplaintData: Partial<Complaint>,
  existingComplaints: Complaint[]
): EscalationResult {
  const suspectName = newComplaintData.suspect?.name?.trim().toLowerCase();
  const suspectDept = newComplaintData.suspect?.department?.trim().toLowerCase();
  const location = newComplaintData.location?.trim().toLowerCase();
  const category = newComplaintData.type;
  const declaredFrequency = newComplaintData.frequency;

  let matchingPrevious = 0;

  if (existingComplaints && existingComplaints.length > 0) {
    matchingPrevious = existingComplaints.filter((c) => {
      // Check for matching suspect
      if (suspectName && c.suspect?.name?.trim().toLowerCase() === suspectName) {
        return true;
      }
      // Check for exact same location and category if suspect unknown
      if (!suspectName && location && c.location?.toLowerCase().includes(location) && c.type === category) {
        return true;
      }
      return false;
    }).length;
  }

  // Also take student's declared frequency into account
  let baseCount = matchingPrevious + 1;
  if (declaredFrequency === 'Repeated frequently' && baseCount < 2) {
    baseCount = 2; // Immediate escalation to Dean if student reports repeated chronic harassment
  }

  let level: EscalationLevel = 1;
  let authority: AuthorityRole = 'HOD';
  let reason = 'Initial complaint received. Assigned to Department Head (HOD) for preliminary inquiry.';
  let isAutoEscalated = false;

  if (baseCount >= 3) {
    level = 3;
    authority = 'Higher Authority';
    isAutoEscalated = true;
    reason = `Critical Escalation (Report #${baseCount}): Multi-incident harassment pattern detected involving the same suspect or location. Escalated directly to Higher Authority / Anti-Ragging Committee.`;
  } else if (baseCount === 2) {
    level = 2;
    authority = 'Dean';
    isAutoEscalated = true;
    reason = `Automated Escalation (Report #2): Repeated harassment incident flagged. Automatically escalated from HOD to Dean of Student Welfare.`;
  } else {
    level = 1;
    authority = 'HOD';
    reason = '1st report registered. Assigned to Head of Department (HOD) in accordance with Level-1 Safety Charter.';
  }

  return {
    repeat_count: baseCount,
    escalation_level: level,
    assigned_authority: authority,
    escalation_reason: reason,
    is_auto_escalated: isAutoEscalated,
    system_log: `[ESCALATION ENGINE] Repeat count = ${baseCount} -> Assigned to ${authority} (Level ${level})`,
  };
}

export function generateComplaintId(): string {
  const year = new Date().getFullYear();
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let randomPart = '';
  for (let i = 0; i < 5; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `CS-${year}-${randomPart}`;
}
