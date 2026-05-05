import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, UserPlus, ArrowRight, Star, Phone, MapPin } from 'lucide-react';
import { api } from '../services/api';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    employeeCode: 'CUST' + Math.floor(Math.random() * 10000), // Auto-gen code for compatibility
    phone: '',
    address: '',
    position: 'Customer',
    birthday: new Date().toISOString()
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.auth.register(formData);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message || 'Đã có lỗi xảy ra khi đăng ký.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="animate-in" style={{ textAlign: 'center', padding: '4rem', background: 'white', borderRadius: '2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', maxWidth: '500px' }}>
          <div style={{ background: '#10b981', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', color: 'white' }}>
            <UserPlus size={40} />
          </div>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Đăng ký thành công!</h2>
          <p style={{ color: 'var(--text-muted)' }}>Tài khoản của bạn đã được tạo. Đang chuyển hướng đến trang đăng nhập...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 0' }}>
      <div className="animate-in" style={{ width: '100%', maxWidth: '600px', background: 'white', padding: '3rem', borderRadius: '2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', border: '1px solid var(--border)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ background: 'var(--primary)', width: '60px', height: '60px', borderRadius: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'white' }}>
            <Star size={32} fill="white" />
          </div>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Tạo tài khoản mới</h2>
          <p style={{ color: 'var(--text-muted)' }}>Trở thành thành viên của Gia Han Bakery để nhận nhiều ưu đãi</p>
        </div>

        {error && (
          <div style={{ background: '#fef2f2', color: '#ef4444', padding: '1rem', borderRadius: '1rem', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center', border: '1px solid #fee2e2' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: 600, fontSize: '0.9rem' }}>Họ và tên</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  required 
                  placeholder="Nguyễn Văn A" 
                  style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '1rem', border: '1px solid var(--border)', background: '#f8fafc' }}
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: 600, fontSize: '0.9rem' }}>Tên đăng nhập</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  required 
                  placeholder="username123" 
                  style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '1rem', border: '1px solid var(--border)', background: '#f8fafc' }}
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: 600, fontSize: '0.9rem' }}>Mật khẩu</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="password" 
                required 
                placeholder="Nhập mật khẩu an toàn" 
                style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '1rem', border: '1px solid var(--border)', background: '#f8fafc' }}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: 600, fontSize: '0.9rem' }}>Số điện thoại</label>
              <div style={{ position: 'relative' }}>
                <Phone size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  placeholder="0123456789" 
                  style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '1rem', border: '1px solid var(--border)', background: '#f8fafc' }}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: 600, fontSize: '0.9rem' }}>Địa chỉ</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  placeholder="TP. Hồ Chí Minh" 
                  style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '1rem', border: '1px solid var(--border)', background: '#f8fafc' }}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading} className="cart-btn" style={{ width: '100%', padding: '1.2rem', fontSize: '1.1rem', justifyContent: 'center', marginTop: '1rem' }}>
            {loading ? 'Đang xử lý...' : (
              <>
                Tạo tài khoản
                <UserPlus size={20} />
              </>
            )}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.95rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Bạn đã có tài khoản? </span>
          <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 700 }}>
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
