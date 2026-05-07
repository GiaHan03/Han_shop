import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, XCircle, ChevronRight, Package, Calendar, CreditCard } from 'lucide-react';
import { api } from '../services/api';

const PaymentCallback = ({ clearCart }) => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('loading');
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const responseCode = searchParams.get('vnp_ResponseCode');
    const amount = searchParams.get('vnp_Amount');
    const txnRef = searchParams.get('vnp_TxnRef');
    const payDate = searchParams.get('vnp_PayDate');
    const bankCode = searchParams.get('vnp_BankCode');

    if (responseCode === '00') {
      setStatus('success');
      if (clearCart) clearCart();
      // Update payment status in backend
      if (txnRef) {
        api.orders.updatePayment(txnRef, 'Paid').catch(err => {
          console.error('Failed to update payment status:', err);
        });
      }
    } else {
      setStatus('failed');
    }

    setOrderDetails({
      orderId: txnRef,
      amount: parseInt(amount) / 100,
      date: payDate,
      bank: bankCode,
      code: responseCode
    });
  }, [searchParams]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    // Format YYYYMMDDHHMMSS to DD/MM/YYYY HH:MM:SS
    const y = dateStr.substring(0, 4);
    const m = dateStr.substring(4, 6);
    const d = dateStr.substring(6, 8);
    const h = dateStr.substring(8, 10);
    const min = dateStr.substring(10, 12);
    const s = dateStr.substring(12, 14);
    return `${d}/${m}/${y} ${h}:${min}:${s}`;
  };

  return (
    <div className="container" style={{ padding: '8rem 0', maxWidth: '600px' }}>
      <div style={{ 
        background: 'white', 
        borderRadius: '3rem', 
        padding: '4rem 3rem', 
        textAlign: 'center',
        boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
        border: '1px solid var(--border)'
      }}>
        {status === 'success' ? (
          <>
            <div style={{ 
              width: '100px', 
              height: '100px', 
              background: '#10b981', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 2.5rem', 
              color: 'white',
              boxShadow: '0 15px 30px rgba(16, 185, 129, 0.3)'
            }}>
              <CheckCircle size={50} />
            </div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Thanh toán thành công!</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '3rem' }}>
              Cảm ơn bạn đã lựa chọn Gia Han Bakery. Đơn hàng của bạn đang được xử lý.
            </p>
          </>
        ) : (
          <>
            <div style={{ 
              width: '100px', 
              height: '100px', 
              background: '#ef4444', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 2.5rem', 
              color: 'white',
              boxShadow: '0 15px 30px rgba(239, 68, 68, 0.3)'
            }}>
              <XCircle size={50} />
            </div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Thanh toán thất bại</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '3rem' }}>
              Rất tiếc, đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại sau.
            </p>
          </>
        )}

        {orderDetails && (
          <div style={{ 
            background: 'var(--secondary)', 
            borderRadius: '2rem', 
            padding: '2rem', 
            textAlign: 'left',
            marginBottom: '3rem'
          }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Package size={20} color="var(--primary)" /> Chi tiết giao dịch
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                <span style={{ opacity: 0.6 }}>Mã đơn hàng:</span>
                <span style={{ fontWeight: 700 }}>#{orderDetails.orderId}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                <span style={{ opacity: 0.6 }}>Số tiền:</span>
                <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{orderDetails.amount?.toLocaleString()}đ</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                <span style={{ opacity: 0.6 }}>Ngân hàng:</span>
                <span style={{ fontWeight: 700 }}>{orderDetails.bank}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                <span style={{ opacity: 0.6 }}>Thời gian:</span>
                <span style={{ fontWeight: 700 }}>{formatDate(orderDetails.date)}</span>
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/orders" className="cart-btn" style={{ flex: 1, justifyContent: 'center', padding: '1.2rem' }}>
            Xem đơn hàng của tôi
          </Link>
          {status === 'failed' && (
            <Link to="/cart" className="btn" style={{ 
              flex: 1, 
              padding: '1.2rem', 
              borderRadius: '1.5rem', 
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              color: 'var(--text-main)',
              fontWeight: 600
            }}>
              Thử thanh toán lại
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentCallback;
