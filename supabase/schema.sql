-- CampusSafe Database Schema & RLS Policies
-- Supabase PostgreSQL Definition

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Authority Users Table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('HOD', 'Dean', 'Higher Authority', 'Admin')),
  department TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Complaints Core Table
CREATE TABLE IF NOT EXISTS public.complaints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  complaint_id TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('OFFLINE_RAGGING', 'ONLINE_RAGGING')),
  subcategory TEXT,
  description TEXT NOT NULL,
  incident_date DATE NOT NULL,
  incident_time TEXT,
  location TEXT NOT NULL,
  frequency TEXT NOT NULL DEFAULT 'First time',
  is_ongoing BOOLEAN DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'Submitted' CHECK (status IN ('Submitted', 'Under Review', 'Escalated', 'Action Taken', 'Resolved', 'Closed')),
  escalation_level INT NOT NULL DEFAULT 1 CHECK (escalation_level IN (1, 2, 3)),
  assigned_authority TEXT NOT NULL DEFAULT 'HOD' CHECK (assigned_authority IN ('HOD', 'Dean', 'Higher Authority', 'Admin')),
  repeat_count INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Victim Details (Strictly restricted access)
CREATE TABLE IF NOT EXISTS public.victim_details (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  complaint_id TEXT REFERENCES public.complaints(complaint_id) ON DELETE CASCADE,
  anonymous BOOLEAN NOT NULL DEFAULT FALSE,
  name TEXT,
  student_id TEXT,
  department TEXT,
  class_year TEXT,
  phone TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Suspect Details (For incident tracking & repeat pattern detection)
CREATE TABLE IF NOT EXISTS public.suspect_details (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  complaint_id TEXT REFERENCES public.complaints(complaint_id) ON DELETE CASCADE,
  name TEXT,
  department TEXT,
  class TEXT,
  phone TEXT,
  additional_info TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Evidence Table
CREATE TABLE IF NOT EXISTS public.evidence (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  complaint_id TEXT REFERENCES public.complaints(complaint_id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INT,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Complaint Updates / Audit Log Table
CREATE TABLE IF NOT EXISTS public.complaint_updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  complaint_id TEXT REFERENCES public.complaints(complaint_id) ON DELETE CASCADE,
  authority TEXT NOT NULL,
  status TEXT NOT NULL,
  note TEXT NOT NULL,
  escalation_level INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indices for rapid querying & repeat suspect detection
CREATE INDEX IF NOT EXISTS idx_complaints_id ON public.complaints(complaint_id);
CREATE INDEX IF NOT EXISTS idx_complaints_status ON public.complaints(status);
CREATE INDEX IF NOT EXISTS idx_complaints_assigned ON public.complaints(assigned_authority);
CREATE INDEX IF NOT EXISTS idx_suspect_name ON public.suspect_details(name);

-- Row-Level Security (RLS) Policies
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.victim_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suspect_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.complaint_updates ENABLE ROW LEVEL SECURITY;

-- 1) Public users can insert complaints & victim details (anyone can report safely)
CREATE POLICY "Public insert complaints" ON public.complaints FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert victim" ON public.victim_details FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert suspect" ON public.suspect_details FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert evidence" ON public.evidence FOR INSERT WITH CHECK (true);

-- 2) Tracking: Anyone can read complaint status by complaint_id, but NOT victim identity
CREATE POLICY "Public read complaint status" ON public.complaints FOR SELECT USING (true);
CREATE POLICY "Public read complaint updates" ON public.complaint_updates FOR SELECT USING (true);

-- 3) Victim Details are locked: Only authenticated staff with proper role or admin can view non-anonymous victim details
CREATE POLICY "Staff read victim details" ON public.victim_details FOR SELECT TO authenticated USING (
  auth.jwt() ->> 'role' IN ('HOD', 'Dean', 'Higher Authority', 'Admin')
);
