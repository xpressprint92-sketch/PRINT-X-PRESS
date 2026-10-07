import React, { useState } from 'react';
import { Phone, MessageCircle, Menu, X, Globe, MapPin, Sparkles, User, QrCode, CheckCircle2, Layers, CreditCard, Calculator, Award } from 'lucide-react';
import { BUSINESS_INFO } from '../data/printingData';

interface NavbarProps {
  lang: 'en' | 'hi';
  onToggleLang: () => void;
  onOpenCalculator: () => void;
  onOpenProofs: () => void;
  onOpenQr: () => void;
  onOpenDesignStudio: () => void;
  onOpenBusinessPortal: () => void;
  onOpenDashboard: () => void;
  onOpenMockup: () => void;
  onOpenAiHelper: () => void;
  onOpenMaterialComp: () => void;
  onOpenVisitingCard: () => void;
  onOpenDimensionCalc: () => void;
  onOpenPincodeCheck: () => void;
  onOpenLoyalty: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  onOpenCalculator,
  onOpenProofs,
  onOpenQr,
  onOpenDesignStudio,
  onOpenBusinessPortal,
  onOpenDashboard,
  onOpenMockup,
  onOpenAiHelper,
  onOpenMaterialComp,
  onOpenVisitingCard,
  onOpenDimensionCalc,
  onOpenPincodeCheck,
  onOpenLoyalty,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#services', label: lang === 'en' ? 'Services' : 'सेवाएं' },
    { href: '#calculator', label: lang === 'en' ? 'Price Calculator' : 'रेट कैलकुलेटर' },
    { href: '#portfolio', label: lang === 'en' ? 'Portfolio' : 'पोर्टफोलियो' },
    { href: '#reviews', label: lang === 'en' ? 'Reviews' : 'समीक्षाएं' },
    { href: '#contact', label: lang === 'en' ? 'Contact' : 'संपर्क' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-900">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-slate-100 text-[11px] sm:text-xs font-semibold py-1.5 px-4 text-center tracking-wide">
        <span>📍 {lang === 'en' ? 'Kazipur Gali, Bhikhana Pahari, Patna, Bihar 800016' : 'काजीपुर गली, भिखाना पहाड़ी, पटना, बिहार 800016'}</span>
        <span className="mx-2 hidden sm:inline">•</span>
        <span className="hidden sm:inline">📞 {BUSINESS_INFO.phoneDisplay}</span>
        <span className="mx-2">•</span>
        <span className="text-emerald-300 font-bold">{lang === 'en' ? 'Open 7 Days (9 AM - 9 PM)' : 'सप्ताह के सातों दिन खुला है'}</span>
      </div>

      {/* Main Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Wordmark */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-full bg-white border border-slate-700 flex items-center justify-center font-black text-slate-950 text-sm shadow-md tracking-tighter">
            PX
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-black tracking-tight text-white group-hover:text-blue-400 transition-colors">
              PRINT X PRESS
            </span>
            <span className="text-[10px] text-slate-400 font-medium -mt-1">Patna, Bihar</span>
          </div>
        </a>

        {/* Zone 2: Navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-white transition-colors relative py-1 hover:border-b-2 hover:border-blue-500"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Advanced Features & Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenMockup}
            className="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
            title="Live Design Mockup"
          >
            🎨 <span>Mockup</span>
          </button>

          <button
            onClick={onOpenAiHelper}
            className="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
            title="AI Design Suggestion"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>AI Helper</span>
          </button>

          <button
            onClick={onOpenDashboard}
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
            title="Customer Portal"
          >
            <User className="w-3.5 h-3.5 text-purple-400" />
            <span>Portal</span>
          </button>

          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
            title="Toggle English / Hindi"
            aria-label="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>{lang === 'en' ? 'हिंदी' : 'English'}</span>
          </button>

          <button
            onClick={onOpenCalculator}
            className="inline-flex items-center px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors whitespace-nowrap shadow-sm shadow-blue-600/30 cursor-pointer"
          >
            {lang === 'en' ? 'Get Quote' : 'रेट निकालें'}
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-4">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800/80">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMockup();
              }}
              className="flex items-center gap-2 py-2 px-3 rounded-xl bg-blue-950/50 border border-blue-900/60 text-xs font-semibold text-blue-300"
            >
              🎨 <span>Live Mockup</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAiHelper();
              }}
              className="flex items-center gap-2 py-2 px-3 rounded-xl bg-purple-950/50 border border-purple-900/60 text-xs font-semibold text-purple-300"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>AI Helper</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMaterialComp();
              }}
              className="flex items-center gap-2 py-2 px-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300"
            >
              <Layers className="w-4 h-4 text-blue-400" />
              <span>Materials</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVisitingCard();
              }}
              className="flex items-center gap-2 py-2 px-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300"
            >
              <CreditCard className="w-4 h-4 text-emerald-400" />
              <span>Visiting Card</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDimensionCalc();
              }}
              className="flex items-center gap-2 py-2 px-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300"
            >
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>Sq.Ft Calc</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPincodeCheck();
              }}
              className="flex items-center gap-2 py-2 px-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300"
            >
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>Pincode Check</span>
            </button>
          </div>

          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLoyalty();
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-amber-400"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Loyalty Points</span>
            </button>
            <p className="text-[11px] text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>Patna, Bihar</span>
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
