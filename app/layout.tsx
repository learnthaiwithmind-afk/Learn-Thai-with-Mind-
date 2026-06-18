import {ClerkProvider} from '@clerk/nextjs';
import type { Metadata } from 'next';
import '../styles/globals.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Learn Thai with Mind — Premium Thai Language School',
  description: 'Learn Thai with Mind — professional Thai language courses, private classes, books and tools taught by Kru Mind (Wasina) with 10+ years of experience in Chiang Mai.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=Noto+Sans+Thai:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body>
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? ''}>
          <Nav />
          {children}
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}
