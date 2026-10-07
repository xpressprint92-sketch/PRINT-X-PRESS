import React, { useState } from 'react';
import { Sparkles, Upload, Image as ImageIcon, ShoppingBag, FileText, X } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/printingData';

interface LiveMockupModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'hi';
  onOpenCalculator: () => void;
}

export const LiveMockupModal: React.FC<LiveMockupModalProps> = ({ isOpen, onClose, lang, onOpenCalculator }) => {
  const [productType, setProductType] = useState<'Banner' | 'Flex' | 'Poster' | 'Visiting Card' | 'Shop Board'>('Banner');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [sizeOption, setSizeOption] = useState('10x4 ft');

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setUploadedImage(uploadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGetPrinted = () => {
    const msg = `*Live Mockup Order - PRINT X PRESS*\n\n` +
      `🖼️ *Product:* ${productType}\n` +
      `📏 *Size:* ${sizeOption}\n` +
      `✅ *Design Mockup:* Attached / Uploaded online\n\n` +
      `_Please proceed with quotation & printing._`;
    const url = `https://wa.me/${BUSINESS_INFO.phonePrimary.replace('+', '')}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-4xl w-full p-6 sm:p-8 relative shadow-2xl overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
              {lang === 'en' ? 'Live Design Mockup' : 'लाइव डिज़ाइन मॉकअप'}
            </span>
            <h2 className="text-2xl font-black text-white">
              {lang === 'en' ? 'Preview Your Design on Real Products' : 'वास्तविक उत्पादों पर अपना डिज़ाइन देखें'}
            </h2>
            <p className="text-xs text-slate-400">
              {lang === 'en'
                ? 'Upload your artwork/logo to see how it looks on flex banners, visiting cards, or shop boards.'
                : 'फ्लेक्स बैनर, विज़िटिंग कार्ड या शॉप बोर्ड पर अपना डिज़ाइन देखने के लिए अपनी कलाकृति अपलोड करें।'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="space-y-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300">1. Select Product Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Banner', 'Flex', 'Poster', 'Visiting Card', 'Shop Board'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setProductType(p)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold transition-colors ${
                        productType === p
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300">2. Select Approximate Size</label>
                <select
                  value={sizeOption}
                  onChange={(e) => setSizeOption(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-blue-500"
                >
                  <option value="10x4 ft">Standard Banner (10 x 4 ft)</option>
                  <option value="8x3 ft">Medium Glow Sign (8 x 3 ft)</option>
                  <option value="Standard Visiting Card (3.5x2 in)">Visiting Card (3.5 x 2 in)</option>
                  <option value="Custom Size">Custom Size (Enter in calculator)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300">3. Upload Artwork / Logo</label>
                <label className="border-2 border-dashed border-slate-700 hover:border-blue-500 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-slate-950/60 transition-colors">
                  <Upload className="w-8 h-8 text-blue-400 mb-2" />
                  <span className="text-xs font-bold text-white">Click to upload logo or design file</span>
                  <span className="text-[10px] text-slate-400 mt-1">Supports CDR, PDF, AI, PNG, JPG</span>
                  <input type="file" onChange={handleFileUpload} className="hidden" accept="image/*,.pdf,.cdr,.ai" />
                </label>
              </div>
            </div>

            {/* Mockup Preview Area */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Realistic Mockup Preview ({productType})</span>
                <div className="aspect-[16/10] w-full bg-slate-950 rounded-2xl border border-slate-800 mt-3 p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
                  {uploadedImage ? (
                    <div className="relative group flex flex-col items-center">
                      <img src={uploadedImage} alt="Uploaded Design" className="max-h-36 object-contain rounded-xl shadow-lg border border-slate-700" />
                      <div className="mt-4 text-center">
                        <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold border border-blue-500/30">
                          Applied to {productType} ({sizeOption})
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center space-y-2">
                      <ImageIcon className="w-12 h-12 text-slate-600 mx-auto" />
                      <p className="text-xs font-semibold text-slate-400">Upload your logo/design to see realistic preview</p>
                      <p className="text-[10px] text-slate-500">PRINT X PRESS Patna Showroom Quality</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    onClose();
                    onOpenCalculator();
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-700 transition-colors"
                >
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span>Get Quote</span>
                </button>
                <button
                  onClick={handleGetPrinted}
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Get This Printed</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
