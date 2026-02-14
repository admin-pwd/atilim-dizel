import React from 'react';
import { useData } from '../context/DataContext';

export default function About() {
  const { generalInfo } = useData();
  const aboutTitle = generalInfo.aboutTitle || '30 Yıllık Tecrübe, Değişmeyen Güven';
  const aboutText = generalInfo.aboutText || '';

  const paragraphs = aboutText ? aboutText.split(/\n\n+/).filter(Boolean) : [
    '1994 yılında küçük bir atölyede başlayan yolculuğumuz, bugün Trakya\'nın en kapsamlı dizel yakıt sistemleri servisi olarak devam etmektedir. Kurulduğumuz günden beri tek bir hedefimiz var: Müşterimizin aracını, kendi aracımız gibi benimsemek.',
    'Teknolojiyi yakından takip eden firmamız, bünyesinde bulundurduğu Bosch EPS 815, Bosch EPS 205 ve Hartridge test cihazları ile dünya standartlarında hizmet vermektedir. Ustalarımız periyodik olarak Almanya ve İstanbul merkezli eğitimlere katılarak sertifikalarını güncellemektedir.',
    'Dizel teknolojilerindeki en son yenilikleri anında servisimize entegre ederek, bölgenin referans noktası olmaya devam etmek.',
  ];

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-blue-500 font-bold tracking-widest uppercase mb-3 text-sm">HAKKIMIZDA</h2>
          <h3 className="text-4xl font-bold text-white mb-8">{aboutTitle}</h3>
          <div className="prose prose-invert prose-lg text-slate-400">
            {paragraphs.map((p, i) => (
              <p key={i} className="mb-6">{p}</p>
            ))}
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4">
            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-blue-500">
              <h5 className="text-white font-bold mb-1">TSE 12047</h5>
              <p className="text-sm text-slate-500">Hizmet Yeterlilik Belgesi</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-blue-500">
              <h5 className="text-white font-bold mb-1">MYK Belgesi</h5>
              <p className="text-sm text-slate-500">Mesleki Yeterlilik Kurumu Onaylı</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
