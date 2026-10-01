import { NextRequest, NextResponse } from 'next/server';
import { BackendService } from '@/lib/backendService';

const AUTHORIZED_ROLES = ['HOD', 'Dean', 'Higher Authority', 'Admin'];

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { searchParams } = new URL(req.url);
    const role = searchParams.get('role');

    const complaint = BackendService.getComplaintById(id);
    if (!complaint) {
      return NextResponse.json(
        { success: false, error: `Complaint with ID "${id}" was not found.` },
        { status: 404 }
      );
    }

    const isAuthority = role && AUTHORIZED_ROLES.includes(role);

    if (isAuthority) {
      return NextResponse.json({ success: true, data: complaint });
    }

    return NextResponse.json({
      success: true,
      data: BackendService.sanitizeForPublic(complaint)
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { status, note, authority, newEscalationLevel } = body;

    const updated = BackendService.updateComplaintStatus(
      id,
      status,
      note,
      authority || 'HOD',
      newEscalationLevel
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: `Complaint with ID "${id}" was not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Status updated to ${updated.status}`,
      data: updated
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
