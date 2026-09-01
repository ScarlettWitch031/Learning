export const dynamic = 'force-dynamic'; // Ensures this page runs on EVERY request

async function getSSRData() {
  const now = new Date();
  return {
    timestamp: now.toLocaleTimeString('en-US', { hour12: false, fractionalSecondDigits: 3 }),
    iso: now.toISOString(),
    randomId: Math.random().toString(36).substring(2, 8).toUpperCase()
  };
}

export default async function SSRPage() {
  const data = await getSSRData();

  return (
    <div>
      <span className="badge badge-ssr">2. Server-Side Rendering (SSR)</span>
      <h1>SSR in Action</h1>
      <p style={{ color: '#94a3b8', marginTop: '0.25rem' }}>
        Rendered on the <strong>server for every single incoming HTTP request</strong>.
      </p>

      <div className="card">
        <h3>Live Server Execution:</h3>
        
        <div className="time-box" style={{ borderLeftColor: '#ec4899' }}>
          <div className="time-label">Rendered on Server At (Refreshes on every page reload)</div>
          <div className="time-val" style={{ color: '#f472b6' }}>
            {data.timestamp} <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>[Token: {data.randomId}]</span>
          </div>
        </div>

        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          👉 <strong>Test it:</strong> Press <kbd>F5</kbd> / Refresh this page. You will see a brand-new timestamp on every single refresh!
        </p>
      </div>

      <div className="card">
        <h3>How SSR Works Under The Hood:</h3>
        <div style={{ marginTop: '1rem' }}>
          <div className="step-item">
            <span className="step-num">1</span>
            <div><strong>User requests page:</strong> Browser sends HTTP GET request to <code>/ssr</code>.</div>
          </div>
          <div className="step-item">
            <span className="step-num">2</span>
            <div><strong>Server executes code:</strong> Next.js runs the component on Node.js, fetches data, and renders full HTML.</div>
          </div>
          <div className="step-item">
            <span className="step-num">3</span>
            <div><strong>Server streams HTML:</strong> Browser receives fully formed HTML containing the data immediately.</div>
          </div>
          <div className="step-item">
            <span className="step-num">4</span>
            <div><strong>Hydration:</strong> React loads in the background to attach event listeners (if any).</div>
          </div>
        </div>

        <div className="code-block">
{`// Next.js App Router SSR:
export const dynamic = 'force-dynamic'; // OR fetch(url, { cache: 'no-store' })

export default async function Page() {
  // This runs on the SERVER for every incoming request
  const res = await fetch('https://api.example.com/stock', { cache: 'no-store' });
  const data = await res.json();

  return <div>Stock Price: {data.price}</div>;
}

// ----------------------------------------------------
// Older Pages Router equivalent (for interview questions):
export async function getServerSideProps(context) {
  const res = await fetch('https://api.example.com/stock');
  const data = await res.json();
  return { props: { data } };
}`}
        </div>

        <h4 style={{ marginTop: '1rem', color: '#4ade80' }}>✅ SSR Advantages:</h4>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          1. <strong>100% SEO Ready:</strong> Crawlers get complete HTML.<br />
          2. <strong>Always Fresh:</strong> Data is never stale.<br />
          3. <strong>Secure:</strong> API secrets and DB credentials never leak to the client.
        </p>
      </div>
    </div>
  );
}
