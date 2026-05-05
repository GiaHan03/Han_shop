import React from 'react';
import ProductCard from '../components/ProductCard';
import { Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist = ({ favorites, addToCart, toggleFavorite }) => {
  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <div className="section-title">
        <h2>Mục yêu thích</h2>
        <p>Những món bánh bạn đã "thầm thương trộm nhớ"</p>
      </div>

      {favorites.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem 0' }}>
          <div style={{ background: 'var(--secondary)', width: '100px', height: '100px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
            <Heart size={48} color="var(--primary)" />
          </div>
          <h3>Danh sách yêu thích đang trống</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Hãy dạo quanh cửa hàng và chọn những món bánh bạn thích nhé!</p>
          <Link to="/" className="cart-btn" style={{ display: 'inline-flex', padding: '1rem 2rem' }}>
            Quay lại cửa hàng
          </Link>
        </div>
      ) : (
        <div className="product-grid">
          {favorites.map((p) => (
            <ProductCard 
              key={p.productId} 
              product={p} 
              addToCart={addToCart} 
              isFavorite={true}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
