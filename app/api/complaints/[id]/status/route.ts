import { NextRequest, NextResponse } from 'next/server';
import { BackendService } from '@/lib/backendService';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { status, note, authority, escalation_level } = body;

    if (!status) {
      return NextResponse.json(
        { success: false, error: 'Status is required' },
        { status: 400 }
      );
    }

    const updated = BackendService.updateComplaintStatus(
      id,
      status,
      note || `Status updated to ${status}`,
      authority || 'System',
      escalation_level
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: `Complaint not found: ${id}` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Status updated successfully',
      data: updated
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Server error' },
      { status: 500 }
    );
  }
}
