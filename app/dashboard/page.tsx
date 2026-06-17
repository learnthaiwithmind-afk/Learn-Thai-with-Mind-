'use client';
import { useUser } from '@clerk/nextjs';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import FadeIn from '../../components/FadeIn';

const COURSES = [
  {
    id: 'beginners',
    title: 'Thai for Complete Beginners',
    level: 'Absolute Beginner',
    totalLessons: 40,
    color: '#1A3680',
    badge: '⭐ Bestseller',
    badgeClass: 'badge-yellow',
    modules: [
      { name: 'Welcome & Course Overview', lessons: 3 },
      { name: 'Thai Tones & Pronunciation', lessons: 6 },
      { name: 'Greetings & Basic Phrases', lessons: 5 },
      { name: 'Numbers & Counting', lessons: 4 },
      { name: 'Ordering Food', lessons: 5 },
      { name: 'Thai Consonants', lessons: 7 },
      { name: 'Common Travel Phrases', lessons: 5 },
      { name: 'Everyday Conversations', lessons: 5 },
    ],
  },
  {
    id: 'conversational',
    title: 'Conversational Thai Mastery',
    level: 'Intermediate',
    totalLessons: 60,
    color: '#C8981F',
    badge: '🔥 Most Popular',
    badgeClass: 'badge-blue',
    modules: [
      { name: 'Thai Fluency Mindset', lessons: 4 },
      { name: 'Daily Life Conversations', lessons: 8 },
      { name: 'Thai Particles & Politeness', lessons: 6 },
      { name: 'Emotions & Opinions', lessons: 7 },
      { name: 'Thai Humour & Culture', lessons: 6 },
      { name: 'Bargaining & Shopping', lessons: 7 },
      { name: 'Relationships & Social Life', lessons: 8 },
      { name: 'Advanced Expressions', lessons: 14 },
    ],
  },
  {
    id: 'reading-writing',
    title: 'Thai Reading & Writing',
    level: 'Beginner – Intermediate',
    totalLessons: 50,
    color: '#057A52',
    badge: '✨ New',
    badgeClass: 'badge-green',
    modules: [
      { name: 'Why Learn Thai Script?', lessons: 2 },
      { name: 'Mid Class Consonants', lessons: 8 },
      { name: 'High Class Consonants', lessons: 7 },
      { name: 'Low Class Consonants', lessons: 9 },
      { name: 'Short & Long Vowels', lessons: 8 },
      { name: 'Tone Rules', lessons: 8 },
      { name: 'Reading Practice', lessons: 4 },
      { name: 'Writing Drills', lessons: 4 },
    ],
  },
  {
    id: 'advanced',
    title: 'Advanced Thai Fluency',
    level: 'Upper Intermediate – Advanced',
    totalLessons: 70,
    color: '#6b21a8',
    badge: '💎 Advanced',
    badgeClass: 'badge-purple',
    modules: [
      { name: 'Advanced Grammar Overview', lessons: 6 },
      { name: 'Formal vs Colloquial Registers', lessons: 9 },
      { name: 'Thai Proverbs & Idioms', lessons: 8 },
      { name: 'Mastering Relative Clauses', lessons: 7 },
      { name: 'Business Thai', lessons: 10 },
      { name: 'Regional Dialects', lessons: 8 },
      { name: 'Authentic Media Immersion', lessons: 12 },
      { name: 'Native-Level Expression', lessons: 10 },
    ],
  },
];

type ProgressMap = Record<string, Record<number, number>>; // course_id → module_index → lessons_done

