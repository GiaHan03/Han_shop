import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal } from 'lucide-react';

const Products = ({ products, categories, loading, addToCart, favorites, toggleFavorite }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('default'); // default, low-high, high-low

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.tenBanh.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category?.tenDanhMuc === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'low-high') return a.gia - b.gia;
    if (sortOrder === 'high-low') return b.gia - a.gia;
    return 0;
  });

  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <div className="section-title">
        <h2>Tất cả sản phẩm</h2>
        <p>Khám phá thế giới bánh ngọt đa dạng của chúng tôi</p>
      </div>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '3rem', 
        gap: '2rem',
        flexWrap: 'wrap',
        background: 'white',
        padding: '1.5rem',
        borderRadius: '1.5rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        border: '1px solid var(--border)'
      }}>
        <div style={{ display: 'flex', flex: 1, minWidth: '300px', position: 'relative' }}>
          <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Tìm kiếm món bánh bạn yêu thích..." 
            style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 3rem', borderRadius: '1rem', border: '1px solid var(--border)', background: '#f8fafc' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <SlidersHorizontal size={18} color="var(--primary)" />
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Sắp xếp:</span>
          </div>
          <select 
            style={{ padding: '0.8rem', borderRadius: '1rem', border: '1px solid var(--border)', background: '#f8fafc', cursor: 'pointer', outline: 'none' }}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">Mặc định</option>
            <option value="low-high">Giá: Thấp đến Cao</option>
            <option value="high-low">Giá: Cao đến Thấp</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '3rem' }}>
        {/* Sidebar Filters */}
        <aside style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
          <h4 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>Danh mục</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button 
              onClick={() => setSelectedCategory('All')}
              style={{ 
                textAlign: 'left', 
                padding: '0.8rem 1.2rem', 
                borderRadius: '0.75rem', 
                border: 'none', 
                background: selectedCategory === 'All' ? 'var(--primary)' : 'transparent',
                color: selectedCategory === 'All' ? 'white' : 'inherit',
                cursor: 'pointer',
                fontWeight: selectedCategory === 'All' ? 600 : 400,
                transition: 'var(--transition)'
              }}
            >
              Tất cả
            </button>
            {categories.map(cat => (
              <button 
                key={cat.categoryId}
                onClick={() => setSelectedCategory(cat.tenDanhMuc)}
                style={{ 
                  textAlign: 'left', 
                  padding: '0.8rem 1.2rem', 
                  borderRadius: '0.75rem', 
                  border: 'none', 
                  background: selectedCategory === cat.tenDanhMuc ? 'var(--primary)' : 'transparent',
                  color: selectedCategory === cat.tenDanhMuc ? 'white' : 'inherit',
                  cursor: 'pointer',
                  fontWeight: selectedCategory === cat.tenDanhMuc ? 600 : 400,
                  transition: 'var(--transition)'
                }}
              >
                {cat.tenDanhMuc}
              </button>
            ))}
          </div>
        </aside>

        {/* Product Grid */}
        <div style={{ flex: 1 }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '5rem' }}>Đang tải sản phẩm...</div>
          ) : sortedProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem' }}>Không tìm thấy sản phẩm nào khớp với tìm kiếm của bạn.</div>
          ) : (
            <div className="product-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
              {sortedProducts.map((p) => (
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
        </div>
      </div>
    </div>
  );
};

export default Products;
