import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, addToCart, isFavorite, toggleFavorite }) => {
  return (
    <div className="product-card animate-in">
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <Link to={`/product/${product.productId}`}>
          <img 
            src={product.hinhAnh || 'https://via.placeholder.com/300'} 
            className="product-img" 
            alt={product.tenBanh} 
            style={{ transition: 'transform 0.5s ease' }}
          />
        </Link>
        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(product);
          }}
          style={{ 
            position: 'absolute', 
            top: '1rem', 
            right: '1rem', 
            background: 'white', 
            border: 'none', 
            padding: '0.6rem', 
            borderRadius: '50%', 
            cursor: 'pointer', 
            display: 'flex',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            zIndex: 10
          }}
        >
          <Heart size={20} color="#ff85a2" fill={isFavorite ? "#ff85a2" : "none"} />
        </button>
      </div>
      <div className="product-info">
        <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
          {product.category?.tenDanhMuc}
        </span>
        <Link to={`/product/${product.productId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3 style={{ margin: '0.5rem 0' }}>{product.tenBanh}</h3>
        </Link>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <span className="product-price">{product.gia.toLocaleString()}đ</span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Còn {product.soLuong} cái</span>
        </div>
        <button className="add-to-cart" onClick={() => addToCart(product)}>
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
