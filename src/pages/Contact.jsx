import React, { useState } from 'react';
import { MapPin, Phone, Clock, CheckCircle, Navigation } from 'lucide-react';
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

  const mapEmbed = generalInfo.mapEmbed || '';
  const hasCustomEmbed = mapEmbed && (mapEmbed.includes('<iframe') || mapEmbed.includes('embed'));

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-orange-500 font-bold tracking-widest uppercase mb-3 text-sm">İLETİŞİM</h2>
          <h3 className="text-4xl font-bold text-white mb-6 text-balance">Bize Ulaşın</h3>
          <p className="text-slate-400">Sorularınız için bizi arayabilir veya atölyemizi ziyaret edebilirsiniz.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="space-y-6">
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 flex items-start gap-4">
              <div className="bg-orange-500 p-3 rounded text-white shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-2">Adres</h4>
                <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">{address}</p>
                <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="text-orange-400 text-sm mt-2 inline-block hover:underline">
                  Yol tarifi al
                </a>
              </div>
            </div>
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 flex items-start gap-4">
              <div className="bg-orange-500 p-3 rounded text-white shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-2">Telefon</h4>
                <a href={phoneHref} className="text-slate-400 text-sm hover:text-orange-400">{phone || '\u2014'}</a>
              </div>
            </div>
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 flex items-start gap-4">
              <div className="bg-orange-500 p-3 rounded text-white shrink-0">
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
            <h4 className="text-white font-bold text-xl mb-6">{"Randevu & Bilgi Formu"}</h4>

            {formSent ? (
              <div className="flex flex-col items-center justify-center min-h-[300px] text-center py-12">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle size={48} className="text-green-500" />
                </div>
                <p className="text-green-400 text-xl font-bold mb-2">Talebiniz alındı!</p>
                <p className="text-slate-300 text-lg">{"Ustamız 30 dakika içinde dönüş yapacaktır."}</p>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Adınız Soyadınız"
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="Telefon"
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-colors"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Araç Bilgisi"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-colors"
                />
                <textarea
                  rows="4"
                  placeholder="Mesajınız"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-colors resize-none"
                />
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-4 px-8 rounded-xl w-full transition-colors shadow-lg shadow-orange-500/20"
                >
                  Teklif Al
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Map with Get Directions Overlay */}
        <section className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-800" aria-label="Konum">
          <div className="aspect-[21/9] min-h-[300px] w-full relative">
            {hasCustomEmbed ? (
              <div className="absolute inset-0 grayscale [&>iframe]:absolute [&>iframe]:inset-0 [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0" dangerouslySetInnerHTML={{ __html: mapEmbed }} />
            ) : (
              <iframe
                src={DEFAULT_EMBED}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Atılım Dizel konum"
                className="absolute inset-0 w-full h-full min-h-[300px]"
              />
            )}
            {/* Get Directions Overlay Button */}
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white hover:bg-slate-100 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl flex items-center gap-3 transition-all hover:scale-105"
            >
              <Navigation size={22} className="text-orange-500" />
              Yol Tarifi Al
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
