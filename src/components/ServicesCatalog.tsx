import React, { useState, useMemo } from 'react';
import { Search, ChevronRight, Calculator, ArrowUpRight, Zap, CheckCircle2 } from 'lucide-react';
import { SERVICES_DATA, BUSINESS_INFO } from '../data/printingData';
import { CategoryId, ServiceItem } from '../types';
import { ServiceDetailModal } from './ServiceDetailModal';

interface ServicesCatalogProps {
  lang: 'en' | 'hi';
  onSelectForCalculator: (slug: string) => void;
}

export const ServicesCatalog: React.FC<ServicesCatalogProps> = ({ lang, onSelectForCalculator }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const categories: { id: CategoryId; label: string; labelHi: string }[] = [
    { id: 'all', label: 'All Services', labelHi: 'सभी सेवाएं' },
    { id: 'large-format', label: 'Flex & Large Format', labelHi: 'फ्लेक्स व लार्ज फॉर्मेट' },
    { id: 'signage', label: '3D LED Glow Signs', labelHi: '3D LED ग्लो साइन' },
    { id: 'business', label: 'Business Essentials', labelHi: 'विजिटिंग कार्ड्स व पर्चे' },
    { id: 'apparel-gifts', label: 'T-Shirts & Gifts', labelHi: 'टी-शर्ट एवं गिफ्ट्स' },
  ];

  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter((service) => {
      const matchesCat = selectedCategory === 'all' || service.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        service.title.toLowerCase().includes(query) ||
        service.titleHi.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query) ||
        service.specs.material.toLowerCase().includes(query);
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="services" className="py-16 sm:py-24 bg-slate-950 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-400">
              {lang === 'en' ? 'Comprehensive Printing Press Solutions' : 'संपूर्ण प्रिंटिंग प्रेस सेवाएं'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {lang === 'en' ? 'Our Printing Services & Rates' : 'हमारी सेवाएं एवं फैक्टरी रेट्स'}
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              {lang === 'en'
                ? 'From heavy-duty outdoor hoardings to precision foil-stamped business cards, explore all commercial printing capabilities in Patna.'
                : 'बड़े आउटडोर होर्डिंग से लेकर आकर्षक विजिटिंग कार्ड और कस्टम गिफ्ट्स तक, उत्तम फ्लेक्स प्रिंटिंग में सब कुछ उपलब्ध है।'}
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder={lang === 'en' ? 'Search services (e.g. flex, mug)...' : 'खोजें (जैसे फ्लेक्स, मग, टी-शर्ट)...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Category Filter Tabs (Conforms to zero-pill discipline: segmented interactive buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {lang === 'en' ? cat.label : cat.labelHi}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">
              {lang === 'en' ? 'No printing services matched your search.' : 'आपकी खोज के अनुसार कोई सेवा नहीं मिली।'}
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-semibold text-blue-400 hover:text-blue-300"
            >
              {lang === 'en' ? 'Clear filters' : 'सभी सेवाएं देखें'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="group rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-blue-500/50 transition-all duration-300 flex flex-col overflow-hidden shadow-lg hover:shadow-blue-900/10"
              >
                {/* Image showcase */}
                <div
                  className="relative aspect-[16/10] overflow-hidden bg-slate-950 cursor-pointer"
                  onClick={() => setActiveModalService(service)}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  {/* Subtle scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                  
                  {/* Starting rate tag */}
                  <div className="absolute bottom-3 left-3 text-xs font-black text-white bg-blue-600/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-blue-400/30">
                    {service.priceDisplay}
                  </div>

                  {/* Turnaround quick marker */}
                  <div className="absolute top-3 right-3 text-[11px] font-medium text-slate-300 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800">
                    {service.specs.turnaround}
                  </div>
                </div>

                {/* Body info */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="text-[11px] text-blue-400 font-semibold uppercase tracking-wider">
                      {service.category.replace('-', ' ')}
                    </div>
                    <h3
                      onClick={() => setActiveModalService(service)}
                      className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      {lang === 'en' ? service.title : service.titleHi}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {lang === 'en' ? service.description : service.descriptionHi}
                    </p>
                  </div>

                  {/* Spec pills with typographic discipline */}
                  <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                    <span className="truncate max-w-[150px]">{service.specs.material}</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-emerald-400 font-medium">{service.specs.durability}</span>
                  </div>

                  {/* Action buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => onSelectForCalculator(service.slug)}
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors cursor-pointer"
                    >
                      <Calculator className="w-3.5 h-3.5" />
                      <span>{lang === 'en' ? 'Get Quote' : 'रेट निकालें'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveModalService(service)}
                      className="flex items-center justify-center gap-1 py-2 px-3 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-colors cursor-pointer"
                    >
                      <span>{lang === 'en' ? 'Details' : 'जानकारी'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Detail Modal */}
      {activeModalService && (
        <ServiceDetailModal
          service={activeModalService}
          onClose={() => setActiveModalService(null)}
          lang={lang}
          onSelectForCalculator={onSelectForCalculator}
        />
      )}
    </section>
  );
};
