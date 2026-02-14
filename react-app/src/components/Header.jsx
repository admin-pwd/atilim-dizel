import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, Settings } from 'lucide-react';
import { useData } from '../context/DataContext';

const NAV = [
  { path: '/', label: 'Ana Sayfa' },
  { path: '/hizmetler', label: 'Hizmetler' },
  { path: '/kurumsal', label: 'Kurumsal' },
  { path: '/iletisim', label: 'İletişim' },
];

export default function Header({ activePath, onNavigate, isMenuOpen, onMenuToggle }) {
  const [scrolled, setScrolled] = useState(false);
  const { generalInfo } = useData();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const siteName = generalInfo.siteName || 'ATILIM DIZEL';
  const phone = generalInfo.phone || '';
  const phoneHref = generalInfo.phoneHref || 'tel:';

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-900/90 shadow-lg shadow-blue-900/20 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-20">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="cursor-pointer flex items-center gap-2 group text-left"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center transform group-hover:rotate-180 transition-transform duration-500 shadow-lg shadow-blue-600/20 border border-white/10">
              <Settings className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tighter">
                {siteName.split(' ')[0]}
                <span className="text-blue-500">{siteName.split(' ').slice(1).join(' ') || ''}</span>
              </h1>
              <p className="text-[10px] text-slate-400 tracking-widest uppercase">Pompa & Enjektör Servisi</p>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {NAV.map(({ path, label }) => (
              <button
                key={path}
                type="button"
                onClick={() => onNavigate(path)}
                className={`text-sm font-medium uppercase tracking-wider hover:text-blue-400 transition-colors relative group ${
                  activePath === path ? 'text-blue-500' : 'text-slate-300'
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full ${
                    activePath === path ? 'w-full' : ''
                  }`}
                />
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href={phoneHref}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded font-bold transition-all transform hover:scale-105 shadow-lg shadow-blue-600/30 ring-2 ring-blue-600/50 hover:ring-blue-500"
            >
              <Phone size={18} />
              <span>{phone || 'Ara'}</span>
            </a>
          </div>

          <button
            type="button"
            className="md:hidden text-white hover:text-blue-500 transition-colors p-2"
            onClick={() => onMenuToggle(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-xl absolute w-full border-t border-slate-800 shadow-2xl min-h-[50vh] z-50">
          <div className="flex justify-end p-4">
            <button type="button" onClick={() => onMenuToggle(false)} className="text-slate-400 hover:text-white p-2">
              <X size={28} />
            </button>
          </div>
          <div className="flex flex-col p-4 gap-4">
            {NAV.map(({ path, label }) => (
              <button
                key={path}
                type="button"
                onClick={() => onNavigate(path)}
                className={`text-left text-lg font-medium py-4 border-b border-slate-800/50 ${
                  activePath === path ? 'text-blue-500' : 'text-slate-300'
                }`}
              >
                {label}
              </button>
            ))}
            <a
              href={phoneHref}
              className="bg-gradient-to-r from-blue-600 to-blue-500 text-white w-full py-4 rounded-xl font-bold flex justify-center items-center gap-2 mt-4 shadow-lg shadow-blue-600/20 active:scale-95 transition-transform"
            >
              <Phone size={20} /> Hemen Ara
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
