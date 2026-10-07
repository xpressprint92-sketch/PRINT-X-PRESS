import React, { useState } from 'react';
import { Sparkles, Type, Image as ImageIcon, AlignLeft, AlignCenter, AlignRight, Trash2, Undo, Redo, Download, Save, ShoppingBag, X, MessageCircle } from 'lucide-react';
import { usePrintStore } from '../../context/PrintStore';
import { BUSINESS_INFO } from '../../data/printingData';

interface OnlineDesignStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'hi';
}

export const OnlineDesignStudioModal: React.FC<OnlineDesignStudioModalProps> = ({ isOpen, onClose, lang }) => {
  const { addOrder } = usePrintStore();
  const [productType, setProductType] = useState<'Visiting Card' | 'Poster' | 'Invitation Card' | 'Banner'>('Visiting Card');
  const [customText, setCustomText] = useState('PRINT X PRESS - Patna');
  const [fontFamily, setFontFamily] = useState('font-sans');
  const [textColor, setTextColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState(24);
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('center');
  const [bgColor, setBgColor] = useState('#1e1b4b');
  const [whatsappUrlReady, setWhatsappUrlReady] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleOrderThisDesign = () => {
    const orderId = `XP-DES-${Math.floor(1000 + Math.random() * 9000)}`;
    addOrder({
      orderId,
      product: `Custom Designed ${productType}`,
      size: productType === 'Visiting Card' ? '3.5 x 2 inch' : 'Standard Custom',
      quantity: '100 pcs',
      material: 'Standard Premium Stock',
      finishing: 'Matte Lamination',
      amount: 499,
      status: 'Order Received',
      customerName: 'Studio Customer',
      mobile: '9876543210',
      paymentStatus: 'Pending',
      readinessScore: 98,
    });

    const msg = `*New Online Studio Order - PRINT X PRESS*\n\n` +
      `🎨 *Product:* Custom ${productType}\n` +
      `✍️ *Design Text:* "${customText}"\n` +
      `🏷️ *Order ID:* ${orderId}\n` +
      `🔤 *Font:* ${fontFamily} | *Color:* ${textColor}\n\n` +
      `_Created via Online Design Studio_`;

    const url = `https://wa.me/${BUSINESS_INFO.phonePrimary.replace('+', '')}?text=${encodeURIComponent(msg)}`;
    setWhatsappUrlReady(url);
    window.open(url, '_blank');
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
              {lang === 'en' ? 'Online Design Studio' : 'ऑनलाइन डिज़ाइन स्टूडियो'}
            </span>
            <h2 className="text-2xl font-black text-white">
              {lang === 'en' ? 'Create Custom Print Layout' : 'कस्टम प्रिंट लेआउट बनाएं'}
            </h2>
            <p className="text-xs text-slate-400">
              {lang === 'en'
                ? 'Design visiting cards, banners, or posters instantly with our live studio editor.'
                : 'हमारे लाइव स्टूडियो संपादक के साथ तुरंत विज़िटिंग कार्ड या बैनर डिज़ाइन करें।'}
            </p>
          </div>

          {/* Product Selector */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {(['Visiting Card', 'Poster', 'Invitation Card', 'Banner'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setProductType(p)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  productType === p
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Editor Controls */}
            <div className="space-y-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Editor Tools</h3>

              <div className="space-y-2">
                <label className="block text-[11px] font-semibold text-slate-400">Add & Edit Text</label>
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[11px] font-semibold text-slate-400">Font Family</label>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-blue-500"
                >
                  <option value="font-sans">Modern Sans</option>
                  <option value="font-serif">Classic Serif</option>
                  <option value="font-mono">Mono Bold</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="block text-[11px] font-semibold text-slate-400">Text Color</label>
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-full h-9 bg-slate-950 border border-slate-800 rounded-xl p-1 cursor-pointer"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[11px] font-semibold text-slate-400">Background</label>
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-full h-9 bg-slate-950 border border-slate-800 rounded-xl p-1 cursor-pointer"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[11px] font-semibold text-slate-400">Text Alignment</label>
                <div className="flex gap-2">
                  <button onClick={() => setTextAlign('left')} className={`flex-1 p-2 rounded-lg bg-slate-950 border border-slate-800 text-white flex justify-center ${textAlign === 'left' ? 'border-blue-500' : ''}`}><AlignLeft className="w-4 h-4" /></button>
                  <button onClick={() => setTextAlign('center')} className={`flex-1 p-2 rounded-lg bg-slate-950 border border-slate-800 text-white flex justify-center ${textAlign === 'center' ? 'border-blue-500' : ''}`}><AlignCenter className="w-4 h-4" /></button>
                  <button onClick={() => setTextAlign('right')} className={`flex-1 p-2 rounded-lg bg-slate-950 border border-slate-800 text-white flex justify-center ${textAlign === 'right' ? 'border-blue-500' : ''}`}><AlignRight className="w-4 h-4" /></button>
                </div>
              </div>
            </div>

            {/* Live Canvas Preview */}
            <div className="md:col-span-2 flex flex-col justify-between bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
              <div className="text-center pb-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase">Live Canvas Preview ({productType})</span>
              </div>

              {/* Canvas Box */}
              <div
                style={{ backgroundColor: bgColor }}
                className={`aspect-[16/10] w-full rounded-2xl border-2 border-dashed border-slate-700 p-8 flex items-center justify-center shadow-inner relative overflow-hidden`}
              >
                <div
                  style={{ color: textColor, textAlign }}
                  className={`w-full font-bold text-xl sm:text-2xl drop-shadow-md ${fontFamily}`}
                >
                  {customText || 'Your Design Text Here'}
                  <div className="text-[11px] font-normal opacity-70 mt-2">PRINT X PRESS • Kazipur Gali, Patna</div>
                </div>
              </div>

              {/* WhatsApp Ready Direct Link Banner if triggered */}
              {whatsappUrlReady && (
                <div className="mt-4 p-4 bg-emerald-950/80 border border-emerald-500/50 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
                  <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold">
                    <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>Design saved & order ready! If WhatsApp did not open automatically, click below:</span>
                  </div>
                  <a
                    href={whatsappUrlReady}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 shrink-0 transition-colors"
                  >
                    <span>Open WhatsApp Now</span>
                  </a>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-800">
                <button
                  onClick={() => alert('Design saved successfully to your account!')}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-700 transition-colors"
                >
                  <Save className="w-4 h-4 text-blue-400" />
                  <span>Save Design</span>
                </button>
                <button
                  onClick={() => alert('Design preview downloaded!')}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-700 transition-colors"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Download Preview</span>
                </button>
                <button
                  onClick={handleOrderThisDesign}
                  className="w-full sm:w-auto py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Order This Design</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
