'use client';
import Link from 'next/link';
import FadeIn from '../components/FadeIn';
import { useUser } from '@clerk/nextjs';

export default function HomePage() {
  const { isSignedIn } = useUser();
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-text">
              <div className="hero-kicker">✦ Thailand&apos;s Finest Online Thai School</div>
              <h1 className="hero-title">
                Speak Thai<br />
                <span className="hl">สวัสดี</span> with<br />
                Confidence
              </h1>
              <p className="hero-sub">
                Premium Thai language courses designed to take you from zero to fluent — with a teacher who makes every lesson engaging, practical, and unforgettable.
              </p>
              <div className="hero-actions">
                <Link href="/courses" className="btn btn-yellow btn-lg">Explore Courses</Link>
                {isSignedIn ? (
                  <Link href="/dashboard" className="btn btn-outline-white btn-lg">My Dashboard</Link>
                ) : (
                  <Link href="/sign-up" className="btn btn-outline-white btn-lg">Create Free Account</Link>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '24px' }}>
                <div style={{ display: 'flex' }}>
                  {['🇬🇧','🇺🇸','🇦🇺','🇩🇪','🇫🇷'].map(f => (
                    <span key={f} style={{ fontSize: '18px', marginRight: '-4px' }}>{f}</span>
                  ))}
                </div>
                <span style={{ fontSize: '14px', color: 'rgba(255,255,255,.7)', fontWeight: 500 }}>
                  Trusted by students from <strong style={{ color: 'var(--yellow)' }}>30+ countries</strong>
                </span>
              </div>
              <div className="hero-stats">
                <div className="hero-stat">
                  <div className="hero-stat-val">10+</div>
                  <div className="hero-stat-lbl">Years Teaching</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-val">★ 5.0</div>
                  <div className="hero-stat-lbl">Student Rating</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-val">All</div>
                  <div className="hero-stat-lbl">Levels Welcome</div>
                </div>
              </div>
            </div>

            <div className="hero-card-wrap">
              <div className="hero-teacher-card">
                <div className="htc-avatar">M</div>
                <div className="htc-name">Kru Mind</div>
                <div className="htc-role">Thai Language Expert · Chiang Mai 🇹🇭</div>
                <div className="htc-divider"></div>
                <div className="htc-row"><div className="htc-icon">🎓</div><span>10+ Years of Expert Teaching</span></div>
                <div className="htc-row"><div className="htc-icon">🌏</div><span>All Skills &amp; All Levels</span></div>
                <div className="htc-row"><div className="htc-icon">💬</div><span>Real Thai — Not Textbook Thai</span></div>
                <div className="htc-row"><div className="htc-icon">⭐</div><span>Fun, Engaging &amp; Results-Driven</span></div>
                <div className="htc-divider" style={{ marginTop: '12px' }}></div>
                <div className="hero-float-pill" style={{ position: 'static', transform: 'none', background: 'var(--yellow-50)', border: '1.5px solid var(--yellow)', boxShadow: 'none', marginTop: '4px', width: '100%', justifyContent: 'center' }}>
                  <div className="dot" style={{ background: 'var(--yellow)' }}></div>
                  <span style={{ color: 'var(--yellow-dk)', fontWeight: 600 }}>Now accepting group classes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="trust-bar">
        <div className="container trust-bar-inner">
          <div className="trust-item"><span>✦</span> All Skill Levels Welcome</div>
          <div className="trust-item"><span>✦</span> Native Thai Teacher</div>
          <div className="trust-item"><span>✦</span> Real Thai — Not Textbook Thai</div>
          <div className="trust-item"><span>✦</span> Lifetime Course Access</div>
          <div className="trust-item"><span>✦</span> 30-Day Satisfaction Guarantee</div>
        </div>
      </div>

      {/* ABOUT MIND */}
      <section className="section-pad bg-white" id="about">
        <div className="container">
          <div className="about-grid">
            <FadeIn>
              <div className="about-photo-frame">
                <div className="about-initial">M</div>
              </div>
              <div className="about-thai-badge">สวัสดี</div>
              <div className="about-exp-card">
                <div className="val">10+</div>
                <div className="lbl">Years of Experience</div>
              </div>
            </FadeIn>

            <FadeIn>
              <p className="eyebrow">Meet Your Teacher</p>
              <h2 className="section-title">Hi, I&apos;m Mind<span style={{ color: 'var(--yellow)' }}> — Wasina Rukvichai</span></h2>
              <div className="accent-bar" style={{ marginTop: '16px', marginBottom: '24px' }}>
                <div className="accent-line"></div><div className="accent-dot"></div>
              </div>
              <p style={{ color: 'var(--mid)', fontSize: '17px', lineHeight: '1.8', marginBottom: '20px' }}>
                I&apos;m a Thai language teacher based in <strong>Chiang Mai, Thailand</strong>, with over a decade of experience teaching students from all around the world. Everyone calls me <strong>Mind</strong> — and that&apos;s where the name comes from. My real passion is helping you understand Thai <em>by heart</em>: how the language truly works, how Thai people actually speak, and the culture behind every word.
              </p>
              <blockquote className="about-quote">
                &ldquo;I don&apos;t teach textbook Thai — I teach the Thai that Thais actually use every day. The language, the slang, the culture. That&apos;s what makes it real.&rdquo;
              </blockquote>
              <p style={{ color: 'var(--mid)', fontSize: '17px', lineHeight: '1.75', marginBottom: '24px' }}>
                I didn&apos;t graduate from a language field, but my passion for language has always driven me. I love finding new ways to explain things clearly so my students have a genuine &ldquo;aha!&rdquo; moment. Students always tell me that studying with me is both <strong>enjoyable and deeply knowledgeable</strong> — because I teach both the language and the culture together.
              </p>
              <div className="skill-chips">
                {['Speaking','Listening','Reading','Writing','Beginner → Advanced','Thai Culture','Tones & Pronunciation','Natural Thai'].map(s => (
                  <span key={s} className="chip">{s}</span>
                ))}
              </div>
              <div style={{ marginTop: '32px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/courses" className="btn btn-primary">See My Courses</Link>
                <Link href="/private-class" className="btn btn-outline">Group Classes</Link>
                <a href="https://www.youtube.com/channel/UCC2l2QhjI3CubcFvxBKPYdg" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  Watch on YouTube
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* WHY LEARN WITH MIND */}
      <section className="section-pad bg-cream">
        <div className="container text-center">
          <FadeIn><p className="eyebrow">Why Learners Worldwide Choose Mind</p></FadeIn>
          <FadeIn><h2 className="section-title">Master Thai on Your Terms —<br />Language, Culture &amp; Confidence</h2></FadeIn>
          <FadeIn><div className="accent-bar center"><div className="accent-line"></div><div className="accent-dot"></div><div className="accent-line"></div></div></FadeIn>
          <FadeIn><p className="section-sub">Learn Thai at your own pace, in your own style. From your very first word to fluent conversation — with the cultural understanding to truly connect with Thailand and its people.</p></FadeIn>

          <div className="features-grid" style={{ textAlign: 'left' }}>
            {[
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"/>,
                title: 'Real Thai, Not Textbook Thai',
                desc: "Mind teaches the Thai people actually speak — natural expressions, everyday slang, and the cultural nuance that makes language feel alive. You'll understand real conversations, not just scripted dialogues."
              },
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>,
                title: 'Your Pace, Your Style',
                desc: "Every learner is different — and that's celebrated here. Study on weekday mornings, weekend evenings, or a quiet Sunday. Rewatch, go slow, skip ahead. Your Thai journey runs on your schedule, not anyone else's."
              },
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"/>,
                title: 'All Levels, All Skills',
                desc: 'Never studied Thai before? Already conversational? There\'s a course for exactly where you are. Speaking, listening, reading, and writing — from your first สวัสดี to reading Thai signs with confidence.'
              },
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"/>,
                title: 'Culture, Etiquette & Respect',
                desc: "Language without culture is only half the picture. Learn when to wai, how to show respect, what kreng jai really means — and why it matters. Thais will feel your genuine understanding, and that opens every door."
              },
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"/>,
                title: 'Language + Culture Together',
                desc: 'Sanook. Kreng jai. Mai pen rai. Every Thai phrase carries a world of meaning. Mind weaves cultural insight through every lesson — so you don\'t just speak Thai, you truly understand Thailand.'
              },
              {
                icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0H3"/>,
                title: 'Study Anywhere, Anytime',
                desc: 'HD video lessons, PDF workbooks, and lifetime access — on any device. Study from your sofa, a café in Chiang Mai, or during your commute. Your Thai classroom travels with you, wherever you go.'
              },
            ].map(({ icon, title, desc }, i) => (
              <FadeIn key={i}>
                <div className="feature-card">
                  <div className="feature-icon-wrap">
                    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">{icon}</svg>
                  </div>
                  <h3 className="feature-title">{title}</h3>
                  <p className="feature-desc">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* THAILAND BANNER */}
      <section className="thai-banner" aria-label="Learn Thai with Mind — Thailand banner">
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="thai-banner-inner">
            <div className="thai-banner-rule"></div>
            <p className="thai-banner-eyebrow">เรียนภาษาไทย &nbsp;·&nbsp; Learn the Language of Thailand</p>
            <h2 className="thai-banner-title">
              Thailand is more than a destination —<br />
              <em>it&apos;s a language waiting to be spoken</em>
            </h2>
            <p className="thai-banner-sub">
              Unlock the heart of Thai culture through language.
              From your very first <span style={{ fontFamily: "'Noto Sans Thai', sans-serif", fontWeight: 600 }}>สวัสดี</span>
              {' '}to confident conversations with locals — Kru Mind will guide you every step of the way.
            </p>
            <div className="thai-banner-rule"></div>
            <div className="thai-banner-actions">
              <Link href="/courses" className="btn btn-yellow btn-lg">Explore Courses</Link>
              <Link href="/private-class#waitlist" className="btn btn-outline-white btn-lg">Join Group Classes</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="section-pad bg-white" id="courses">
        <div className="container">
          <div className="text-center">
            <FadeIn><p className="eyebrow">Online Courses</p></FadeIn>
            <FadeIn><h2 className="section-title">Start Learning Thai Today</h2></FadeIn>
            <FadeIn><div className="accent-bar center"><div className="accent-line"></div><div className="accent-dot"></div><div className="accent-line"></div></div></FadeIn>
            <FadeIn><p className="section-sub">Choose the course that matches your level and ambitions. All courses include lifetime access and are designed for independent learners worldwide.</p></FadeIn>
          </div>
          <div className="courses-grid">
            <FadeIn>
              <div className="course-card">
                <div className="course-stripe"></div>
                <div className="course-header"><span className="badge badge-yellow">⭐ Bestseller</span></div>
                <div className="course-body">
                  <div className="course-level">Absolute Beginner</div>
                  <h3 className="course-title">Thai for Complete Beginners</h3>
                  <p className="course-desc">Start from zero and build a rock-solid foundation. You&apos;ll learn to greet, introduce yourself, order food, navigate transport, and hold basic conversations — all with proper tone and pronunciation.</p>
                  <ul className="course-includes">
                    <li>40+ video lessons</li><li>Thai alphabet &amp; tones</li><li>500+ essential vocabulary</li>
                    <li>Pronunciation audio guide</li><li>Downloadable workbook</li>
                  </ul>
                </div>
                <div className="course-footer">
                  <div className="course-price"><span className="currency">$</span><span className="amount">97</span><span className="old">$130</span></div>
                  <Link href="/courses" className="btn btn-yellow">Enrol Now</Link>
                </div>
              </div>
            </FadeIn>
            <FadeIn>
              <div className="course-card featured">
                <div className="course-stripe yw"></div>
                <div className="course-header"><span className="badge badge-blue">🔥 Most Popular</span></div>
                <div className="course-body">
                  <div className="course-level">Intermediate</div>
                  <h3 className="course-title">Conversational Thai Mastery</h3>
                  <p className="course-desc">The course students rave about. Go beyond survival phrases and start having real, flowing conversations. Cover everyday topics, slang, Thai culture, and the subtle nuances that make you sound natural.</p>
                  <ul className="course-includes">
                    <li>60+ video lessons</li><li>Real dialogue practice</li><li>Slang &amp; everyday Thai</li>
                    <li>Cultural insights &amp; etiquette</li><li>Live Q&amp;A sessions (monthly)</li>
                  </ul>
                </div>
                <div className="course-footer">
                  <div className="course-price"><span className="currency">$</span><span className="amount">147</span><span className="old">$195</span></div>
                  <Link href="/courses" className="btn btn-primary">Enrol Now</Link>
                </div>
              </div>
            </FadeIn>
            <FadeIn>
              <div className="course-card">
                <div className="course-stripe gr"></div>
                <div className="course-header"><span className="badge badge-green">✨ New</span></div>
                <div className="course-body">
                  <div className="course-level">Beginner – Intermediate</div>
                  <h3 className="course-title">Thai Reading &amp; Writing</h3>
                  <p className="course-desc">Crack the Thai script — one of the most beautiful writing systems in the world. Learn all 44 consonants, vowels, tone marks, and start reading signs, menus, and messages with confidence.</p>
                  <ul className="course-includes">
                    <li>50+ focused lessons</li><li>44 consonants &amp; all vowels</li><li>Tone rules mastery</li>
                    <li>Reading practice texts</li><li>Writing drills &amp; exercises</li>
                  </ul>
                </div>
                <div className="course-footer">
                  <div className="course-price"><span className="currency">$</span><span className="amount">127</span><span className="old">$165</span></div>
                  <Link href="/courses" className="btn btn-yellow">Enrol Now</Link>
                </div>
              </div>
            </FadeIn>
          </div>
          <div className="text-center" style={{ marginTop: '44px' }}>
            <Link href="/courses" className="btn btn-outline btn-lg">View All Courses →</Link>
          </div>
        </div>
      </section>

      {/* YOUTUBE VIDEOS */}
      <section className="section-pad bg-cream">
        <div className="container">
          <div className="text-center">
            <FadeIn><p className="eyebrow">Watch &amp; Learn</p></FadeIn>
            <FadeIn><h2 className="section-title">Free Thai Lessons on YouTube</h2></FadeIn>
            <FadeIn><div className="accent-bar center"><div className="accent-line"></div><div className="accent-dot"></div><div className="accent-line"></div></div></FadeIn>
            <FadeIn><p className="section-sub">Get a taste of Mind&apos;s teaching style — bite-sized Thai lessons covering vocabulary, pronunciation, culture, and natural Thai expressions. New videos every week.</p></FadeIn>
          </div>
          <div className="yt-grid">
            {[
              { id: 'WP2v19yEx4Q', tag: 'Pronunciation', title: 'Correct Thai VS Natural Thai' },
              { id: '-_8FV8E0q3g', tag: 'Culture', title: 'Thai Core Value: "Greeng-Jai" 🙏' },
              { id: 'ZT6tKjPxCLk', tag: 'Vocabulary', title: '"Show Off" in Thai 😎' },
              { id: '6WweJpvD_Cg', tag: 'Slang', title: '"Hot as Hell" in Thai 🔥' },
              { id: 'GkIg9hY6FbQ', tag: 'Phrases', title: 'Trendy Phrase: "Everything Is Fine" 😌' },
              { id: 'UvxMy1zGZak', tag: 'Conversation', title: 'Free Time in Thai 🎉' },
            ].map(({ id, tag, title }) => (
              <FadeIn key={id}>
                <div className="yt-card">
                  <div className="yt-embed">
                    <iframe
                      src={`https://www.youtube.com/embed/${id}`}
                      title={title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>
                  <div className="yt-info">
                    <div className="yt-tag">{tag}</div>
                    <div className="yt-title">{title}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <div className="yt-cta">
              <a href="https://www.youtube.com/channel/UCC2l2QhjI3CubcFvxBKPYdg" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                Subscribe on YouTube
              </a>
              <span style={{ fontSize: '14px', color: 'var(--muted)' }}>New videos every week — follow along for free Thai tips!</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CONVERSION BANNER */}
      {!isSignedIn && (
        <section style={{ background: 'linear-gradient(135deg, var(--blue-dk) 0%, var(--blue) 100%)', padding: '56px 0' }}>
          <FadeIn className="container">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px', flexWrap: 'wrap' }}>
              <div>
                <p style={{ color: 'var(--yellow)', fontWeight: 700, fontSize: '13px', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Free to join · No credit card required
                </p>
                <h2 style={{ color: 'var(--white)', fontSize: 'clamp(22px,3vw,32px)', margin: '0 0 8px' }}>
                  Ready to start your Thai journey?
                </h2>
                <p style={{ color: 'rgba(255,255,255,.65)', fontSize: '16px', margin: 0 }}>
                  Create your free account and browse all courses, flashcards, and free lessons.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', flexShrink: 0 }}>
                <Link href="/sign-up" className="btn btn-yellow btn-lg">Create Free Account</Link>
                <Link href="/sign-in" className="btn btn-outline-white">Sign In</Link>
              </div>
            </div>
          </FadeIn>
        </section>
      )}

      {/* TESTIMONIALS */}
      <section className="section-pad testimonials-section">
        <div className="container">
          <div className="text-center">
            <p className="eyebrow">Student Stories</p>
            <h2 className="section-title">What My Students Say</h2>
            <div className="accent-bar center"><div className="accent-line"></div><div className="accent-dot" style={{ background: 'var(--yellow)' }}></div><div className="accent-line"></div></div>
          </div>
          <div className="testimonials-grid" style={{ marginTop: '56px' }}>
            {[
              { initials: 'RS', name: 'Raphaelle S.', from: '🇫🇷 France', text: "I highly recommend Kru Mind if you want to learn Thai! She's patient, speaks very good English, and structures lessons according to your needs. She is very professional in the most friendliest way ever. I feel that each lesson I am making progress." },
              { initials: 'ZI', name: 'Zhenya I.', from: '🇺🇸 United States', text: "Kru Mind is excellent. She is attentive to your learning needs and always goes at a comfortable pace — but you'll always get a lot out of her lessons. I've never had a single boring lesson with her, and I am always impressed with her linguistic and grammatical command of Thai. 10/10" },
              { initials: 'RS2', name: 'Ringo S.', from: '🇩🇪 Germany', text: "You want to learn Thai in a nice, funny and fast way? Don't hesitate to contact Teacher Mind! She creates a warm atmosphere where you can learn and try to speak without fear. During lessons she is very flexible and tailors everything to your personal goals. Highly recommended." },
              { initials: 'TV', name: 'Tim de V.', from: '🇳🇱 The Netherlands', text: "Mind is a great teacher! She is experienced enough to recognise your current level and tailor lessons right from the start. She will teach you useful daily conversation vocabulary in an easy-to-understand manner. Punctual, flexible, friendly — recommended!" },
              { initials: 'TL', name: 'Tracy R. L.', from: '🇺🇸 United States', text: "Learning online with Teacher Mind is so wonderful. She has worked with me and my needs as an intermediate learner — teaching me slang and real conversational Thai. I so appreciate her flexibility and willingness to talk about anything. Try a lesson wherever you prefer to be!" },
              { initials: 'AW', name: 'Adrian W.', from: '🇲🇾 Malaysia', text: "I am taking classes with Kru Mind and she's been great at helping me understand how to speak more like a local. She knows how to make learning interesting and is detailed and patient." },
              { initials: 'AT', name: 'Aron T.', from: '🇳🇱 The Netherlands', text: "Mind is a great teacher. She helped me become conversational in a surprisingly short time. She's punctual, flexible and her lessons are fun." },
              { initials: 'JT', name: 'James T.', from: '🇺🇸 United States', text: "I started learning only about a month ago and I already love it. I thought Thai would be difficult. She's great — always patient and makes it fun! Signed up for 10 more lessons!" },
              { initials: 'LE', name: 'Lj E.', from: '🇦🇺 Australia', text: "I have been taking lessons with Khun Mind for a few weeks now and my Thai has improved so much. She is a dedicated teacher with well-planned classes. I highly recommend." },
              { initials: 'TP', name: 'Tom P.', from: '🇬🇧 England', text: "Mind is a wonderful teacher who has helped me to improve my conversational Thai. The lessons are fun, interactive and move along at the perfect pace. Thanks!" },
            ].map(({ initials, name, from, text }) => (
              <FadeIn key={name}>
                <div className="t-card">
                  <div className="t-quote-mark">&ldquo;</div>
                  <div className="t-stars">★★★★★</div>
                  <p className="t-text">{text}</p>
                  <div className="t-author">
                    <div className="t-avatar">{initials}</div>
                    <div>
                      <div className="t-name">{name}</div>
                      <div className="t-from">{from}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FLASHCARD CTA */}
      <section className="section-pad-sm bg-white">
        <div className="container">
          <div style={{ background: 'var(--blue-50)', border: '1.5px solid var(--blue-100)', borderRadius: 'var(--r-xl)', padding: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap' }}>
            <FadeIn>
              <p className="eyebrow">Free Tool</p>
              <h2 style={{ fontSize: '32px', marginBottom: '12px' }}>Practice Thai with<br />Interactive Flashcards</h2>
              <p style={{ fontSize: '16px', color: 'var(--muted)', maxWidth: '460px', lineHeight: '1.7' }}>Greetings, numbers, food, travel vocabulary, daily life and tone practice — all in a beautiful, easy-to-use flashcard app. 130 cards across 8 categories. Free for everyone.</p>
            </FadeIn>
            <FadeIn>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', background: 'var(--white)', borderRadius: 'var(--r)', padding: '20px 28px', border: '1.5px solid var(--border)' }}>
                  <div style={{ fontFamily: "'Noto Sans Thai', sans-serif", fontSize: '40px', color: 'var(--blue)' }}>สวัสดี</div>
                  <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>Hello / Goodbye</div>
                </div>
                <Link href="/flashcard" className="btn btn-primary btn-lg">Try Flashcards Free →</Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="section-pad bg-blue-gradient">
        <FadeIn className="container text-center">
          <p className="eyebrow wh">Your Journey Starts Now</p>
          <h2 className="section-title" style={{ color: 'var(--white)', fontSize: 'clamp(32px,4vw,52px)', marginBottom: '20px' }}>
            Ready to Speak Thai<br />Like You Mean It?
          </h2>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,.75)', maxWidth: '560px', margin: '0 auto 40px', lineHeight: '1.7' }}>
            Join hundreds of students worldwide who&apos;ve transformed their Thai — and their relationship with Thailand — through Mind&apos;s premium courses and private classes.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/courses" className="btn btn-yellow btn-lg">Browse All Courses</Link>
            {isSignedIn ? (
              <Link href="/dashboard" className="btn btn-outline-white btn-lg">Go to Dashboard</Link>
            ) : (
              <Link href="/sign-up" className="btn btn-outline-white btn-lg">Create Free Account</Link>
            )}
          </div>
          {!isSignedIn && (
            <p style={{ marginTop: '20px', fontSize: '14px', color: 'rgba(255,255,255,.45)' }}>
              Already have an account?{' '}
              <Link href="/sign-in" style={{ color: 'rgba(255,255,255,.7)', textDecoration: 'underline' }}>Sign in here</Link>
            </p>
          )}
        </FadeIn>
      </section>
    </>
  );
}
