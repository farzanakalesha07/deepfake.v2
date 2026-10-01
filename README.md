# CampusSafe – Campus Safety & Repeated Harassment Reporting System

A modern, responsive, privacy-preserving web application for college campuses to report, track, and automatically escalate ragging, bullying, and harassment incidents.

> **"Speak Up. Stay Safe."**  
> *"Report safely. Protect your privacy. Escalate when it matters."*

---

## 🌟 Key Highlights & Poster Design Alignment

- **Aesthetic**: Deep Navy background (`#050F26`, `#071B45`), violet/purple gradient accents, cyan/blue highlights, translucent glassmorphism cards (`backdrop-blur-xl`), soft glowing shadows, and high contrast typography.
- **Hero & Illustration**: Interactive visual showcase depicting a student using an encrypted mobile device on campus with security mesh indicators.
- **Privacy & Anonymity**: Complete separation of sensitive victim records from tracking screens. Students can toggle between **100% Anonymous** and **Confidential** reporting.
- **Automated Escalation System**: Real pattern-detection engine that flags repeated reports against suspects or high-frequency abuse and pushes cases through the authority chain:
  - **1st Report**: Assigned to **Head of Department (HOD)** (Level 1)
  - **2nd Repeated Report**: Automatically escalated to **Dean of Student Affairs** (Level 2)
  - **3rd+ Repeated Report**: Escalated to **Higher Authority / Anti-Ragging Standing Tribunal** (Level 3)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (Tested on v20.18.0)
- npm 9+

### Running the Application & Backend Server
```bash
# Navigate to deepfake directory
cd "c:\Users\win11\Documents\secure doc ai\deepfake"

# Install dependencies (installed: Express, CORS, Multer, Next.js, Concurrently)
npm install

# Option A: Run BOTH Frontend (port 3001) & Backend Server (port 5000) simultaneously
npm run dev:all

# Option B: Run Standalone Backend Server (port 5000)
npm run server

# Option C: Run Next.js Fullstack (includes App Router API routes on port 3001)
npm run dev
```

- **Frontend Web App**: `http://localhost:3001`
- **Express Backend API**: `http://localhost:5000`
- **Backend Health Check**: `http://localhost:5000/api/health`

---

## ⚙️ Backend Architecture & REST API Endpoints

The project includes a dedicated **Express REST API Server** (`server/server.js`) and persistent file database (`server/data/complaints.json`), backed by automatic escalation and public privacy sanitization:

| Endpoint | Method | Description |
|---|---|---|
| `/api/health` | `GET` | Health status, server uptime, database records count |
| `/api/complaints` | `GET` | Retrieve complaints list with role jurisdiction and search filters |
| `/api/complaints/:id` | `GET` | Track complaint by ID (sanitized for public, full view for authorities) |
| `/api/complaints` | `POST` | Submit report, trigger escalation engine, generate `CS-YYYY-XXXXX` |
| `/api/complaints/:id/status` | `PATCH` | Update status, escalation level, and append audit log |
| `/api/complaints/:id/escalate` | `POST` | Escalate directly to Dean or Higher Anti-Ragging Committee |
| `/api/complaints/:id/notes` | `POST` | Append confidential authority case notes |
| `/api/stats` | `GET` | Dashboard KPIs, category distribution, escalation distribution |
| `/api/auth/login` | `POST` | Verify authority login credentials (HOD, Dean, Higher Authority, Admin) |
| `/api/upload` | `POST` | Multipart evidence file upload (`uploads/` directory) |
| `/api/reset` | `POST` | Reset database back to pristine demo complaints dataset |

---

## 📱 Core Pages & User Journey

1. **Home Page (`/`)**:
   - Hero section with badge *"YOUR SAFETY MATTERS"*, headings, action buttons (*"Report an Incident"*, *"Track My Complaint"*).
   - Visual device illustration of student on campus.
   - Three feature cards: **Confidential Reporting**, **Privacy Protected**, **Stronger Together**.
   - Transparent 4-step workflow: Submit → Unique ID → Track Status → Auto-Escalation.
   - Interactive Escalation Hierarchy flowchart (Level 1 → Level 2 → Level 3).

