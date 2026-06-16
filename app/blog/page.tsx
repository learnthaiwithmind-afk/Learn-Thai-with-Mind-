'use client';
import { useState } from 'react';
import Link from 'next/link';
import FadeIn from '../../components/FadeIn';

const FILTERS = ['All Posts', '🗣️ Language Tips', '🏯 Thai Culture', '✈️ Travel', '📖 Teaching Stories'];

const CARDS = [
  { cover: 1, thai: 'สวัสดี', cat: '🗣️ Language Tips', title: '5 Thai Phrases That Will Make Locals Love You Instantly', excerpt: 'You don\'t need to be fluent to impress Thai people. These five phrases — simple, everyday, and often overlooked by textbooks — will earn you warm smiles everywhere from Chiang Mai night markets to Bangkok street stalls.' },
  { cover: 2, thai: 'เกรงใจ', cat: '🏯 Thai Culture', title: 'Kreng Jai: The Thai Concept That Runs Every Relationship', excerpt: 'If you\'ve ever felt like a Thai person was too polite to say no — or said yes when they meant no — you\'ve experienced kreng jai. This deeply Thai feeling shapes conversations, decisions, and relationships in ways that every learner must understand.' },
  { cover: 3, thai: 'วัฒนธรรม', cat: '✈️ Travel', title: 'Street Food Thai: How to Order at a Bangkok Market Like a Local', excerpt: 'Forget the tourist menu. The real Thai food experience happens when you can order directly in Thai — point, smile, and say the magic words. I\'ll walk you through exactly what to say at a noodle stall, a som tam cart, and a grilled satay stand.' },
  { cover: 4, thai: 'วรรณยุกต์', cat: '🗣️ Language Tips', title: 'Thai Tones Explained Simply — Stop Getting Them Wrong', excerpt: 'Five tones. One of the biggest fears for new learners. But here\'s the truth: tones follow rules, and once you see the pattern, they become logical — not mysterious. This is the guide I wish I had on day one of teaching Thai.' },
  { cover: 5, thai: 'ไหว้', cat: '🏯 Thai Culture', title: 'The Wai: When to Do It, How to Do It, and When NOT To', excerpt: 'The wai (ไหว้) is the most visible Thai greeting — and one of the most misunderstood by visitors. Did you know wai-ing the wrong person in the wrong way can actually be rude? I\'ll explain everything from the angle of the hands to who goes first.' },
  { cover: 6, thai: 'เรียน', cat: '📖 Teaching Stories', title: 'My First Day Teaching Thai — What I Learned From My Students', excerpt: 'I walked in thinking I\'d be the one doing all the teaching. I walked out realising my students had already taught me something important about patience, curiosity, and what it really takes to learn a language as a grown adult.' },
];

