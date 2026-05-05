import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { ChevronLeft, ShoppingBag, Heart, Star, ShieldCheck, Truck } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const ProductDetail = ({ addToCart, favorites, toggleFavorite, allProducts }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await api.products.getById(id);
        setProduct(data);
        
        // Find related products (same category, excluding current)
        if (allProducts.length > 0 && data) {
          const related = allProducts
            .filter(p => p.category?.tenDanhMuc === data.category?.tenDanhMuc && p.productId !== data.productId)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (err) {
        console.error('Failed to fetch product', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id, allProducts]);

  if (loading) return <div style={{ textAlign: 'center', padding: '10rem' }}>Đang tải thông tin sản phẩm...</div>;
  if (!product) return <div style={{ textAlign: 'center', padding: '10rem' }}>Không tìm thấy sản phẩm.</div>;

  const isFavorite = favorites.some(f => f.productId === product.productId);

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'var(--text-muted)', marginBottom: '2rem' }}>
        <ChevronLeft size={20} />
        Quay lại cửa hàng
      </Link>

      <div className="product-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '5rem' }}>
        <div className="animate-in">
          <img 
            src={product.hinhAnh || 'https://via.placeholder.com/600'} 
            alt={product.tenBanh} 
            style={{ width: '100%', height: '500px', objectFit: 'cover', borderRadius: '2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
          />
        </div>

        <div className="animate-in" style={{ animationDelay: '0.1s' }}>
          <span style={{ color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
            {product.category?.tenDanhMuc}
          </span>
          <h1 style={{ fontSize: '3rem', margin: '1rem 0' }}>{product.tenBanh}</h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
             <div style={{ display: 'flex', color: '#fbbf24' }}>
                <Star size={18} fill="#fbbf24" />
                <Star size={18} fill="#fbbf24" />
                <Star size={18} fill="#fbbf24" />
                <Star size={18} fill="#fbbf24" />
                <Star size={18} fill="#fbbf24" />
             </div>
             <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>(24 đánh giá)</span>
          </div>

          <p style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '2rem' }}>
            {product.gia.toLocaleString()}đ
          </p>

          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: '1.8' }}>
            {product.moTa || 'Mỗi chiếc bánh tại Gia Han Bakery đều được làm thủ công từ những nguyên liệu tươi ngon nhất, mang đến hương vị ngọt ngào và tinh tế cho bạn và những người thân yêu.'}
          </p>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
            <button 
              className="cart-btn" 
              style={{ flex: 1, padding: '1.2rem', fontSize: '1.1rem', justifyContent: 'center' }}
              onClick={() => addToCart(product)}
            >
              <ShoppingBag size={20} />
              Thêm vào giỏ hàng
            </button>
            <button 
              onClick={() => toggleFavorite(product)}
              style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '1.5rem', 
                border: '1px solid var(--border)', 
                background: 'white', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'var(--transition)'
              }}
            >
              <Heart size={24} color="#ff85a2" fill={isFavorite ? "#ff85a2" : "none"} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', padding: '2rem', background: 'var(--secondary)', borderRadius: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
               <div style={{ background: 'white', padding: '0.5rem', borderRadius: '0.75rem' }}>
                  <Truck size={20} color="var(--primary)" />
               </div>
               <div>
                  <h4 style={{ fontSize: '0.9rem' }}>Giao nhanh</h4>
                  <p style={{ fontSize: '0.75rem', opacity: 0.6 }}>Trong 30-60 phút</p>
               </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
               <div style={{ background: 'white', padding: '0.5rem', borderRadius: '0.75rem' }}>
                  <ShieldCheck size={20} color="var(--primary)" />
               </div>
               <div>
                  <h4 style={{ fontSize: '0.9rem' }}>Chất lượng</h4>
                  <p style={{ fontSize: '0.75rem', opacity: 0.6 }}>Tươi ngon mỗi ngày</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section style={{ marginBottom: '5rem' }}>
          <div className="section-title" style={{ textAlign: 'left', margin: '4rem 0 2rem' }}>
            <h2>Sản phẩm liên quan</h2>
            <p>Có thể bạn cũng sẽ thích những món bánh này</p>
          </div>
          <div className="product-grid">
            {relatedProducts.map(p => (
              <ProductCard 
                key={p.productId} 
                product={p} 
                addToCart={addToCart} 
                isFavorite={favorites.some(f => f.productId === p.productId)}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
