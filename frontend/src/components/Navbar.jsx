import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-logo">
          ShopFlow
        </Link>

        {/* Search Bar Placeholder */}
        <div className="navbar-search">
          <input 
            type="text" 
            placeholder="Search products, brands and more..." 
            className="search-input"
          />
        </div>

        {/* Navigation Links */}
        <nav className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Products</Link>
          <Link to="/cart" className="nav-link cart-link">
            Cart <span className="cart-badge">0</span>
          </Link>
          <Link to="/login" className="nav-link btn-login">Login</Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;