import React, { useState } from 'react';
import { Image as ImageIcon, MapPin, Maximize2, MessageCircle, X } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/printingData';
import { PortfolioItem } from '../types';

interface PortfolioGalleryProps {
  lang: 'en' | 'hi';
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ lang }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxItem, setActiveLightboxItem] = useState<PortfolioItem | null>(null);

  const categories = ['All', 'Large Format', 'Signage', 'Apparel & Gifts'];

  const filteredItems = PORTFOLIO_DATA.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  return (
    <section id="portfolio" className="py-16 sm:py-24 bg-slate-900/40 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-400">
              {lang === 'en' ? 'Our Recent Work' : 'हमारा हालिया काम'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {lang === 'en' ? 'Featured Project Showcase' : 'उत्कृष्ट प्रिंटिंग प्रोजेक्ट्स'}
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              {lang === 'en'
                ? 'High-impact outdoor hoardings, retail store signboards, and event banners printed right here in Patna.'
                : 'पटना, पटना और गया में हाल ही में स्थापित हमारे कुछ प्रमुख फ्लेक्स बोर्ड और LED ग्लो साइन प्रोजेक्ट्स।'}
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxItem(item)}
              className="group relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80 hover:border-blue-500/50 transition-all duration-300 shadow-md cursor-pointer"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-900 relative">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                
                {/* Fallback */}
                <div className="absolute inset-0 bg-slate-900 flex items-center justify-center -z-10 text-slate-600">
                  <ImageIcon className="w-10 h-10" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Top badge */}
                {item.dimensions && (
                  <div className="absolute top-3 right-3 text-[11px] font-bold text-slate-200 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-800">
                    {item.dimensions}
                  </div>
                )}

                {/* Bottom info */}
                <div className="absolute bottom-3 left-4 right-4 space-y-1">
                  <div className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider">
                    {item.category}
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                    {lang === 'en' ? item.title : item.titleHi}
                  </h3>
                  {item.location && (
                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <MapPin className="w-3 h-3 text-red-400 shrink-0" />
                      <span>{item.location}</span>
                    </div>
                  )}
                </div>

                <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-slate-950/70 text-slate-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightboxItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in"
          onClick={() => setActiveLightboxItem(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] bg-slate-950">
              <img
                src={activeLightboxItem.image}
                alt={activeLightboxItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveLightboxItem(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/80 text-white hover:bg-slate-800 border border-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                    {activeLightboxItem.category}
                  </div>
                  <h3 className="text-xl font-bold text-white mt-0.5">
                    {lang === 'en' ? activeLightboxItem.title : activeLightboxItem.titleHi}
                  </h3>
                </div>
                {activeLightboxItem.dimensions && (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-800 text-slate-300">
                    Size: {activeLightboxItem.dimensions}
                  </span>
                )}
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {activeLightboxItem.description}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  <span>{activeLightboxItem.location || 'Patna, Bihar'}</span>
                </span>

                <a
                  href={`https://wa.me/917481068602?text=${encodeURIComponent(
                    `Hi! I saw the "${activeLightboxItem.title}" on your website and want something similar for my business.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-slate-950" />
                  <span>{lang === 'en' ? 'Order Similar Design' : 'ऐसा डिजाइन ऑर्डर करें'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
