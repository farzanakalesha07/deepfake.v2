import { NextResponse } from 'next/server';
import { BackendService } from '@/lib/backendService';

export async function GET() {
  const complaints = BackendService.getComplaints();
  return NextResponse.json({
    status: 'HEALTHY',
    server: 'Next.js App Router API',
    timestamp: new Date().toISOString(),
    complaints_count: complaints.length,
  });
}
