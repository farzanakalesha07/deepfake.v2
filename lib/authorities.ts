import { AuthorityRole, AuthorityUser } from './types';

export const DEMO_AUTHORITIES: Record<AuthorityRole, AuthorityUser> = {
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
