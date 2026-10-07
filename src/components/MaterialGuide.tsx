import React from 'react';
import { Layers, ShieldCheck, Check, Star } from 'lucide-react';
import { MATERIAL_GUIDE_DATA } from '../data/printingData';

interface MaterialGuideProps {
  lang: 'en' | 'hi';
}

export const MaterialGuide: React.FC<MaterialGuideProps> = ({ lang }) => {
  return (
    <section id="materials" className="py-16 sm:py-24 bg-slate-950 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-widest">
            <Layers className="w-4 h-4" />
            <span>{lang === 'en' ? 'Quality & GSM Guide' : 'मटेरियल एवं जीएसएम गाइड'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {lang === 'en' ? 'Choose the Right Print Material' : 'अपनी जरूरत के अनुसार सही मटेरियल चुनें'}
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            {lang === 'en'
              ? 'Understanding GSM thickness, lifespan, and outdoor weather resistance helps you get the best value.'
              : 'सामान्य फ्लेक्स, स्टार फ्लेक्स और विनाइल में क्या अंतर है? जानिए ताकि आपके पैसे का पूरा महत्व मिले।'}
          </p>
        </div>

        {/* Material Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MATERIAL_GUIDE_DATA.map((mat, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-colors shadow-sm"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">
                      {mat.gsm}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-0.5">
                      {lang === 'en' ? mat.name : mat.nameHi}
                    </h3>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: mat.recommendationRating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Lifespan badge */}
                <div className="text-xs font-medium text-slate-300 bg-slate-950/80 border border-slate-800/80 px-3 py-1.5 rounded-lg flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{mat.lifespan}</span>
                </div>

                {/* Best for */}
                <div className="text-xs space-y-1">
                  <div className="text-slate-400 font-medium">
                    {lang === 'en' ? 'Recommended For:' : 'उपयुक्त किसके लिए:'}
                  </div>
                  <div className="text-slate-200 font-semibold leading-relaxed">
                    {lang === 'en' ? mat.bestFor : mat.bestForHi}
                  </div>
                </div>

                {/* Advantages */}
                <div className="pt-3 border-t border-slate-800/80 space-y-2 text-xs">
                  {mat.advantages.map((adv, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-2 text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{adv}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80">
                <a
                  href="#calculator"
                  className="block text-center text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {lang === 'en' ? 'Calculate Rate for This Material →' : 'इस मटेरियल का रेट निकालें →'}
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
