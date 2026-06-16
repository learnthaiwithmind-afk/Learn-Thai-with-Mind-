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
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
