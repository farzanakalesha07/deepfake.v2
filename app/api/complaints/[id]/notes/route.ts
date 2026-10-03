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
        { success: false, error: 'Note content is required.' },
        { status: 400 }
      );
    }

    const updated = BackendService.addNote(id, note.trim(), authority);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: `Complaint with ID "${id}" was not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Note added to audit trail.',
      data: updated
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
