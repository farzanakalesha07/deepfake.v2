import { NextRequest, NextResponse } from 'next/server';
import { BackendService } from '@/lib/backendService';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { note, authority } = body;

    if (!note || !note.trim()) {
      return NextResponse.json(
        { success: false, error: 'Note content is required' },
        { status: 400 }
      );
    }

    const complaint = BackendService.getComplaintById(id);
    if (!complaint) {
      return NextResponse.json(
        { success: false, error: `Complaint not found: ${id}` },
        { status: 404 }
      );
    }

    const updated = BackendService.updateComplaintStatus(
      id,
      complaint.status,
      note.trim(),
      authority || 'Authority Note'
    );

    return NextResponse.json({
      success: true,
      message: 'Note added successfully',
      data: updated
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Server error' },
      { status: 500 }
    );
  }
}
