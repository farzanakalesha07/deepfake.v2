import { NextRequest, NextResponse } from 'next/server';
import { BackendService } from '@/lib/backendService';

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
