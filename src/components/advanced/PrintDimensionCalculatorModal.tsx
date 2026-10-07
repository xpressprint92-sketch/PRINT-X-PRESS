import React, { useState } from 'react';
import { Calculator, ArrowRightLeft, X } from 'lucide-react';

interface PrintDimensionCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'hi';
}

export const PrintDimensionCalculatorModal: React.FC<PrintDimensionCalculatorModalProps> = ({ isOpen, onClose, lang }) => {
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(4);
  const [unit, setUnit] = useState<'feet' | 'inches' | 'cm'>('feet');

  if (!isOpen) return null;

  // Convert to square feet
  let sqft = 0;
  if (unit === 'feet') {
    sqft = width * height;
  } else if (unit === 'inches') {
    sqft = (width / 12) * (height / 12);
  } else if (unit === 'cm') {
    sqft = (width / 30.48) * (height / 30.48);
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
              <Calculator className="w-3.5 h-3.5" />
              <span>Dimension Converter</span>
            </div>
            <h2 className="text-2xl font-black text-white">
              {lang === 'en' ? 'Print Area Calculator' : 'प्रिंट एरिया कैलकुलेटर'}
            </h2>
            <p className="text-xs text-slate-400">
              {lang === 'en'
                ? 'Calculate total square footage for banners, flex, and boards instantly.'
                : 'बैनर, फ्लेक्स और बोर्ड के लिए कुल वर्ग फुट (Sq. Ft.) की गणना तुरंत करें।'}
            </p>
          </div>

          <div className="space-y-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
            <div className="flex gap-2 pb-2">
              {(['feet', 'inches', 'cm'] as const).map((u) => (
                <button
                  key={u}
                  onClick={() => setUnit(u)}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold uppercase transition-colors ${
                    unit === u ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-950 text-slate-400 border border-slate-800'
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300">Width ({unit})</label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm font-bold focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300">Height ({unit})</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm font-bold focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-center space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Area Calculation</span>
              <div className="text-3xl font-black text-emerald-400">
                {sqft.toFixed(2)} <span className="text-sm font-bold text-slate-300">Sq. Ft.</span>
              </div>
              <p className="text-[11px] text-slate-400">Ready to use in the Instant Rate Calculator</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
