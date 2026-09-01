import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Next.js Rendering Cheat Sheet & Playground (CSR, SSR, ISR, SSG)',
  description: 'Hands-on guide to Next.js rendering strategies'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <div className="header-inner">
            <Link href="/" className="brand">
              ⚡ Next.js Rendering Lab
            </Link>
            <nav className="nav-links">
              <Link href="/" className="nav-btn">Cheat Sheet</Link>
              <Link href="/csr" className="nav-btn">1. CSR</Link>
              <Link href="/ssr" className="nav-btn">2. SSR</Link>
              <Link href="/isr" className="nav-btn">3. ISR</Link>
              <Link href="/ssg" className="nav-btn">4. SSG</Link>
            </nav>
          </div>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
