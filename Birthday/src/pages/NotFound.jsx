export default function NotFound() {
  return (
    <div className="nf-wrap">
      <div className="nf-code">404</div>
      <h1 style={{ fontSize: '1.6rem' }}>This page blew out its candles 🎂</h1>
      <p style={{ opacity: 0.8, maxWidth: 420 }}>
        The page you're looking for doesn't exist — maybe the surprise link is wrong or expired.
      </p>
      <a href="/" className="btn-create text-decoration-none" style={{ marginTop: '1.2rem', display: 'inline-block' }}>
        Back to Home
      </a>
    </div>
  );
}
