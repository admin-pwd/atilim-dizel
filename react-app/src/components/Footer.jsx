import React from 'react';
import { Settings, MapPin } from 'lucide-react';
import { useData } from '../context/DataContext';
import { DIRECTIONS_URL } from '../lib/sheets';

export default function Footer({ onNavigate }) {
  const { generalInfo } = useData();
  const siteName = generalInfo.siteName || 'Atılım Dizel';
  const address = generalInfo.address || '';
  const phone = generalInfo.phone || '';
  const phoneHref = generalInfo.phoneHref || 'tel:';
  const email = generalInfo.email || '';
  const workWeekday = generalInfo.workHoursWeekday || '';
  const workSaturday = generalInfo.workHoursSaturday || '';
  const workSunday = generalInfo.workHoursSunday || '';

  return (
    <footer className="bg-black text-slate-400 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Settings className="text-blue-600" size={24} />
              <h2 className="text-xl font-bold text-white">
                {siteName.split(' ')[0]}
                <span className="text-blue-600">{siteName.split(' ').slice(1).join(' ') || ''}</span>
              </h2>
            </div>
            <p className="text-sm">Modern dizel teknolojileri için güvenilir çözüm ortağınız.</p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Hızlı Erişim</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button type="button" onClick={() => onNavigate('/')} className="hover:text-blue-500 cursor-pointer">
                  Ana Sayfa
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('/hizmetler')} className="hover:text-blue-500 cursor-pointer">
                  Hizmetlerimiz
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('/iletisim')} className="hover:text-blue-500 cursor-pointer">
                  İletişim
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Hizmetler</h3>
            <ul className="space-y-2 text-sm">
              <li>Enjektör Tamiri</li>
              <li>Pompa Revizyonu</li>
              <li>Partikül Temizleme</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Konum</h3>
            <p className="text-sm mb-4">{address || 'Yeni Sanayi Sitesi, Çorlu / Tekirdağ'}</p>
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded text-sm transition-colors border border-slate-700 hover:border-slate-500"
            >
              <MapPin size={16} /> Yol Tarifi Al
            </a>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 flex flex-wrap gap-4 justify-center md:justify-between text-xs text-slate-500">
          {phone && (
            <a href={phoneHref} className="hover:text-blue-400">
              {phone}
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`} className="hover:text-blue-400">
              {email}
            </a>
          )}
          {(workWeekday || workSaturday || workSunday) && (
            <span>
              {[workWeekday, workSaturday, workSunday].filter(Boolean).join(' | ')}
            </span>
          )}
          <span>&copy; {new Date().getFullYear()} {siteName}. Tüm hakları saklıdır.</span>
        </div>
      </div>
    </footer>
  );
}
