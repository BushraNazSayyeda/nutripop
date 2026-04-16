import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page-bg login-bg" style={{ minHeight: '70vh' }}>
      <div className="notfound-card">
        <span className="notfound-emoji">🌾</span>
        <p className="notfound-code">404</p>
        <h2 className="login-title">Page Not Found</h2>
        <p className="login-subtitle" style={{ marginBottom: '28px' }}>
          Oops! Looks like this page has gone missing — just like our snacks.
        </p>
        <Link to="/" className="btn-primary" style={{ display: 'inline-flex', margin: '0 auto' }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