const COVER_GRADIENTS: Record<number, string> = {
  1: 'linear-gradient(145deg, #1A3680, #2563EB)',
  2: 'linear-gradient(145deg, #92400E, #D97706)',
  3: 'linear-gradient(145deg, #065F46, #059669)',
  4: 'linear-gradient(145deg, #4C1D95, #7C3AED)',
  5: 'linear-gradient(145deg, #9F1239, #E11D48)',
  6: 'linear-gradient(145deg, #0C4A6E, #0891B2)',
};

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState('All Posts');

  const filtered = activeFilter === 'All Posts'
    ? CARDS
    : CARDS.filter(c => c.cat === activeFilter);

  return (
    <>
      <section className="page-hero">
        <div className="container text-center">
          <p className="eyebrow" style={{ marginBottom: '12px' }}>Thai Language · Culture · Travel · Teaching</p>
          <h1 style={{ color: 'var(--white)', fontSize: 'clamp(36px,5vw,58px)', marginBottom: '16px' }}>Mind&apos;s Blog</h1>
          <div className="accent-bar center" style={{ marginTop: '20px', marginBottom: '0' }}>
            <span className="accent-line"></span><span className="accent-dot"></span>
          </div>
          <p style={{ color: 'rgba(255,255,255,.70)', fontSize: '18px', maxWidth: '560px', margin: '24px auto 0', lineHeight: '1.7' }}>
            Language tips, cultural insights, travel stories, and slices of Thai life — from a Thai teacher who loves sharing her world with you.
          </p>
        </div>
      </section>

      <section className="section-pad" style={{ background: 'var(--bg)' }}>
        <div className="container">

          {/* Category filter */}
          <FadeIn>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '48px' }}>
              {FILTERS.map(f => (
                <button key={f} onClick={() => setActiveFilter(f)}
                  style={{ padding: '8px 20px', borderRadius: '100px', border: '1.5px solid', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all .2s',
                    borderColor: activeFilter === f ? 'var(--blue)' : 'var(--border)',
                    background: activeFilter === f ? 'var(--blue-50)' : 'var(--white)',
                    color: activeFilter === f ? 'var(--blue)' : 'var(--mid)',
                  }}>
                  {f}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Featured post */}
          <FadeIn>
            <div style={{ background: 'var(--white)', borderRadius: 'var(--r-xl)', border: '1.5px solid var(--border)', overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1fr', marginBottom: '16px', transition: 'box-shadow .25s' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ background: 'linear-gradient(145deg, #1A3680, #0d2560)', minHeight: '320px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '36px 40px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(200,152,31,.15), transparent 70%)' }} />
                <div style={{ fontFamily: "'Noto Sans Thai', sans-serif", fontSize: '80px', color: 'rgba(255,255,255,.08)', position: 'absolute', top: '20px', right: '20px', lineHeight: 1, userSelect: 'none' }}>เข้าใจ</div>
                <div style={{ position: 'relative', zIndex: 1, display: 'inline-block', background: 'var(--yellow)', color: 'var(--white)', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', borderRadius: '100px', padding: '5px 14px', marginBottom: '16px', width: 'fit-content' }}>✦ Featured Article</div>
                <div style={{ position: 'relative', zIndex: 1, fontFamily: "'Cormorant Garamond', serif", fontSize: '30px', fontWeight: 600, color: 'var(--white)', lineHeight: '1.3' }}>&ldquo;Mai pen rai&rdquo; — the three words that explain everything about Thai culture</div>
              </div>
              <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--yellow-dk)', marginBottom: '16px' }}>🏯 Thai Culture</div>
                <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '22px', fontWeight: 800, color: 'var(--dark)', lineHeight: '1.3', marginBottom: '16px' }}>Why Thais Say &ldquo;Never Mind&rdquo; — And What It Really Means</h2>
                <p style={{ fontSize: '15px', color: 'var(--mid)', lineHeight: '1.75', marginBottom: '28px' }}>Mai pen rai (ไม่เป็นไร) is one of the first phrases every learner picks up — but most people never discover its deeper meaning. It&apos;s not just &ldquo;no worries.&rdquo; It&apos;s a window into how Thai people see life, stress, conflict, and grace.</p>
                <a href="#" className="btn btn-blue" style={{ width: 'fit-content' }}>Read Article →</a>
              </div>
            </div>
          </FadeIn>

          {/* Blog grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', marginTop: '56px' }}>
            {filtered.map(({ cover, thai, cat, title, excerpt }) => (
              <FadeIn key={title}>
                <div style={{ background: 'var(--white)', borderRadius: 'var(--r-lg)', border: '1.5px solid var(--border)', overflow: 'hidden', transition: 'transform .25s, box-shadow .25s, border-color .25s', display: 'flex', flexDirection: 'column' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', padding: '20px 24px', position: 'relative', overflow: 'hidden', background: COVER_GRADIENTS[cover] }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.18)' }} />
                    <div style={{ fontFamily: "'Noto Sans Thai', sans-serif", fontSize: '48px', color: 'rgba(255,255,255,.18)', position: 'absolute', top: '12px', right: '20px', lineHeight: 1, userSelect: 'none' }}>{thai}</div>
                    <span style={{ position: 'relative', zIndex: 1, display: 'inline-block', background: 'rgba(255,255,255,.22)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.3)', color: 'var(--white)', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', borderRadius: '100px', padding: '5px 14px' }}>{cat}</span>
                  </div>
                  <div style={{ padding: '24px 28px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 500, marginBottom: '10px' }}>Coming soon</div>
                    <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', fontWeight: 800, color: 'var(--dark)', lineHeight: '1.35', marginBottom: '12px' }}>{title}</h3>
                    <p style={{ fontSize: '14px', color: 'var(--mid)', lineHeight: '1.7', flex: 1 }}>{excerpt}</p>
                  </div>
                  <div style={{ padding: '16px 28px 24px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--blue-50)', border: '2px solid var(--blue-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800, color: 'var(--blue)' }}>M</div>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--dark)' }}>Kru Mind</span>
                    </div>
                    <a href="#" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', fontWeight: 700, color: 'var(--blue)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>Read →</a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Coming soon banner */}
          <FadeIn>
            <div style={{ background: 'var(--yellow-lt)', border: '1.5px solid rgba(200,152,31,.3)', borderRadius: 'var(--r-lg)', padding: '28px 36px', textAlign: 'center', marginTop: '48px' }}>
              <p style={{ fontSize: '15px', color: '#7a5c00', margin: 0 }}>
                ✍️ <strong style={{ color: '#5c4400' }}>More articles coming soon!</strong> Mind is writing new posts about Thai language, culture, and travel.{' '}
                <Link href="/contact" style={{ color: '#7a5c00', fontWeight: 700 }}>Contact Mind</Link> to be notified when new articles go live.
              </p>
            </div>
          </FadeIn>

        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container text-center" style={{ maxWidth: '680px' }}>
          <FadeIn>
            <p className="eyebrow">Ready to Go Deeper?</p>
            <h2 className="section-title" style={{ fontSize: 'clamp(24px,4vw,36px)' }}>Words on a page are just the beginning</h2>
            <div className="accent-bar center"><span className="accent-line"></span><span className="accent-dot"></span></div>
            <p style={{ color: 'var(--mid)', fontSize: '16px', lineHeight: '1.75', margin: '0 auto 36px' }}>
              If these articles spark something in you, imagine what a full course can do. Learn Thai at your own pace — with the language, the culture, and the confidence to truly connect with Thailand.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/courses" className="btn btn-blue btn-lg">Explore Courses</Link>
              <Link href="/private-class#waitlist" className="btn btn-outline btn-lg">Join Group Classes</Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
