import React from 'react';
import { ShoppingBag, Trash2, Plus, Minus, CheckCircle, ChevronLeft, CreditCard, Truck, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartPage = ({ 
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
  if (cart.length === 0) {
    return (
      <div className="container" style={{ padding: '8rem 0', textAlign: 'center' }}>
        <div style={{ background: 'var(--secondary)', width: '120px', height: '120px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
          <ShoppingBag size={60} color="var(--primary)" />
        </div>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Giỏ hàng của bạn đang trống</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>Có vẻ như bạn chưa chọn được món bánh nào ưng ý.</p>
        <Link to="/products" className="cart-btn" style={{ display: 'inline-flex', padding: '1.2rem 2.5rem' }}>
          Quay lại cửa hàng
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <div className="section-title" style={{ textAlign: 'left', margin: '0 0 3rem' }}>
        <h2>Giỏ hàng của bạn</h2>
        <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: checkoutStep >= 1 ? 'var(--primary)' : 'var(--text-muted)' }}>
            <span style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}>1</span>
            Giỏ hàng
          </div>
          <div style={{ width: '50px', height: '1px', background: 'var(--border)', alignSelf: 'center' }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: checkoutStep >= 2 ? 'var(--primary)' : 'var(--text-muted)' }}>
            <span style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}>2</span>
            Thông tin
          </div>
          <div style={{ width: '50px', height: '1px', background: 'var(--border)', alignSelf: 'center' }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: checkoutStep >= 3 ? 'var(--primary)' : 'var(--text-muted)' }}>
            <span style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}>3</span>
            Thanh toán
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '4rem' }}>
        {/* Left Side: Cart Items or Forms */}
        <div className="animate-in">
          {checkoutStep === 1 && (
            <div style={{ background: 'white', borderRadius: '2rem', padding: '2rem', border: '1px solid var(--border)' }}>
              {cart.map(item => (
                <div key={item.productId} className="cart-item" style={{ padding: '1.5rem 0', borderBottom: '1px solid var(--border)' }}>
                  <img src={item.hinhAnh} alt={item.tenBanh} style={{ width: '120px', height: '120px' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h3 style={{ fontSize: '1.5rem' }}>{item.tenBanh}</h3>
                      <button onClick={() => removeFromCart(item.productId)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                        <Trash2 size={20} />
                      </button>
                    </div>
                    <p style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '1.2rem', margin: '0.5rem 0' }}>{item.gia.toLocaleString()}đ</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--secondary)', padding: '0.5rem 1rem', borderRadius: '1.5rem' }}>
                         <button onClick={() => updateQuantity(item.productId, -1)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Minus size={18} /></button>
                         <span style={{ fontWeight: 700, fontSize: '1.1rem', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                         <button onClick={() => updateQuantity(item.productId, 1)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Plus size={18} /></button>
                      </div>
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Thành tiền: {(item.gia * item.quantity).toLocaleString()}đ</span>
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: '2rem' }}>
                <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'var(--primary)', fontWeight: 600 }}>
                  <Plus size={18} />
                  Thêm món bánh khác
                </Link>
              </div>
            </div>
          )}

          {checkoutStep === 2 && (
            <div style={{ background: 'white', borderRadius: '2rem', padding: '3rem', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Thông tin nhận hàng</h3>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 600 }}>Họ tên khách hàng</label>
                <input 
                  type="text" 
                  placeholder="Ví dụ: Nguyễn Văn A"
                  style={{ width: '100%', padding: '1.2rem', borderRadius: '1.2rem', border: '1px solid var(--border)', background: '#f8fafc', fontSize: '1rem' }}
                  value={customerInfo.ten}
                  onChange={e => setCustomerInfo({...customerInfo, ten: e.target.value})}
                />
              </div>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 600 }}>Số điện thoại</label>
                <input 
                  type="text" 
                  placeholder="Nhập số điện thoại liên hệ"
                  style={{ width: '100%', padding: '1.2rem', borderRadius: '1.2rem', border: '1px solid var(--border)', background: '#f8fafc', fontSize: '1rem' }}
                  value={customerInfo.soDienThoai}
                  onChange={e => setCustomerInfo({...customerInfo, soDienThoai: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 600 }}>Địa chỉ giao hàng</label>
                <textarea 
                  placeholder="Nhập địa chỉ chi tiết (Số nhà, đường, phường/xã...)"
                  style={{ width: '100%', padding: '1.2rem', borderRadius: '1.2rem', border: '1px solid var(--border)', background: '#f8fafc', fontSize: '1rem', minHeight: '120px' }}
                  value={customerInfo.diaChi}
                  onChange={e => setCustomerInfo({...customerInfo, diaChi: e.target.value})}
                ></textarea>
              </div>
            </div>
          )}

          {checkoutStep === 3 && (
            <div style={{ background: 'white', borderRadius: '2rem', padding: '3rem', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Phương thức thanh toán</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <label style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1.5rem', 
                  padding: '1.5rem', 
                  border: '2px solid', 
                  borderColor: paymentMethod === 'COD' ? 'var(--primary)' : 'var(--border)',
                  borderRadius: '1.5rem',
                  cursor: 'pointer',
                  background: paymentMethod === 'COD' ? 'rgba(255, 133, 162, 0.05)' : 'white',
                  transition: 'var(--transition)'
                }}>
                  <input type="radio" name="payment" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} style={{ width: '20px', height: '20px', accentColor: 'var(--primary)' }} />
                  <div style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '1rem' }}>
                    <Truck size={24} color="var(--primary)" />
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '1.1rem' }}>Thanh toán khi nhận hàng (COD)</p>
                    <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>Bạn sẽ trả tiền mặt khi Shipper giao bánh đến</p>
                  </div>
                </label>

                <label style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1.5rem', 
                  padding: '1.5rem', 
                  border: '2px solid', 
                  borderColor: paymentMethod === 'Bank' ? 'var(--primary)' : 'var(--border)',
                  borderRadius: '1.5rem',
                  cursor: 'pointer',
                  background: paymentMethod === 'Bank' ? 'rgba(255, 133, 162, 0.05)' : 'white',
                  transition: 'var(--transition)'
                }}>
                  <input type="radio" name="payment" checked={paymentMethod === 'Bank'} onChange={() => setPaymentMethod('Bank')} style={{ width: '20px', height: '20px', accentColor: 'var(--primary)' }} />
                  <div style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '1rem' }}>
                    <CreditCard size={24} color="var(--primary)" />
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '1.1rem' }}>Chuyển khoản qua mã QR</p>
                    <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>Thanh toán nhanh chóng, an toàn qua ứng dụng Ngân hàng</p>
                  </div>
                </label>

                <label style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1.5rem', 
                  padding: '1.5rem', 
                  border: '2px solid', 
                  borderColor: paymentMethod === 'VNPay' ? 'var(--primary)' : 'var(--border)',
                  borderRadius: '1.5rem',
                  cursor: 'pointer',
                  background: paymentMethod === 'VNPay' ? 'rgba(255, 133, 162, 0.05)' : 'white',
                  transition: 'var(--transition)'
                }}>
                  <input type="radio" name="payment" checked={paymentMethod === 'VNPay'} onChange={() => setPaymentMethod('VNPay')} style={{ width: '20px', height: '20px', accentColor: 'var(--primary)' }} />
                  <div style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src="https://sandbox.vnpayment.vn/paymentv2/Images/brands/logo-vnpay.png" alt="VNPay" style={{ height: '24px' }} />
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '1.1rem' }}>Thanh toán qua VNPay</p>
                    <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>Ví điện tử, Thẻ ATM, Thẻ quốc tế, QR Pay</p>
                  </div>
                </label>
              </div>

              {paymentMethod === 'Bank' && (
                <div style={{ marginTop: '3rem', textAlign: 'center', padding: '2.5rem', background: '#f8fafc', borderRadius: '2rem', border: '1px dashed var(--border)' }}>
                  <p style={{ marginBottom: '1.5rem', fontWeight: 700, fontSize: '1.2rem' }}>Mã QR thanh toán cho đơn hàng</p>
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PAYMENT_FOR_ORDER_${cartTotal}`} 
                    alt="Payment QR" 
                    style={{ width: '220px', height: '220px', borderRadius: '1.5rem', border: '10px solid white', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                  />
                  <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'white', borderRadius: '1rem', display: 'inline-block', textAlign: 'left' }}>
                    <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}><span style={{ opacity: 0.6 }}>Chủ TK:</span> <strong>NGUYEN DU GIA HAN</strong></p>
                    <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}><span style={{ opacity: 0.6 }}>Số TK:</span> <strong>123456789</strong></p>
                    <p style={{ fontSize: '0.9rem' }}><span style={{ opacity: 0.6 }}>Ngân hàng:</span> <strong>Vietcombank (VCB)</strong></p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Side: Summary */}
        <div className="animate-in" style={{ animationDelay: '0.1s' }}>
          <div style={{ background: 'white', borderRadius: '2rem', padding: '2.5rem', border: '1px solid var(--border)', position: 'sticky', top: '120px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Tóm tắt đơn hàng</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Tạm tính ({cart.length} món)</span>
                <span>{cartTotal.toLocaleString()}đ</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Phí vận chuyển</span>
                <span style={{ color: '#10b981', fontWeight: 600 }}>Miễn phí</span>
              </div>
              <div style={{ height: '1px', background: 'var(--border)', margin: '0.5rem 0' }}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Tổng cộng</span>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>{cartTotal.toLocaleString()}đ</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {checkoutStep === 1 && (
                <button className="cart-btn" style={{ width: '100%', padding: '1.2rem', fontSize: '1.1rem', justifyContent: 'center' }} onClick={() => setCheckoutStep(2)}>
                  Tiếp tục thanh toán
                </button>
              )}

              {checkoutStep === 2 && (
                <>
                  <button className="cart-btn" style={{ width: '100%', padding: '1.2rem', fontSize: '1.1rem', justifyContent: 'center' }} onClick={() => setCheckoutStep(3)}>
                    Tiếp tục đến thanh toán
                  </button>
                  <button className="btn" style={{ width: '100%', padding: '1.2rem', borderRadius: '1.2rem', border: '1px solid var(--border)', background: 'none', cursor: 'pointer' }} onClick={() => setCheckoutStep(1)}>
                    Quay lại giỏ hàng
                  </button>
                </>
              )}

              {checkoutStep === 3 && (
                <>
                  <button className="cart-btn" style={{ width: '100%', padding: '1.2rem', fontSize: '1.1rem', justifyContent: 'center' }} onClick={handleCheckout}>
                    Xác nhận và Đặt hàng
                  </button>
                  <button className="btn" style={{ width: '100%', padding: '1.2rem', borderRadius: '1.2rem', border: '1px solid var(--border)', background: 'none', cursor: 'pointer' }} onClick={() => setCheckoutStep(2)}>
                    Quay lại thông tin
                  </button>
                </>
              )}
            </div>

            <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <ShieldCheck size={18} color="#10b981" />
                Thanh toán an toàn & bảo mật
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <Truck size={18} color="#10b981" />
                Giao hàng nhanh trong ngày
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