2. **Multi-Step Report Incident Wizard (`/report`)**:
   - **Step 1 (Category)**: Two cards for **Offline Ragging** (Following, threats, physical) vs **Online Ragging** (Impersonation, cyber harassment, obscene messages).
   - **Step 2 (Incident Details)**: Date, time, location, detailed description, frequency (*"First time"*, *"Happened before"*, *"Repeated frequently"*), ongoing status (*Yes/No*), and multi-file drag-and-drop evidence upload.
   - **Step 3 (Victim Details)**: Toggle between **Anonymous Mode** (no name or student ID required) and **Confidential Mode** (Name, ID, Department, Year, Callback).
   - **Step 4 (Suspect Details)**: Optional suspect name, department, class, phone, and physical/social intel with disclaimer: *"Ignore any field if you do not know the information"*.
   - **Step 5 (Confirmation)**: Review summary with confirmation checkbox: *"I confirm that the information provided is accurate to the best of my knowledge"*.
   - **Step 6 (Success & ID Generation)**: Generates unique cryptographically formatted Complaint ID (e.g., `CS-2026-8F42K`), copy button, celebration effects, and direct link to track.

3. **Complaint Tracking (`/track`)**:
   - Search by Complaint ID.
   - Clickable demo chips for instant testing.
   - 6-stage progressive investigation timeline:
     `Submitted` → `Under Review` → `Forwarded to HOD` → `Forwarded to Dean` → `Higher Authority Review` → `Resolved`.
   - Sanitized status cards and audit trail with strict privacy guard: **No student identity is leaked on public tracking**.

4. **Authority & Faculty Portal (`/authority`)**:
   - Persona selection with 1-click test credentials for demo judging.
   - Demo personas:
     - **HOD**: Dr. Rajeshwari Menon (`hod.cse@campus.edu`)
     - **Dean**: Prof. Arvind Kulkarni (`dean.studentaffairs@campus.edu`)
     - **Higher Authority**: Justice (Retd.) K. S. Murthy (`antiragging.committee@campus.edu`)
     - **Admin**: System Administrator (`admin.safety@campus.edu`)

5. **Authority Role-Based Dashboard (`/authority/dashboard`)**:
   - Live KPI cards: Total Reports, Pending Intake, Under Review, Escalated, Resolved.
   - Visual charts (Recharts): Complaints by Category donut chart & Escalation Distribution bar chart.
   - Filterable & searchable complaint table with status, category, and jurisdiction filters.
   - Full Complaint Modal:
     - View incident details, uploaded evidence previews, suspect notes.
     - Role-protected victim details (hidden if anonymous or unauthorized).
     - Action buttons: *"Mark Under Review"*, *"Mark Action Taken"*, *"Forward to Dean"*, *"Escalate to Anti-Ragging Apex"*, *"Resolve Complaint"*.
     - Append confidential internal notes to the audit trail.

6. **Safety Guide & Checklist (`/safety`)**:
   - Emergency banner with verified phone links: National Anti-Ragging (1800-180-5522), Emergency (112), Campus Control Room (+91 020 2590-8000).
   - *"If you feel unsafe"* 4-step physical safety guide.
   - *"Online Safety"* cyber harassment defense checklist.

7. **Privacy Policy (`/privacy`)**:
   - Complete transparency on data encryption, purpose of collection, role-based access, and anonymous cryptographic keys.

---

## 🧪 Sample Pre-Seeded Complaints for Demo

| Complaint ID | Category | Status | Current Jurisdiction | Incident Notes |
|---|---|---|---|---|
| `CS-2026-8F42K` | Online Ragging | Under Review | Level 1: HOD | Fake Instagram impersonation |
| `CS-2026-91AB2` | Offline Ragging | Escalated | Level 2: Dean | Stalking near cafeteria (Repeat #2) |
| `CS-2026-7XY92` | Online Ragging | Resolved | Level 3: Higher Authority | Threatening hostel extortion (Repeat #3) |
| `CS-2026-3M87Q` | Offline Ragging | Action Taken | Level 1: HOD | Midnight hostel roll-call intimidation |
| `CS-2026-5K19R` | Online Ragging | Submitted | Level 1: HOD | Abusive Discord server content |

---

## 🗄️ Database & Dual Persistence Architecture

1. **Supabase PostgreSQL Schema (`supabase/schema.sql`)**:
   - Tables: `users`, `complaints`, `victim_details`, `suspect_details`, `evidence`, `complaint_updates`.
   - Row-Level Security (RLS) policies isolating victim identities to authenticated staff only.
2. **Local Storage Fallback (`lib/store.ts`)**:
   - Pre-seeds realistic demo cases automatically.
   - All newly submitted reports, status transitions, internal notes, and escalations persist across page reloads and browser tabs with event sync.
