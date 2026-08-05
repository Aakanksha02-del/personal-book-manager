import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      {/* Navbar */}
      <nav className="navbar">
        <Link to="/" className="logo">
          📚 BookNest
        </Link>

        <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/signup" className="nav-signup">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="hero-section">
        <div className="hero-content">
          <p className="hero-badge">📖 Your personal reading space</p>

          <h1>
            Every Book Has a Story.
            <span> Make Yours Count.</span>
          </h1>

          <p className="hero-description">
            Organize your reading journey, keep track of your favorite books,
            and discover your next great read—all in one beautiful space.
          </p>

          <div className="hero-buttons">
            <Link to="/signup" className="primary-btn">
              Start Your Reading Journey →
            </Link>

            <Link to="/login" className="secondary-btn">
              I already have an account
            </Link>
          </div>

          <div className="hero-features">
            <div>
              <strong>📚</strong>
              <span>Organize Books</span>
            </div>

            <div>
              <strong>🔖</strong>
              <span>Track Progress</span>
            </div>

            <div>
              <strong>✨</strong>
              <span>Build Your Library</span>
            </div>
          </div>
        </div>

        {/* Book Visual */}
        <div className="hero-visual">
          <div className="glow"></div>

          <div className="book-stack">
            <div className="floating-book book-one">
              <span>📖</span>
            </div>

            <div className="floating-book book-two">
              <span>📚</span>
            </div>

            <div className="floating-book book-three">
              <span>✨</span>
            </div>

            <div className="main-book">
              <div className="book-icon">📚</div>
              <h3>My Reading</h3>
              <p>My Collection</p>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Section */}
      <section className="home-bottom">
        <p>Made for readers who love to keep their stories organized.</p>
      </section>
    </div>
  );
}

export default Home;
