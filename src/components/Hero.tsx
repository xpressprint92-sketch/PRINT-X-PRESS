import React from 'react';
import { Phone, MessageCircle, Calculator, ChevronRight, Zap, Award, Truck, Clock } from 'lucide-react';
import { BUSINESS_INFO } from '../data/printingData';

interface HeroProps {
  lang: 'en' | 'hi';
  onOpenCalculator: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenCalculator, onExploreServices }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-900 bg-slate-950">
      {/* Background glow meshes */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[250px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Trust and location markers */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-medium">
              <span className="text-blue-400 font-semibold uppercase tracking-wider">
                {lang === 'en' ? 'Patna, Bihar' : 'पटना, बिहार'}
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="flex items-center gap-1 text-emerald-400">
                <Truck className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'All Bihar Delivery' : 'पूरे बिहार में डिलीवरी'}</span>
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="flex items-center gap-1 text-amber-400">
                <Clock className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Same-Day Urgent Dispatch' : 'तत्काल सेम-डे प्रिंटिंग'}</span>
              </span>
            </div>

            {/* Main Headline */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] text-balance">
                PRINT X PRESS
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-400 mt-2">
                  {lang === 'en' ? 'Best Printing Press in Patna' : 'पटना का सबसे बड़ा प्रिंटिंग प्रेस'}
                </span>
              </h1>
            </div>

            {/* Subtitle Value Proposition */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {lang === 'en'
                ? 'Large format flex banners, 3D acrylic LED glow sign boards, eco-solvent vinyl, visiting cards, custom t-shirts, and promotional merchandise at guaranteed factory-direct rates.'
                : 'दुकान एवं शोरूम के 3D LED ग्लो साइन बोर्ड, बड़े फ्लेक्स बैनर, विनाइल सनबोर्ड, विजिटिंग कार्ड्स और कस्टम टी-शर्ट्स सबसे कम फैक्टरी रेट पर तैयार करवाएं।'}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenCalculator}
                className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-lg shadow-blue-600/25 cursor-pointer whitespace-nowrap"
              >
                <Calculator className="w-4 h-4" />
                <span>{lang === 'en' ? 'Instant Rate Calculator' : 'रेट कैलकुलेटर खोलें'}</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>

              <a
                href={`https://wa.me/917481068602?text=${encodeURIComponent(
                  lang === 'en'
                    ? 'Hi PRINT X PRESS! I would like to get a quote for printing in Patna.'
                    : 'नमस्ते उत्तम फ्लेक्स प्रिंटिंग! मुझे प्रिंटिंग के लिए कोटेशन चाहिए।'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/80 rounded-xl transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'en' ? 'Order on WhatsApp' : 'व्हाट्सएप पर ऑर्डर करें'}</span>
              </a>

              <a
                href={`tel:${BUSINESS_INFO.phonePrimary}`}
                className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-blue-400" />
                <span>{BUSINESS_INFO.phoneDisplay}</span>
              </a>
            </div>

            {/* Highlights row */}
            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {BUSINESS_INFO.stats.map((stat, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="text-xl sm:text-2xl font-black text-white tabular-nums tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400 font-medium">
                    {lang === 'en' ? stat.label : stat.labelHi}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Marquee Hero Visual */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 group">
              <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full relative">
                <img
                  src="/src/assets/images/hero_flex_printing_press_1791205783493.jpg"
                  alt="PRINT X PRESS Press industrial machines in Patna"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Zero broken image fallback
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                
                {/* Fallback container if image fails */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 flex flex-col items-center justify-center p-6 text-center -z-10">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-3">
                    <Zap className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-white">PRINT X PRESS Press</h3>
                  <p className="text-xs text-slate-400 mt-1">High-speed roll-to-roll solvent & eco-solvent printing</p>
                </div>

                {/* Subtle scrim overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                
                {/* Bottom badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-200 bg-slate-950/80 backdrop-blur-md p-3 rounded-xl border border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-semibold text-white">Press Live In Patna</span>
                  </div>
                  <span className="text-slate-400 text-[11px]">Factory-Direct Rates</span>
                </div>
              </div>

              {/* Quick perks bar below image */}
              <div className="p-4 bg-slate-900/90 border-t border-slate-800 grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>280 to 440 GSM Flex</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Award className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>UV & Rain Resistant</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
