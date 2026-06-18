'use client';
import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import FadeIn from '../../components/FadeIn';

const DECKS = [
  { key: 'greetings',  label: 'Greetings',  emoji: '👋', color: '#1A3680', cards: 10 },
  { key: 'numbers',    label: 'Numbers',    emoji: '🔢', color: '#065F46', cards: 10 },
  { key: 'food',       label: 'Food',       emoji: '🍜', color: '#92400E', cards: 10 },
  { key: 'tones',      label: 'Tones',      emoji: '🎵', color: '#4C1D95', cards: 5  },
  { key: 'travel',     label: 'Travel',     emoji: '✈️', color: '#0C4A6E', cards: 10 },
  { key: 'dailylife',  label: 'Daily Life', emoji: '🏠', color: '#9F1239', cards: 10 },
  { key: 'colors',     label: 'Colors',     emoji: '🎨', color: '#065F46', cards: 8  },
  { key: 'shopping',   label: 'Shopping',   emoji: '🛒', color: '#7C2D12', cards: 10 },
];

const COURSES = [
  { id: 'beginner',      title: 'Thai for Complete Beginners',    level: 'A1 · Beginner',      lessons: '40+', color: 'linear-gradient(135deg,#1A3680,#2563EB)' },
  { id: 'intermediate',  title: 'Conversational Thai',            level: 'A2–B1 · Intermediate',lessons: '60+', color: 'linear-gradient(135deg,#065F46,#059669)' },
  { id: 'reading',       title: 'Reading & Writing Thai Script',  level: 'B1 · Literacy',       lessons: '50+', color: 'linear-gradient(135deg,#4C1D95,#7C3AED)' },
  { id: 'culture',       title: 'Thai Culture & Advanced Speak',  level: 'B2 · Advanced',       lessons: '70+', color: 'linear-gradient(135deg,#9F1239,#E11D48)' },
];

function Avatar({ name, imageUrl, size = 64 }: { name: string; imageUrl?: string; size?: number }) {
  const initials = name?.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() || '?';
  if (imageUrl) {
    return <Image src={imageUrl} alt={name} width={size} height={size} style={{ borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,.25)' }} />;
  }
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: 'var(--yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: size * 0.36, fontWeight: 800, color: 'var(--dark)', border: '3px solid rgba(255,255,255,.25)', flexShrink: 0 }}>
      {initials}
    </div>
  );
}

