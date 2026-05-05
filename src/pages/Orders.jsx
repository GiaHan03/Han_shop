import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Package, Calendar, CreditCard, ChevronRight, ShoppingBag, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Orders = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const customerId = user.customerId || user.CustomerId;
        if (!customerId) {
           setOrders([]);
           setLoading(false);
           return;
        }
        const data = await api.orders.getByCustomer(customerId);
        // Sort by date descending
        const sorted = data.sort((a, b) => new Date(b.ngayBan) - new Date(a.ngayBan));
        setOrders(sorted);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setError('Không thể tải lịch sử đơn hàng. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  const getStatusInfo = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return { label: 'Đang xử lý', color: '#f59e0b', icon: <Clock size={16} /> };
      case 'confirmed':
        return { label: 'Đã xác nhận', color: '#3b82f6', icon: <CheckCircle size={16} /> };
      case 'completed':
        return { label: 'Hoàn thành', color: '#10b981', icon: <CheckCircle size={16} /> };
      case 'cancelled':
        return { label: 'Đã hủy', color: '#ef4444', icon: <XCircle size={16} /> };
      default:
        return { label: status || 'Chờ xử lý', color: '#64748b', icon: <Clock size={16} /> };
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '8rem 0', textAlign: 'center' }}>
        <div className="loader" style={{ margin: '0 auto' }}></div>
        <p style={{ marginTop: '2rem', color: 'var(--text-muted)' }}>Đang tải lịch sử đơn hàng...</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <div className="section-title" style={{ textAlign: 'left', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem' }}>Lịch sử đơn hàng</h2>
        <p style={{ color: 'var(--text-muted)' }}>Chào {user?.fullName || user?.FullName}, đây là danh sách các đơn hàng bạn đã đặt.</p>
      </div>

      {error ? (
        <div style={{ background: '#fef2f2', color: '#b91c1c', padding: '2rem', borderRadius: '1.5rem', textAlign: 'center' }}>
          <p>{error}</p>
        </div>
      ) : orders.length === 0 ? (
        <div style={{ background: 'white', padding: '5rem 2rem', borderRadius: '2rem', textAlign: 'center', border: '1px solid var(--border)' }}>
          <div style={{ background: 'var(--secondary)', width: '100px', height: '100px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
            <ShoppingBag size={50} color="var(--primary)" />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Bạn chưa có đơn hàng nào</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Hãy khám phá các món bánh ngon của chúng mình nhé!</p>
          <button onClick={() => navigate('/products')} className="cart-btn" style={{ display: 'inline-flex', padding: '1rem 2rem' }}>
            Mua sắm ngay
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {orders.map((order) => {
            const status = getStatusInfo(order.status);
            return (
              <div key={order.orderId || order.OrderId} className="order-card animate-in" style={{
                background: 'white',
                borderRadius: '2rem',
                padding: '2rem',
                border: '1px solid var(--border)',
                boxShadow: '0 5px 15px rgba(0,0,0,0.02)',
                transition: 'var(--transition)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <div style={{ background: 'var(--secondary)', padding: '1.2rem', borderRadius: '1.2rem' }}>
                      <Package size={28} color="var(--primary)" />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Đơn hàng #{order.orderId || order.OrderId}</h3>
                      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Calendar size={16} />
                          {new Date(order.ngayBan).toLocaleDateString('vi-VN')}
                        </span>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <CreditCard size={16} />
                          {order.paymentStatus === 'Paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ 
                      padding: '0.5rem 1rem', 
                      borderRadius: '1rem', 
                      background: `${status.color}15`, 
                      color: status.color,
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      {status.icon}
                      {status.label}
                    </div>
                    <ChevronRight size={20} color="var(--border)" />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem' }}>
                   <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {/* Show preview of items if available */}
                      {order.orderDetails?.slice(0, 3).map((item, idx) => (
                        <div key={idx} style={{ width: '45px', height: '45px', borderRadius: '0.8rem', background: '#f8fafc', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700 }}>
                          x{item.soLuong}
                        </div>
                      ))}
                      {order.orderDetails?.length > 3 && (
                        <div style={{ padding: '0.8rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          +{order.orderDetails.length - 3} món khác
                        </div>
                      )}
                   </div>
                   <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Tổng thanh toán</p>
                      <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>{order.tongTien.toLocaleString()}đ</p>
                   </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;
