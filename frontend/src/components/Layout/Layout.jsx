import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

const Layout = ({ children }) => {
  const location = useLocation();
  
  // Don't show navbar/footer on auth pages
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);
  
  return (
    <div className="min-h-screen flex flex-col">
      {!isAuthPage && <Navbar />}
      <main className={`flex-1 ${!isAuthPage ? 'pt-20' : ''}`}>
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

export default Layout;