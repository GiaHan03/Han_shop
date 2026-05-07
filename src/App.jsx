import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { api } from './services/api';
import { CheckCircle } from 'lucide-react';

// Components
import Layout from './components/Layout';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Wishlist from './pages/Wishlist';
import Contact from './pages/Contact';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PaymentCallback from './pages/PaymentCallback';
import Orders from './pages/Orders';
import Profile from './pages/Profile';

function AppContent() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('bakery-cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('bakery-favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('bakery-user');
    return saved ? JSON.parse(saved) : null;
  });
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('bakery-cart');
  };
  const [loading, setLoading] = useState(true);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [customerInfo, setCustomerInfo] = useState({ ten: '', soDienThoai: '', diaChi: '' });
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pData, cData] = await Promise.all([
          api.products.getAll(),
          api.categories.getAll()
        ]);
        setProducts(pData);
        setCategories(cData);
      } catch (err) {
        console.error('Failed to fetch data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('bakery-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('bakery-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('bakery-user', JSON.stringify(user));
      // Auto-fill customer info if logged in
      setCustomerInfo(prev => ({
        ...prev,
        ten: user.fullName || user.FullName || prev.ten,
        soDienThoai: user.phone || user.Phone || prev.soDienThoai,
        diaChi: user.address || user.Address || prev.diaChi
      }));
    } else {
      localStorage.removeItem('bakery-user');
    }
  }, [user]);

  const addToCart = (product) => {
    if (product.soLuong !== undefined && product.soLuong <= 0) {
      alert('Sản phẩm này hiện không còn tồn kho.');
      return;
    }
    const existing = cart.find(item => item.productId === product.productId);
    if (existing) {
      // Kiểm tra xem nếu cộng thêm 1 có vượt quá tồn kho không
      if (product.soLuong !== undefined && existing.quantity + 1 > product.soLuong) {
        alert(`Rất tiếc, chỉ còn ${product.soLuong} sản phẩm trong kho.`);
        return;
      }
      setCart(cart.map(item => item.productId === product.productId ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    navigate('/cart');
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.productId !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart(cart.map(item => {
      if (item.productId === id) {
        const newQty = Math.max(1, item.quantity + delta);
        // Kiểm tra tồn kho khi tăng số lượng
        if (delta > 0 && item.soLuong !== undefined && newQty > item.soLuong) {
          alert(`Rất tiếc, chỉ còn ${item.soLuong} sản phẩm trong kho.`);
          return item;
        }
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const toggleFavorite = (product) => {
    const isFav = favorites.find(f => f.productId === product.productId);
    if (isFav) {
      setFavorites(favorites.filter(f => f.productId !== product.productId));
    } else {
      setFavorites([...favorites, product]);
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.gia * item.quantity, 0);

  const handleCheckout = async (e) => {
    if (e) e.preventDefault();
    
    if (!customerInfo.ten || !customerInfo.soDienThoai || !customerInfo.diaChi) {
      alert('Vui lòng điền đầy đủ thông tin giao hàng');
      setCheckoutStep(2);
      return;
    }

    // Kiểm tra tồn kho trước khi gửi order
    const outOfStockItems = cart.filter(item => {
      return item.soLuong !== undefined && item.soLuong < item.quantity;
    });
    if (outOfStockItems.length > 0) {
      const names = outOfStockItems.map(i => i.tenBanh || i.productId).join(', ');
      alert('Các sản phẩm sau không đủ tồn kho: ' + names);
      return;
    }

    try {
      let cid;
      // Nếu đã đăng nhập, dùng luôn customerId của user, không tạo mới
      if (user && (user.customerId || user.CustomerId)) {
        cid = user.customerId || user.CustomerId;
        console.log('Step 1: Using existing customer ID:', cid);
      } else {
        console.log('Step 1: Creating/Verifying customer...');
        const customer = await api.customers.create({
          ten: customerInfo.ten,
          soDienThoai: customerInfo.soDienThoai,
          diaChi: customerInfo.diaChi
        });
        console.log('Customer API Response:', customer);
        setUser(customer); // store new customer for future use
        cid = customer.customerId || customer.CustomerId;
      }
      
      if (!cid) {
        throw new Error('Không lấy được ID khách hàng từ hệ thống.');
      }

      const orderData = {
        customerId: cid,
        ngayBan: new Date().toISOString(),
        tongTien: cartTotal,
        status: 'Pending',
        paymentStatus: paymentMethod === 'Bank' ? 'Paid' : 'Unpaid',
        orderDetails: cart.map(item => ({
          productId: item.productId || item.ProductId,
          soLuong: item.quantity,
          gia: item.gia
        }))
      };
      
      console.log('Step 2: Sending order data...', JSON.stringify(orderData, null, 2));
      const response = await api.orders.create(orderData);
      console.log('Order Success Response:', response);
      
      if (paymentMethod === 'VNPay') {
        const orderId = response.orderId || response.OrderId;
        const { url } = await api.vnpay.createPaymentUrl({
          amount: cartTotal,
          orderId: orderId,
          orderInfo: `Thanh toan don hang #${orderId}`
        });
        window.location.href = url;
        return;
      }

      setOrderSuccess(true);
      setCart([]);
      setCheckoutStep(1);
      navigate('/');
    } catch (err) {
      console.error('Checkout failed with error:', err);
      // Try to parse error message if it's a JSON string from backend
      let msg = err.message;
      try {
        if (msg.includes('|')) {
          msg = msg.split('|')[0]; // Get the first part of .NET exception message
        }
      } catch (e) {}
      alert('Lỗi đặt hàng: ' + msg);
    }
  };

  return (
    <>
      <Layout 
        cartCount={cart.length} 
        favoritesCount={favorites.length}
        openCart={() => navigate('/cart')}
        user={user}
        onLogout={handleLogout}
      >
        <Routes>
          <Route path="/" element={
            <Home 
              products={products} 
              categories={categories} 
              loading={loading} 
              addToCart={addToCart} 
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          } />
          <Route path="/products" element={
            <Products 
              products={products} 
              categories={categories} 
              loading={loading} 
              addToCart={addToCart} 
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          } />
          <Route path="/product/:id" element={
            <ProductDetail 
              addToCart={addToCart} 
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              allProducts={products}
            />
          } />
          <Route path="/cart" element={
            <CartPage 
              cart={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              checkoutStep={checkoutStep}
              setCheckoutStep={setCheckoutStep}
              customerInfo={customerInfo}
              setCustomerInfo={setCustomerInfo}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              handleCheckout={handleCheckout}
              cartTotal={cartTotal}
            />
          } />
          <Route path="/wishlist" element={
            <Wishlist 
              favorites={favorites} 
              addToCart={addToCart} 
              toggleFavorite={toggleFavorite} 
            />
          } />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginPage onLoginSuccess={setUser} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/payment-callback" element={<PaymentCallback clearCart={clearCart} />} />
          <Route path="/orders" element={<Orders user={user} allProducts={products} />} />
          <Route path="/profile" element={<Profile user={user} onUpdateUser={setUser} />} />
        </Routes>
      </Layout>

      {/* Order Success Overlay */}
      {orderSuccess && (
        <div className="modal-overlay" style={{ alignItems: 'center', justifyContent: 'center', padding: '1rem', zIndex: 3000 }}>
          <div className="cart-modal animate-in" style={{ height: 'auto', borderRadius: '2rem', textAlign: 'center', padding: '4rem 2rem', maxWidth: '450px' }}>
             <div style={{ width: '80px', height: '80px', background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', color: 'white', boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)' }}>
               <CheckCircle size={40} />
             </div>
             <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Đặt bánh thành công!</h2>
             <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Cảm ơn bạn đã tin tưởng Gia Han Bakery. <br /> Chúng mình sẽ liên hệ giao bánh sớm nhất có thể.</p>
             <button className="cart-btn" style={{ width: '100%', padding: '1.2rem', justifyContent: 'center' }} onClick={() => setOrderSuccess(false)}>
               Tiếp tục mua sắm
             </button>
          </div>
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
