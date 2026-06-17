'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import FadeIn from '../../components/FadeIn';

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby_kV8Iuxo0hdwk7iow5_CqJAQEPua2LVFNypkUeIIEX_qtJJDhzuTsnkwcicZCsm0/exec';

export default function FeedbackPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cls, setCls] = useState('');
  const [country, setCountry] = useState('');
  const [rating, setRating] = useState('');
  const [enjoyed, setEnjoyed] = useState('');
  const [suggest, setSuggest] = useState('');
  const [testimonial, setTestimonial] = useState('');
  const [shareOk, setShareOk] = useState(false);
  const hiddenFormRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !cls || !rating || !enjoyed.trim()) {
      alert('Please fill in all required fields: name, email, class, rating, and what you enjoyed.');
      return;
    }
    if (hiddenFormRef.current) hiddenFormRef.current.submit();
    setSubmitted(true);
  }

  const STARS = ['5', '4', '3', '2', '1'];

  return (
    <>
      <section className="page-hero">
        <div className="container text-center">
          <p className="eyebrow" style={{ marginBottom: '12px' }}>After Your Class</p>
          <h1 style={{ color: 'var(--white)', fontSize: 'clamp(32px,4.5vw,52px)', marginBottom: '16px' }}>How Was Your Class?</h1>
          <div className="accent-bar center" style={{ marginTop: '20px' }}><span className="accent-line"></span><span className="accent-dot"></span></div>
          <p style={{ color: 'rgba(255,255,255,.65)', fontSize: '17px', maxWidth: '520px', margin: '20px auto 0', lineHeight: '1.7' }}>
            Your honest feedback helps Kru Mind improve every lesson. It takes less than 3 minutes — and if you&apos;d like to share a review, she&apos;d love to feature it on the website.
          </p>
        </div>
      </section>

      <section className="section-pad" style={{ background: 'var(--bg)' }}>
        <div className="container">

          <FadeIn>
            <div style={{ background: 'var(--white)', borderRadius: '24px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)', overflow: 'hidden', maxWidth: '760px', margin: '0 auto' }}>

              {/* Header */}
              <div style={{ background: 'var(--dark)', padding: '40px 52px', borderBottom: '1px solid rgba(200,152,31,.2)' }}>
                <span style={{ fontFamily: "'Noto Sans Thai', sans-serif", fontSize: '32px', color: 'var(--yellow)', marginBottom: '8px', display: 'block' }}>ขอบคุณมากนะคะ</span>
                <h2 style={{ color: 'var(--white)', fontSize: '24px', marginBottom: '6px' }}>Thank You for Learning with Mind!</h2>
                <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '15px', lineHeight: '1.6' }}>Your feedback is read personally by Kru Mind. It helps her make each class better, and hearing your progress makes her day. Please be as honest as you like — both the good and the &ldquo;could be better&rdquo;!</p>
              </div>

              {/* Body */}
              <div style={{ padding: '44px 52px' }}>
                {!submitted ? (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div className="form-group">
                        <label htmlFor="fb-name">Your Name *</label>
                        <input type="text" id="fb-name" placeholder="e.g. Sarah Johnson" required value={name} onChange={e => setName(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="fb-email">Your Email *</label>
                        <input type="email" id="fb-email" placeholder="your@email.com" required value={email} onChange={e => setEmail(e.target.value)} />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div className="form-group">
                        <label htmlFor="fb-class">Which class did you attend? *</label>
                        <select id="fb-class" required value={cls} onChange={e => setCls(e.target.value)}>
                          <option value="" disabled>Select a class…</option>
                          <option value="Speaking Thai — Morning (Mon &amp; Thu · 10:00–11:30 ICT)">Speaking Thai — Morning (10:00–11:30 ICT)</option>
                          <option value="Reading &amp; Writing — Midday (Mon &amp; Thu · 12:30–14:00 ICT)">Reading &amp; Writing — Midday (12:30–14:00 ICT)</option>
                          <option value="Speaking Thai — Evening (Mon &amp; Thu · 20:00–21:30 ICT)">Speaking Thai — Evening (20:00–21:30 ICT)</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="fb-country">Your Country <span style={{ color: 'var(--muted)', fontWeight: 400 }}>(optional)</span></label>
                        <input type="text" id="fb-country" placeholder="e.g. Germany, USA, Australia…" value={country} onChange={e => setCountry(e.target.value)} />
                      </div>
                    </div>

                    {/* Star rating */}
                    <div className="form-group">
                      <label>Overall rating *</label>
                      <div style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'flex-end', gap: '4px', marginTop: '4px' }}>
                        {STARS.map(s => (
                          <label key={s} htmlFor={`star${s}`} title={`${s} stars`}
                            onClick={() => setRating(s)}
                            style={{ fontSize: '40px', lineHeight: 1, cursor: 'pointer', transition: 'transform .15s',
                              color: rating && parseInt(s) <= parseInt(rating) ? 'var(--yellow)' : 'var(--border)',
                              transform: rating === s ? 'scale(1.15)' : 'none',
                            }}>★</label>
                        ))}
                      </div>
                      <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '6px' }}>
                        {rating ? `${rating} star${rating === '1' ? '' : 's'} — ` + ['', 'Needs improvement', 'Fair', 'Good', 'Very good', 'Excellent!'][parseInt(rating)] : 'Click a star to rate your experience'}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="fb-enjoyed">What did you enjoy most about the class? *</label>
                      <textarea id="fb-enjoyed" placeholder="e.g. Kru Mind's explanations are so clear. I loved the pronunciation drills. The small group made me feel comfortable to speak…" required value={enjoyed} onChange={e => setEnjoyed(e.target.value)} style={{ minHeight: '110px' }} />
                    </div>

                    <div className="form-group">
                      <label htmlFor="fb-suggest">Any suggestions for improvement? <span style={{ color: 'var(--muted)', fontWeight: 400 }}>(optional)</span></label>
                      <textarea id="fb-suggest" placeholder="e.g. I'd love more time for Q&A. Could we practise more dialogues? I'd like handout materials after class…" value={suggest} onChange={e => setSuggest(e.target.value)} style={{ minHeight: '110px' }} />
                    </div>

                    <div className="form-group">
                      <label htmlFor="fb-testimonial">Would you like to share a testimonial for the website? <span style={{ color: 'var(--muted)', fontWeight: 400 }}>(optional)</span></label>
                      <textarea id="fb-testimonial" placeholder={`Write a short review in your own words — Kru Mind may feature it on the website (with your permission below). e.g. "Within 4 weeks I could read Thai menus and greet locals. Kru Mind makes every class fun and easy to follow…"`} value={testimonial} onChange={e => setTestimonial(e.target.value)} style={{ minHeight: '110px' }} />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', background: 'var(--yellow-lt)', border: '1.5px solid rgba(200,152,31,.3)', borderRadius: '12px' }}>
                      <input type="checkbox" id="fb-share" checked={shareOk} onChange={e => setShareOk(e.target.checked)}
                        style={{ width: '20px', height: '20px', accentColor: 'var(--yellow)', cursor: 'pointer', flexShrink: 0 }} />
                      <label htmlFor="fb-share" style={{ fontSize: '14px', fontWeight: 600, color: '#7a5c00', cursor: 'pointer', lineHeight: '1.5' }}>
                        ✅ Yes, Kru Mind may use my testimonial on the Learn Thai with Mind website. I&apos;m happy for my name and country to be shown alongside my review.
                      </label>
                    </div>

                    <button type="submit" style={{ padding: '16px 40px', background: 'var(--yellow)', color: 'var(--white)', border: 'none', borderRadius: '100px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '16px', fontWeight: 700, cursor: 'pointer', transition: 'all .25s', width: '100%', letterSpacing: '.3px' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'var(--yellow-dk)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'var(--yellow)'; e.currentTarget.style.transform = 'none'; }}>
                      Send My Feedback →
                    </button>
                    <p style={{ fontSize: '13px', color: 'var(--muted)', textAlign: 'center', lineHeight: '1.6' }}>
                      Your feedback goes directly to Kru Mind&apos;s inbox. Testimonials are only published with your permission above.
                    </p>

                  </form>
                ) : (
                  <div style={{ textAlign: 'center', padding: '60px 40px' }}>
                    <div style={{ width: '88px', height: '88px', background: 'linear-gradient(135deg, rgba(200,152,31,.15), rgba(200,152,31,.05))', border: '2px solid var(--yellow)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', margin: '0 auto 28px' }}>🙏</div>
                    <h3 style={{ fontSize: '26px', color: 'var(--dark)', marginBottom: '12px' }}>ขอบคุณมากนะคะ — Thank you so much!</h3>
                    <p style={{ fontSize: '16px', color: 'var(--mid)', lineHeight: '1.75', maxWidth: '440px', margin: '0 auto 28px' }}>Your feedback has been sent to Kru Mind. She reads every response personally and truly values your honest thoughts. See you in the next class!</p>
                    <Link href="/private-class" className="btn btn-yellow">Back to Group Classes</Link>
                  </div>
                )}
              </div>
            </div>
          </FadeIn>

          {/* Privacy note */}
          <FadeIn>
            <div style={{ background: 'var(--bg)', border: '1.5px solid var(--border)', borderRadius: '14px', padding: '24px 28px', marginTop: '48px', display: 'flex', gap: '16px', alignItems: 'flex-start', maxWidth: '760px', margin: '48px auto 0' }}>
              <div style={{ fontSize: '26px', flexShrink: 0, marginTop: '2px' }}>🔒</div>
              <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.7', margin: 0 }}>
                <strong style={{ color: 'var(--dark)' }}>Your privacy matters.</strong> The information you share in this form is used only by Kru Mind to improve her classes and (with your explicit permission) to feature your testimonial on this website. Your email address is never shared with third parties. Testimonials are only published if you tick the permission checkbox above.
              </p>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* Hidden iframe + form for CORS-free Google Apps Script submission */}
      <iframe name="fb-hidden-frame" style={{ display: 'none' }} aria-hidden={true} />
      <form ref={hiddenFormRef} action={APPS_SCRIPT_URL} method="POST" target="fb-hidden-frame" style={{ display: 'none' }}>
        <input type="hidden" name="type" value="review" />
        <input type="hidden" name="name" value={name} />
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="cls" value={cls} />
        <input type="hidden" name="country" value={country} />
        <input type="hidden" name="rating" value={rating} />
        <input type="hidden" name="enjoyed" value={enjoyed} />
        <input type="hidden" name="suggestions" value={suggest} />
        <input type="hidden" name="testimonial" value={testimonial} />
        <input type="hidden" name="sharePermission" value={shareOk ? 'Yes' : 'No'} />
      </form>
    </>
  );
}
