async function getStaticData() {
  const now = new Date();
  return {
    timestamp: now.toLocaleTimeString('en-US', { hour12: false, fractionalSecondDigits: 3 }),
    iso: now.toISOString(),
    randomId: Math.random().toString(36).substring(2, 8).toUpperCase()
  };
}

export default async function SSGPage() {
  const data = await getStaticData();

  return (
    <div>
      <span className="badge badge-ssg">4. Static Site Generation (SSG)</span>
      <h1>SSG in Action</h1>
      <p style={{ color: '#94a3b8', marginTop: '0.25rem' }}>
        Generated <strong>once at build time</strong>. HTML is immutable until the next build.
      </p>

      <div className="card">
        <h3>Static Generation Info:</h3>
        
        <div className="time-box" style={{ borderLeftColor: '#eab308' }}>
          <div className="time-label">Build-Time Generated Timestamp</div>
          <div className="time-val" style={{ color: '#facc15' }}>
            {data.timestamp} <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>[Token: {data.randomId}]</span>
          </div>
        </div>

        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          In production (<code>next build &amp;&amp; next start</code>), this timestamp is baked into static HTML and never changes no matter how many times you refresh!
        </p>
      </div>

      <div className="card">
        <h3>How SSG Works Under The Hood:</h3>
        <div className="code-block">
{`// Next.js App Router (Default is Static / SSG):
export default async function BlogPost({ params }) {
  // Default fetch behavior caches forever: { cache: 'force-cache' }
  const res = await fetch(\`https://api.example.com/posts/\${params.id}\`);
  const post = await res.json();
  return <h1>{post.title}</h1>;
}

// To pre-render dynamic paths at build time:
export async function generateStaticParams() {
  const posts = await fetch('https://api.example.com/posts').then(r => r.json());
  return posts.map((post) => ({ id: post.id.toString() }));
}

// ----------------------------------------------------
// Older Pages Router equivalent:
export async function getStaticProps({ params }) {
  const post = await fetchPost(params.id);
  return { props: { post } };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    fallback: false
  };
}`}
        </div>
      </div>
    </div>
  );
}
