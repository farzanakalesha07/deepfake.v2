import { NextRequest, NextResponse } from 'next/server';
import { BackendService } from '@/lib/backendService';

const AUTHORIZED_ROLES = ['HOD', 'Dean', 'Higher Authority', 'Admin'];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const role = searchParams.get('role');
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const search = searchParams.get('search');

    let list = BackendService.getComplaints();

    const isAuthority = role && AUTHORIZED_ROLES.includes(role);

    if (isAuthority && role !== 'Admin') {
      list = list.filter((c) => {
        if (role === 'HOD') return c.assigned_authority === 'HOD';
        if (role === 'Dean') return c.assigned_authority === 'Dean' || c.escalation_level >= 2;
        if (role === 'Higher Authority') return c.assigned_authority === 'Higher Authority' || c.escalation_level >= 3;
        return true;
      });
    }

    if (status && status !== 'ALL') {
      list = list.filter(c => c.status === status);
    }

    if (type && type !== 'ALL') {
      list = list.filter(c => c.type === type);
    }

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

    if (!isAuthority) {
      list = list.map(c => BackendService.sanitizeForPublic(c));
    }

    return NextResponse.json({
      success: true,
      count: list.length,
      data: list
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.type || !body.description || !body.location) {
      return NextResponse.json(
        { success: false, error: 'type, description, and location are required.' },
        { status: 400 }
      );
    }

    const created = BackendService.createComplaint(body);

    return NextResponse.json(
      {
        success: true,
        message: 'Complaint submitted successfully.',
        complaint_id: created.complaint_id,
        escalation_level: created.escalation_level,
        assigned_authority: created.assigned_authority,
        data: created
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
