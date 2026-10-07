import React from 'react';
import { MessageCircle, Phone, Calculator } from 'lucide-react';
import { BUSINESS_INFO } from '../data/printingData';

interface FloatingWhatsAppBarProps {
  lang: 'en' | 'hi';
  onOpenCalculator: () => void;
  onOpenDashboard?: () => void;
}

export const FloatingWhatsAppBar: React.FC<FloatingWhatsAppBarProps> = ({
  lang,
  onOpenCalculator,
  onOpenDashboard,
}) => {
  const whatsappUrl = `https://wa.me/917481068602?text=${encodeURIComponent(
    lang === 'en'
      ? 'Hello PRINT X PRESS! I would like to place an order or get a quote.'
      : 'नमस्ते उत्तम फ्लेक्स प्रिंटिंग! मुझे प्रिंटिंग के लिए आर्डर या कोटेशन चाहिए।'
  )}`;

  return (
    <>
      {/* Desktop Floating WhatsApp Button (Bottom Right) */}
      <aside aria-label="Quick contact" className="hidden md:flex fixed bottom-6 right-6 z-40 items-center gap-3">
        <button
          onClick={onOpenCalculator}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-white text-xs font-bold border border-slate-700 shadow-xl backdrop-blur-md transition-transform hover:scale-105 cursor-pointer"
        >
          <Calculator className="w-4 h-4 text-blue-400" />
          <span>{lang === 'en' ? 'Quick Rate Calc' : 'रेट कैलकुलेटर'}</span>
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-2xl shadow-emerald-500/30 transition-transform hover:scale-105 cursor-pointer"
          aria-label="Chat with PRINT X PRESS on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-slate-950" />
          <span>{lang === 'en' ? 'WhatsApp Order' : 'व्हाट्सएप ऑर्डर'}</span>
        </a>
      </aside>

      {/* Mobile Sticky Bottom Bar: Call, WhatsApp, Get Quote, Dashboard */}
      <aside aria-label="Mobile quick actions" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-2 py-2 flex items-center justify-between gap-1 shadow-2xl">
        <a
          href={`tel:${BUSINESS_INFO.phonePrimary}`}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-bold text-white hover:bg-slate-800"
        >
          <Phone className="w-3.5 h-3.5 text-blue-400 mb-0.5" />
          <span>{lang === 'en' ? 'Call' : 'कॉल'}</span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-emerald-950 border border-emerald-800/80 text-[10px] font-bold text-emerald-300 hover:bg-emerald-900"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-400 mb-0.5" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={onOpenCalculator}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-blue-600 text-[10px] font-bold text-white"
        >
          <Calculator className="w-3.5 h-3.5 mb-0.5" />
          <span>{lang === 'en' ? 'Quote' : 'कोट'}</span>
        </button>

        {onOpenDashboard && (
          <button
            onClick={onOpenDashboard}
            className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-purple-950 border border-purple-800 text-[10px] font-bold text-purple-300"
          >
            <span className="text-xs font-black text-purple-400 mb-0.5">👤</span>
            <span>{lang === 'en' ? 'Portal' : 'पोर्टल'}</span>
          </button>
        )}
      </aside>
    </>
  );
};
