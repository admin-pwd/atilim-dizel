import React, { useState } from 'react';
import {
  ChevronRight,
  CheckCircle,
  Wrench,
  Shield,
  Clock,
  Check,
  ArrowRight,
  Phone,
  Truck,
  Zap,
  Star,
  MessageCircle,
  Fuel,
  Settings,
  PenTool,
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { DIRECTIONS_URL } from '../lib/sheets';

function AccordionItem({ title, content, isOpen, onClick }) {
  return (
    <div className="border-b border-slate-800">
      <button
        type="button"
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
        onClick={onClick}
      >
        <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-blue-500' : 'text-slate-300 group-hover:text-white'}`}>
          {title}
        </span>
        <div
          className={`p-2 rounded-full transition-all duration-300 ${
            isOpen ? 'bg-blue-600/20 text-blue-500 rotate-180' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
          }`}
        >
          <ChevronRight size={20} className="transform rotate-90" />
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-slate-400 leading-relaxed pr-8 border-l-2 border-blue-500/30 pl-4 ml-1">{content}</p>
      </div>
    </div>
  );
}

function StepCard({ number, title, desc }) {
  return (
    <div className="relative p-6 border-l-2 border-slate-800 hover:border-blue-500 transition-colors pl-8 group">
      <span className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-slate-800 group-hover:bg-blue-500 transition-colors border-2 border-slate-900" />
      <span className="text-6xl font-black text-slate-800 absolute right-4 top-4 opacity-50 group-hover:opacity-10 transition-opacity select-none">
        0{number}
      </span>
      <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{title}</h4>
      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

export default function Home({ onNavigate }) {
  const { generalInfo, services, faqs, reviews, directionsUrl } = useData();
  const [activeAccordion, setActiveAccordion] = useState(null);

  const heroTitle = generalInfo.heroTitle || "Dizel Aracınızın Gerçek Performansı.";
  const heroSubtext = generalInfo.heroSubtext || "30 yıllık tecrübe ve son teknoloji Bosch test cihazlarıyla enjektör, pompa ve turbo revizyonu.";
  const phoneHref = generalInfo.phoneHref || 'tel:';
  const phone = generalInfo.phone || '';

  const displayServices = Array.isArray(services) ? services.slice(0, 4) : [];
  const displayFaqs = Array.isArray(faqs) ? faqs : [];
  const displayReviews = Array.isArray(reviews) ? reviews.slice(0, 3) : [];

  const serviceIcons = [Fuel, Settings, Shield, PenTool];

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.querySelector('input[name="name"]')?.value?.trim() || '';
    const phoneVal = form.querySelector('input[name="phone"]')?.value?.trim() || '';
    const complaint = form.querySelector('textarea')?.value?.trim() || form.querySelector('input[name="complaint"]')?.value?.trim() || '';
    const subject = 'Web Sitesi - Fiyat Teklifi Talebi';
    const body = `İsim Soyisim: ${name}\nTelefon: ${phoneVal}\nAraç Modeli / Şikayet: ${complaint}`;
    window.location.href = `mailto:osmanfaruk21@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      {/* Hero */}
      <div className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-slate-900">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.15) 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
          <div className="absolute right-0 top-0 w-2/3 h-full bg-gradient-to-l from-blue-600/10 to-transparent blur-3xl" />
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="max-w-4xl mx-auto text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-sm font-semibold mb-8 backdrop-blur-sm mx-auto md:mx-0">
              <CheckCircle size={16} className="text-blue-500" /> Trakya'nın Lider Dizel Servisi
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-8 drop-shadow-2xl">
              {heroTitle.includes('\n')
                ? heroTitle.split('\n').map((line, i, arr) => (
                    <span key={i}>
                      {i === arr.length - 1 ? (
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500">{line}</span>
                      ) : (
                        <>{line}<br /></>
                      )}
                    </span>
                  ))
                : <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500">{heroTitle}</span>
              }
            </h1>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto md:mx-0 mt-4">
              {heroSubtext}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                type="button"
                onClick={() => onNavigate('/iletisim')}
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-1 border border-blue-500/50"
              >
                Hemen Randevu Al <ChevronRight size={20} />
              </button>
              <a
                href={directionsUrl || DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/30 px-8 py-4 rounded-xl font-bold text-lg transition-all backdrop-blur-sm text-center inline-flex items-center justify-center gap-2"
              >
                Yol Tarifi
              </a>
              <button
                type="button"
                onClick={() => onNavigate('/hizmetler')}
                className="bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/30 px-8 py-4 rounded-xl font-bold text-lg transition-all backdrop-blur-sm"
              >
                Hizmetleri İncele
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-full bg-slate-900/60 backdrop-blur-md border-t border-white/5 py-8">
          <div className="container mx-auto px-4 flex justify-between items-center overflow-x-auto gap-12 opacity-60 hover:opacity-100 transition-all duration-500">
            {['BOSCH', 'DELPHI', 'SIEMENS', 'DENSO', 'VDO', 'CAT', 'CUMMINS'].map((brand) => (
              <span
                key={brand}
                className="text-xl md:text-2xl font-black text-slate-400 whitespace-nowrap hover:text-blue-400 transition-colors cursor-default tracking-tight"
              >
                {brand} <span className="text-[10px] font-normal align-top text-slate-500">SERVICE</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-20 bg-slate-900 border-b border-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/20 p-8 rounded-2xl border border-white/5 hover:bg-slate-800 hover:border-blue-500/30 transition-all group duration-300">
              <div className="mb-4 text-blue-500 group-hover:scale-110 transition-transform origin-left p-3 bg-blue-500/10 rounded-lg w-fit">
                <Wrench size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Ücretsiz Arıza Tespiti</h3>
              <p className="text-slate-400">Pompa ve enjektörlerinizde ön kontrolü ve bilgisayarlı analizi tamamen ücretsiz yapıyoruz.</p>
            </div>
            <div className="bg-slate-800/20 p-8 rounded-2xl border border-white/5 hover:bg-slate-800 hover:border-blue-500/30 transition-all group duration-300">
              <div className="mb-4 text-blue-500 group-hover:scale-110 transition-transform origin-left p-3 bg-blue-500/10 rounded-lg w-fit">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">1 Yıl Garanti</h3>
              <p className="text-slate-400">Yaptığımız tüm revizyon işlemlerinde ve değişen parçalarda 1 yıl yazılı garanti veriyoruz.</p>
            </div>
            <div className="bg-slate-800/20 p-8 rounded-2xl border border-white/5 hover:bg-slate-800 hover:border-blue-500/30 transition-all group duration-300">
              <div className="mb-4 text-blue-500 group-hover:scale-110 transition-transform origin-left p-3 bg-blue-500/10 rounded-lg w-fit">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Hızlı Teslimat</h3>
              <p className="text-slate-400">Gelişmiş test tezgahlarımız sayesinde 24 saat içinde onarım ve test işlemlerini tamamlıyoruz.</p>
            </div>
          </div>
        </div>
      </div>

      {/* About Preview */}
      <div className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute left-0 top-0 w-1/3 h-full bg-blue-600/5 skew-x-12 transform -translate-x-1/2 blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: '30+', label: 'Yıllık Tecrübe', sub: 'Sektörde güvenilirlik' },
                  { num: '10K+', label: 'Tamir Edilen Parça', sub: 'Pompa & Enjektör' },
                  { num: '%98', label: 'Müşteri Memnuniyeti', sub: 'Google Yorumları' },
                  { num: '7/24', label: 'Destek Hattı', sub: 'Acil durumlar için' },
                ].map((item) => (
                  <div
                    key={item.num}
                    className="bg-slate-800/80 backdrop-blur p-6 rounded-2xl border border-white/5 hover:-translate-y-2 transition-transform duration-500 shadow-xl"
                  >
                    <div className="text-4xl font-bold text-blue-500 mb-2">{item.num}</div>
                    <div className="text-white font-medium">{item.label}</div>
                    <p className="text-slate-500 text-xs mt-2">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-blue-500 font-bold tracking-widest uppercase mb-4 text-sm flex items-center gap-2">
                <span className="w-8 h-1 bg-blue-500 rounded-full" /> KURUMSAL
              </h2>
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
                {generalInfo.aboutTitle || "Motorunuzun Kalbine Profesyonel Dokunuş"}
              </h3>
              <p className="text-slate-400 mb-6 leading-relaxed text-lg">
                {generalInfo.aboutText || "Aracınızın yakıt sistemi, performansın ve ekonominin anahtarıdır. Biz, sadece parça değiştiren değil, sorunun köküne inen ve orijinal fabrika değerlerinde onarım yapan bir teknoloji üssüyüz."}
              </p>
              <ul className="space-y-4 mb-8">
                {['Bosch ve Delphi Yetkili Servis Standartları', 'TSE 12047 Hizmet Yeterlilik Belgesi', 'Son Teknoloji EPS Test Tezgahları'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-300 bg-slate-800/30 p-3 rounded-lg border border-white/5">
                    <div className="p-1 rounded-full bg-blue-500/20 text-blue-400">
                      <Check size={16} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => onNavigate('/kurumsal')}
                className="text-white border-b-2 border-blue-500 pb-1 hover:text-blue-500 transition-colors flex items-center gap-2 group"
              >
                Hikayemizi Okuyun <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Banner */}
      <div className="bg-gradient-to-r from-red-950/80 to-slate-900 border-y border-red-600/30 py-12 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center border-2 border-white/20">
                <Truck size={36} className="text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-2xl font-bold text-white">Yolda mı Kaldınız?</h3>
                  <span className="px-2 py-0.5 bg-red-600 text-white text-xs font-bold rounded">ACİL</span>
                </div>
                <p className="text-red-100/80 text-lg">Ağır vasıta ve ticari araçlar için 7/24 yerinde mobil servis.</p>
              </div>
            </div>
            <a
              href={phoneHref}
              className="bg-red-600 hover:bg-red-500 text-white px-8 py-5 rounded-xl font-bold text-xl transition-all flex items-center gap-3 whitespace-nowrap transform hover:scale-105 border border-red-400/50"
            >
              <Phone size={24} /> Acil Yardım Çağır
            </a>
          </div>
        </div>
      </div>

      {/* Home Services Preview - with photos from Sheets */}
      <div className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-blue-500 font-bold tracking-widest uppercase mb-3 text-sm">HİZMETLERİMİZ</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Neler Yapıyoruz?</h3>
            <p className="text-slate-400">Teknik Dizel olarak binek, hafif ticari ve ağır vasıta araçlar için uçtan uca çözümler sunuyoruz.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayServices.map((svc, i) => {
              const Icon = serviceIcons[i % serviceIcons.length];
              return (
                <div
                  key={svc.title}
                  className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/5 p-0 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all group hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/20"
                >
                  <div className="aspect-video w-full overflow-hidden bg-slate-800">
                    <img
                      src={svc.photoUrl}
                      alt={svc.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors border border-white/5">
                      <Icon className="text-blue-500 group-hover:text-white transition-colors" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{svc.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">{svc.desc || ''}</p>
                    <button
                      type="button"
                      onClick={() => onNavigate('/hizmetler')}
                      className="text-blue-500/80 font-bold flex items-center gap-2 hover:gap-3 transition-all text-sm group-hover:text-blue-400"
                    >
                      Detaylı Bilgi <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <button
              type="button"
              onClick={() => onNavigate('/hizmetler')}
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors border border-slate-700 px-6 py-3 rounded-full hover:bg-slate-800"
            >
              Tüm hizmetleri görüntüle <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Quote */}
      <div className="py-24 bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-blue-900/40 via-slate-900/60 to-slate-900 rounded-[2rem] p-1 border border-blue-500/20 shadow-2xl">
            <div className="bg-slate-900/80 backdrop-blur-xl rounded-[1.9rem] p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[80px]" />
              <div className="grid lg:grid-cols-2 gap-12 relative z-10 items-center">
                <div>
                  <span className="inline-block py-1 px-4 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-6">
                    <span className="flex items-center gap-2">
                      <Zap size={14} className="fill-blue-400" /> ÜCRETSİZ DANIŞMANLIK
                    </span>
                  </span>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    Hızlı Fiyat Teklifi <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">15 Dakikada Cebinizde</span>
                  </h2>
                  <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                    Aracınızın sorununu veya yaptırmak istediğiniz işlemi bize yazın, uzman ustalarımız 15 dakika içinde sizi arayıp tahmini maliyet ve süreç hakkında bilgi versin.
                  </p>
                  <ul className="space-y-4">
                    {['Sürpriz maliyet yok, şeffaf fiyatlandırma', 'Uzman görüşü ile doğru yönlendirme', 'WhatsApp üzerinden hızlı dönüş'].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-slate-300">
                        <div className="bg-green-500/20 p-1 rounded-full">
                          <Check className="text-green-500" size={16} />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <form onSubmit={handleQuoteSubmit} className="bg-slate-800/50 backdrop-blur-md p-8 rounded-2xl border border-white/5">
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-slate-400 text-sm mb-2 font-medium">Adınız Soyadınız</label>
                      <input name="name" type="text" className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl p-3.5 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none" placeholder="Ahmet Yılmaz" />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-sm mb-2 font-medium">Telefon Numaranız</label>
                      <input name="phone" type="tel" className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl p-3.5 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none" placeholder="05XX XXX XX XX" />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-slate-400 text-sm mb-2 font-medium">Araç Bilgisi / Şikayetiniz</label>
                    <textarea name="complaint" className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl p-3.5 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none h-24 resize-none" placeholder="Örn: Ford Transit 2018 - Siyah duman atıyor" />
                  </div>
                  <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2">
                    Teklif İste <ArrowRight size={20} />
                  </button>
                  <p className="text-xs text-slate-500 mt-4 text-center">*Gönderdiğiniz bilgiler KVKK kapsamında korunmaktadır.</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Process */}
      <div className="py-24 bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
              <h2 className="text-blue-500 font-bold tracking-widest uppercase mb-3 text-sm">ÇALIŞMA SİSTEMİ</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Adım Adım Onarım Süreci</h3>
              <p className="text-slate-400 mb-8">Servisimize gelen her parça ve araç, standart bir kalite kontrol sürecinden geçer.</p>
              <button type="button" onClick={() => onNavigate('/iletisim')} className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-bold transition-colors border border-slate-700">
                Süreci Başlat
              </button>
            </div>
            <div className="lg:w-2/3">
              <div className="grid md:grid-cols-2 gap-8">
                <StepCard number="1" title="Kabul ve Ön Test" desc="Aracınız veya parçanız teslim alınır, şikayetiniz dinlenir ve cihazla ilk arıza tespit verileri alınır." />
                <StepCard number="2" title="Ekspertiz ve Onay" desc="Parçalar sökülür, hasar tespiti yapılır. Size net fiyat ve yapılacak işlem listesi sunulur." />
                <StepCard number="3" title="Hassas Onarım" desc="Onayınızla birlikte orijinal yedek parçalar kullanılarak laboratuvar ortamında montaj yapılır." />
                <StepCard number="4" title="Son Kontrol ve Teslim" desc="Test tezgahında fabrika değerlerini veren parça araca takılır, yol testi yapılır ve teslim edilir." />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials - from Sheets reviews */}
      <div className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-5">
          <MessageCircle size={400} className="text-blue-500" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-blue-500 font-bold tracking-widest uppercase mb-3 text-sm">REFERANSLAR</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white">Müşterilerimiz Ne Diyor?</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {displayReviews.length > 0
              ? displayReviews.map((t, i) => (
                  <div key={i} className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-all hover:-translate-y-1">
                    <div className="flex gap-1 mb-4 text-amber-500">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-slate-300 mb-6 italic">&quot;{t.text}&quot;</p>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center font-bold text-blue-500 border border-slate-700">
                        {(t.name || 'Müşteri').charAt(0)}
                      </div>
                      <div>
                        <div className="text-white font-bold text-sm">{t.name || 'Müşteri'}</div>
                      </div>
                    </div>
                  </div>
                ))
              : [
                  { name: 'Ahmet Yılmaz', text: 'Şirket araçlarımızın tüm enjektör bakımlarını burada yaptırıyoruz. Yakıt tasarrufu gözle görülür şekilde arttı.' },
                  { name: 'Mehmet Demir', text: 'Aracım çekişten düşmüştü, gitmediğim usta kalmadı. Sorunu nokta atışı buldu. Allah razı olsun.' },
                  { name: 'Caner Erkin', text: 'Siyah duman şikayetiyle gittim. Çok temiz ve kurumsal bir yer. İşlerini hakkıyla yapıyorlar.' },
                ].map((t, i) => (
                  <div key={i} className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-all hover:-translate-y-1">
                    <div className="flex gap-1 mb-4 text-amber-500">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-slate-300 mb-6 italic">&quot;{t.text}&quot;</p>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center font-bold text-blue-500 border border-slate-700">
                        {t.name.charAt(0)}
                      </div>
                      <div className="text-white font-bold text-sm">{t.name}</div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>

      {/* FAQ - from Sheets */}
      <div className="py-24 bg-slate-900">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-blue-500 font-bold tracking-widest uppercase mb-3 text-sm">S.S.S</h2>
            <h3 className="text-3xl font-bold text-white">Sıkça Sorulan Sorular</h3>
          </div>
          <div className="space-y-2">
            {displayFaqs.length > 0
              ? displayFaqs.map((faq, i) => (
                  <AccordionItem
                    key={faq.question}
                    title={faq.question}
                    content={faq.answer}
                    isOpen={activeAccordion === i}
                    onClick={() => setActiveAccordion(activeAccordion === i ? null : i)}
                  />
                ))
              : (
                <>
                  <AccordionItem
                    title="Arıza tespiti ücretli mi?"
                    content="Hayır, servisimize geldiğinizde aracınızın bilgisayarlı arıza tespitini ve ön kontrollerini tamamen ücretsiz yapıyoruz."
                    isOpen={activeAccordion === 0}
                    onClick={() => setActiveAccordion(activeAccordion === 0 ? null : 0)}
                  />
                  <AccordionItem
                    title="İşlemler ne kadar sürüyor?"
                    content="Enjektör temizliği ve bakımı genellikle aynı gün içerisinde tamamlanır. Pompa revizyonları ise hasar durumuna göre 1-2 iş günü sürebilmektedir."
                    isOpen={activeAccordion === 1}
                    onClick={() => setActiveAccordion(activeAccordion === 1 ? null : 1)}
                  />
                </>
              )}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Aracınızın Performansını Riske Atmayın</h2>
          <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">Geç çalışma, duman atma veya yakıt sarfiyatı sorunlarınız mı var? Hemen ücretsiz ekspertiz için randevu alın.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button type="button" onClick={() => onNavigate('/iletisim')} className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition-colors shadow-xl">
              Hemen Randevu Al
            </button>
            <a href={phoneHref} className="bg-blue-700 text-white border border-blue-500 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-800 transition-colors flex items-center justify-center gap-2">
              <Phone size={20} /> {phone || '0532 123 45 67'}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
