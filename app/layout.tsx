import {ClerkProvider} from '@clerk/nextjs';
import type { Metadata } from 'next';
import '../styles/globals.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Learn Thai with Mind — Premium Thai Language School',
  description: 'Learn Thai with Mind — professional Thai language courses, private classes, books and tools taught by Kru Mind (Wasina) with 10+ years of experience in Chiang Mai.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
