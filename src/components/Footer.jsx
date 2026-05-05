import React from 'react';
import { Instagram, Facebook, Twitter, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ background: 'var(--secondary)', padding: '5rem 0', marginTop: '5rem' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
        <div>
          <Link to="/" className="logo" style={{ marginBottom: '1.5rem', display: 'flex' }}>Gia Han Bakery</Link>
          <p style={{ color: 'var(--text-muted)' }}>Hệ thống tiệm bánh ngọt thủ công hàng đầu. Chất lượng và hương vị tuyệt vời từ những nguyên liệu tươi sạch nhất.</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <a href="#" className="social-link"><Instagram size={20} /></a>
            <a href="#" className="social-link"><Facebook size={20} /></a>
            <a href="#" className="social-link"><Twitter size={20} /></a>
          </div>
        </div>
        <div>
          <h4 style={{ marginBottom: '1.5rem' }}>Menu</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Trang chủ</Link></li>
            <li style={{ marginBottom: '0.5rem' }}><Link to="/wishlist" style={{ textDecoration: 'none', color: 'inherit' }}>Yêu thích</Link></li>
            <li style={{ marginBottom: '0.5rem' }}><Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>Liên hệ</Link></li>
          </ul>
        </div>
        <div>
          <h4 style={{ marginBottom: '1.5rem' }}>Hỗ trợ</h4>
          <p style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Giao hàng</p>
          <p style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Chính sách đổi trả</p>
          <p style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Câu hỏi thường gặp</p>
        </div>
        <div>
          <h4 style={{ marginBottom: '1.5rem' }}>Liên hệ</h4>
          <p style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}>🏠 123 Đường Bánh Ngọt, TP.HCM</p>
          <p style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}>📞 0123 456 789</p>
          <p style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}>✉️ contact@giahanbakery.com</p>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '4rem', padding: '2rem 0 0', borderTop: '1px solid rgba(0,0,0,0.05)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        © 2024 Gia Han Bakery. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
