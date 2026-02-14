import React, { useState } from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import { useData } from '../context/DataContext';
import { DIRECTIONS_URL } from '../lib/sheets';

const DEFAULT_EMBED = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24265.795!2d27.839888293549183!3d41.14724384144144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b4b7e0c2e8f8f%3A0x0!2zQ8O2cmx1!5e0!3m2!1str!2str!4v1';

export default function Contact() {
  const { generalInfo } = useData();
  const [formSent, setFormSent] = useState(false);

  const address = generalInfo.address || 'Yeni Sanayi Sitesi, 2. Kısım 24. Sokak, Çorlu / Tekirdağ';
  const phone = generalInfo.phone || '';
  const phoneHref = generalInfo.phoneHref || 'tel:';
  const email = generalInfo.email || '';
  const workWeekday = generalInfo.workHoursWeekday || '08:30 - 19:30';
  const workSaturday = generalInfo.workHoursSaturday || '';
  const workSunday = generalInfo.workHoursSunday || '';

  // Harita: Sheets'teki harita_embed (iframe HTML) varsa kullan, yoksa varsayılan embed src ile iframe
  const mapEmbed = generalInfo.mapEmbed || '';
  const hasCustomEmbed = mapEmbed && (mapEmbed.includes('<iframe') || mapEmbed.includes('embed'));

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 3000);
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-blue-500 font-bold tracking-widest uppercase mb-3 text-sm">İLETİŞİM</h2>
          <h3 className="text-4xl font-bold text-white mb-6">Bize Ulaşın</h3>
          <p className="text-slate-400">Sorularınız için bizi arayabilir veya atölyemizi ziyaret edebilirsiniz.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="space-y-6">
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 flex items-start gap-4">
              <div className="bg-blue-600 p-3 rounded text-white shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-2">Adres</h4>
                <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">{address}</p>
                <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm mt-2 inline-block hover:underline">
                  Yol tarifi al
                </a>
              </div>
            </div>
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 flex items-start gap-4">
              <div className="bg-blue-600 p-3 rounded text-white shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-2">Telefon</h4>
                <a href={phoneHref} className="text-slate-400 text-sm hover:text-blue-400">{phone || '—'}</a>
              </div>
            </div>
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 flex items-start gap-4">
              <div className="bg-blue-600 p-3 rounded text-white shrink-0">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-2">Çalışma Saatleri</h4>
                <p className="text-slate-400 text-sm">Hafta içi: {workWeekday}</p>
                {workSaturday && <p className="text-slate-400 text-sm">Cumartesi: {workSaturday}</p>}
                {workSunday && <p className="text-slate-400 text-sm">Pazar: {workSunday}</p>}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-slate-800 p-8 rounded-xl border border-slate-700">
            <h4 className="text-white font-bold text-xl mb-6">Randevu & Bilgi Formu</h4>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Adınız Soyadınız"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Telefon"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <input
                type="text"
                placeholder="Araç Bilgisi"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
              <textarea
                rows="4"
                placeholder="Mesajınız"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-xl w-full transition-colors shadow-lg"
              >
                {formSent ? 'Gönderildi' : 'Gönder'}
              </button>
            </form>
          </div>
        </div>

        {/* Harita: Sheets'ten gelen embed HTML veya varsayılan iframe */}
        <section className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-800" aria-label="Konum">
          <div className="aspect-[21/9] min-h-[300px] w-full relative">
            {hasCustomEmbed ? (
              <div className="absolute inset-0 [&>iframe]:absolute [&>iframe]:inset-0 [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0" dangerouslySetInnerHTML={{ __html: mapEmbed }} />
            ) : (
              <iframe
                src={DEFAULT_EMBED}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Atılım Dizel konum"
                className="absolute inset-0 w-full h-full min-h-[300px]"
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
