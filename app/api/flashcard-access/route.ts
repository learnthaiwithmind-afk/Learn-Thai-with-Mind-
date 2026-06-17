import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { createServerClient } from '../../../lib/supabase-server';

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ enrolledIds: [] });

  const db = createServerClient();
  const { data } = await db
    .from('enrollments')
    .select('course_id')
    .eq('user_id', userId);

  const enrolledIds = (data ?? []).map((r: { course_id: string }) => r.course_id);
  return NextResponse.json({ enrolledIds });
}
