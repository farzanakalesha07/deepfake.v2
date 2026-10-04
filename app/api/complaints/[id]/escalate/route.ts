import { NextRequest, NextResponse } from 'next/server';
import { BackendService } from '@/lib/backendService';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { targetLevel, note, authority } = body;

    if (!targetLevel || ![1, 2, 3].includes(targetLevel)) {
      return NextResponse.json(
        { success: false, error: 'Valid targetLevel (1, 2, or 3) is required' },
        { status: 400 }
      );
    }

    const updated = BackendService.updateComplaintStatus(
      id,
      'Escalated',
      note || `Escalated to Level ${targetLevel}`,
      authority || 'System',
      targetLevel
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: `Complaint not found: ${id}` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Escalated to Level ${targetLevel}`,
      data: updated
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Server error' },
      { status: 500 }
    );
  }
}
