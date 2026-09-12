import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-banner">
        <div className="hero-content">
          <h1>Upgrade Your Tech & Lifestyle</h1>
          <p>Discover top-tier gadgets, accessories, and fashion at unbeatable prices.</p>
          <Link to="/products" className="btn-primary">
            Explore All Products
          </Link>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Fast Delivery</h3>
          <p>Lightning-fast delivery across all major metro cities.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3>Secure Payments</h3>
          <p>Protected checkout with end-to-end encrypted transactions.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔄</div>
          <h3>Easy Returns</h3>
          <p>Hassle-free 7-day replacement and refund policy.</p>
        </div>
      </section>
    </div>
  );
}

export default HomePage;