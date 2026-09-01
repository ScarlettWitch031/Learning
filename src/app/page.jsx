import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem', fontWeight: 800 }}>Next.js Rendering Strategies</h1>
      <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '2rem' }}>
        Master <strong>CSR</strong>, <strong>SSR</strong>, <strong>ISR</strong>, and <strong>SSG</strong> with runnable code examples, architecture breakdowns, and interview-ready concepts.
      </p>

      {/* 4 Cards Grid */}
      <div className="grid-2">
        <div className="card" style={{ borderTop: '4px solid #3b82f6' }}>
          <span className="badge badge-csr">1. CSR - Client-Side Rendering</span>
          <h3 style={{ margin: '0.5rem 0' }}>Rendered in User's Browser</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
            The server sends a blank HTML shell. The browser downloads the JS bundle, executes React, calls APIs, and builds the UI in the DOM.
          </p>
          <Link href="/csr" className="nav-btn" style={{ display: 'inline-block' }}>Open CSR Live Demo →</Link>
        </div>

        <div className="card" style={{ borderTop: '4px solid #ec4899' }}>
          <span className="badge badge-ssr">2. SSR - Server-Side Rendering</span>
          <h3 style={{ margin: '0.5rem 0' }}>Rendered on Every Request</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
            On every HTTP request, the Next.js server runs the component, fetches fresh data from DB/APIs, and streams complete HTML to the browser.
          </p>
          <Link href="/ssr" className="nav-btn" style={{ display: 'inline-block' }}>Open SSR Live Demo →</Link>
        </div>

        <div className="card" style={{ borderTop: '4px solid #22c55e' }}>
          <span className="badge badge-isr">3. ISR - Incremental Static Regen</span>
          <h3 style={{ margin: '0.5rem 0' }}>Static + Background Refresh</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
            Serves blazing-fast cached HTML from CDN. Once the revalidate window passes, the server regenerates the page in the background.
          </p>
          <Link href="/isr" className="nav-btn" style={{ display: 'inline-block' }}>Open ISR Live Demo →</Link>
        </div>

        <div className="card" style={{ borderTop: '4px solid #eab308' }}>
          <span className="badge badge-ssg">4. SSG - Static Site Generation</span>
          <h3 style={{ margin: '0.5rem 0' }}>Rendered Once at Build Time</h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
            HTML is pre-built when you run <code>npm run build</code>. Zero server compute per request, pure CDN speed.
          </p>
          <Link href="/ssg" className="nav-btn" style={{ display: 'inline-block' }}>Open SSG Live Demo →</Link>
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="card" style={{ marginTop: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Comparison Matrix (Interview Summary)</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Strategy</th>
                <th>When HTML is Rendered</th>
                <th>SEO Crawling</th>
                <th>TTFB (Initial Speed)</th>
                <th>Typical Use Cases</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong style={{ color: '#60a5fa' }}>CSR</strong></td>
                <td>Browser runtime</td>
                <td>⚠️ Poor (Initial HTML empty)</td>
                <td>⚡ Instant HTML shell, slower data render</td>
                <td>User dashboards, authenticated screens, admin panels</td>
              </tr>
              <tr>
                <td><strong style={{ color: '#f472b6' }}>SSR</strong></td>
                <td>Server on every request</td>
                <td>✅ Excellent (Complete HTML)</td>
                <td>⏳ Waits for server DB/API fetching</td>
                <td>Stock market tickers, live user feeds, checkout pages</td>
              </tr>
              <tr>
                <td><strong style={{ color: '#4ade80' }}>ISR</strong></td>
                <td>Build time + Background update</td>
                <td>✅ Excellent</td>
                <td>⚡ Blazing (Cached at CDN edge)</td>
                <td>E-commerce product catalogs, news articles, blogs</td>
              </tr>
              <tr>
                <td><strong style={{ color: '#facc15' }}>SSG</strong></td>
                <td>Build time only</td>
                <td>✅ Excellent</td>
                <td>⚡ Blazing (Cached at CDN edge)</td>
                <td>Marketing sites, documentation, privacy policy, landing pages</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
