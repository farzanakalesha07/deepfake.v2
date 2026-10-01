import { NextResponse } from 'next/server';
import { BackendService } from '@/lib/backendService';

export async function POST() {
  const resetList = BackendService.resetToDemo();
  return NextResponse.json({
    success: true,
    message: 'Complaints database reset to default demo dataset.',
    count: resetList.length,
  });
}
