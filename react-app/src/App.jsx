import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingActionButtons from './components/FloatingActionButtons';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const navigateTo = (path) => {
    navigate(path);
    closeMenu();
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      <Header
        activePath={location.pathname}
        onNavigate={navigateTo}
        isMenuOpen={isMenuOpen}
        onMenuToggle={setIsMenuOpen}
      />
      <main>
        <Routes>
          <Route path="/" element={<Home onNavigate={navigateTo} />} />
          <Route path="/hizmetler" element={<Services />} />
          <Route path="/kurumsal" element={<About />} />
          <Route path="/iletisim" element={<Contact />} />
        </Routes>
      </main>
      <Footer onNavigate={navigateTo} />
      <FloatingActionButtons />
    </div>
  );
}
