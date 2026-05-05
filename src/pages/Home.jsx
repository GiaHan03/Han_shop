import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import BannerCarousel from '../components/BannerCarousel';

const Home = ({ products, categories, loading, addToCart, favorites, toggleFavorite }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category?.tenDanhMuc === selectedCategory);

  return (
    <>
      {/* Banner Carousel */}
      <BannerCarousel />

      {/* Products Section */}
      <section id="products" className="container">
        <div className="section-title">
          <h2>Bánh ngọt hôm nay</h2>
          <p>Những mẻ bánh thơm ngon nhất vừa ra lò</p>
        </div>

        {/* Category Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          <button 
            className={`btn ${selectedCategory === 'All' ? 'active-tab' : ''}`} 
            style={{ 
              padding: '0.6rem 1.5rem', 
              borderRadius: '2rem', 
              border: '1px solid var(--border)', 
              background: selectedCategory === 'All' ? 'var(--primary)' : 'none', 
              color: selectedCategory === 'All' ? 'white' : 'inherit',
              cursor: 'pointer' 
            }}
            onClick={() => setSelectedCategory('All')}
          >
            Tất cả
          </button>
          {categories.map(cat => (
            <button 
              key={cat.categoryId}
              className={`btn ${selectedCategory === cat.tenDanhMuc ? 'active-tab' : ''}`} 
              style={{ 
                padding: '0.6rem 1.5rem', 
                borderRadius: '2rem', 
                border: '1px solid var(--border)', 
                background: selectedCategory === cat.tenDanhMuc ? 'var(--primary)' : 'none', 
                color: selectedCategory === cat.tenDanhMuc ? 'white' : 'inherit',
                cursor: 'pointer' 
              }}
              onClick={() => setSelectedCategory(cat.tenDanhMuc)}
            >
              {cat.tenDanhMuc}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem' }}>Đang nướng bánh...</div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((p) => (
              <ProductCard 
                key={p.productId} 
                product={p} 
                addToCart={addToCart} 
                isFavorite={favorites.some(f => f.productId === p.productId)}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Home;
