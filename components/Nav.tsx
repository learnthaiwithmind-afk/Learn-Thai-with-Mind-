'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!(e.target as Element).closest('.nav')) setOpen(false);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  const isActive = (href: string) => pathname === href;

  const links = [
    { href: '/', label: 'Home' },
    { href: '/courses', label: 'Courses' },
    { href: '/books', label: 'Books' },
    { href: '/flashcard', label: 'Flashcards' },
    { href: '/private-class', label: 'Group Classes' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
      <div className="container nav-inner">
        <Link href="/" className="nav-logo">
          <Image
            src="/images/logo.png"
            alt="Learn Thai with Mind logo"
            className="nav-logo-img"
            width={120}
            height={48}
            style={{ objectFit: 'contain' }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="nav-logo-text">
            <span>Learn Thai with Mind</span>
            <span>ภาษาไทยกับมายด์</span>
          </div>
        </Link>

        <ul className={`nav-links${open ? ' open' : ''}`} id="nav-links">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={isActive(href) ? 'active' : ''} onClick={() => setOpen(false)}>
                {label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="https://learn-thai-with-mind.teachable.com/sign_in"
              className="nav-mycourses"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              🎓 My Courses
            </a>
          </li>
          <li>
            <Link href="/private-class#waitlist" className="nav-cta" onClick={() => setOpen(false)}>
              Join a Class
            </Link>
          </li>
        </ul>

        <button
          className={`nav-hamburger${open ? ' open' : ''}`}
          id="hamburger"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
