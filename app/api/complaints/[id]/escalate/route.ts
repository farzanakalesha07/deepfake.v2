import { NextRequest, NextResponse } from 'next/server';
import { BackendService } from '@/lib/backendService';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { targetAuthority, note, callerRole } = body;

    if (!targetAuthority) {
      return NextResponse.json(
        { success: false, error: 'targetAuthority (e.g. "Dean" or "Higher Authority") is required.' },
        { status: 400 }
      );
    }

    const updated = BackendService.escalate(id, targetAuthority, note, callerRole);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: `Complaint with ID "${id}" was not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Complaint escalated to ${targetAuthority} (Level ${updated.escalation_level})`,
      data: updated
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
