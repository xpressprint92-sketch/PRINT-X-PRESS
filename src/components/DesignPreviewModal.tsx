import React, { useState, useRef } from 'react';
import { X, Upload, Eye, Image as ImageIcon, MessageCircle, Check, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/printingData';

interface DesignPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'hi';
}

type PreviewMockup = 'billboard' | 'standee' | 'mug' | 'tshirt';

export const DesignPreviewModal: React.FC<DesignPreviewModalProps> = ({ isOpen, onClose, lang }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedMockup, setSelectedMockup] = useState<PreviewMockup>('billboard');
  const [bannerText, setBannerText] = useState<string>('Grand Opening 50% Off');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
    }
  };

  const sampleDesigns = [
    { label: 'Shop Offer Banner', text: 'BIG SALE! Up to 50% Off' },
    { label: 'Doctor Clinic Board', text: 'Dr. Sharma Clinic · MBBS, MD' },
    { label: 'Coaching Institute', text: 'Admissions Open 2026-27' },
    { label: 'Wedding Entry Gate', text: 'Welcome to Wedding Celebration' },
  ];

  const handleSendWhatsApp = () => {
    let msg = `Hi PRINT X PRESS! I would like to print a custom design for: ${selectedMockup.toUpperCase()}.\n`;
    if (bannerText) {
      msg += `Design Title / Text: "${bannerText}"\n`;
    }
    msg += `I have my artwork ready. Please guide me on file transfer and rates in Patna.`;
    window.open(`https://wa.me/917481068602?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>{lang === 'en' ? 'Live Artwork & Mockup Preview' : 'लाइव डिजाइन प्रीव्यू टूल'}</span>
            </h3>
            <p className="text-xs text-slate-400">
              {lang === 'en'
                ? 'Upload your artwork or preview sample text on different print mockups'
                : 'अपना डिजाइन अपलोड करें और देखें कि वह बोर्ड या मग पर कैसा दिखेगा'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          
          {/* Mockup Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {(
              [
                { id: 'billboard', label: 'Outdoor Billboard' },
                { id: 'standee', label: 'Roll-Up Standee' },
                { id: 'mug', label: 'Coffee Mug' },
                { id: 'tshirt', label: 'Branded T-Shirt' },
              ] as { id: PreviewMockup; label: string }[]
            ).map((mock) => (
              <button
                key={mock.id}
                onClick={() => setSelectedMockup(mock.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedMockup === mock.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {mock.label}
              </button>
            ))}
          </div>

          {/* Interactive Visual Canvas */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center p-6 shadow-inner">
            
            {/* Billboard Mockup */}
            {selectedMockup === 'billboard' && (
              <div className="w-full max-w-lg aspect-[2/1] bg-slate-800 border-4 border-slate-700 rounded shadow-2xl relative overflow-hidden flex flex-col items-center justify-center p-4">
                {/* Structural truss elements */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-slate-700 flex justify-between px-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400/80 mt-0.5" />
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400/80 mt-0.5" />
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400/80 mt-0.5" />
                </div>

                {uploadedImage ? (
                  <img src={uploadedImage} alt="Uploaded Artwork" className="w-full h-full object-contain" />
                ) : (
                  <div className="text-center p-4">
                    <div className="text-xl sm:text-2xl font-black text-amber-300 uppercase tracking-tight">
                      {bannerText}
                    </div>
                    <div className="text-xs text-slate-300 mt-1 font-medium">
                      printxpress FLEX PRINTING · JEHANABAD · 7481068602
                    </div>
                  </div>
                )}

                {/* Eyelets dots around edges */}
                <div className="absolute bottom-1 left-2 text-[9px] text-slate-500 font-mono">
                  Star Flex 340 GSM · Weatherproof
                </div>
              </div>
            )}

            {/* Standee Mockup */}
            {selectedMockup === 'standee' && (
              <div className="h-full aspect-[1/2] bg-slate-900 border-2 border-slate-700 rounded-sm relative flex flex-col items-center justify-between p-3 shadow-2xl">
                {/* Top aluminum clip */}
                <div className="w-full h-2 bg-slate-400 rounded-sm mb-1" />

                {uploadedImage ? (
                  <img src={uploadedImage} alt="Uploaded Artwork" className="w-full h-full object-contain" />
                ) : (
                  <div className="text-center space-y-2 my-auto">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 mx-auto flex items-center justify-center font-bold text-xs">
                      UF
                    </div>
                    <div className="text-sm font-bold text-white px-2">{bannerText}</div>
                    <div className="text-[10px] text-slate-400">Portable Pull-up Roll-up Standee</div>
                  </div>
                )}

                {/* Bottom aluminum base */}
                <div className="w-[120%] h-3 bg-slate-400 rounded-sm shadow-md mt-1" />
              </div>
            )}

            {/* Coffee Mug Mockup */}
            {selectedMockup === 'mug' && (
              <div className="relative flex items-center">
                <div className="w-36 h-44 rounded-b-3xl rounded-t-lg bg-gradient-to-r from-slate-200 via-white to-slate-300 shadow-2xl border border-slate-400 flex flex-col items-center justify-center p-3 text-slate-900 text-center relative overflow-hidden">
                  <div className="absolute top-1 left-1 right-1 h-3 rounded-full bg-slate-300/40 border border-slate-400" />
                  {uploadedImage ? (
                    <img src={uploadedImage} alt="Uploaded Artwork" className="w-full h-28 object-contain" />
                  ) : (
                    <div className="p-2 space-y-1">
                      <div className="text-xs font-black text-blue-700">{bannerText}</div>
                      <div className="text-[9px] text-slate-600 font-semibold">PRINT X PRESS</div>
                    </div>
                  )}
                </div>
                {/* Mug Handle */}
                <div className="w-8 h-24 border-4 border-l-0 border-slate-300 rounded-r-2xl -ml-1" />
              </div>
            )}

            {/* T-Shirt Mockup */}
            {selectedMockup === 'tshirt' && (
              <div className="relative w-44 aspect-[1/1] bg-slate-800 rounded-2xl border border-slate-700 flex flex-col items-center justify-center shadow-2xl p-4">
                {/* Collar */}
                <div className="absolute top-0 w-16 h-5 rounded-b-full bg-slate-950 border-b border-slate-700" />
                {uploadedImage ? (
                  <img src={uploadedImage} alt="Uploaded Artwork" className="w-20 h-20 object-contain mt-2" />
                ) : (
                  <div className="text-center p-2 mt-2">
                    <div className="text-xs font-extrabold text-blue-400 uppercase">{bannerText}</div>
                    <div className="text-[9px] text-slate-400">DTF Custom Print</div>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Controls: Upload or text edit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Upload file */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                {lang === 'en' ? 'Upload Your Design File' : 'अपना डिजाइन अपलोड करें'}
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 px-4 rounded-xl bg-slate-950 border border-dashed border-slate-700 hover:border-blue-500 text-xs font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Upload className="w-4 h-4 text-blue-400" />
                <span>{uploadedImage ? 'Change Uploaded Image' : 'Select Artwork (JPG / PNG)'}</span>
              </button>
            </div>

            {/* Custom preview text */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                {lang === 'en' ? 'Or Preview With Text' : 'या टेक्स्ट लिखकर देखें'}
              </label>
              <input
                type="text"
                value={bannerText}
                onChange={(e) => setBannerText(e.target.value)}
                placeholder="Enter sample title..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Sample quick presets */}
          <div>
            <span className="block text-xs font-medium text-slate-400 mb-1.5">Quick sample texts:</span>
            <div className="flex flex-wrap gap-2">
              {sampleDesigns.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setBannerText(s.text);
                    setUploadedImage(null);
                  }}
                  className="px-2.5 py-1 rounded-md text-[11px] bg-slate-950 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            {uploadedImage ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Artwork Loaded
              </span>
            ) : (
              <span>CDR / AI / PDF / JPG files accepted</span>
            )}
          </div>

          <button
            onClick={handleSendWhatsApp}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-slate-950" />
            <span>{lang === 'en' ? 'Send to WhatsApp for Printing' : 'प्रिंट के लिए व्हाट्सएप भेजें'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
