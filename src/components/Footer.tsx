import React from 'react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/printingData';

interface FooterProps {
  lang: 'en' | 'hi';
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-900">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white border border-slate-700 flex items-center justify-center font-black text-slate-950 text-xs shadow-md tracking-tighter">
                PX
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                PRINT X PRESS
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              {lang === 'en'
                ? 'Your trusted partner for large format flex printing, LED glow sign boards, vinyl sunboard, and corporate merchandise in Patna, Bihar.'
                : 'पटना, बिहार में फ्लेक्स प्रिंटिंग, 3D LED ग्लो साइन बोर्ड और विनाइल प्रिंटिंग का सबसे भरोसेमंद संस्थान।'}
            </p>
            <div className="text-slate-400 space-y-1">
              <p className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Kazipur Gali, Bhikhana Pahari, Patna</span>
              </p>
            </div>
          </div>

          {/* Core Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {lang === 'en' ? 'Core Services' : 'प्रमुख सेवाएं'}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Normal & Star Flex Printing (₹12/sq.ft)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  3D Acrylic & LED Glow Sign Boards (₹180/sq.ft)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Eco-Solvent Vinyl & Sunboard (₹35/sq.ft)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Roll-Up Aluminum Standees (₹850/pc)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Premium Visiting Cards (₹250/100pcs)
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {lang === 'en' ? 'Quick Links' : 'त्वरित लिंक'}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#calculator" className="hover:text-white transition-colors">
                  {lang === 'en' ? 'Price Calculator' : 'रेट कैलकुलेटर'}
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-white transition-colors">
                  {lang === 'en' ? 'Completed Projects' : 'गैलरी व प्रोजेक्ट्स'}
                </a>
              </li>
              <li>
                <a href="#materials" className="hover:text-white transition-colors">
                  {lang === 'en' ? 'Materials & GSM Guide' : 'मटेरियल गाइड'}
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  {lang === 'en' ? 'Customer Testimonials' : 'ग्राहकों की राय'}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  {lang === 'en' ? 'Frequently Asked Questions' : 'एफएक्यू'}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  {lang === 'en' ? 'Visit Patna Store' : 'संपर्क व पता'}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {lang === 'en' ? 'Direct Hotline' : 'सीधा संपर्क'}
            </h4>
            <div className="space-y-2">
              <a
                href={`tel:${BUSINESS_INFO.phonePrimary}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span className="tabular-nums font-medium text-slate-200">
                  {BUSINESS_INFO.phoneDisplay}
                </span>
              </a>
              <a
                href={`tel:${BUSINESS_INFO.phoneSecondary}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span className="tabular-nums font-medium text-slate-200">
                  {BUSINESS_INFO.phoneSecondaryDisplay}
                </span>
              </a>
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <span className="truncate">{BUSINESS_INFO.email}</span>
              </a>
            </div>
            <div className="pt-2">
              <span className="inline-block text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-900/60 px-2.5 py-1 rounded-md">
                Open 7 Days (9:00 AM - 9:00 PM)
              </span>
            </div>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
          <div>
            © 2026 PRINT X PRESS. All rights reserved. Kazipur Gali, Bhikhana Pahari, Patna, Bihar 800016.
          </div>
          <div className="text-slate-300 font-semibold">
            Made with 💕 by AYUSH
          </div>
        </div>
      </div>
    </footer>
  );
};
