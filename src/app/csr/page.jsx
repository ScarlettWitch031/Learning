'use client';

import { useState, useEffect } from 'react';

export default function CSRPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clientRenderTime, setClientRenderTime] = useState('');

  useEffect(() => {
    setClientRenderTime(new Date().toLocaleTimeString('en-US', { hour12: false, fractionalSecondDigits: 3 }));
    
    // Simulate client fetching data from API
    fetch('/api/timestamp')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <span className="badge badge-csr">1. Client-Side Rendering (CSR)</span>
      <h1>CSR in Action</h1>
      <p style={{ color: '#94a3b8', marginTop: '0.25rem' }}>
        Rendered completely on the user's browser using React <code>useEffect</code> &amp; <code>useState</code>.
      </p>

      <div className="card">
        <h3>Live Browser Execution:</h3>
        
        <div className="time-box">
          <div className="time-label">Client Component Mount Time (Browser JS)</div>
          <div className="time-val">{clientRenderTime || 'Mounting in browser...'}</div>
        </div>

        <div className="time-box" style={{ borderLeftColor: '#60a5fa' }}>
          <div className="time-label">Data Fetched from API over Network</div>
          <div className="time-val" style={{ color: '#60a5fa' }}>
            {loading ? '⏳ Fetching data on client...' : `Fetched: ${data?.timestamp} (ID: ${data?.randomId})`}
          </div>
        </div>

        <button
          onClick={() => {
            setLoading(true);
            fetch('/api/timestamp')
              .then(res => res.json())
              .then(json => { setData(json); setLoading(false); });
          }}
          className="nav-btn"
          style={{ background: '#2563eb', color: '#fff', cursor: 'pointer', border: 'none', padding: '0.6rem 1.2rem' }}
        >
          🔄 Re-fetch Data on Client
        </button>
      </div>

      <div className="card">
        <h3>How CSR Works Under The Hood:</h3>
        <div style={{ marginTop: '1rem' }}>
          <div className="step-item">
            <span className="step-num">1</span>
            <div><strong>Browser requests URL:</strong> Next.js server sends a minimal HTML shell with <code>&lt;script&gt;</code> tags.</div>
          </div>
          <div className="step-item">
            <span className="step-num">2</span>
            <div><strong>Browser downloads JS bundle:</strong> User sees a blank screen or basic layout until JS finishes downloading.</div>
          </div>
          <div className="step-item">
            <span className="step-num">3</span>
            <div><strong>React executes <code>useEffect</code>:</strong> Browser makes an HTTP request to <code>/api/timestamp</code>.</div>
          </div>
          <div className="step-item">
            <span className="step-num">4</span>
            <div><strong>DOM updates:</strong> State changes and the actual data renders on the screen.</div>
          </div>
        </div>

        <div className="code-block">
{`// App Router syntax:
'use client'; // <-- Tells Next.js this is a Client Component

import { useState, useEffect } from 'react';

export default function Profile() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/user').then(r => r.json()).then(setData);
  }, []);

  return <div>{data ? data.name : 'Loading...'}</div>;
}`}
        </div>

        <h4 style={{ marginTop: '1rem', color: '#f87171' }}>⚠️ CSR Trade-offs:</h4>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          If you right-click and choose <strong>"View Page Source"</strong>, the initial HTML does NOT contain the fetched timestamp! Search engine crawlers only get the empty shell unless they execute JavaScript.
        </p>
      </div>
    </div>
  );
}
