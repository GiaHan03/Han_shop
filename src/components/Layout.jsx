import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AIChatAssistant from './AIChatAssistant';

const Layout = ({ children, cartCount, openCart, favoritesCount, user, onLogout }) => {
  return (
    <div className="shop-app">
      <Navbar 
        cartCount={cartCount} 
        openCart={openCart} 
        favoritesCount={favoritesCount} 
        user={user}
        onLogout={onLogout}
      />
      <main style={{ minHeight: '60vh' }}>
        {children}
      </main>
      <Footer />
      <AIChatAssistant />
    </div>
  );
};

export default Layout;
