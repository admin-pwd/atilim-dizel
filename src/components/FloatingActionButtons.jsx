import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function FloatingActionButtons() {
  const { generalInfo } = useData();
  const whatsapp = generalInfo.whatsapp || '';
  const whatsappMsg = generalInfo.whatsappMsg || 'Merhaba, randevu almak istiyorum.';
  const cleanWhatsapp = whatsapp ? String(whatsapp).replace(/\s+/g, '').replace(/[()\-]/g, '') : '';
  const whatsappUrl = cleanWhatsapp
    ? `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(whatsappMsg)}`
    : 'https://wa.me/905321234567';

  return (
    <div className="fixed bottom-24 md:bottom-6 right-6 z-40 flex flex-col gap-4">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer text-white animate-pulse"
        aria-label="WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
    </div>
  );
}
