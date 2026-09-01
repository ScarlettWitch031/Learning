export const revalidate = 10; // Incremental Static Regeneration every 10s

async function getISRData() {
  const now = new Date();
  return {
    timestamp: now.toLocaleTimeString('en-US', { hour12: false, fractionalSecondDigits: 3 }),
    iso: now.toISOString(),
    randomId: Math.random().toString(36).substring(2, 8).toUpperCase()
  };
}

export default async function ISRPage() {
  const data = await getISRData();

  return (
    <div>
      <span className="badge badge-isr">3. Incremental Static Regeneration (ISR)</span>
      <h1>ISR in Action</h1>
      <p style={{ color: '#94a3b8', marginTop: '0.25rem' }}>
        Combines the speed of static caching with periodic automatic server regeneration.
      </p>

      <div className="card">
        <h3>Live Revalidation Behavior:</h3>
        
        <div className="time-box" style={{ borderLeftColor: '#22c55e' }}>
          <div className="time-label">Cached Static Generation Timestamp (Revalidate Window: 10s)</div>
          <div className="time-val" style={{ color: '#4ade80' }}>
            {data.timestamp} <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>[Token: {data.randomId}]</span>
          </div>
        </div>

        <div style={{ background: '#030712', border: '1px solid #1f2937', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
          <h4 style={{ color: '#38bdf8', marginBottom: '0.5rem' }}>🧪 How to test this right now:</h4>
          <ol style={{ paddingLeft: '1.25rem', color: '#94a3b8', fontSize: '0.9rem' }}>
            <li>Refresh repeatedly within <strong>10 seconds</strong>: The timestamp <strong>will NOT change</strong> (served instantly from cache).</li>
            <li>Wait <strong>10+ seconds</strong> and refresh: Next.js serves the cached version, then triggers a background regeneration.</li>
            <li>Refresh once more: You will now see the newly generated timestamp!</li>
          </ol>
        </div>
      </div>

      <div className="card">
        <h3>The Stale-While-Revalidate Pattern (Interview Gold):</h3>
        <div style={{ marginTop: '1rem' }}>
          <div className="step-item">
            <span className="step-num">1</span>
            <div><strong>Build / Initial Request:</strong> Next.js builds the static page and stores it in cache/CDN.</div>
          </div>
          <div className="step-item">
            <span className="step-num">2</span>
            <div><strong>Requests within 10s:</strong> Served instantly from cache (0ms server compute).</div>
          </div>
          <div className="step-item">
            <span className="step-num">3</span>
            <div><strong>First request AFTER 10s:</strong> Next.js still sends the stale cached page immediately (no delay for user!), but triggers a background task to re-render.</div>
          </div>
          <div className="step-item">
            <span className="step-num">4</span>
            <div><strong>Subsequent requests:</strong> Cached page is replaced with the newly regenerated HTML.</div>
          </div>
        </div>

        <div className="code-block">
{`// Next.js App Router ISR:
export const revalidate = 10; // revalidate page every 10 seconds

// OR per-fetch revalidation:
async function getPost() {
  const res = await fetch('https://api.example.com/posts/1', {
    next: { revalidate: 10 } // <-- ISR at fetch level
  });
  return res.json();
}

// ----------------------------------------------------
// Older Pages Router equivalent (for interview questions):
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/posts/1');
  const post = await res.json();
  return {
    props: { post },
    revalidate: 10 // In seconds
  };
}`}
        </div>

        <h4 style={{ marginTop: '1rem', color: '#4ade80' }}>🌟 Why ISR is revolutionary:</h4>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          For an e-commerce site with 100,000 products: building all 100k pages on every commit takes hours. With ISR, you build the top 100 pages at build time, and let the remaining pages generate and refresh on-demand when users visit them!
        </p>
      </div>
    </div>
  );
}
