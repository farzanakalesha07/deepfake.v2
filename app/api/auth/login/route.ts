import { NextRequest, NextResponse } from 'next/server';
import { DEMO_AUTHORITIES } from '@/lib/authorities';
import { AuthorityRole } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const { role, email } = await req.json();

    let matchedUser = null;

    if (role && DEMO_AUTHORITIES[role as AuthorityRole]) {
      matchedUser = DEMO_AUTHORITIES[role as AuthorityRole];
    } else if (email) {
      const list = Object.values(DEMO_AUTHORITIES);
      matchedUser = list.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    }

    if (!matchedUser) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials or unknown role.' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: matchedUser,
      token: `cs_session_${Buffer.from(matchedUser.email).toString('base64')}`
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
