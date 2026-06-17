'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import FadeIn from '../../components/FadeIn';

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby_kV8Iuxo0hdwk7iow5_CqJAQEPua2LVFNypkUeIIEX_qtJJDhzuTsnkwcicZCsm0/exec';

const FAQS = [
  { q: 'Do I need any prior Thai knowledge to join?', a: 'No prior knowledge is needed at all. All current group classes are Level 1 — designed for complete beginners. Whether you\'ve never heard a Thai word or you know a handful of phrases, you\'ll be in the right place.' },
  { q: 'How much does a group class cost?', a: 'Pricing details are sent to you when your spot is confirmed — after you join the waiting list. Kru Mind will include full pricing, payment methods, and any early-bird offers in her confirmation email.' },
  { q: 'What if I miss a class?', a: 'Every session is recorded and the cloud recording is sent to all enrolled students after class. You can catch up at your own pace, rewatch anything you found tricky, and come back to recordings as many times as you like throughout the month.' },
  { q: 'How long will I be on the waiting list?', a: 'It depends on demand. Once 10 students are confirmed for a class, the group is formed and classes begin. Kru Mind contacts everyone on the waiting list in the order they signed up — so the sooner you join, the better your chances of being in the first group.' },
  { q: 'Can I join more than one class per week?', a: 'If you\'d like to do both the Speaking Thai and the Reading & Writing classes, you\'re very welcome to join the waiting list for both. Please indicate this in the "anything else" field when you sign up so Kru Mind can plan accordingly.' },
  { q: 'What do I need to attend class?', a: 'Just a computer or tablet with a camera and microphone, a stable internet connection, and a free Zoom account. Kru Mind will send class materials (slides, vocabulary sheets) ahead of each session — no extra purchases required.' },
  { q: 'Will there be more levels in the future?', a: 'Yes — Level 2 and beyond are planned as soon as Level 1 groups complete their first month. Students who complete Level 1 will be invited to continue before new students are added.' },
];

