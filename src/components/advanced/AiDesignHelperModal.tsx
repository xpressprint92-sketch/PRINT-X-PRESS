import React, { useState } from 'react';
import { Sparkles, Wand2, Type, Palette, CheckCircle2, X } from 'lucide-react';

interface AiDesignHelperModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'hi';
}

export const AiDesignHelperModal: React.FC<AiDesignHelperModalProps> = ({ isOpen, onClose, lang }) => {
  const [businessName, setBusinessName] = useState('');
  const [purpose, setPurpose] = useState('Visiting Card');
  const [size, setSize] = useState('Standard (3.5 x 2 in)');
  const [style, setStyle] = useState('Modern & Minimal');
  const [color, setColor] = useState('Royal Blue & Gold');
  const [generated, setGenerated] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim()) {
      alert(lang === 'en' ? 'Please enter your business or product name.' : 'कृपया अपना व्यवसाय नाम दर्ज करें।');
      return;
    }
    setGenerated(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gemini AI Design Helper</span>
            </div>
            <h2 className="text-2xl font-black text-white">
              {lang === 'en' ? 'Smart AI Design Suggestions' : 'स्मार्ट एआई डिज़ाइन सुझाव'}
            </h2>
            <p className="text-xs text-slate-400">
              {lang === 'en'
                ? 'Get instant expert layout, font style, and color combination suggestions for your printing project.'
                : 'अपने प्रिंटिंग प्रोजेक्ट के लिए तुरंत विशेषज्ञ लेआउट, फ़ॉन्ट और रंग संयोजन सुझाव प्राप्त करें।'}
            </p>
          </div>

          {!generated ? (
            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300">Business / Brand Name</label>
                <input
                  type="text"
                  placeholder="e.g. Patna Electronics & Mobile"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-300">Design Purpose</label>
                  <select
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-blue-500"
                  >
                    <option value="Visiting Card">Visiting Card</option>
                    <option value="Flex Banner">Flex Banner</option>
                    <option value="Shop Board">Shop Glow Sign Board</option>
                    <option value="Pamphlet / Flyer">Pamphlet / Flyer</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-300">Preferred Style</label>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-blue-500"
                  >
                    <option value="Modern & Minimal">Modern & Minimal</option>
                    <option value="Bold & Eye-Catching">Bold & Eye-Catching (Best for Banners)</option>
                    <option value="Traditional & Elegant">Traditional & Elegant</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-colors"
              >
                <Wand2 className="w-4 h-4" />
                <span>{lang === 'en' ? 'Generate AI Design Recommendation' : 'एआई सुझाव उत्पन्न करें'}</span>
              </button>
            </form>
          ) : (
            <div className="space-y-6 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 animate-fadeIn">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs font-bold text-blue-400">AI Blueprint for {businessName}</span>
                  <h3 className="text-lg font-black text-white">{purpose} ({style})</h3>
                </div>
                <button
                  onClick={() => setGenerated(false)}
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  Edit Inputs
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="space-y-1 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="font-bold text-slate-300 uppercase tracking-wider block text-[11px]">🎨 Recommended Color Palette:</span>
                  <p className="text-slate-200">Deep Royal Blue (#0B192C), Vibrant Gold Accent (#FF6500), and Clean White Background.</p>
                </div>

                <div className="space-y-1 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="font-bold text-slate-300 uppercase tracking-wider block text-[11px]">✍️ Typography & Layout:</span>
                  <p className="text-slate-200">Main Title in Bold Sans-Serif (Montserrat / Poppins Black), Contact details clearly aligned bottom-left with high contrast.</p>
                </div>

                <div className="space-y-1 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="font-bold text-slate-300 uppercase tracking-wider block text-[11px]">📋 Essential Content Checklist:</span>
                  <p className="text-slate-200">1. Brand Logo top center<br/>2. Tagline: "Best Quality Printing in Patna"<br/>3. Phone & WhatsApp primary numbers prominently displayed.</p>
                </div>
              </div>

              <button
                onClick={() => {
                  alert('Design blueprint saved! You can now send this prompt directly to our designer on WhatsApp.');
                  onClose();
                }}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Send Blueprint to Designer on WhatsApp</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
