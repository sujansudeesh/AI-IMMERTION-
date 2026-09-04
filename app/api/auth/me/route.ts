import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('pos_token')?.value || req.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ user: null });
  }

  const payload = verifyJwt(token);
  if (!payload) {
    return NextResponse.json({ user: null });
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      createdAt: true,
    },
  });

  return NextResponse.json({ user });
}
