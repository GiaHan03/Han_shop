import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1200',
    title: 'Hương vị ngọt ngào',
    subtitle: 'Homemade with Love',
    desc: 'Mỗi chiếc bánh là một tác phẩm nghệ thuật, mang đến niềm vui cho cuộc sống của bạn.'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=1200',
    title: 'Bánh kem đặc biệt',
    subtitle: 'Premium Selection',
    desc: 'Nguyên liệu cao cấp, công thức độc quyền từ những chuyên gia làm bánh hàng đầu.'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=1200',
    title: 'Quà tặng ý nghĩa',
    subtitle: 'Gift for Everyone',
    desc: 'Gói trọn tình cảm trong từng hộp bánh xinh xắn dành cho những người thân yêu.'
  }
];

const BannerCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((current + 1) % banners.length);
  const prev = () => setCurrent((current - 1 + banners.length) % banners.length);

  return (
    <div className="carousel-container container">
      <div className="carousel-wrapper">
        {banners.map((banner, index) => (
          <div 
            key={banner.id} 
            className={`carousel-slide ${index === current ? 'active' : ''}`}
            style={{ display: index === current ? 'grid' : 'none' }}
          >
            <div className="hero-content animate-in">
              <span style={{ color: 'var(--primary)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.8rem' }}>
                {banner.subtitle}
              </span>
              <h1 style={{ fontSize: '3.5rem', lineHeight: '1.2' }}>{banner.title}</h1>
              <p>{banner.desc}</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="#products" className="cart-btn" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', textDecoration: 'none' }}>Đặt mua ngay</a>
                <button className="btn" style={{ padding: '1rem 2rem', borderRadius: '2rem', border: '1px solid var(--border)', background: 'none', cursor: 'pointer' }}>Xem menu</button>
              </div>
            </div>
            <div className="hero-img-container animate-in" style={{ animationDelay: '0.2s' }}>
              <img src={banner.image} className="hero-img" alt={banner.title} />
            </div>
          </div>
        ))}

        <div className="carousel-dots">
          {banners.map((_, i) => (
            <button 
              key={i} 
              className={`dot ${i === current ? 'active' : ''}`} 
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>

        <button className="carousel-nav prev" onClick={prev}><ChevronLeft /></button>
        <button className="carousel-nav next" onClick={next}><ChevronRight /></button>
      </div>
    </div>
  );
};

export default BannerCarousel;
