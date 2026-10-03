import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const UPLOADS_DIR = path.join(process.cwd(), 'uploads');

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file uploaded. Expected field "file".' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = path.extname(file.name);
    const baseName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const uniqueName = `${baseName}-${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`;
    const filePath = path.join(UPLOADS_DIR, uniqueName);

    let fileUrl = '';
    try {
      if (!fs.existsSync(UPLOADS_DIR)) {
        fs.mkdirSync(UPLOADS_DIR, { recursive: true });
      }
      fs.writeFileSync(filePath, buffer);
      fileUrl = `/uploads/${uniqueName}`;
    } catch (fsErr) {
      // Serverless fallback (e.g. Vercel read-only filesystem)
      fileUrl = `data:${file.type || 'application/octet-stream'};base64,${buffer.toString('base64')}`;
    }

    return NextResponse.json({
      success: true,
      data: {
        id: `ev-${Date.now()}`,
        file_name: file.name,
        file_url: fileUrl,
        file_type: file.type,
        file_size: file.size,
        uploaded_at: new Date().toISOString()
      }
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'File upload failed' },
      { status: 500 }
    );
  }
}
