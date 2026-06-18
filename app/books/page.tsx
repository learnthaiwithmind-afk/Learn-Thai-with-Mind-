'use client';
import Image from 'next/image';
import Link from 'next/link';
import FadeIn from '../../components/FadeIn';

export default function BooksPage() {
  const comingSoon = [
    { img: 'book-sl2-cover.webp', alt: 'Speaking and Listening 2', title: 'Speaking & Listening 2', desc: 'Daily life conversations, shopping, transport, and expanding your vocabulary into real situations.', level: 'A2 · Beginner' },
    { img: 'book-sl3-cover.webp', alt: 'Speaking and Listening 3', title: 'Speaking & Listening 3', desc: 'Handle real-life situations comfortably — relationships, work, travel, and longer conversations.', level: 'A2+ · Elementary' },
    { img: 'book-rw1-cover.webp', alt: 'Reading and Writing 1', title: 'Reading & Writing 1', desc: 'Learn the Thai alphabet — consonants, vowels, and tones — and start reading real Thai for the first time.', level: 'B1 · Literacy' },
    { img: 'book-rw2-cover.webp', alt: 'Reading and Writing 2', title: 'Reading & Writing 2', desc: 'Read and write short Thai texts — build confidence with sentences, vocabulary, and everyday script.', level: 'B1 · Literacy' },
    { img: 'book-rw3-cover.webp', alt: 'Reading and Writing 3', title: 'Reading & Writing 3', desc: 'Read paragraphs, write messages, and handle real Thai text — from menus and signs to short articles.', level: 'B1+ · Intermediate' },
  ];

  const chapters = [
    ['1', 'Phonetics System', 'Thai tones, vowels, and consonants using Mind\'s phonetic system'],
    ['2', 'Greetings', 'Introduce yourself, polite phrases, and how Thais really greet each other'],
    ['3', 'Verbs', 'Essential action words for everyday conversations'],
    ['4', 'Ordering Food', 'Speak Thai at restaurants, markets, and street food stalls'],
    ['5', 'Numbers', 'Count, pay, tell the time, and negotiate prices'],
    ['6', 'Directions & Places', 'Navigate Thailand and ask for help with confidence'],
  ];

  const features = ['💡 Language tips every chapter', '🏯 Cultural tips every chapter', '✏️ Exercises included', '✅ Full answer key', '📄 Digital PDF', '🖨️ Print-friendly'];

  return (
    <>
      <section className="page-hero">
        <div className="container text-center">
          <p className="eyebrow" style={{ marginBottom: '12px' }}>Books &amp; Study Materials</p>
          <h1 style={{ color: 'var(--white)', fontSize: 'clamp(32px,5vw,58px)', marginBottom: '16px' }}>Study Thai in Your Own Hands</h1>
          <div className="accent-bar center" style={{ marginTop: '20px' }}><span className="accent-line"></span><span className="accent-dot"></span></div>
          <p style={{ color: 'rgba(255,255,255,.65)', fontSize: 'clamp(15px,2.5vw,18px)', maxWidth: '560px', margin: '24px auto 0', lineHeight: '1.7' }}>
            Self-learning books written by a real Thai teacher — clear, practical, and full of cultural insight.
          </p>
        </div>
      </section>

      {/* FEATURED BOOK */}
      <section className="section-pad bg-white">
        <div className="container">
          <FadeIn>
            <div className="text-center">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0', borderRadius: '100px', padding: '6px 18px', fontSize: '13px', fontWeight: 700 }}>✦ Now Available</span>
              <p className="eyebrow" style={{ marginTop: '20px' }}>Kru Mind&apos;s First Book</p>
              <h2 className="section-title">Speaking &amp; Listening 1</h2>
              <div className="accent-bar center"><span className="accent-line"></span><span className="accent-dot"></span></div>
              <p className="section-sub">A complete self-learning book for absolute beginners — with everything you need to start speaking Thai from day one.</p>
            </div>
          </FadeIn>

          {/* Two separate FadeIn elements so tall mobile content doesn't stay invisible */}
          <div className="book-featured-grid" style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '64px', alignItems: 'start', marginTop: '56px' }}>
            <FadeIn>
              <div className="book-cover-wrap" style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,.18)' }}>
                <Image src="/images/book-sl1-cover.webp" alt="Speaking and Listening 1 by Kru Mind" width={380} height={507} style={{ width: '100%', display: 'block' }} priority />
              </div>
            </FadeIn>

            <FadeIn>
              <div className="book-featured-content">
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                  {['🙋 Self-Learners', '👩‍🏫 Thai Teachers', '🔰 Absolute Beginners'].map(t => (
                    <span key={t} style={{ background: '#eff6ff', color: '#1e40af', border: '1px solid #bfdbfe', borderRadius: '100px', padding: '5px 14px', fontSize: '13px', fontWeight: 600 }}>{t}</span>
                  ))}
                </div>

                <h2 style={{ fontSize: 'clamp(22px,3.5vw,38px)', lineHeight: '1.25', marginBottom: '14px' }}>Your First Step into Thai — Speak with Confidence from Page One</h2>

                <p style={{ fontSize: 'clamp(14px,2vw,16px)', color: 'var(--mid)', lineHeight: '1.75', marginBottom: '28px' }}>
                  Whether you&apos;re learning on your own or teaching in a classroom, <strong>Speaking &amp; Listening 1</strong> gives you a clear, structured path into the Thai language. Written by Kru Mind with 10+ years of real teaching experience — this book helps you understand <em>why</em> Thai works the way it does.
                </p>

                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '12px' }}>What&apos;s Inside — 6 Chapters</p>
                <div className="book-chapters-grid">
                  {chapters.map(([num, name, sub]) => (
                    <div key={num} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '10px', padding: '11px 14px' }}>
                      <div style={{ width: '26px', height: '26px', borderRadius: '7px', background: 'var(--blue)', color: '#fff', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{num}</div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--dark)' }}>{name}</div>
                        <div className="book-chapter-sub" style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '1px' }}>{sub}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px', marginTop: '20px' }}>
                  {features.map(t => (
                    <span key={t} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '100px', padding: '5px 12px', fontSize: '12px', color: 'var(--mid)', fontWeight: 500 }}>{t}</span>
                  ))}
                </div>

                <div className="book-price-box" style={{ background: 'var(--bg)', border: '1.5px solid var(--border)', borderRadius: '16px', padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 'clamp(32px,5vw,44px)', fontWeight: 800, color: 'var(--dark)', lineHeight: 1 }}>฿650</div>
                    <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>Digital PDF · Instant download · ≈ $18 USD</div>
                  </div>
                  <div className="book-price-cta" style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
                    <span className="btn btn-primary btn-lg" style={{ opacity: .5, cursor: 'default', pointerEvents: 'none' }}>Coming Soon</span>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', textAlign: 'right' }}>🔔 Available very soon — check back shortly!</div>
                  </div>
                </div>

                <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '14px 18px', fontSize: '13px', color: '#92400e', marginTop: '12px', lineHeight: '1.6' }}>
                  🇹🇭 <strong>ลูกค้าไทย:</strong> หากต้องการชำระผ่าน PromptPay หรือโอนเงิน ติดต่อ Kru Mind ได้ที่{' '}
                  <a href="mailto:learnthaiwithmind@gmail.com" style={{ color: '#92400e', fontWeight: 600 }}>learnthaiwithmind@gmail.com</a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* COMING SOON */}
      <section className="section-pad" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <FadeIn>
            <div className="text-center">
              <p className="eyebrow">The Series Continues</p>
              <h2 className="section-title">More Books on the Way</h2>
              <div className="accent-bar center"><span className="accent-line"></span><span className="accent-dot"></span></div>
              <p className="section-sub">Speaking &amp; Listening 1 is just the beginning. Each new book follows the same curriculum — building your Thai step by step, skill by skill.</p>
            </div>
          </FadeIn>

          <div className="book-cs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px', marginTop: '40px' }}>
            {comingSoon.map(({ img, alt, title, desc, level }) => (
              <FadeIn key={img}>
                <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', transition: 'box-shadow .2s' }}
                     onMouseEnter={e => (e.currentTarget.style.boxShadow = 'var(--shadow-lg)')}
                     onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}>
                  <div style={{ height: '220px', overflow: 'hidden' }}>
                    <Image src={`/images/${img}`} alt={alt} width={400} height={220} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
                  </div>
                  <div style={{ padding: '16px 18px' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>{title}</h4>
                    <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: '1.55' }}>{desc}</p>
                  </div>
                  <div style={{ borderTop: '1px solid var(--border)', padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>{level}</span>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--blue)', background: 'var(--blue-50)', borderRadius: '100px', padding: '4px 12px' }}>Coming Soon</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <p style={{ textAlign: 'center', marginTop: '32px', fontSize: '14px', color: 'var(--muted)' }}>
              🔔 Want to know when the next book launches?{' '}
              <Link href="/private-class#waitlist" style={{ color: 'var(--blue)', fontWeight: 600 }}>Join the waiting list</Link> and you&apos;ll be the first to know.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* WHY THESE BOOKS */}
      <section className="section-pad bg-white">
        <div className="container">
          <FadeIn>
            <div className="book-why-grid" style={{ background: 'var(--bg)', borderRadius: '16px', padding: '48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center', border: '1px solid var(--border)' }}>
              <div>
                <p className="eyebrow">Written by a Real Teacher</p>
                <h2 className="section-title" style={{ fontSize: 'clamp(22px,3vw,28px)' }}>Why These Books Are Different</h2>
                <div className="accent-bar" style={{ marginTop: '12px', marginBottom: '20px' }}><span className="accent-line"></span><span className="accent-dot"></span></div>
                <p style={{ color: 'var(--mid)', fontSize: '15px', lineHeight: '1.75', marginBottom: '14px' }}>Most Thai language books are written by linguists for linguists. Mind wrote these books for real people who want to speak real Thai in the real world.</p>
                <p style={{ color: 'var(--mid)', fontSize: '15px', lineHeight: '1.75' }}>Every explanation is clear. Every example is practical. Every page feels like sitting down with a patient friend who genuinely wants you to succeed.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  ['✍️', 'Written by the teacher, not a committee', 'Every word reflects 10+ years of real classroom experience.'],
                  ['🎯', 'Practical from page one', "No filler. Every page teaches something you'll actually use."],
                  ['🔄', 'Updated regularly', 'Buy once, receive all future updates at no extra cost.'],
                  ['📱', 'Digital-first design', 'Beautiful on screen or printed — however you learn best.'],
                ].map(([icon, name, sub]) => (
                  <div key={name} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <div style={{ width: '44px', height: '44px', background: 'var(--yellow-lt)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{icon}</div>
                    <div>
                      <strong style={{ color: 'var(--dark)', fontSize: '14px' }}>{name}</strong><br />
                      <span style={{ fontSize: '13px', color: 'var(--muted)' }}>{sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-pad bg-blue-gradient">
        <FadeIn className="container text-center">
          <p className="eyebrow" style={{ color: 'var(--yellow)' }}>Start Your Journey</p>
          <h2 className="section-title" style={{ color: 'var(--white)', marginBottom: '16px' }}>Ready to Speak Thai?</h2>
          <p style={{ fontSize: 'clamp(14px,2.5vw,17px)', color: 'rgba(255,255,255,.7)', maxWidth: '540px', margin: '0 auto 36px', lineHeight: '1.7' }}>Pick up Speaking &amp; Listening 1 and start learning today — or join a live group class with Kru Mind for real-time speaking practice alongside your book.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <span className="btn btn-yellow btn-lg" style={{ opacity: .5, cursor: 'default', pointerEvents: 'none' }}>Coming Soon — ฿650</span>
            <Link href="/private-class" className="btn btn-outline-white btn-lg">Join Group Classes</Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
