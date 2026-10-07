import React, { useState } from 'react';
import { QrCode, Globe, MessageCircle, ShoppingBag, FileText, X, Download } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/printingData';

interface QrCodeGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'hi';
}

export const QrCodeGeneratorModal: React.FC<QrCodeGeneratorModalProps> = ({ isOpen, onClose, lang }) => {
  const [activeTab, setActiveTab] = useState<'website' | 'whatsapp' | 'order' | 'quote'>('website');

  if (!isOpen) return null;

  const qrData = {
    website: {
      title: lang === 'en' ? 'Official Website QR' : 'आधिकारिक वेबसाइट क्यूआर',
      desc: lang === 'en' ? 'Scan to visit Print X Press web portal instantly.' : 'वेब पोर्टल पर जाने के लिए स्कैन करें।',
      url: window.location.origin,
    },
    whatsapp: {
      title: lang === 'en' ? 'WhatsApp Direct Chat QR' : 'व्हाट्सएप चैट क्यूआर',
      desc: lang === 'en' ? 'Scan to chat with our printing experts on WhatsApp.' : 'व्हाट्सएप पर चैट करने के लिए स्कैन करें।',
      url: `https://wa.me/${BUSINESS_INFO.phonePrimary.replace('+', '')}`,
    },
    order: {
      title: lang === 'en' ? 'Online Order QR' : 'ऑनलाइन आर्डर क्यूआर',
      desc: lang === 'en' ? 'Scan to open the instant pricing calculator & order portal.' : 'आर्डर कैलकुलेटर खोलने के लिए स्कैन करें।',
      url: `${window.location.origin}/#calculator`,
    },
    quote: {
      title: lang === 'en' ? 'Quote Request QR' : 'कोटेशन रिक्वेस्ट क्यूआर',
      desc: lang === 'en' ? 'Scan to upload your print requirements and files.' : 'कोटेशन और फाइल अपलोड करने के लिए स्कैन करें।',
      url: `${window.location.origin}/#quote-section`,
    },
  };

  const current = qrData[activeTab];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6 text-center">
          <div className="space-y-1">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
              {lang === 'en' ? 'Scan & Order System' : 'स्कैन एंड आर्डर सिस्टम'}
            </span>
            <h2 className="text-2xl font-black text-white">
              {lang === 'en' ? 'Print X Press QR Codes' : 'प्रिंट एक्स प्रेस क्यूआर कोड'}
            </h2>
            <p className="text-xs text-slate-400">
              {lang === 'en'
                ? 'Use these QR codes on shop banners, visiting cards, bills, or packaging for instant access.'
                : 'दुकान के बैनर, विजिटिंग कार्ड या पैकेजिंग के लिए इन क्यूआर कोड का उपयोग करें।'}
            </p>
          </div>

          {/* Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'website', label: 'Website', icon: <Globe className="w-3.5 h-3.5" /> },
              { id: 'whatsapp', label: 'WhatsApp', icon: <MessageCircle className="w-3.5 h-3.5" /> },
              { id: 'order', label: 'Order', icon: <ShoppingBag className="w-3.5 h-3.5" /> },
              { id: 'quote', label: 'Quote', icon: <FileText className="w-3.5 h-3.5" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* QR Card Display */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white">{current.title}</h3>
            <p className="text-xs text-slate-400">{current.desc}</p>

            {/* Simulated High-Res QR Code Box */}
            <div className="w-48 h-48 mx-auto bg-white rounded-2xl p-4 flex items-center justify-center shadow-lg border-4 border-slate-900 relative group">
              <div className="absolute inset-2 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center p-2 text-center bg-slate-50">
                <QrCode className="w-24 h-24 text-slate-900" />
                <span className="text-[10px] font-black text-blue-600 mt-1">PRINT X PRESS</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-400 truncate bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              {current.url}
            </div>

            <button
              onClick={() => alert(lang === 'en' ? 'QR Code downloaded successfully!' : 'क्यूआर कोड सफलतापूर्वक डाउनलोड हो गया!')}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>{lang === 'en' ? 'Download QR Code Image' : 'क्यूआर कोड डाउनलोड करें'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