function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <div style={{ background: '#E5E7EB', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
      <div style={{ height: '100%', borderRadius: '999px', background: color, width: `${value}%`, transition: 'width 0.5s ease' }} />
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useUser();
  const [enrolledIds, setEnrolledIds] = useState<string[]>([]);
  const [progress, setProgress] = useState<ProgressMap>({});
  const [activeCourse, setActiveCourse] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchDashboard = useCallback(async () => {
    try {
      const res = await fetch('/api/dashboard');
      if (!res.ok) return;
      const { enrollments, progress: rows } = await res.json();

      setEnrolledIds((enrollments as { course_id: string }[]).map(e => e.course_id));

      const map: ProgressMap = {};
      for (const row of rows as { course_id: string; module_index: number; lessons_done: number }[]) {
        if (!map[row.course_id]) map[row.course_id] = {};
        map[row.course_id][row.module_index] = row.lessons_done;
      }
      setProgress(map);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchDashboard(); }, [fetchDashboard]);

  const markLesson = async (courseId: string, moduleIndex: number, lessonsDone: number) => {
    // Optimistic update
    setProgress(prev => ({
      ...prev,
      [courseId]: { ...(prev[courseId] ?? {}), [moduleIndex]: lessonsDone },
    }));

    setSaving(true);
    await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ course_id: courseId, module_index: moduleIndex, lessons_done: lessonsDone }),
    });
    setSaving(false);
  };

  const getLessonsCompleted = (courseId: string, modules: { lessons: number }[]) => {
    const cp = progress[courseId] ?? {};
    return modules.reduce((sum, m, i) => sum + Math.min(cp[i] ?? 0, m.lessons), 0);
  };

  const enrolledCourses = COURSES.filter(c => enrolledIds.includes(c.id));
  const totalLessonsCompleted = enrolledCourses.reduce((sum, c) => sum + getLessonsCompleted(c.id, c.modules), 0);
  const firstName = user?.firstName || user?.username || 'there';

  return (
    <>
      {/* Header */}
      <section style={{
        background: 'linear-gradient(135deg, var(--blue-dk) 0%, var(--blue) 60%, var(--blue-lt) 100%)',
        paddingTop: '100px', paddingBottom: '60px',
      }}>
        <div className="container">
          <FadeIn>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              {user?.imageUrl && (
                <img src={user.imageUrl} alt={firstName}
                  style={{ width: '64px', height: '64px', borderRadius: '50%', border: '3px solid var(--yellow)', objectFit: 'cover' }} />
              )}
              <div>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', marginBottom: '4px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Welcome back
                </p>
                <h1 style={{ color: 'var(--white)', fontSize: 'clamp(26px,4vw,40px)', margin: 0 }}>
                  สวัสดี, {firstName}! 👋
                </h1>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '24px', marginTop: '36px', flexWrap: 'wrap' }}>
              {[
                { label: 'Courses Enrolled', value: loading ? '…' : enrolledCourses.length },
                { label: 'Lessons Completed', value: loading ? '…' : totalLessonsCompleted },
              ].map(s => (
                <div key={s.label} style={{
                  background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: '14px', padding: '18px 28px', minWidth: '140px',
                }}>
                  <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--yellow)', fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1 }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>{s.label}</div>
                </div>
              ))}
              {saving && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--yellow)', display: 'inline-block', animation: 'pulse 1s infinite' }} />
                  Saving…
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--muted)', fontSize: '16px' }}>
              Loading your courses…
            </div>
          ) : enrolledCourses.length === 0 ? (
            <FadeIn>
              <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎓</div>
                <h2 style={{ marginBottom: '12px' }}>No courses yet</h2>
                <p style={{ color: 'var(--muted)', marginBottom: '32px' }}>Browse our courses and start your Thai language journey.</p>
                <Link href="/courses" className="btn btn-primary btn-lg">Browse Courses</Link>
              </div>
            </FadeIn>
          ) : (
            <>
              <FadeIn>
                <p className="eyebrow">My Learning</p>
                <h2 className="section-title" style={{ marginBottom: '8px' }}>Your Courses</h2>
                <div className="accent-bar" style={{ marginBottom: '48px' }}>
                  <span className="accent-line" /><span className="accent-dot" />
                </div>
              </FadeIn>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {enrolledCourses.map(course => {
                  const completed = getLessonsCompleted(course.id, course.modules);
                  const pct = Math.round((completed / course.totalLessons) * 100);
                  const isOpen = activeCourse === course.id;

                  return (
                    <FadeIn key={course.id}>
                      <div style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
                        <div style={{ height: '5px', background: course.color }} />
                        <div style={{ padding: '28px 32px' }}>
                          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                            <div style={{ flex: 1, minWidth: '200px' }}>
                              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
                                <span className={`badge ${course.badgeClass}`}>{course.badge}</span>
                                <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 500 }}>{course.level}</span>
                              </div>
                              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--dark)', marginBottom: '6px' }}>{course.title}</h3>
                              <p style={{ fontSize: '13px', color: 'var(--muted)' }}>
                                {completed} / {course.totalLessons} lessons completed
                              </p>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                              <div style={{
                                width: '60px', height: '60px', borderRadius: '50%',
                                background: `conic-gradient(${course.color} ${pct * 3.6}deg, #E5E7EB 0deg)`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                              }}>
                                <div style={{
                                  width: '46px', height: '46px', borderRadius: '50%',
                                  background: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  fontSize: '13px', fontWeight: 800, color: 'var(--dark)', fontFamily: "'Plus Jakarta Sans', sans-serif",
                                }}>
                                  {pct}%
                                </div>
                              </div>
                              <button
                                onClick={() => setActiveCourse(isOpen ? null : course.id)}
                                className="btn btn-primary"
                                style={{ whiteSpace: 'nowrap' }}
                              >
                                {pct === 0 ? 'Start Course' : pct === 100 ? '✓ Completed' : 'Continue'}
                              </button>
                            </div>
                          </div>

                          <div style={{ marginTop: '20px' }}>
                            <ProgressBar value={pct} color={course.color} />
                          </div>
                        </div>

                        {/* Module list */}
                        {isOpen && (
                          <div style={{ borderTop: '1px solid var(--border)', padding: '24px 32px', background: 'var(--bg)' }}>
                            <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '16px' }}>
                              Course Modules
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                              {course.modules.map((mod, i) => {
                                const done = Math.min(progress[course.id]?.[i] ?? 0, mod.lessons);
                                const modPct = Math.round((done / mod.lessons) * 100);
                                const allDone = done >= mod.lessons;

                                return (
                                  <div key={i} style={{
                                    background: 'var(--white)', border: '1px solid var(--border)',
                                    borderRadius: '10px', padding: '14px 18px',
                                    display: 'flex', alignItems: 'center', gap: '14px',
                                  }}>
                                    <button
                                      onClick={() => markLesson(course.id, i, allDone ? 0 : mod.lessons)}
                                      style={{
                                        width: '24px', height: '24px', borderRadius: '6px', flexShrink: 0,
                                        border: `2px solid ${allDone ? course.color : 'var(--border)'}`,
                                        background: allDone ? course.color : 'transparent',
                                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: 'white', fontSize: '13px', fontWeight: 700, transition: 'all 0.2s',
                                      }}
                                    >
                                      {allDone ? '✓' : ''}
                                    </button>

                                    <div style={{ flex: 1, minWidth: 0 }}>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', gap: '8px' }}>
                                        <span style={{ fontSize: '14px', fontWeight: 600, color: allDone ? 'var(--muted)' : 'var(--dark)', textDecoration: allDone ? 'line-through' : 'none' }}>
                                          {mod.name}
                                        </span>
                                        <span style={{ fontSize: '12px', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                                          {done}/{mod.lessons} lessons
                                        </span>
                                      </div>
                                      <ProgressBar value={modPct} color={course.color} />
                                    </div>

                                    {!allDone && (
                                      <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                                        <button
                                          onClick={() => markLesson(course.id, i, Math.max(0, done - 1))}
                                          style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg)', cursor: 'pointer', fontSize: '14px', color: 'var(--muted)' }}
                                        >−</button>
                                        <button
                                          onClick={() => markLesson(course.id, i, Math.min(mod.lessons, done + 1))}
                                          style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid var(--border)', background: 'var(--bg)', cursor: 'pointer', fontSize: '14px', color: 'var(--dark)' }}
                                        >+</button>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </FadeIn>
                  );
                })}
              </div>
            </>
          )}

          <FadeIn>
            <div style={{
              marginTop: '56px', background: 'linear-gradient(135deg, var(--blue-dk), var(--blue))',
              borderRadius: '20px', padding: '40px 48px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap',
            }}>
              <div>
                <h3 style={{ color: 'var(--white)', fontSize: '20px', marginBottom: '8px' }}>Ready to learn more?</h3>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', margin: 0 }}>Explore all courses and add them to your dashboard.</p>
              </div>
              <Link href="/courses" className="btn btn-yellow btn-lg">Browse All Courses</Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
