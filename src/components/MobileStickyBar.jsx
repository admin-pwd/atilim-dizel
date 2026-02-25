import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function MobileStickyBar() {
  const { generalInfo } = useData();
  const phoneHref = generalInfo.phoneHref || 'tel:';
  const whatsapp = generalInfo.whatsapp || '';
  const whatsappMsg = generalInfo.whatsappMsg || 'Merhaba, randevu almak istiyorum.';
  const cleanWhatsapp = whatsapp ? String(whatsapp).replace(/\s+/g, '').replace(/[()\-]/g, '') : '';
  const whatsappUrl = cleanWhatsapp
    ? `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(whatsappMsg)}`
    : 'https://wa.me/905321234567';

  return (
    <div className="fixed bottom-0 w-full flex md:hidden z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="flex-1 bg-green-500 text-white font-bold text-base flex items-center justify-center gap-2 py-4 active:bg-green-600 transition-colors"
      >
        <MessageCircle size={22} />
        <span>WhatsApp</span>
      </a>
      <a
        href={phoneHref}
        className="flex-1 bg-orange-500 text-white font-bold text-base flex items-center justify-center gap-2 py-4 active:bg-orange-600 transition-colors"
      >
        <Phone size={22} />
        <span>Hemen Ara</span>
      </a>
    </div>
  );
}
