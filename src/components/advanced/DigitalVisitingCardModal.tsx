import React, { useState } from 'react';
import { CreditCard, Phone, MessageCircle, Share2, QrCode, Download, X } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/printingData';

interface DigitalVisitingCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'hi';
}

export const DigitalVisitingCardModal: React.FC<DigitalVisitingCardModalProps> = ({ isOpen, onClose, lang }) => {
  const [cardData, setCardData] = useState({
    name: 'Rajesh Kumar',
    businessName: 'Patna Print Hub',
    mobile: BUSINESS_INFO.phonePrimary,
    whatsapp: BUSINESS_INFO.phonePrimary,
    address: 'Kazipur Gali, Patna, Bihar',
    services: 'Flex Banner, Visiting Cards, Glow Signs',
    email: 'contact@patnaprint.com',
  });

  if (!isOpen) return null;

  const handleShare = () => {
    const text = `*Digital Visiting Card - ${cardData.businessName}*\n\n` +
      `👤 *Name:* ${cardData.name}\n` +
      `📞 *Mobile:* ${cardData.mobile}\n` +
      `📍 *Address:* ${cardData.address}\n` +
      `🛠️ *Services:* ${cardData.services}\n\n` +
      `_Created via PRINT X PRESS Digital Card Maker_`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 relative shadow-2xl overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
              <CreditCard className="w-3.5 h-3.5" />
              <span>Digital Business Card</span>
            </div>
            <h2 className="text-2xl font-black text-white">
              {lang === 'en' ? 'Digital Visiting Card Maker' : 'डिजिटल विज़िटिंग कार्ड मेकर'}
            </h2>
            <p className="text-xs text-slate-400">
              {lang === 'en'
                ? 'Create and share interactive digital business cards instantly via WhatsApp & QR.'
                : 'व्हाट्सएप और क्यूआर के माध्यम से तुरंत इंटरैक्टिव डिजिटल बिजनेस कार्ड बनाएं और साझा करें।'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Form Inputs */}
            <div className="space-y-3 bg-slate-900/60 border border-slate-800 rounded-2xl p-5 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Your Name</label>
                <input
                  type="text"
                  value={cardData.name}
                  onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Business Name</label>
                <input
                  type="text"
                  value={cardData.businessName}
                  onChange={(e) => setCardData({ ...cardData, businessName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Mobile / WhatsApp Number</label>
                <input
                  type="text"
                  value={cardData.mobile}
                  onChange={(e) => setCardData({ ...cardData, mobile: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Address & Location</label>
                <input
                  type="text"
                  value={cardData.address}
                  onChange={(e) => setCardData({ ...cardData, address: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Services Offered</label>
                <input
                  type="text"
                  value={cardData.services}
                  onChange={(e) => setCardData({ ...cardData, services: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Digital Card Preview */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Live Digital Card Preview</span>
                
                {/* Card Graphic */}
                <div className="aspect-[16/10] w-full bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 rounded-2xl border border-blue-500/30 p-6 mt-3 shadow-2xl flex flex-col justify-between text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
                  <div>
                    <h3 className="text-lg font-black text-white">{cardData.businessName}</h3>
                    <p className="text-[11px] text-blue-400 font-semibold">{cardData.services}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{cardData.name}</p>
                    <p className="text-[11px] text-slate-300">📞 {cardData.mobile}</p>
                    <p className="text-[11px] text-slate-400">📍 {cardData.address}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-slate-800">
                <a
                  href={`tel:${cardData.mobile}`}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  <span>Call</span>
                </a>
                <a
                  href={`https://wa.me/91${cardData.mobile.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
                <button
                  onClick={handleShare}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
