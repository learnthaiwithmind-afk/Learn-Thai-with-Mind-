'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { UserButton, useUser } from '@clerk/nextjs';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { isSignedIn } = useUser();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close on outside click
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!(e.target as Element).closest('.nav')) setOpen(false);
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  // Close on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (href: string) => pathname === href;

  const links = [
    { href: '/courses', label: 'Courses' },
    { href: '/books', label: 'Books' },
    { href: '/flashcard', label: 'Flashcards' },
    { href: '/private-class', label: 'Classes' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
      <div className="container nav-inner">

        {/* Logo */}
        <Link href="/" className="nav-logo" onClick={() => setOpen(false)}>
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

        {/* Desktop centre links */}
        <ul className="nav-links" id="nav-links">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={isActive(href) ? 'active' : ''}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop auth */}
        <div className="nav-auth">
          {isSignedIn ? (
            <>
              <Link href="/dashboard" className={`nav-mycourses${isActive('/dashboard') ? ' active' : ''}`}>
                🎓 My Courses
              </Link>
              <UserButton />
            </>
          ) : (
            <Link href="/sign-in" className="nav-signin">Sign In</Link>
          )}
        </div>

        {/* Hamburger */}
        <button
          className={`nav-hamburger${open ? ' open' : ''}`}
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      {/* Mobile dropdown — single unified panel */}
      {open && (
        <div className="nav-mobile-panel">
          {/* Nav links */}
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`nav-mobile-link${isActive(href) ? ' active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}

          {/* Divider */}
          <div className="nav-mobile-divider" />

          {/* Auth */}
          {isSignedIn ? (
            <div className="nav-mobile-auth">
              <Link href="/dashboard" className="nav-mobile-mycourses" onClick={() => setOpen(false)}>
                🎓 My Courses
              </Link>
              <div className="nav-mobile-user">
                <UserButton />
                <span className="nav-mobile-user-label">Account</span>
              </div>
            </div>
          ) : (
            <Link href="/sign-in" className="nav-mobile-signin" onClick={() => setOpen(false)}>
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
