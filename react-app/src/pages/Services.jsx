import React from 'react';
import { Fuel, Settings, Wrench, Shield, PenTool, Clock, ChevronRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';

const FALLBACK_ICONS = [Fuel, Settings, Shield, PenTool, Wrench, Clock];

export default function Services() {
  const { services } = useData();
  const navigate = useNavigate();
  const list = Array.isArray(services) && services.length > 0 ? services : [
    { title: 'Enjektör Tamiri', desc: 'Common Rail enjektörlerin kodlanması, temizliği ve ayarı.', photoUrl: '' },
    { title: 'Pompa Revizyonu', desc: 'Yüksek basınç pompalarının conta değişimi ve testleri.', photoUrl: '' },
    { title: 'DPF Temizliği', desc: 'Partikül filtresi ve katalizörlerin makine ile temizlenmesi.', photoUrl: '' },
    { title: 'Turbo Bakımı', desc: 'Turbo şarj sistemlerinin balans ayarı ve mil değişimi.', photoUrl: '' },
    { title: 'Arıza Tespit', desc: 'Orijinal diyagnostik cihazlarla nokta atışı arıza tespiti.', photoUrl: '' },
    { title: 'Yakıt Sistem Temizliği', desc: 'Depo temizliği ve komple yakıt hattı flushing işlemleri.', photoUrl: '' },
  ];

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-blue-500 font-bold tracking-widest uppercase mb-3 text-sm">TÜM HİZMETLERİMİZ</h2>
          <h3 className="text-4xl font-bold text-white mb-6">Aracınız İçin Profesyonel Çözümler</h3>
          <p className="text-slate-400">En son teknoloji diyagnostik cihazlar ve test tezgahları ile A'dan Z'ye dizel sistem çözümleri sunuyoruz.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((svc, i) => {
            const Icon = FALLBACK_ICONS[i % FALLBACK_ICONS.length];
            const photoUrl = svc.photoUrl || 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&q=80&w=800';
            return (
              <div
                key={svc.title}
                className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden hover:border-blue-500 transition-all hover:-translate-y-1 group"
              >
                <div className="aspect-video w-full overflow-hidden bg-slate-700">
                  <img
                    src={photoUrl}
                    alt={svc.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-8">
                  <div className="w-14 h-14 bg-slate-700 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors border border-white/5">
                    <Icon className="text-blue-500 group-hover:text-white transition-colors" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{svc.title}</h3>
                  <p className="text-slate-400 mb-6">{svc.desc}</p>
                  <button
                    type="button"
                    onClick={() => navigate('/iletisim')}
                    className="text-blue-500/80 font-bold flex items-center gap-2 hover:gap-3 transition-all text-sm group-hover:text-blue-400"
                  >
                    Detaylı Bilgi <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
