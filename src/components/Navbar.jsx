import React, { useState } from 'react';
import { ShoppingBag, Star, Heart, User, LogOut, UserCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ cartCount, openCart, favoritesCount, user, onLogout }) => {
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  return (
    <nav className="navbar">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Link to="/" className="logo">
          <div style={{ background: 'var(--primary)', padding: '0.4rem', borderRadius: '0.75rem', display: 'flex' }}>
            <Star size={20} color="white" fill="white" />
          </div>
          <span>Gia Han Bakery</span>
        </Link>
        
        <div className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Trang chủ</Link>
          <Link to="/products" className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}>Sản phẩm</Link>
          <Link to="/wishlist" className={`nav-link ${location.pathname === '/wishlist' ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            Yêu thích
            {favoritesCount > 0 && <span style={{ fontSize: '0.7rem', background: 'var(--primary)', color: 'white', padding: '0.1rem 0.4rem', borderRadius: '1rem' }}>{favoritesCount}</span>}
          </Link>
          <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>Liên hệ</Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className="cart-btn" onClick={openCart}>
            <ShoppingBag size={20} />
            <span className="cart-btn-text">Giỏ hàng</span>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>

          {user ? (
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{ background: 'var(--secondary)', border: 'none', padding: '0.5rem 1rem', borderRadius: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 600, color: 'var(--text)' }}
              >
                <User size={20} />
                <span className="cart-btn-text">{user.fullName || user.FullName}</span>
              </button>
              
              {showUserMenu && (
                <div className="animate-in" style={{ position: 'absolute', top: '120%', right: 0, background: 'white', borderRadius: '1rem', padding: '0.5rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid var(--border)', minWidth: '180px', zIndex: 1001 }}>
                   <div style={{ padding: '0.8rem 1rem', borderBottom: '1px solid var(--border)', marginBottom: '0.5rem' }}>
                      <p style={{ fontSize: '0.85rem', fontWeight: 700 }}>{user.fullName || user.FullName}</p>
                      <p style={{ fontSize: '0.75rem', opacity: 0.6 }}>@{user.username || user.Username}</p>
                   </div>
                   
                   <Link 
                    to="/profile" 
                    onClick={() => setShowUserMenu(false)}
                    style={{ width: '100%', textAlign: 'left', padding: '0.8rem 1rem', background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', color: 'var(--text)', fontWeight: 600, borderRadius: '0.5rem', textDecoration: 'none', fontSize: '0.9rem' }}
                   >
                     <UserCircle size={18} color="var(--primary)" />
                     Thông tin cá nhân
                   </Link>

                   <Link 
                    to="/orders" 
                    onClick={() => setShowUserMenu(false)}
                    style={{ width: '100%', textAlign: 'left', padding: '0.8rem 1rem', background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', color: 'var(--text)', fontWeight: 600, borderRadius: '0.5rem', textDecoration: 'none', fontSize: '0.9rem' }}
                   >
                     <ShoppingBag size={18} color="var(--primary)" />
                     Lịch sử đơn hàng
                   </Link>

                   <button 
                    onClick={() => { onLogout(); setShowUserMenu(false); }}
                    style={{ width: '100%', textAlign: 'left', padding: '0.8rem 1rem', background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', color: '#ef4444', fontWeight: 600, borderRadius: '0.5rem' }}
                   >
                     <LogOut size={18} />
                     Đăng xuất
                   </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn" style={{ background: 'none', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '0.5rem 1.5rem', borderRadius: '2rem', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <UserCircle size={20} />
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
