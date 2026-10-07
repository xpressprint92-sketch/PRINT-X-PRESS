import React, { useState } from 'react';
import { Layers, CheckCircle2, ShieldCheck, Sun, DollarSign, X } from 'lucide-react';

interface MaterialComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'hi';
  onOpenCalculator: () => void;
}

const materialsData = [
  {
    name: 'Standard Flex (230 GSM)',
    bestUse: 'Short-term outdoor advertising, election banners, events.',
    durability: '3 to 6 Months',
    appearance: 'Matte/Glossy standard finish',
    usage: 'Outdoor & Indoor',
    price: '₹ (Budget Friendly)',
    recommended: 'Best for bulk event banners.',
  },
  {
    name: 'Star Flex (340 GSM)',
    bestUse: 'Premium shop boards, high-visibility hoardings, long banners.',
    durability: '1 to 2 Years',
    appearance: 'Thick heavy-duty blockout white surface',
    usage: 'Outdoor (Weather Resistant)',
    price: '₹₹ (Moderate)',
    recommended: 'Most popular for shop banners in Patna.',
  },
  {
    name: 'Vinyl / Sticking Print',
    bestUse: 'Glass pasting, vehicle branding, wall graphics, foam board.',
    durability: '1 to 3 Years',
    appearance: 'Smooth self-adhesive vinyl film',
    usage: 'Indoor & Outdoor Glass/Walls',
    price: '₹₹ (Moderate)',
    recommended: 'Best for shop glass and office branding.',
  },
  {
    name: 'ACP & Acrylic Glow Sign',
    bestUse: 'Luxury storefront signboards, 3D letter branding.',
    durability: '5+ Years',
    appearance: 'Sleek premium glossy 3D acrylic illuminated letters',
    usage: 'Permanent Outdoor Storefront',
    price: '₹₹₹ (Premium)',
    recommended: 'Best for branded showrooms and clinics.',
  },
];

export const MaterialComparisonModal: React.FC<MaterialComparisonModalProps> = ({
  isOpen,
  onClose,
  lang,
  onOpenCalculator,
}) => {
  const [selectedMat, setSelectedMat] = useState(materialsData[1]);

  if (!isOpen) return null;

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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Technical Comparison Guide</span>
            </div>
            <h2 className="text-2xl font-black text-white">
              {lang === 'en' ? 'Professional Material Comparison' : 'व्यावसायिक सामग्री तुलना'}
            </h2>
            <p className="text-xs text-slate-400">
              {lang === 'en'
                ? 'Compare durability, appearance, and pricing across flex, vinyl, acrylic, and ACP materials.'
                : 'फ्लेक्स, विनील, ऐक्रेलिक और एसीपी सामग्री की तुलना करें।'}
            </p>
          </div>

          {/* Material Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {materialsData.map((m) => (
              <button
                key={m.name}
                onClick={() => setSelectedMat(m)}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold text-center transition-colors ${
                  selectedMat.name === m.name
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {m.name}
              </button>
            ))}
          </div>

          {/* Material Detail Card */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Selected Material</span>
                <h3 className="text-xl font-black text-white mt-1">{selectedMat.name}</h3>
                <p className="text-xs text-slate-300 mt-1">{selectedMat.recommended}</p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenCalculator();
                }}
                className="py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-colors"
              >
                Choose This Material
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-slate-400 uppercase text-[10px]">Best Use:</span>
                <p className="text-slate-200 font-medium">{selectedMat.bestUse}</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-slate-400 uppercase text-[10px]">Outdoor Durability:</span>
                <p className="text-emerald-400 font-bold">{selectedMat.durability}</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-slate-400 uppercase text-[10px]">Appearance:</span>
                <p className="text-slate-200 font-medium">{selectedMat.appearance}</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-slate-400 uppercase text-[10px]">Usage Environment:</span>
                <p className="text-slate-200 font-medium">{selectedMat.usage}</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-slate-400 uppercase text-[10px]">Price Tier:</span>
                <p className="text-blue-400 font-bold">{selectedMat.price}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
