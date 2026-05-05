import React from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, CheckCircle } from 'lucide-react';

const Cart = ({ 
  isOpen, 
  onClose, 
  cart, 
  updateQuantity, 
  removeFromCart, 
  checkoutStep, 
  setCheckoutStep, 
  customerInfo, 
  setCustomerInfo, 
  paymentMethod, 
  setPaymentMethod, 
  handleCheckout,
  cartTotal 
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="cart-modal animate-in" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem' }}>{checkoutStep === 3 ? 'Thanh toán' : 'Giỏ hàng của bạn'}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
            <ShoppingBag size={64} style={{ marginBottom: '1rem' }} />
            <p>Giỏ hàng đang trống</p>
          </div>
        ) : (
          <>
            <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem' }}>
              {checkoutStep === 1 && cart.map(item => (
                <div key={item.productId} className="cart-item">
                  <img src={item.hinhAnh} alt={item.tenBanh} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ marginBottom: '0.25rem' }}>{item.tenBanh}</h4>
                    <p style={{ color: 'var(--primary)', fontWeight: 600 }}>{item.gia.toLocaleString()}đ</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--secondary)', padding: '0.25rem 0.75rem', borderRadius: '1rem' }}>
                         <button onClick={() => updateQuantity(item.productId, -1)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Minus size={14} /></button>
                         <span style={{ fontWeight: 600 }}>{item.quantity}</span>
                         <button onClick={() => updateQuantity(item.productId, 1)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Plus size={14} /></button>
                      </div>
                      <button onClick={() => removeFromCart(item.productId)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {checkoutStep === 2 && (
                <div className="checkout-form" style={{ padding: '1rem 0' }}>
                  <h3 style={{ marginBottom: '1.5rem' }}>Thông tin giao hàng</h3>
                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Họ tên khách hàng</label>
                    <input 
                      type="text" 
                      style={{ width: '100%', padding: '0.8rem', borderRadius: '0.75rem', border: '1px solid var(--border)' }}
                      value={customerInfo.ten}
                      onChange={e => setCustomerInfo({...customerInfo, ten: e.target.value})}
                      placeholder="Nhập tên của bạn"
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Số điện thoại</label>
                    <input 
                      type="text" 
                      style={{ width: '100%', padding: '0.8rem', borderRadius: '0.75rem', border: '1px solid var(--border)' }}
                      value={customerInfo.soDienThoai}
                      onChange={e => setCustomerInfo({...customerInfo, soDienThoai: e.target.value})}
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Địa chỉ giao hàng</label>
                    <textarea 
                      style={{ width: '100%', padding: '0.8rem', borderRadius: '0.75rem', border: '1px solid var(--border)', minHeight: '80px' }}
                      value={customerInfo.diaChi}
                      onChange={e => setCustomerInfo({...customerInfo, diaChi: e.target.value})}
                      placeholder="Nhập địa chỉ nhận bánh"
                    ></textarea>
                  </div>
                </div>
              )}

              {checkoutStep === 3 && (
                <div style={{ padding: '1rem 0' }}>
                  <h3 style={{ marginBottom: '1.5rem' }}>Chọn phương thức thanh toán</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <label style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '1rem', 
                      padding: '1.25rem', 
                      border: '2px solid', 
                      borderColor: paymentMethod === 'COD' ? 'var(--primary)' : 'var(--border)',
                      borderRadius: '1.25rem',
                      cursor: 'pointer',
                      background: paymentMethod === 'COD' ? 'rgba(255, 133, 162, 0.05)' : 'white'
                    }}>
                      <input type="radio" name="payment" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} />
                      <div>
                        <p style={{ fontWeight: 700 }}>Thanh toán khi nhận hàng (COD)</p>
                        <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>Trả tiền mặt khi bánh được giao đến</p>
                      </div>
                    </label>

                    <label style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '1rem', 
                      padding: '1.25rem', 
                      border: '2px solid', 
                      borderColor: paymentMethod === 'Bank' ? 'var(--primary)' : 'var(--border)',
                      borderRadius: '1.25rem',
                      cursor: 'pointer',
                      background: paymentMethod === 'Bank' ? 'rgba(255, 133, 162, 0.05)' : 'white'
                    }}>
                      <input type="radio" name="payment" checked={paymentMethod === 'Bank'} onChange={() => setPaymentMethod('Bank')} />
                      <div>
                        <p style={{ fontWeight: 700 }}>Chuyển khoản ngân hàng (QR Code)</p>
                        <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>Quét mã QR để thanh toán nhanh</p>
                      </div>
                    </label>
                  </div>

                  {paymentMethod === 'Bank' && (
                    <div style={{ marginTop: '2rem', textAlign: 'center', padding: '1.5rem', background: '#f8fafc', borderRadius: '1.5rem' }}>
                      <p style={{ marginBottom: '1rem', fontWeight: 600 }}>Quét mã để thanh toán {cartTotal.toLocaleString()}đ</p>
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PAYMENT_FOR_ORDER_${cartTotal}`} 
                        alt="Payment QR" 
                        style={{ width: '180px', height: '180px', borderRadius: '1rem', border: '8px solid white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      />
                      <p style={{ marginTop: '1rem', fontSize: '0.75rem', opacity: 0.6 }}>Chủ TK: NGUYEN DU GIA HAN <br /> STK: 123456789 - Vietcombank</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontWeight: 600 }}>Tổng tiền:</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>{cartTotal.toLocaleString()}đ</span>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                {checkoutStep > 1 && (
                  <button className="btn" style={{ flex: 1, padding: '1.2rem', borderRadius: '2rem', border: '1px solid var(--border)', background: 'none', cursor: 'pointer' }} onClick={() => setCheckoutStep(checkoutStep - 1)}>
                    Quay lại
                  </button>
                )}
                
                {checkoutStep === 1 && (
                  <button className="cart-btn" style={{ flex: 1, padding: '1.2rem' }} onClick={() => setCheckoutStep(2)}>
                    Tiếp theo
                  </button>
                )}

                {checkoutStep === 2 && (
                  <button className="cart-btn" style={{ flex: 1, padding: '1.2rem' }} onClick={() => setCheckoutStep(3)}>
                    Tiếp theo
                  </button>
                )}

                {checkoutStep === 3 && (
                  <button className="cart-btn" style={{ flex: 2, padding: '1.2rem' }} onClick={handleCheckout}>
                    Xác nhận thanh toán
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
