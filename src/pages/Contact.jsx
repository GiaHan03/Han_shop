import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Twitter } from 'lucide-react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <div className="section-title">
        <h2>Liên hệ với chúng tôi</h2>
        <p>Gia Han Bakery luôn lắng nghe ý kiến từ bạn</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', marginTop: '4rem' }}>
        <div className="animate-in">
          <h3 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Thông tin liên hệ</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>
            Bạn có thắc mắc về đơn hàng, chính sách hoặc muốn đặt bánh theo yêu cầu riêng? 
            Hãy liên hệ với chúng tôi qua các kênh dưới đây.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ background: 'var(--primary)', padding: '1rem', borderRadius: '1rem', color: 'white' }}>
                <Phone size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem', opacity: 0.6 }}>Điện thoại</h4>
                <p style={{ fontWeight: 700, fontSize: '1.2rem' }}>0123 456 789</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ background: 'var(--primary)', padding: '1rem', borderRadius: '1rem', color: 'white' }}>
                <Mail size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem', opacity: 0.6 }}>Email</h4>
                <p style={{ fontWeight: 700, fontSize: '1.2rem' }}>contact@giahanbakery.com</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ background: 'var(--primary)', padding: '1rem', borderRadius: '1rem', color: 'white' }}>
                <MapPin size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem', opacity: 0.6 }}>Địa chỉ</h4>
                <p style={{ fontWeight: 700, fontSize: '1.2rem' }}>123 Đường Bánh Ngọt, TP.HCM</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '4rem' }}>
            <h4 style={{ marginBottom: '1.5rem' }}>Theo dõi chúng tôi</h4>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="#" style={{ color: 'var(--primary)' }}><Instagram size={28} /></a>
              <a href="#" style={{ color: 'var(--primary)' }}><Facebook size={28} /></a>
              <a href="#" style={{ color: 'var(--primary)' }}><Twitter size={28} /></a>
            </div>
          </div>
        </div>

        <div className="animate-in" style={{ animationDelay: '0.1s', background: 'white', padding: '3rem', borderRadius: '2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', border: '1px solid var(--border)' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <div style={{ background: '#10b981', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', color: 'white' }}>
                <Send size={32} />
              </div>
              <h3>Gửi tin nhắn thành công!</h3>
              <p style={{ color: 'var(--text-muted)' }}>Cảm ơn bạn. Chúng tôi sẽ phản hồi sớm nhất có thể.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Họ và tên</label>
                  <input type="text" required placeholder="Nguyễn Văn A" style={{ width: '100%', padding: '1rem', borderRadius: '1rem', border: '1px solid var(--border)', background: '#f8fafc' }} />
                </div>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Email</label>
                  <input type="email" required placeholder="example@mail.com" style={{ width: '100%', padding: '1rem', borderRadius: '1rem', border: '1px solid var(--border)', background: '#f8fafc' }} />
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Chủ đề</label>
                <input type="text" placeholder="Bạn muốn hỏi về vấn đề gì?" style={{ width: '100%', padding: '1rem', borderRadius: '1rem', border: '1px solid var(--border)', background: '#f8fafc' }} />
              </div>
              <div className="form-group" style={{ marginBottom: '2.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Tin nhắn</label>
                <textarea required placeholder="Nội dung tin nhắn..." style={{ width: '100%', padding: '1rem', borderRadius: '1rem', border: '1px solid var(--border)', background: '#f8fafc', minHeight: '150px' }}></textarea>
              </div>
              <button type="submit" className="cart-btn" style={{ width: '100%', padding: '1.2rem', fontSize: '1.1rem', justifyContent: 'center' }}>
                <Send size={20} />
                Gửi tin nhắn
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="animate-in" style={{ marginTop: '5rem', height: '400px', borderRadius: '2rem', overflow: 'hidden', border: '1px solid var(--border)' }}>
        {/* Placeholder for map */}
        <div style={{ width: '100%', height: '100%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
          <MapPin size={48} color="var(--primary)" />
          <p style={{ fontWeight: 600 }}>Google Maps Placeholder</p>
          <p style={{ color: 'var(--text-muted)' }}>123 Đường Bánh Ngọt, TP.HCM</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
