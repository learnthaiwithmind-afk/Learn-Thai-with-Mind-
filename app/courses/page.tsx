'use client';
import { useState } from 'react';
import Link from 'next/link';
import FadeIn from '../../components/FadeIn';

export default function CoursesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: 'Do I need any Thai knowledge to start?', a: 'Not at all! The "Thai for Complete Beginners" course assumes zero knowledge. You\'ll start from scratch and build a solid foundation step by step. If you already have some basics, the Conversational Thai Mastery course is a great place to begin.' },
    { q: 'How long does each course take to complete?', a: 'It depends on your pace, but most students complete individual courses within 6–12 weeks studying 30–60 minutes per day. Because you have lifetime access, there\'s no rush — you can go at the speed that works best for you.' },
    { q: 'What format are the lessons?', a: 'All lessons are professional video recordings taught by Mind directly. They\'re clear, engaging, and include on-screen text, examples, and practice exercises. Courses also include downloadable PDFs, audio files, and vocabulary lists you can use offline.' },
    { q: 'Is there a money-back guarantee?', a: 'Yes — all courses come with a 30-day satisfaction guarantee. If you genuinely put in the effort and feel the course hasn\'t delivered, simply get in touch within 30 days for a full refund. No difficult questions asked.' },
    { q: 'Can I combine a course with private classes?', a: 'Absolutely — and many students do this for the best results. The courses give you structured knowledge and vocabulary, while private sessions with Mind let you practise speaking, get feedback on your pronunciation, and ask questions in real time. The combination is highly effective.' },
    { q: 'Do courses include speaking practice?', a: 'The courses include speaking prompts, dialogue exercises, and pronunciation guides. For live speaking practice with direct feedback, private classes are the best option — you can book them alongside any course at any time.' },
  ];

  return (
    <>
      <section className="page-hero">
        <div className="container text-center">
          <p className="eyebrow" style={{ marginBottom: '12px' }}>Online Courses</p>
          <h1 style={{ color: 'var(--white)', fontSize: 'clamp(36px,5vw,58px)', marginBottom: '16px' }}>Master Thai at Your Own Pace</h1>
          <div className="accent-bar center" style={{ marginTop: '20px' }}><span className="accent-line"></span><span className="accent-dot"></span></div>
          <p style={{ color: 'rgba(255,255,255,.65)', fontSize: '18px', maxWidth: '580px', margin: '24px auto 0', lineHeight: '1.7' }}>
            Premium video courses crafted for real results. Choose your level, invest in yourself, and start speaking Thai with confidence — from anywhere in the world.
          </p>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container">

          {/* Course 1: Beginners */}
          <FadeIn>
            <div className="course-detail-card" style={{ marginBottom: '40px' }}>
              <div className="cdc-header cdc-header-grid">
                <div>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '12px', alignItems: 'center' }}>
                    <span className="badge badge-yellow">⭐ Bestseller</span>
                    <span className="level-badge" style={{ background: '#e8f4fd', color: '#1a5f8a' }}>Absolute Beginner</span>
                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>40+ lessons · Self-paced · Lifetime access</span>
                  </div>
                  <h2 style={{ fontSize: 'clamp(22px,3vw,30px)', marginBottom: '12px', color: 'var(--white)' }}>Thai for Complete Beginners</h2>
                  <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.7', maxWidth: '640px' }}>The perfect starting point for anyone who has never studied Thai before. You&apos;ll go from knowing absolutely nothing to holding basic conversations, understanding Thai tones, and reading your first Thai words — all in a structured, stress-free environment.</p>
                </div>
                <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '16px', padding: '28px 32px', textAlign: 'center', minWidth: '200px' }}>
                  <div style={{ fontSize: '14px', color: 'var(--muted)', textDecoration: 'line-through', marginBottom: '4px' }}>Was $130</div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '48px', fontWeight: 800, color: 'var(--dark)', lineHeight: 1 }}><sup style={{ fontSize: '22px', verticalAlign: 'super' }}>$</sup>97</div>
                  <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>One-time payment</div>
                  <a href="#" className="btn btn-yellow" style={{ width: '100%', marginTop: '16px', justifyContent: 'center' }}>🔒 Enrol Now</a>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '12px' }}>🔒 30-day money-back guarantee</div>
                </div>
              </div>
              <div className="cdc-body-grid">
                <div>
                  <div style={{ fontFamily: 'sans-serif', fontSize: '13px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '16px' }}>What&apos;s Included</div>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {['40+ high-quality video lessons covering speaking, listening & reading basics','Complete Thai alphabet (consonants, vowels, tone marks)','500+ essential vocabulary words with audio','Tone system mastery — the key to sounding natural','Downloadable PDF workbook with exercises','Common phrases for travel, daily life & socialising','Lifetime access + all future updates','Access on mobile, tablet & desktop'].map(item => (
                      <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '15px', color: 'var(--mid)', marginBottom: '12px', lineHeight: '1.5' }}>
                        <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#e8faf0', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, flexShrink: 0, marginTop: '1px' }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div style={{ fontFamily: 'sans-serif', fontSize: '13px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '16px' }}>Course Curriculum (Sample)</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[['Welcome & Course Overview','Free preview'],['Understanding Thai Tones','22 min'],['Greetings & Basic Phrases','18 min'],['Numbers 1–100','24 min'],['Ordering Food Like a Local','31 min'],['Thai Consonants (Class 1–3)','45 min'],['Navigating Bangkok by Tuk-tuk','20 min']].map(([title, dur]) => (
                      <div key={title} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: '8px', background: 'var(--bg)', fontSize: '14px', color: 'var(--mid)' }}>
                        <span><span style={{ color: 'var(--yellow)', marginRight: '10px' }}>▶</span>{title}</span>
                        <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{dur}</span>
                      </div>
                    ))}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: '8px', background: 'var(--yellow-lt)', color: '#7a5c00', fontWeight: 600, fontSize: '14px' }}>
                      <span>+ 33 more lessons</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Course 2: Conversational */}
          <FadeIn>
            <div className="course-detail-card" style={{ marginBottom: '40px', borderColor: 'var(--yellow)', boxShadow: '0 0 0 2px var(--yellow)' }}>
              <div style={{ background: 'linear-gradient(90deg,var(--yellow),var(--yellow-dk))', height: '6px' }}></div>
              <div className="cdc-header cdc-header-grid">
                <div>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '12px', alignItems: 'center' }}>
                    <span className="badge badge-blue">🔥 Most Popular</span>
                    <span className="level-badge" style={{ background: '#fff3cd', color: '#7a5c00' }}>Intermediate</span>
                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>60+ lessons · Self-paced · Monthly live Q&amp;A</span>
                  </div>
                  <h2 style={{ fontSize: 'clamp(22px,3vw,30px)', marginBottom: '12px', color: 'var(--white)' }}>Conversational Thai Mastery</h2>
                  <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.7', maxWidth: '640px' }}>The course that students describe as &ldquo;life-changing.&rdquo; If you&apos;ve got the basics and want to break through to real fluency — this is it. You&apos;ll cover the everyday topics Thais actually talk about, learn natural slang, understand cultural nuances, and develop the instinct to express yourself freely without mentally translating every word.</p>
                </div>
                <div style={{ background: 'var(--bg)', border: '1px solid var(--yellow)', borderRadius: '16px', padding: '28px 32px', textAlign: 'center', minWidth: '200px' }}>
                  <div style={{ fontSize: '16px', color: 'var(--muted)', textDecoration: 'line-through', marginBottom: '4px' }}>Was $195</div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '48px', fontWeight: 800, color: 'var(--dark)', lineHeight: 1 }}><sup style={{ fontSize: '22px', verticalAlign: 'super' }}>$</sup>147</div>
                  <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>One-time payment</div>
                  <a href="#" className="btn btn-yellow" style={{ width: '100%', marginTop: '16px', justifyContent: 'center' }}>🔒 Enrol Now</a>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '12px' }}>🔒 30-day money-back guarantee</div>
                </div>
              </div>
              <div className="cdc-body-grid">
                <div>
                  <div style={{ fontFamily: 'sans-serif', fontSize: '13px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '16px' }}>What&apos;s Included</div>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {['60+ in-depth video lessons on real Thai conversation','Essential slang, idioms & everyday expressions','Deep cultural lessons — festivals, etiquette, humour','Role-play scenarios: shopping, dating, negotiating, socialising','Monthly live group Q&A sessions with Mind','Vocabulary builder: 1,200+ words with example sentences','Listening comprehension exercises with native audio','Lifetime access + all future updates'].map(item => (
                      <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '15px', color: 'var(--mid)', marginBottom: '12px', lineHeight: '1.5' }}>
                        <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#e8faf0', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, flexShrink: 0, marginTop: '1px' }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div style={{ fontFamily: 'sans-serif', fontSize: '13px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '16px' }}>Course Curriculum (Sample)</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[['Module 1: Thai Fluency Mindset','Free preview'],['Talking About Daily Life','35 min'],['Thai Particles & Politeness','28 min'],['Emotions, Opinions & Reactions','40 min'],['Thai Humour & Sanook Culture','26 min'],['Bargaining at Chatuchak Market','32 min'],['Thai Relationship Language','38 min']].map(([title, dur]) => (
                      <div key={title} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: '8px', background: 'var(--bg)', fontSize: '14px', color: 'var(--mid)' }}>
                        <span><span style={{ color: 'var(--yellow)', marginRight: '10px' }}>▶</span>{title}</span>
                        <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{dur}</span>
                      </div>
                    ))}
                    <div style={{ display: 'flex', padding: '12px 16px', borderRadius: '8px', background: 'var(--yellow-lt)', color: '#7a5c00', fontWeight: 600, fontSize: '14px' }}>
                      + 53 more lessons
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Course 3: R&W */}
          <FadeIn>
            <div className="course-detail-card" style={{ marginBottom: '40px' }}>
              <div className="cdc-header cdc-header-grid">
                <div>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '12px', alignItems: 'center' }}>
                    <span className="badge badge-green">✨ New</span>
                    <span className="level-badge" style={{ background: '#e8f4fd', color: '#1a5f8a' }}>Beginner – Intermediate</span>
                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>50+ lessons · Self-paced · Lifetime access</span>
                  </div>
                  <h2 style={{ fontSize: 'clamp(22px,3vw,30px)', marginBottom: '12px', color: 'var(--white)' }}>Thai Reading &amp; Writing</h2>
                  <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.7', maxWidth: '640px' }}>Unlock the beautiful, ancient Thai script. Most learners avoid it — but those who learn it progress three times faster and earn instant respect from Thai people. Mind demystifies every consonant, vowel, and tone mark with the clearest, most systematic approach available online.</p>
                </div>
                <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '16px', padding: '28px 32px', textAlign: 'center', minWidth: '200px' }}>
                  <div style={{ fontSize: '16px', color: 'var(--muted)', textDecoration: 'line-through', marginBottom: '4px' }}>Was $165</div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '48px', fontWeight: 800, color: 'var(--dark)', lineHeight: 1 }}><sup style={{ fontSize: '22px', verticalAlign: 'super' }}>$</sup>127</div>
                  <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>One-time payment</div>
                  <a href="#" className="btn btn-yellow" style={{ width: '100%', marginTop: '16px', justifyContent: 'center' }}>🔒 Enrol Now</a>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '12px' }}>🔒 30-day money-back guarantee</div>
                </div>
              </div>
              <div className="cdc-body-grid">
                <div>
                  <div style={{ fontFamily: 'sans-serif', fontSize: '13px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '16px' }}>What&apos;s Included</div>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {['All 44 Thai consonants with memory techniques','All vowel forms — short, long & complex','Tone rules for all three consonant classes','Special characters: ไม้ไต่คู้, ไม้ไต่, ไม้โท & more','Reading practice: signs, menus, messages, short texts','Writing drills with printable practice sheets','50+ structured video lessons with clear close-up demonstrations','Lifetime access + all future updates'].map(item => (
                      <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '15px', color: 'var(--mid)', marginBottom: '12px', lineHeight: '1.5' }}>
                        <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#e8faf0', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, flexShrink: 0, marginTop: '1px' }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div style={{ fontFamily: 'sans-serif', fontSize: '13px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '16px' }}>Course Curriculum (Sample)</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[['Why Learn Thai Script? (Overview)','Free preview'],['Mid Class Consonants (ก–ง)','30 min'],['High Class Consonants (ข–ห)','34 min'],['Low Class Consonants (ค–ฮ)','38 min'],['Short & Long Vowels','42 min'],['Reading Your First Real Signs','25 min'],['Writing Practice: Stroke Order','50 min']].map(([title, dur]) => (
                      <div key={title} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: '8px', background: 'var(--bg)', fontSize: '14px', color: 'var(--mid)' }}>
                        <span><span style={{ color: 'var(--yellow)', marginRight: '10px' }}>▶</span>{title}</span>
                        <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{dur}</span>
                      </div>
                    ))}
                    <div style={{ display: 'flex', padding: '12px 16px', borderRadius: '8px', background: 'var(--yellow-lt)', color: '#7a5c00', fontWeight: 600, fontSize: '14px' }}>
                      + 43 more lessons
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Course 4: Advanced */}
          <FadeIn>
            <div className="course-detail-card" style={{ marginBottom: '40px' }}>
              <div className="cdc-header cdc-header-grid">
                <div>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '12px', alignItems: 'center' }}>
                    <span className="badge badge-purple">💎 Advanced</span>
                    <span className="level-badge" style={{ background: '#f3e8ff', color: '#6b21a8' }}>Upper Intermediate – Advanced</span>
                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>70+ lessons · Self-paced · Lifetime access</span>
                  </div>
                  <h2 style={{ fontSize: 'clamp(22px,3vw,30px)', marginBottom: '12px', color: 'var(--white)' }}>Advanced Thai Fluency</h2>
                  <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.7', maxWidth: '640px' }}>For learners who want to think in Thai. This course takes you into complex grammar, formal and informal registers, Thai literature references, proverbs, and the subtle art of speaking Thai in a way that leaves locals genuinely impressed.</p>
                </div>
                <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '16px', padding: '28px 32px', textAlign: 'center', minWidth: '200px' }}>
                  <div style={{ fontSize: '16px', color: 'var(--muted)', textDecoration: 'line-through', marginBottom: '4px' }}>Was $250</div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '48px', fontWeight: 800, color: 'var(--dark)', lineHeight: 1 }}><sup style={{ fontSize: '22px', verticalAlign: 'super' }}>$</sup>197</div>
                  <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>One-time payment</div>
                  <a href="#" className="btn btn-yellow" style={{ width: '100%', marginTop: '16px', justifyContent: 'center' }}>🔒 Enrol Now</a>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '12px' }}>🔒 30-day money-back guarantee</div>
                </div>
              </div>
              <div className="cdc-body-grid">
                <div>
                  <div style={{ fontFamily: 'sans-serif', fontSize: '13px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '16px' }}>What&apos;s Included</div>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {['70+ advanced lessons on grammar, register & expression','Formal vs informal speech: knowing when to switch','Thai proverbs, idioms & literary references','Business Thai & professional communication','Regional dialects: overview of Northern, Southern & Isaan Thai','Complex sentence structures & grammar mastery','Authentic listening materials: TV shows, songs & podcasts guide','Lifetime access + all future updates'].map(item => (
                      <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '15px', color: 'var(--mid)', marginBottom: '12px', lineHeight: '1.5' }}>
                        <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#e8faf0', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, flexShrink: 0, marginTop: '1px' }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div style={{ fontFamily: 'sans-serif', fontSize: '13px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '16px' }}>Course Curriculum (Sample)</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[['Advanced Thai Grammar Overview','Free preview'],['Formal vs Colloquial Registers','40 min'],['Thai Proverbs & Their Meanings','35 min'],['Mastering Relative Clauses','28 min'],['Business Thai Essentials','50 min'],['Intro to Northern Thai (Kham Mueang)','30 min'],['Decoding Thai TV & Music','45 min']].map(([title, dur]) => (
                      <div key={title} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: '8px', background: 'var(--bg)', fontSize: '14px', color: 'var(--mid)' }}>
                        <span><span style={{ color: 'var(--yellow)', marginRight: '10px' }}>▶</span>{title}</span>
                        <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{dur}</span>
                      </div>
                    ))}
                    <div style={{ display: 'flex', padding: '12px 16px', borderRadius: '8px', background: 'var(--yellow-lt)', color: '#7a5c00', fontWeight: 600, fontSize: '14px' }}>
                      + 63 more lessons
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Course 5: Bundle */}
          <FadeIn>
            <div className="course-detail-card" style={{ marginBottom: '40px', background: 'linear-gradient(160deg,var(--dark) 0%,#1e3a5f 100%)', borderColor: 'var(--yellow)' }}>
              <div style={{ background: 'linear-gradient(90deg,var(--yellow),var(--yellow-dk),var(--yellow))', height: '6px' }}></div>
              <div className="cdc-header" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '32px', padding: '40px 48px', alignItems: 'start', borderBottom: '1px solid rgba(255,255,255,.1)' }}>
                <div>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '12px', alignItems: 'center' }}>
                    <span className="badge badge-bundle">✦ Best Value</span>
                    <span className="level-badge" style={{ background: 'rgba(251,191,36,.2)', color: 'var(--yellow-dk)' }}>All Levels</span>
                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,.5)' }}>All 4 courses · 220+ lessons · Save $171</span>
                  </div>
                  <h2 style={{ fontSize: 'clamp(22px,3vw,30px)', marginBottom: '12px', color: 'var(--white)' }}>The Complete Thai Mastery Bundle</h2>
                  <p style={{ fontSize: '16px', color: 'rgba(255,255,255,.7)', lineHeight: '1.7', maxWidth: '640px' }}>The ultimate investment for anyone serious about Thai. Get all four courses — Beginners, Conversational, Reading &amp; Writing, and Advanced — at a significant saving. This is the complete roadmap from zero to fluency.</p>
                </div>
                <div style={{ background: 'rgba(255,255,255,.06)', border: '1px solid var(--yellow)', borderRadius: '16px', padding: '28px 32px', textAlign: 'center', minWidth: '200px' }}>
                  <div style={{ fontSize: '16px', color: 'rgba(255,255,255,.5)', textDecoration: 'line-through', marginBottom: '4px' }}>Was $568</div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '48px', fontWeight: 800, color: 'var(--yellow)', lineHeight: 1 }}><sup style={{ fontSize: '22px', verticalAlign: 'super' }}>$</sup>397</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,.5)', marginTop: '4px' }}>One-time payment · Save $171</div>
                  <a href="#" className="btn btn-yellow" style={{ width: '100%', marginTop: '16px', justifyContent: 'center' }}>🔒 Get the Bundle</a>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,.4)', marginTop: '12px' }}>🔒 30-day money-back guarantee</div>
                </div>
              </div>
              <div style={{ padding: '40px 48px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '16px' }}>
                  {[['Thai for Complete Beginners','40+ lessons · Beginner'],['Conversational Thai Mastery','60+ lessons · Intermediate'],['Thai Reading & Writing','50+ lessons · Beginner – Int.'],['Advanced Thai Fluency','70+ lessons · Advanced']].map(([name, desc]) => (
                    <div key={name} style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(251,191,36,.2)', borderRadius: '12px', padding: '20px' }}>
                      <div style={{ fontSize: '13px', color: 'var(--yellow)', fontWeight: 700, marginBottom: '6px' }}>INCLUDED</div>
                      <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--white)', marginBottom: '4px' }}>{name}</div>
                      <div style={{ fontSize: '13px', color: 'rgba(255,255,255,.5)' }}>{desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* FAQ */}
          <div className="faq-section">
            <div className="text-center" style={{ marginBottom: '48px' }}>
              <FadeIn><p className="eyebrow">Common Questions</p></FadeIn>
              <FadeIn><h2 className="section-title">Frequently Asked Questions</h2></FadeIn>
              <FadeIn><div className="accent-bar center"><span className="accent-line"></span><span className="accent-dot"></span></div></FadeIn>
            </div>
            <div style={{ maxWidth: '760px', margin: '0 auto' }}>
              {faqs.map((faq, i) => (
                <FadeIn key={i}>
                  <div className="faq-item">
                    <button
                      className={`faq-question${openFaq === i ? ' open' : ''}`}
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      style={{ width: '100%', textAlign: 'left', padding: '20px 24px', background: 'var(--white)', border: 'none', cursor: 'pointer', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '16px', fontWeight: 600, color: 'var(--dark)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                      {faq.q}
                      <span style={{ fontSize: '20px', color: 'var(--yellow)', transition: 'transform .3s', transform: openFaq === i ? 'rotate(180deg)' : 'none' }}>▾</span>
                    </button>
                    {openFaq === i && (
                      <div style={{ padding: '0 24px 20px', fontSize: '15px', color: 'var(--mid)', lineHeight: '1.7' }}>{faq.a}</div>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

        </div>
      </section>

      <section className="section-pad bg-blue-gradient">
        <FadeIn className="container text-center">
          <p className="eyebrow" style={{ color: 'var(--yellow)' }}>Not Sure Which to Choose?</p>
          <h2 className="section-title" style={{ color: 'var(--white)', marginBottom: '16px' }}>Want to Learn in a Live Group?</h2>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,.7)', maxWidth: '520px', margin: '0 auto 36px', lineHeight: '1.7' }}>Complement your courses with live group classes — 90 minutes, twice a week, max 10 students, via Zoom. Join the waiting list and study with Kru Mind in real time.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/private-class#waitlist" className="btn btn-yellow btn-lg">Join Group Classes</Link>
            <Link href="/#about" className="btn btn-outline-white btn-lg">Meet Kru Mind</Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