export default function DashboardPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) router.replace('/');
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '40px', height: '40px', border: '3px solid var(--blue-100)', borderTopColor: 'var(--blue)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
          <p style={{ color: 'var(--muted)', fontSize: '14px' }}>Loading your dashboard…</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) return null;

  const firstName = user.firstName || user.username || 'there';
  const fullName = user.fullName || user.firstName || 'Learner';
  const email = user.emailAddresses?.[0]?.emailAddress ?? '';
  const joinedDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) : '';

  return (
    <>
      {/* ── Welcome Header ── */}
      <section style={{ background: 'linear-gradient(135deg,#0d1f52 0%,#1A3680 60%,#1e4799 100%)', paddingTop: '120px', paddingBottom: '48px' }}>
        <div className="container">
          <FadeIn>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
              <Avatar name={fullName} imageUrl={user.imageUrl} size={80} />
              <div style={{ flex: 1, minWidth: '200px' }}>
                <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '13px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '6px' }}>Welcome back</p>
                <h1 style={{ color: 'var(--white)', fontSize: 'clamp(24px,4vw,38px)', fontWeight: 800, lineHeight: 1.15, marginBottom: '6px' }}>{firstName}! 🙏</h1>
                <p style={{ color: 'rgba(255,255,255,.55)', fontSize: '14px' }}>{email}{joinedDate ? ` · Member since ${joinedDate}` : ''}</p>
              </div>
              <Link href="/contact" className="btn btn-outline-white" style={{ whiteSpace: 'nowrap', alignSelf: 'center' }}>
                Contact Kru Mind
              </Link>
            </div>
          </FadeIn>

          {/* Stats row */}
          <FadeIn>
            <div className="dash-stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginTop: '40px' }}>
              {[
                { icon: '🎓', label: 'My Courses', value: 'Teachable', sub: 'View on Teachable →', href: 'https://learn-thai-with-mind.teachable.com/sign_in' },
                { icon: '📚', label: 'My Books', value: '0 owned', sub: 'Book 1 coming soon', href: '/books' },
                { icon: '🃏', label: 'Flashcards', value: '8 decks', sub: '73 cards · Free', href: '/flashcard' },
                { icon: '👥', label: 'Group Classes', value: 'Waitlist', sub: 'Join a class', href: '/private-class#waitlist' },
              ].map(({ icon, label, value, sub, href }) => (
                href.startsWith('http')
                  ? <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.15)', borderRadius: '14px', padding: '20px', textDecoration: 'none', transition: 'background .2s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,.18)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,.1)')}>
                      <div style={{ fontSize: '28px', marginBottom: '10px' }}>{icon}</div>
                      <div style={{ color: 'rgba(255,255,255,.55)', fontSize: '11px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>{label}</div>
                      <div style={{ color: 'var(--white)', fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>{value}</div>
                      <div style={{ color: 'rgba(255,255,255,.5)', fontSize: '12px' }}>{sub}</div>
                    </a>
                  : <Link key={label} href={href} style={{ background: 'rgba(255,255,255,.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.15)', borderRadius: '14px', padding: '20px', textDecoration: 'none', transition: 'background .2s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,.18)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,.1)')}>
                      <div style={{ fontSize: '28px', marginBottom: '10px' }}>{icon}</div>
                      <div style={{ color: 'rgba(255,255,255,.55)', fontSize: '11px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>{label}</div>
                      <div style={{ color: 'var(--white)', fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>{value}</div>
                      <div style={{ color: 'rgba(255,255,255,.5)', fontSize: '12px' }}>{sub}</div>
                    </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── My Courses ── */}
      <section className="section-pad" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <FadeIn>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '32px' }}>
              <div>
                <p className="eyebrow" style={{ marginBottom: '4px' }}>Learning</p>
                <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(20px,3vw,28px)', fontWeight: 800, color: 'var(--dark)' }}>My Courses</h2>
              </div>
              <a href="https://learn-thai-with-mind.teachable.com/sign_in" target="_blank" rel="noopener noreferrer" className="btn btn-blue">
                Open Teachable →
              </a>
            </div>
          </FadeIn>

          {/* Teachable connect banner */}
          <FadeIn>
            <div style={{ background: 'var(--white)', border: '1.5px solid var(--blue-100)', borderRadius: '16px', padding: '28px 32px', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'var(--blue-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>🎓</div>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--dark)', marginBottom: '4px' }}>Your courses live on Teachable</h3>
                <p style={{ fontSize: '14px', color: 'var(--mid)', lineHeight: '1.6' }}>Sign in to your Teachable account with the same email (<strong>{email}</strong>) to access all enrolled courses, video lessons, and progress.</p>
              </div>
              <a href="https://learn-thai-with-mind.teachable.com/sign_in" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Go to My Courses
              </a>
            </div>
          </FadeIn>

          {/* Course catalog preview */}
          <div className="dash-course-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px' }}>
            {COURSES.map(({ id, title, level, lessons, color }) => (
              <FadeIn key={id}>
                <div style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: '14px', overflow: 'hidden', transition: 'transform .2s,box-shadow .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <div style={{ height: '90px', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: "'Noto Sans Thai',sans-serif", fontSize: '32px', color: 'rgba(255,255,255,.2)', userSelect: 'none' }}>ภาษาไทย</span>
                  </div>
                  <div style={{ padding: '16px' }}>
                    <div style={{ fontSize: '11px', color: 'var(--blue)', fontWeight: 700, letterSpacing: '.8px', textTransform: 'uppercase', marginBottom: '6px' }}>{level}</div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--dark)', lineHeight: '1.4', marginBottom: '10px' }}>{title}</h4>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '14px' }}>{lessons} lessons · Self-paced</div>
                    <Link href="/courses" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--blue)', textDecoration: 'none' }}>View course →</Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Flashcard Practice ── */}
      <section className="section-pad bg-white">
        <div className="container">
          <FadeIn>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '32px' }}>
              <div>
                <p className="eyebrow" style={{ marginBottom: '4px' }}>Free Tool</p>
                <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(20px,3vw,28px)', fontWeight: 800, color: 'var(--dark)' }}>Flashcard Practice</h2>
              </div>
              <Link href="/flashcard" className="btn btn-blue">Practice Now →</Link>
            </div>
          </FadeIn>

          <div className="dash-deck-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
            {DECKS.map(({ key, label, emoji, color, cards }) => (
              <FadeIn key={key}>
                <Link href="/flashcard" style={{ textDecoration: 'none' }}>
                  <div style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: '14px', padding: '20px 16px', textAlign: 'center', transition: 'transform .2s,box-shadow .2s,border-color .2s' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.borderColor = 'var(--blue-100)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--border)'; }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', margin: '0 auto 12px' }}>{emoji}</div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '14px', fontWeight: 700, color: 'var(--dark)', marginBottom: '4px' }}>{label}</div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{cards} cards</div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── My Books ── */}
      <section className="section-pad" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <FadeIn>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '32px' }}>
              <div>
                <p className="eyebrow" style={{ marginBottom: '4px' }}>Study Materials</p>
                <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(20px,3vw,28px)', fontWeight: 800, color: 'var(--dark)' }}>My Books</h2>
              </div>
              <Link href="/books" className="btn btn-outline">Browse Books</Link>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="dash-books-row" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '28px', alignItems: 'start' }}>
              {/* Book cover */}
              <div style={{ borderRadius: '14px', overflow: 'hidden', boxShadow: '0 16px 48px rgba(0,0,0,.15)' }}>
                <Image src="/images/book-sl1-cover.webp" alt="Speaking and Listening 1" width={280} height={373} style={{ width: '100%', display: 'block' }} />
              </div>

              {/* Book info */}
              <div style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: '16px', padding: '28px 32px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#fef3c7', color: '#92400e', border: '1px solid #fde68a', borderRadius: '100px', padding: '4px 14px', fontSize: '12px', fontWeight: 700, marginBottom: '16px' }}>
                  🔔 Coming Soon
                </span>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'clamp(18px,2.5vw,24px)', fontWeight: 800, color: 'var(--dark)', marginBottom: '10px' }}>Speaking &amp; Listening 1</h3>
                <p style={{ fontSize: '14px', color: 'var(--mid)', lineHeight: '1.7', marginBottom: '20px' }}>A complete self-learning book for absolute beginners — 6 chapters covering phonetics, greetings, verbs, ordering food, numbers, and directions. Written by Kru Mind with 10+ years of teaching experience.</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                  {['📄 Digital PDF', '✏️ Exercises', '✅ Answer key', '🏯 Cultural tips'].map(t => (
                    <span key={t} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '100px', padding: '4px 12px', fontSize: '12px', color: 'var(--mid)', fontWeight: 500 }}>{t}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div>
                    <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '28px', fontWeight: 800, color: 'var(--dark)' }}>฿650</span>
                    <span style={{ fontSize: '13px', color: 'var(--muted)', marginLeft: '8px' }}>≈ $18 USD</span>
                  </div>
                  <span className="btn btn-primary" style={{ opacity: .5, cursor: 'default', pointerEvents: 'none' }}>Purchase (Coming Soon)</span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '12px' }}>
                  🇹🇭 Pay via PromptPay?{' '}
                  <a href="mailto:learnthaiwithmind@gmail.com" style={{ color: 'var(--blue)', fontWeight: 600 }}>Contact Kru Mind</a>
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Group Classes ── */}
      <section className="section-pad bg-white">
        <div className="container">
          <FadeIn>
            <div style={{ background: 'linear-gradient(135deg,#0d1f52,#1A3680)', borderRadius: '20px', padding: '40px 48px', display: 'grid', gridTemplateColumns: '1fr auto', gap: '32px', alignItems: 'center' }}
              className="dash-classes-inner">
              <div>
                <p style={{ color: 'var(--yellow)', fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '10px' }}>Live with Kru Mind</p>
                <h2 style={{ color: 'var(--white)', fontSize: 'clamp(20px,3vw,30px)', fontWeight: 800, marginBottom: '12px' }}>Join a Group Class</h2>
                <p style={{ color: 'rgba(255,255,255,.65)', fontSize: '15px', lineHeight: '1.7', maxWidth: '520px' }}>
                  Practice speaking Thai live with Kru Mind and classmates from around the world. Small groups, real conversations, real progress — every week.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-end' }}>
                <Link href="/private-class#waitlist" className="btn btn-yellow btn-lg" style={{ whiteSpace: 'nowrap' }}>Join Waitlist</Link>
                <Link href="/private-class" style={{ color: 'rgba(255,255,255,.6)', fontSize: '13px', textDecoration: 'none', fontWeight: 500 }}>See schedule →</Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* spinner animation */}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </>
  );
}
