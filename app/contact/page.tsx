'use client';
import { useState } from 'react';
import Link from 'next/link';
import FadeIn from '../../components/FadeIn';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [level, setLevel] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert('⚠ Please fill in your name, email, and message.');
      return;
    }
    const subjectLine = encodeURIComponent((subject || 'Message from website') + ' — ' + name);
    const body = encodeURIComponent(
      `Hi Mind,\n\nMy name is ${name}.\n` +
      (level ? `My Thai level: ${level}\n` : '') +
      `\n${message}\n\nBest,\n${name}\n${email}`
    );
    window.location.href = `mailto:learnthaiwithmind@gmail.com?subject=${subjectLine}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <>
      <section className="page-hero">
        <div className="container text-center">
          <p className="eyebrow" style={{ marginBottom: '12px' }}>Get in Touch</p>
          <h1 style={{ color: 'var(--white)', fontSize: 'clamp(36px,5vw,58px)', marginBottom: '16px' }}>Say สวัสดี to Mind</h1>
          <div className="accent-bar center" style={{ marginTop: '20px' }}><span className="accent-line"></span><span className="accent-dot"></span></div>
          <p style={{ color: 'rgba(255,255,255,.65)', fontSize: '18px', maxWidth: '520px', margin: '24px auto 0', lineHeight: '1.7' }}>
            Questions about courses, private lessons, or just curious if Thai is right for you? Mind reads every message personally and responds within 24 hours.
          </p>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '64px', alignItems: 'start' }}>

            {/* Left: Info */}
            <FadeIn>
              <div style={{ background: 'var(--dark)', borderRadius: 'var(--r-xl)', padding: '48px', color: 'var(--white)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,191,36,.15) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
                <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,.20) 0%, transparent 70%)', pointerEvents: 'none' }}></div>

                <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, var(--yellow), var(--blue))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', fontWeight: 800, color: 'var(--white)', marginBottom: '20px', fontFamily: "'Plus Jakarta Sans', sans-serif", position: 'relative', zIndex: 1 }}>M</div>
                <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--white)', marginBottom: '8px', position: 'relative', zIndex: 1 }}>Kru Mind</div>
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,.6)', lineHeight: '1.7', marginBottom: '36px', position: 'relative', zIndex: 1 }}>
                  Thai teacher with 10 years of experience. Based in Chiang Mai, teaching worldwide via Zoom. Real Thai, not textbook Thai — and always happy to chat.
                </p>

                {[
                  { href: 'mailto:learnthaiwithmind@gmail.com', bg: 'rgba(251,191,36,.2)', label: 'Email', sub: 'learnthaiwithmind@gmail.com' },
                  { href: 'https://www.instagram.com/learnthaiwithmind/', bg: 'rgba(225,48,108,.2)', label: 'Instagram', sub: '@learnthaiwithmind · DM anytime' },
                  { href: 'https://www.facebook.com/learnthaiwithmind/', bg: 'rgba(24,119,242,.2)', label: 'Facebook', sub: 'learnthaiwithmind · Message on Facebook' },
                  { href: 'https://www.youtube.com/channel/UCC2l2QhjI3CubcFvxBKPYdg', bg: 'rgba(255,0,0,.2)', label: 'YouTube', sub: 'Learn Thai with Mind · Videos & Shorts' },
                ].map(({ href, bg, label, sub }) => (
                  <a key={label} href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer"
                     style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '18px 20px', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.10)', borderRadius: 'var(--r)', marginBottom: '12px', textDecoration: 'none', color: 'var(--white)', transition: 'all .25s', position: 'relative', zIndex: 1 }}
                     onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.12)'; e.currentTarget.style.borderColor = 'rgba(251,191,36,.35)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                     onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.10)'; e.currentTarget.style.transform = 'none'; }}>
                    <div style={{ width: '44px', height: '44px', background: bg, borderRadius: 'var(--r-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                      {label === 'Email' ? '✉️' : label === 'Instagram' ? '📸' : label === 'Facebook' ? '👍' : '▶️'}
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '15px', fontWeight: 600 }}>{label}</strong>
                      <span style={{ fontSize: '13px', color: 'rgba(255,255,255,.55)' }}>{sub}</span>
                    </div>
                  </a>
                ))}

                <div style={{ marginTop: '28px', padding: '16px 20px', background: 'rgba(251,191,36,.1)', border: '1px solid rgba(251,191,36,.25)', borderRadius: 'var(--r)', fontSize: '14px', color: 'rgba(255,255,255,.75)', lineHeight: '1.6', position: 'relative', zIndex: 1 }}>
                  ⏱ <strong style={{ color: 'var(--yellow)' }}>Response time:</strong> Mind personally replies to all messages within 24 hours (usually much faster). She reads every message herself — no bots, no assistants.
                </div>
              </div>
            </FadeIn>

            {/* Right: Form */}
            <FadeIn>
              <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-xl)', boxShadow: 'var(--shadow-lg)', padding: '48px' }}>
                {!submitted ? (
                  <>
                    <h2 style={{ fontSize: '26px', marginBottom: '8px' }}>Send Mind a Message</h2>
                    <p style={{ fontSize: '15px', color: 'var(--muted)', marginBottom: '32px', lineHeight: '1.6' }}>Fill in the form below and it goes directly to Mind&apos;s inbox at <strong>learnthaiwithmind@gmail.com</strong>. Whether you have questions, want to say hello, or are ready to start — she&apos;d love to hear from you.</p>

                    <form onSubmit={handleSubmit} noValidate>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div className="form-group">
                          <label htmlFor="contact-name">Your Name *</label>
                          <input type="text" id="contact-name" placeholder="Jane Smith" required value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label htmlFor="contact-email">Email Address *</label>
                          <input type="email" id="contact-email" placeholder="jane@email.com" required value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="contact-subject">What&apos;s this about?</label>
                        <select id="contact-subject" value={subject} onChange={e => setSubject(e.target.value)}>
                          <option value="">Choose a topic…</option>
                          <option>Private Thai classes</option>
                          <option>Online courses &amp; pricing</option>
                          <option>Books &amp; study materials</option>
                          <option>General Thai learning advice</option>
                          <option>Collaboration or partnership</option>
                          <option>Something else</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="contact-level">Your current Thai level</label>
                        <select id="contact-level" value={level} onChange={e => setLevel(e.target.value)}>
                          <option value="">Select your level (optional)</option>
                          <option>Complete Beginner (no Thai at all)</option>
                          <option>Beginner (a few words/phrases)</option>
                          <option>Elementary (basic conversations)</option>
                          <option>Intermediate (can hold conversations)</option>
                          <option>Upper Intermediate or Advanced</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="contact-message">Your Message *</label>
                        <textarea id="contact-message" placeholder="Hi Mind! I've always wanted to learn Thai and…" required value={message} onChange={e => setMessage(e.target.value)} style={{ minHeight: '140px' }}></textarea>
                      </div>

                      <button type="submit" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '15px 28px', fontSize: '16px', fontWeight: 700, background: 'var(--blue)', color: 'var(--white)', border: 'none', borderRadius: 'var(--r)', cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif", transition: 'all .25s', boxShadow: '0 4px 16px rgba(37,99,235,.30)' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                        Send Message
                      </button>
                      <p style={{ fontSize: '13px', color: 'var(--muted)', textAlign: 'center', marginTop: '16px', lineHeight: '1.6' }}>🔒 Your details are only used to reply to your message. No spam, ever.</p>
                    </form>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', padding: '48px 24px' }}>
                    <div style={{ width: '72px', height: '72px', background: 'var(--success-lt)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', margin: '0 auto 20px' }}>✅</div>
                    <h3 style={{ fontSize: '22px', marginBottom: '10px', color: 'var(--dark)' }}>Message Sent!</h3>
                    <p style={{ fontSize: '15px', color: 'var(--muted)', maxWidth: '380px', margin: '0 auto', lineHeight: '1.7' }}>Thanks for reaching out. Mind will reply to <strong>{email}</strong> within 24 hours.</p>
                    <div style={{ marginTop: '28px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                      <Link href="/courses" className="btn btn-primary">Explore Courses</Link>
                      <Link href="/private-class#waitlist" className="btn btn-outline">Join a Class</Link>
                    </div>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>

          {/* Mini FAQ */}
          <FadeIn>
            <div className="text-center" style={{ marginTop: '80px', marginBottom: '40px' }}>
              <p className="eyebrow">Before You Write</p>
              <h2 className="section-title">Quick Answers</h2>
              <div className="accent-bar center"><span className="accent-line"></span><span className="accent-dot"></span></div>
            </div>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {[
              { q: "🕐 What are Mind's teaching hours?", a: "Group classes run Monday to Friday, with sessions at 10:00–11:30, 12:30–14:00, and 20:00–21:30 Thailand time (ICT, UTC+7). All classes are online via Zoom — students join from all over the world." },
              { q: "🌍 Can I book from outside Thailand?", a: "Yes! Mind teaches students worldwide — Europe, USA, Australia, Japan, and everywhere in between. Sessions run online so your location doesn't matter at all." },
              { q: "📚 I'm a complete beginner. Is that okay?", a: "Absolutely. Most students start with zero Thai. Mind's teaching style is patient, clear, and encouraging — you'll be speaking Thai from the very first lesson." },
              { q: "💬 What if I just want to ask a quick question?", a: "No problem at all. Drop a message via Facebook or Instagram if you prefer a faster response. For anything more detailed, the email form above goes straight to Mind's inbox." },
            ].map(({ q, a }) => (
              <FadeIn key={q}>
                <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: '24px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '8px', color: 'var(--dark)' }}>{q}</h4>
                  <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.65' }}>{a}</p>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      <section className="section-pad bg-blue-gradient">
        <FadeIn className="container text-center">
          <p className="eyebrow" style={{ color: 'var(--yellow)' }}>Ready to Start?</p>
          <h2 className="section-title" style={{ color: 'var(--white)', marginBottom: '16px' }}>Join a Live Group Class with Mind</h2>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,.7)', maxWidth: '520px', margin: '0 auto 36px', lineHeight: '1.7' }}>Live Zoom classes, small groups, cloud recordings. Join the waiting list and start learning Thai with Kru Mind — in real time, with real people.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/private-class#waitlist" className="btn btn-yellow btn-lg">Join the Waiting List</Link>
            <Link href="/courses" className="btn btn-outline-white btn-lg">Browse Courses</Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
