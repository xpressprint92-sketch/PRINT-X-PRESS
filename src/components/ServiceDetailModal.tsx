import React from 'react';
import { X, Check, Clock, Shield, Sparkles, MessageCircle, Phone } from 'lucide-react';
import { ServiceItem } from '../types';
import { BUSINESS_INFO } from '../data/printingData';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  lang: 'en' | 'hi';
  onSelectForCalculator: (slug: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  lang,
  onSelectForCalculator,
}) => {
  if (!service) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello PRINT X PRESS! I would like to inquire about "${service.title}" in Patna.`
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with image */}
        <div className="relative h-48 sm:h-56 bg-slate-950 overflow-hidden shrink-0">
          <img
            src={service.image}
            alt={service.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-slate-950/70 text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-700/80 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
              {service.category.replace('-', ' ')}
            </span>
            <h3 className="text-2xl font-black text-white tracking-tight mt-0.5">
              {lang === 'en' ? service.title : service.titleHi}
            </h3>
            <div className="text-sm font-bold text-emerald-400 mt-1">
              Starting from {service.priceDisplay}
            </div>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-300 text-sm">
          {/* Detailed description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              {lang === 'en' ? 'Overview' : 'विवरण'}
            </h4>
            <p className="leading-relaxed text-slate-300">
              {lang === 'en' ? service.longDescription : service.longDescriptionHi}
            </p>
          </div>

          {/* Technical Specifications */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <div>
              <div className="text-slate-400 font-medium">Material / GSM</div>
              <div className="font-semibold text-white mt-0.5">{service.specs.material}</div>
            </div>
            <div>
              <div className="text-slate-400 font-medium">Durability</div>
              <div className="font-semibold text-white mt-0.5">{service.specs.durability}</div>
            </div>
            <div>
              <div className="text-slate-400 font-medium">Turnaround</div>
              <div className="font-semibold text-white mt-0.5">{service.specs.turnaround}</div>
            </div>
            <div>
              <div className="text-slate-400 font-medium">Finishing</div>
              <div className="font-semibold text-white mt-0.5">{service.specs.finish}</div>
            </div>
          </div>

          {/* Standard Size & Pricing Variants */}
          {service.variants && service.variants.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                {lang === 'en' ? 'Standard Sizes & Price Options' : 'मानक साइज एवं मूल्य सूची'}
              </h4>
              <div className="divide-y divide-slate-800/80 rounded-xl border border-slate-800 overflow-hidden bg-slate-950">
                {service.variants.map((v, idx) => (
                  <div key={idx} className="flex items-center justify-between px-4 py-2.5 text-xs">
                    <span className="font-medium text-slate-200">{v.size}</span>
                    <span className="font-bold text-emerald-400 tabular-nums">
                      ₹{v.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Service features checklist */}
          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Full color high-resolution UV & solvent printing</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Custom size fabrication available on request</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Free design review & artwork layout assistance</span>
            </div>
          </div>
        </div>

        {/* Modal Footer actions */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => {
              onSelectForCalculator(service.slug);
              onClose();
            }}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors cursor-pointer"
          >
            {lang === 'en' ? 'Calculate Custom Size' : 'कस्टम साइज रेट निकालें'}
          </button>

          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/917481068602?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-emerald-300 bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Inquiry</span>
            </a>
            <a
              href={`tel:${BUSINESS_INFO.phonePrimary}`}
              className="p-2.5 rounded-xl text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
              title="Call Us"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