export default function PrivateClassPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cls, setCls] = useState('');
  const [level, setLevel] = useState('');
  const [tz, setTz] = useState('');
  const [why, setWhy] = useState('');
  const [goals, setGoals] = useState('');
  const [found, setFound] = useState('');
  const [notes, setNotes] = useState('');
  const hiddenFormRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !cls || !level || !tz.trim() || !why.trim() || !goals.trim() || !found) {
      alert('Please fill in all required fields (marked with *).');
      return;
    }
    if (hiddenFormRef.current) hiddenFormRef.current.submit();
    setSubmitted(true);
  }

  const glanceItems = [
    { icon: '💻', title: 'Live on Zoom', desc: 'All classes held live via Zoom. Interact with Kru Mind and your classmates in real time — no pre-recorded lessons.' },
    { icon: '👥', title: 'Max 10 Students', desc: 'Small groups only. Enough classmates to practise with, while still getting direct attention and feedback from Kru Mind.' },
    { icon: '⏱️', title: '90-Minute Sessions', desc: 'Each class runs 90 minutes — the perfect length to cover new material thoroughly without feeling rushed or overwhelmed.' },
    { icon: '📅', title: '2 Days Per Week', desc: 'Scheduled twice a week, Monday to Friday. Consistent enough to build momentum, flexible enough for busy schedules.' },
    { icon: '🗓️', title: '1 Month Per Course', desc: 'Each course runs for one full month — a structured, complete learning experience with a clear beginning, progression, and end.' },
    { icon: '☁️', title: 'Cloud Recordings', desc: 'Every session is recorded and sent to you after class. Review at your own pace, rewatch anything you missed, study on your own time.' },
  ];

  const scheduleCards = [
    {
      tag: 'Morning Class', time: '10:00 – 11:30', course: 'Speaking Thai', level: 'Level 1 — Beginner',
      desc: 'Build your spoken Thai from the ground up. Pronunciation, tones, everyday vocabulary, and real conversational patterns — all in a supportive small group.',
      tz: [['🇦🇺 Sydney', '13:00 – 14:30 AEST'], ['🇯🇵 Tokyo', '12:00 – 13:30 JST'], ['🇦🇪 Dubai', '07:00 – 08:30 GST'], ['🇩🇪 Berlin', '05:00 – 06:30 CET']],
      featured: false, ribbon: null,
      btnClass: 'btn btn-outline',
    },
    {
      tag: 'Midday Class', time: '12:30 – 14:00', course: 'Reading & Writing Thai', level: 'Level 1 — Beginner',
      desc: 'Crack the Thai script — all 44 consonants, vowels, tone marks, and the rules that make everything click. Start reading real Thai words from your very first lesson.',
      tz: [['🇦🇺 Sydney', '15:30 – 17:00 AEST'], ['🇯🇵 Tokyo', '14:30 – 16:00 JST'], ['🇦🇪 Dubai', '09:30 – 11:00 GST'], ['🇩🇪 Berlin', '07:30 – 09:00 CET']],
      featured: true, ribbon: 'Asia–Pacific Friendly',
      btnClass: 'btn btn-yellow',
    },
    {
      tag: 'Evening Class', time: '20:00 – 21:30', course: 'Speaking Thai', level: 'Level 1 — Beginner',
      desc: 'The same Speaking Thai Level 1 curriculum — but scheduled for Europe and the Americas. Learn in the evening Thailand time and start your day with Thai in the West.',
      tz: [['🇩🇪 Berlin', '15:00 – 16:30 CET'], ['🇬🇧 London', '14:00 – 15:30 GMT'], ['🇺🇸 New York', '09:00 – 10:30 EST'], ['🇺🇸 Los Angeles', '06:00 – 07:30 PST']],
      featured: false, ribbon: null,
      btnClass: 'btn btn-outline',
    },
  ];

  const howSteps = [
    { num: '1', icon: '📋', title: 'Join the Waiting List', desc: 'Fill in the form below — tell us which class you want and your time zone. No payment yet.' },
    { num: '2', icon: '✉️', title: 'Spot Confirmed', desc: 'When a group opens, Mind contacts you with your spot, exact schedule, Zoom link, and payment details.' },
    { num: '3', icon: '🎓', title: 'Attend Your Classes', desc: 'Join live on Zoom twice a week for 90 minutes. Ask questions, practise speaking, and learn with your group.' },
    { num: '4', icon: '☁️', title: 'Receive the Recording', desc: 'A cloud recording of every session is sent to you after class — rewatch, review, and reinforce at your own pace.' },
  ];

  return (
    <>
      <section className="page-hero">
        <div className="container text-center">
          <p className="eyebrow" style={{ marginBottom: '12px' }}>Live Online · Via Zoom · Max 10 Students</p>
          <h1 style={{ color: 'var(--white)', fontSize: 'clamp(36px,5vw,58px)', marginBottom: '16px' }}>Group Thai Classes<br />with Kru Mind</h1>
          <div className="accent-bar center" style={{ marginTop: '20px' }}><span className="accent-line"></span><span className="accent-dot"></span></div>
          <p style={{ color: 'rgba(255,255,255,.65)', fontSize: '18px', maxWidth: '600px', margin: '24px auto 0', lineHeight: '1.7' }}>
            Learn Thai in a small, focused group — live sessions twice a week with a real teacher, real feedback, and real progress. Cloud recordings sent after every class so you never miss a thing.
          </p>
          <div style={{ marginTop: '36px' }}>
            <a href="#waitlist" className="btn btn-yellow btn-lg">Join the Waiting List</a>
          </div>
        </div>
      </section>

      {/* At-a-glance */}
      <section className="section-pad bg-white">
        <div className="container">
          <FadeIn>
            <div className="text-center">
              <p className="eyebrow">What You Get</p>
              <h2 className="section-title">Everything Included</h2>
              <div className="accent-bar center"><span className="accent-line"></span><span className="accent-dot"></span></div>
              <p className="section-sub">Small groups, structured curriculum, and real teaching — not pre-recorded content. Every session is live with Kru Mind.</p>
            </div>
          </FadeIn>

          <div className="pc-glance-grid">
            {glanceItems.map(({ icon, title, desc }) => (
              <FadeIn key={title}>
                <div style={{ background: 'var(--white)', border: '1.5px solid var(--border)', borderRadius: '16px', padding: '28px 24px', display: 'flex', alignItems: 'flex-start', gap: '18px', transition: 'all .25s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--yellow)'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <div style={{ width: '52px', height: '52px', background: 'var(--yellow-lt)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>{icon}</div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--dark)', marginBottom: '4px' }}>{title}</div>
                    <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: '1.6' }}>{desc}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="section-pad" style={{ background: 'var(--bg)' }} id="schedule">
        <div className="container">
          <FadeIn>
            <div className="text-center">
              <p className="eyebrow">Class Schedule</p>
              <h2 className="section-title">Choose Your Time</h2>
              <div className="accent-bar center"><span className="accent-line"></span><span className="accent-dot"></span></div>
              <p className="section-sub">All times shown in Thailand time (ICT · UTC+7). Local times shown below each class to help you find your perfect slot.</p>
            </div>
          </FadeIn>

          <div className="pc-schedule-grid">
            {scheduleCards.map(({ tag, time, course, level: lv, desc, tz, featured, ribbon, btnClass }) => (
              <FadeIn key={tag}>
                <div style={{ background: 'var(--white)', border: `2px solid ${featured ? 'var(--yellow)' : 'var(--border)'}`, borderRadius: '20px', overflow: 'hidden', transition: 'all .3s', position: 'relative', boxShadow: featured ? '0 0 0 1px var(--yellow), var(--shadow-lg)' : 'none' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = featured ? '0 0 0 1px var(--yellow), var(--shadow-lg)' : 'var(--shadow-lg)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = featured ? '0 0 0 1px var(--yellow), var(--shadow-lg)' : 'none'; }}>
                  {ribbon && (
                    <div style={{ position: 'absolute', top: '-1px', right: '22px', background: 'var(--yellow)', color: 'var(--white)', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', padding: '6px 14px 8px', borderRadius: '0 0 10px 10px' }}>{ribbon}</div>
                  )}
                  <div style={{ padding: '28px 28px 24px', background: featured ? 'linear-gradient(135deg, var(--blue) 0%, #0d2560 100%)' : 'var(--dark)' }}>
                    <div style={{ display: 'inline-block', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--yellow)', background: 'rgba(200,152,31,.15)', border: '1px solid rgba(200,152,31,.3)', borderRadius: '100px', padding: '4px 12px', marginBottom: '14px' }}>{tag}</div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '30px', fontWeight: 800, color: 'var(--white)', lineHeight: '1.1', marginBottom: '4px' }}>{time}</div>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,.5)', fontWeight: 500 }}>ICT · Thailand Time · 90 min</div>
                  </div>
                  <div style={{ padding: '24px 28px 28px' }}>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--dark)', marginBottom: '8px' }}>{course}</div>
                    <span style={{ display: 'inline-block', fontSize: '12px', fontWeight: 600, color: 'var(--blue)', background: 'var(--blue-50)', borderRadius: '100px', padding: '3px 12px', marginBottom: '16px' }}>{lv}</span>
                    <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.65', marginBottom: '20px' }}>{desc}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                      {[['📅', 'Every Monday & Thursday'], ['🗓️', '1-month course · 8 sessions total'], ['👥', 'Max 10 students per group']].map(([icon, text]) => (
                        <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--mid)' }}>
                          <span style={{ fontSize: '16px', flexShrink: 0 }}>{icon}</span>{text}
                        </div>
                      ))}
                    </div>
                    <div style={{ background: 'var(--bg)', borderRadius: '10px', padding: '14px 16px', marginBottom: '20px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '8px' }}>Your local time</div>
                      {tz.map(([flag, t]) => (
                        <div key={flag} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--mid)', marginBottom: '4px' }}>
                          <span>{flag}</span><strong style={{ color: 'var(--dark)', fontWeight: 600 }}>{t}</strong>
                        </div>
                      ))}
                    </div>
                    <a href="#waitlist" className={btnClass} style={{ width: '100%', justifyContent: 'center' }}>Join Waiting List</a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <p style={{ textAlign: 'center', fontSize: '14px', color: 'var(--muted)', marginTop: '28px' }}>
            ✦ All classes run every <strong>Monday &amp; Thursday</strong> &nbsp;·&nbsp; Times may vary by ±1 hour seasonally due to daylight saving in your country
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="section-pad bg-white">
        <div className="container">
          <FadeIn>
            <div className="text-center">
              <p className="eyebrow">The Process</p>
              <h2 className="section-title">How It Works</h2>
              <div className="accent-bar center"><span className="accent-line"></span><span className="accent-dot"></span></div>
              <p className="section-sub">From joining the waiting list to your first lesson in four simple steps.</p>
            </div>
          </FadeIn>

          <div className="pc-how-grid">
            <div className="pc-how-connector" style={{ position: 'absolute', top: '32px', left: 'calc(12.5% + 16px)', right: 'calc(12.5% + 16px)', height: '2px', background: 'linear-gradient(90deg, var(--yellow), var(--blue), var(--yellow))', opacity: .3 }} />
            {howSteps.map(({ num, icon, title, desc }) => (
              <FadeIn key={num}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 16px', position: 'relative', zIndex: 1 }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--white)', border: '2px solid var(--yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '22px', fontWeight: 800, color: 'var(--yellow)', marginBottom: '20px', boxShadow: '0 0 0 6px rgba(200,152,31,.08)' }}>{num}</div>
                  <div style={{ fontSize: '26px', marginBottom: '14px' }}>{icon}</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--dark)', marginBottom: '8px' }}>{title}</div>
                  <div style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.65' }}>{desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Waiting list form */}
      <section className="section-pad" style={{ background: 'var(--bg)' }} id="waitlist">
        <div className="container">
          <FadeIn>
            <div className="text-center" style={{ marginBottom: '48px' }}>
              <p className="eyebrow">Reserve Your Spot</p>
              <h2 className="section-title">Join the Waiting List</h2>
              <div className="accent-bar center"><span className="accent-line"></span><span className="accent-dot"></span></div>
              <p className="section-sub">Classes fill fast — spaces are limited to 10 students per group. Add your name and Kru Mind will reach out as soon as your class is ready to start.</p>
            </div>
          </FadeIn>

          <FadeIn>
            <div style={{ background: 'var(--white)', borderRadius: '24px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)', overflow: 'hidden', maxWidth: '760px', margin: '0 auto' }}>
              <div style={{ background: 'var(--dark)', padding: '36px 48px', borderBottom: '1px solid rgba(200,152,31,.2)' }}>
                <h2 style={{ color: 'var(--white)', fontSize: '26px', marginBottom: '6px' }}>สมัครเรียน · Sign Up</h2>
                <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '15px', lineHeight: '1.6' }}>Fill in your details below. Kru Mind will contact you personally when your class group opens. No payment required to join the list.</p>
              </div>
              <div style={{ padding: '40px 48px' }}>
                {!submitted ? (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div className="form-group">
                        <label htmlFor="wl-name">Full Name *</label>
                        <input type="text" id="wl-name" placeholder="e.g. Sarah Johnson" required value={name} onChange={e => setName(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="wl-email">Email Address *</label>
                        <input type="email" id="wl-email" placeholder="your@email.com" required value={email} onChange={e => setEmail(e.target.value)} />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div className="form-group">
                        <label htmlFor="wl-phone">Phone / WhatsApp <span style={{ color: 'var(--muted)', fontWeight: 400 }}>(optional)</span></label>
                        <input type="text" id="wl-phone" placeholder="+1 555 000 0000" value={phone} onChange={e => setPhone(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="wl-class">Which Class? *</label>
                        <select id="wl-class" required value={cls} onChange={e => setCls(e.target.value)}>
                          <option value="" disabled>Select a class…</option>
                          <option>Speaking Thai — Morning (Mon &amp; Thu · 10:00–11:30 ICT)</option>
                          <option>Reading &amp; Writing — Midday (Mon &amp; Thu · 12:30–14:00 ICT)</option>
                          <option>Speaking Thai — Evening (Mon &amp; Thu · 20:00–21:30 ICT)</option>
                          <option>Any / Flexible — open to any slot</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div className="form-group">
                        <label htmlFor="wl-level">Your Current Thai Level *</label>
                        <select id="wl-level" required value={level} onChange={e => setLevel(e.target.value)}>
                          <option value="" disabled>Select your level…</option>
                          <option>Complete Beginner — no Thai at all</option>
                          <option>Absolute Beginner — know a few words/phrases</option>
                          <option>Elementary — can say basic sentences</option>
                          <option>Pre-Intermediate — can hold simple conversations</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="wl-tz">Your Time Zone *</label>
                        <input type="text" id="wl-tz" placeholder="e.g. Germany (CET), New York (EST), Sydney (AEST)" required value={tz} onChange={e => setTz(e.target.value)} />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="wl-why">Why do you want to learn Thai? *</label>
                      <textarea id="wl-why" placeholder="e.g. My partner is Thai and I want to speak with their family. / I'm moving to Bangkok. / I love Thai culture and want to connect more deeply…" required value={why} onChange={e => setWhy(e.target.value)} style={{ minHeight: '100px' }} />
                    </div>

                    <div className="form-group">
                      <label htmlFor="wl-goals">What are your learning goals? *</label>
                      <textarea id="wl-goals" placeholder="e.g. Hold basic conversations within 3 months. / Read Thai menus and signs. / Be fluent enough to work in Thailand…" required value={goals} onChange={e => setGoals(e.target.value)} style={{ minHeight: '100px' }} />
                    </div>

                    <div className="form-group">
                      <label htmlFor="wl-found">How did you find Kru Mind? *</label>
                      <select id="wl-found" required value={found} onChange={e => setFound(e.target.value)}>
                        <option value="" disabled>Select one…</option>
                        <option>Google search</option>
                        <option>YouTube</option>
                        <option>Instagram</option>
                        <option>Facebook</option>
                        <option>Friend or family recommendation</option>
                        <option>Thai language forum or community</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="wl-notes">Anything else for Kru Mind? <span style={{ color: 'var(--muted)', fontWeight: 400 }}>(optional)</span></label>
                      <textarea id="wl-notes" placeholder="Questions, previous experience, learning challenges, or anything else you'd like to share…" value={notes} onChange={e => setNotes(e.target.value)} style={{ minHeight: '100px' }} />
                    </div>

                    <button type="submit" style={{ padding: '16px 40px', background: 'var(--yellow)', color: 'var(--white)', border: 'none', borderRadius: '100px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '16px', fontWeight: 700, cursor: 'pointer', transition: 'all .25s', width: '100%', letterSpacing: '.3px' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'var(--yellow-dk)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(200,152,31,.35)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'var(--yellow)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                      Request My Spot →
                    </button>
                    <p style={{ fontSize: '13px', color: 'var(--muted)', textAlign: 'center', lineHeight: '1.6', marginTop: '4px' }}>
                      By submitting this form you agree to be contacted at the email address above. No spam — only updates about your class from Kru Mind.
                    </p>

                  </form>
                ) : (
                  <div style={{ textAlign: 'center', padding: '48px 32px' }}>
                    <div style={{ width: '80px', height: '80px', background: '#e8faf0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', margin: '0 auto 24px' }}>🎉</div>
                    <h3 style={{ fontSize: '24px', color: 'var(--dark)', marginBottom: '12px' }}>You&apos;re on the list!</h3>
                    <p style={{ fontSize: '16px', color: 'var(--mid)', lineHeight: '1.7', maxWidth: '420px', margin: '0 auto' }}>Thank you for signing up. Kru Mind will be in touch personally as soon as your class group opens. Keep an eye on your inbox — and check your spam folder just in case!</p>
                  </div>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad bg-white">
        <div className="container">
          <FadeIn>
            <div className="text-center">
              <p className="eyebrow">Common Questions</p>
              <h2 className="section-title">FAQ</h2>
              <div className="accent-bar center"><span className="accent-line"></span><span className="accent-dot"></span></div>
            </div>
          </FadeIn>

          <FadeIn>
            <div style={{ maxWidth: '760px', margin: '48px auto 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {FAQS.map(({ q, a }, i) => (
                <div key={q} style={{ borderRadius: '12px', overflow: 'hidden', border: '1.5px solid var(--border)' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '20px 24px', background: openFaq === i ? 'var(--bg)' : 'var(--white)', cursor: 'pointer', fontSize: '16px', fontWeight: 600, color: 'var(--dark)', userSelect: 'none', transition: 'background .2s', width: '100%', textAlign: 'left', border: 'none', fontFamily: 'inherit' }}>
                    {q}
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0, transition: 'transform .3s', transform: openFaq === i ? 'rotate(180deg)' : 'none', color: 'var(--yellow)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div style={{ background: 'var(--bg)', fontSize: '15px', color: 'var(--mid)', lineHeight: '1.75', padding: '20px 24px' }}>
                      {a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact strip */}
      <section style={{ background: 'var(--dark)', padding: '56px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px', flexWrap: 'wrap' }}>
            <div>
              <p className="eyebrow" style={{ color: 'var(--yellow-dk)' }}>Still Have Questions?</p>
              <h2 style={{ color: 'var(--white)', fontSize: '26px', marginBottom: '8px' }}>Reach Out to Kru Mind Directly</h2>
              <p style={{ color: 'rgba(255,255,255,.65)', fontSize: '15px' }}>Happy to answer questions about the classes, curriculum, or anything else before you sign up.</p>
            </div>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a href="https://www.facebook.com/learnthaiwithmind/" target="_blank" rel="noopener noreferrer" className="btn btn-outline-white" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                Message on Facebook
              </a>
              <Link href="/contact" className="btn btn-outline-white" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                Send a Message
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hidden iframe + form for CORS-free Google Apps Script submission */}
      <iframe name="wl-hidden-frame" style={{ display: 'none' }} aria-hidden={true} />
      <form ref={hiddenFormRef} action={APPS_SCRIPT_URL} method="POST" target="wl-hidden-frame" style={{ display: 'none' }}>
        <input type="hidden" name="type" value="waitlist" />
        <input type="hidden" name="name" value={name} />
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="phone" value={phone} />
        <input type="hidden" name="cls" value={cls} />
        <input type="hidden" name="level" value={level} />
        <input type="hidden" name="tz" value={tz} />
        <input type="hidden" name="why" value={why} />
        <input type="hidden" name="goals" value={goals} />
        <input type="hidden" name="howFound" value={found} />
        <input type="hidden" name="notes" value={notes} />
      </form>
    </>
  );
}
