import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { createServerClient } from '../../../lib/supabase-server';

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = createServerClient();

  const [{ data: enrollments }, { data: progress }] = await Promise.all([
    db.from('enrollments').select('course_id, enrolled_at').eq('user_id', userId),
    db.from('lesson_progress').select('course_id, module_index, lessons_done').eq('user_id', userId),
  ]);

  return NextResponse.json({ enrollments: enrollments ?? [], progress: progress ?? [] });
}
