import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, User, Menu, X, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Our Story', path: '/our-story' },
  { label: 'Shop', path: '/shop' },
  { label: 'Millet Life', path: '/millet-life' },
  { label: 'Interest Form', path: '/interest-form' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const location = useLocation();
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/" className="logo">
          <span className="logo-nutri">Nutri</span>
          <span className="logo-pop">Pop</span>
          <span className="logo-icon">🌾</span>
        </Link>

        {/* Desktop Links */}
        <div className="nav-links desktop-only">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link${location.pathname === link.path ? ' active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right icons */}
        <div className="nav-actions">
          <Link to="/wishlist" className="icon-btn" title="Wishlist">
            <Heart size={20} />
          </Link>
          <Link to="/cart" className="icon-btn cart-btn" title="Cart">
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          {user ? (
            <div className="user-menu">
              <Link to="/profile" className="icon-btn" title={`Profile — ${user.name}`}>
                <User size={20} />
              </Link>
              <button className="icon-btn" onClick={logout} title="Logout"><LogOut size={18} /></button>
            </div>
          ) : (
            <Link to="/login" className="login-btn">
              <User size={16} /> Login
            </Link>
          )}
          <button className="icon-btn mobile-only" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`mobile-nav-link${location.pathname === link.path ? ' active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <div className="mobile-menu-footer">
            <Link to="/wishlist" className="mobile-nav-link">❤ Wishlist</Link>
            <Link to="/cart" className="mobile-nav-link">🛒 Cart {cartCount > 0 && `(${cartCount})`}</Link>
            {user ? (
              <>
                <Link to="/profile" className="mobile-nav-link">👤 My Profile</Link>
                <button className="mobile-nav-link logout-link" onClick={logout}>Logout</button>
              </>
            ) : (
              <Link to="/login" className="mobile-nav-link">👤 Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
