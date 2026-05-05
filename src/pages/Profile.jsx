import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { User, Phone, MapPin, Save, Shield, Mail, Camera, Loader2, CheckCircle } from 'lucide-react';

const Profile = ({ user, onUpdateUser }) => {
  const [formData, setFormData] = useState({
    ten: '',
    soDienThoai: '',
    diaChi: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        ten: user.fullName || user.FullName || '',
        soDienThoai: user.phone || user.Phone || '',
        diaChi: user.address || user.Address || ''
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      const customerId = user.customerId || user.CustomerId;
      if (!customerId) throw new Error('Không tìm thấy thông tin khách hàng');

      // Update in backend
      await api.customers.update(customerId, formData);
      
      // Update local state in App.jsx
      const updatedUser = {
        ...user,
        fullName: formData.ten,
        FullName: formData.ten,
        phone: formData.soDienThoai,
        Phone: formData.soDienThoai,
        address: formData.diaChi,
        Address: formData.diaChi
      };
      
      if (onUpdateUser) onUpdateUser(updatedUser);
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Update failed:', err);
      setError('Cập nhật thông tin thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
      <div className="section-title" style={{ textAlign: 'left', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem' }}>Thông tin cá nhân</h2>
        <p style={{ color: 'var(--text-muted)' }}>Quản lý thông tin tài khoản và địa chỉ giao hàng của bạn.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem' }}>
        {/* Left: Avatar & Quick Info */}
        <div className="animate-in">
          <div style={{ 
            background: 'white', 
            borderRadius: '2rem', 
            padding: '2.5rem', 
            textAlign: 'center',
            border: '1px solid var(--border)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
          }}>
            <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 1.5rem' }}>
               <div style={{ 
                 width: '100%', 
                 height: '100%', 
                 borderRadius: '50%', 
                 background: 'var(--secondary)', 
                 display: 'flex', 
                 alignItems: 'center', 
                 justifyContent: 'center',
                 color: 'var(--primary)',
                 fontSize: '3rem',
                 fontWeight: 800
               }}>
                 {user?.fullName?.charAt(0) || user?.FullName?.charAt(0) || 'U'}
               </div>
               <button style={{ 
                 position: 'absolute', 
                 bottom: '5px', 
                 right: '5px', 
                 width: '35px', 
                 height: '35px', 
                 borderRadius: '50%', 
                 background: 'white', 
                 border: '1px solid var(--border)', 
                 display: 'flex', 
                 alignItems: 'center', 
                 justifyContent: 'center',
                 cursor: 'pointer',
                 boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
               }}>
                 <Camera size={16} />
               </button>
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{user?.fullName || user?.FullName}</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>@{user?.username || user?.Username}</p>
            
            <div style={{ height: '1px', background: 'var(--border)', margin: '1.5rem 0' }}></div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.85rem' }}>
                  <Mail size={16} color="var(--primary)" />
                  <span>{user?.username || user?.Username}</span>
               </div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.85rem' }}>
                  <Shield size={16} color="#10b981" />
                  <span>Tài khoản đã xác thực</span>
               </div>
            </div>
          </div>
        </div>

        {/* Right: Edit Form */}
        <div className="animate-in" style={{ animationDelay: '0.1s' }}>
          <form onSubmit={handleSubmit} style={{ 
            background: 'white', 
            borderRadius: '2rem', 
            padding: '3rem', 
            border: '1px solid var(--border)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
          }}>
            {success && (
              <div style={{ 
                background: '#ecfdf5', 
                color: '#059669', 
                padding: '1rem 1.5rem', 
                borderRadius: '1rem', 
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                fontWeight: 600
              }}>
                <CheckCircle size={20} />
                Cập nhật thông tin thành công!
              </div>
            )}

            {error && (
              <div style={{ 
                background: '#fef2f2', 
                color: '#ef4444', 
                padding: '1rem 1.5rem', 
                borderRadius: '1rem', 
                marginBottom: '2rem',
                fontWeight: 600
              }}>
                {error}
              </div>
            )}

            <div className="form-group" style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem', fontWeight: 600, fontSize: '0.95rem' }}>
                <User size={18} color="var(--primary)" /> Họ và tên
              </label>
              <input 
                type="text" 
                value={formData.ten}
                onChange={e => setFormData({...formData, ten: e.target.value})}
                placeholder="Nhập họ tên của bạn"
                style={{ width: '100%', padding: '1.2rem', borderRadius: '1.2rem', border: '1px solid var(--border)', background: '#f8fafc', fontSize: '1rem' }}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem', fontWeight: 600, fontSize: '0.95rem' }}>
                <Phone size={18} color="var(--primary)" /> Số điện thoại
              </label>
              <input 
                type="tel" 
                value={formData.soDienThoai}
                onChange={e => setFormData({...formData, soDienThoai: e.target.value})}
                placeholder="Nhập số điện thoại"
                style={{ width: '100%', padding: '1.2rem', borderRadius: '1.2rem', border: '1px solid var(--border)', background: '#f8fafc', fontSize: '1rem' }}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: '3rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem', fontWeight: 600, fontSize: '0.95rem' }}>
                <MapPin size={18} color="var(--primary)" /> Địa chỉ mặc định
              </label>
              <textarea 
                value={formData.diaChi}
                onChange={e => setFormData({...formData, diaChi: e.target.value})}
                placeholder="Số nhà, tên đường, phường/xã..."
                style={{ width: '100%', padding: '1.2rem', borderRadius: '1.2rem', border: '1px solid var(--border)', background: '#f8fafc', fontSize: '1rem', minHeight: '120px' }}
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="cart-btn" 
              style={{ width: '100%', padding: '1.2rem', justifyContent: 'center', fontSize: '1.1rem' }}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Đang lưu...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Lưu thay đổi
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
