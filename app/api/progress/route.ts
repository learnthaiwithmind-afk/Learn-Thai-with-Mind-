import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '../../../lib/supabase-server';

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { course_id, module_index, lessons_done } = await req.json();
  if (!course_id || module_index === undefined || lessons_done === undefined) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const db = createServerClient();
  const { error } = await db.from('lesson_progress').upsert(
    { user_id: userId, course_id, module_index, lessons_done, updated_at: new Date().toISOString() },
    { onConflict: 'user_id,course_id,module_index' },
  );

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
