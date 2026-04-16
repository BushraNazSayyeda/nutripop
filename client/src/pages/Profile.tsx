import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Package, LogOut, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { products } from '../data/products';

type ActiveTab = 'orders' | 'account';

const MOCK_ORDERS = [
  {
    id: 'NP10293',
    date: '2 Apr 2026',
    status: 'Delivered',
    items: [
      { name: 'NutriPop Periperi', qty: 2, localImage: products[0].localImage, image: products[0].image },
      { name: 'NutriPop Achari',   qty: 1, localImage: products[1].localImage, image: products[1].image },
    ],
    total: 150,
  },
  {
    id: 'NP10187',
    date: '18 Mar 2026',
    status: 'Delivered',
    items: [
      { name: 'NutriPop Variety Pack', qty: 1, localImage: products[4].localImage, image: products[4].image },
    ],
    total: 140,
  },
  {
    id: 'NP10041',
    date: '1 Mar 2026',
    status: 'Delivered',
    items: [
      { name: 'NutriPop Desi Sticks', qty: 3, localImage: products[2].localImage, image: products[2].image },
    ],
    total: 150,
  },
];

export default function Profile() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ActiveTab>('orders');

  useEffect(() => {
    if (!loading && !user) navigate('/login');
  }, [user, loading, navigate]);

  if (loading) return null;
  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const initial = user.name.charAt(0).toUpperCase();

  return (
    <div className="page-bg">
      <section className="section">
        {/* Header */}
        <div className="profile-header">
          <div className="profile-avatar">{initial}</div>
          <h2 className="section-h2" style={{ marginBottom: '4px' }}>Hello, {user.name}!</h2>
          <p className="section-sub" style={{ marginBottom: '0' }}>+91 {user.phone}</p>
        </div>

        {/* Layout */}
        <div className="profile-layout">
          {/* Sidebar */}
          <aside className="profile-sidebar">
            <button
              className={`profile-nav-item${activeTab === 'orders' ? ' active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <Package size={16} /> My Orders
            </button>
            <button
              className={`profile-nav-item${activeTab === 'account' ? ' active' : ''}`}
              onClick={() => setActiveTab('account')}
            >
              <User size={16} /> Account Info
            </button>
            <button className="profile-nav-item logout-item" onClick={handleLogout}>
              <LogOut size={16} /> Logout
            </button>
          </aside>

          {/* Main */}
          <div className="profile-main">
            {activeTab === 'account' && (
              <div className="profile-section-card">
                <p className="profile-section-title"><User size={16} /> Account Information</p>
                <div className="profile-info-row">
                  <User size={16} />
                  <span>{user.name}</span>
                </div>
                <div className="profile-info-row">
                  <Phone size={16} />
                  <span>+91 {user.phone}</span>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="profile-section-card">
                <p className="profile-section-title"><Package size={16} /> My Orders</p>
                <div className="orders-list">
                  {MOCK_ORDERS.map(order => (
                    <div key={order.id} className="order-card">
                      <div className="order-card-header">
                        <span className="order-id">#{order.id}</span>
                        <span className="order-status-badge">{order.status}</span>
                      </div>
                      <div className="order-items-preview">
                        {order.items.map((item, i) => (
                          <img
                            key={i}
                            src={item.localImage}
                            alt={item.name}
                            className="order-item-thumb"
                            title={`${item.name} × ${item.qty}`}
                            onError={e => {
                              const t = e.target as HTMLImageElement;
                              if (t.src !== item.image) { t.src = item.image; }
                              else { t.src = 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&q=80'; }
                            }}
                          />
                        ))}
                      </div>
                      <p className="order-meta">
                        {order.date} · {order.items.reduce((acc, i) => acc + i.qty, 0)} item{order.items.reduce((acc, i) => acc + i.qty, 0) !== 1 ? 's' : ''}
                      </p>
                      <p className="order-total">₹{order.total}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
