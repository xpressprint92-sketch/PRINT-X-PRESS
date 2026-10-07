import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';
import { FAQ_DATA } from '../data/printingData';

interface FAQSectionProps {
  lang: 'en' | 'hi';
}

export const FAQSection: React.FC<FAQSectionProps> = ({ lang }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-slate-950 border-b border-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-widest">
            <HelpCircle className="w-4 h-4" />
            <span>{lang === 'en' ? 'Got Questions?' : 'पूछे जाने वाले सवाल'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {lang === 'en' ? 'Frequently Asked Questions' : 'अक्सर पूछे जाने वाले सवाल'}
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            {lang === 'en'
              ? 'Find answers regarding turnaround times, frame fabrication, delivery across Bihar, and file formats.'
              : 'फ्लेक्स प्रिंटिंग, डिजाइनिंग, इंस्टॉलेशन और डिलीवरी से जुड़े सभी सवालों के जवाब।'}
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800/80 bg-slate-900/60 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left px-5 sm:px-6 py-4 flex items-center justify-between gap-4 text-sm sm:text-base font-bold text-white hover:text-blue-400 transition-colors cursor-pointer"
                >
                  <span>{lang === 'en' ? item.question : item.questionHi}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60">
                    {lang === 'en' ? item.answer : item.answerHi}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions prompt */}
        <div className="mt-10 p-6 rounded-2xl bg-blue-950/30 border border-blue-900/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm font-bold text-white">
              {lang === 'en' ? 'Still have a specific question?' : 'क्या आपका कोई और सवाल है?'}
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'en'
                ? 'Speak directly with our print technician in Patna.'
                : 'हमारे पटना स्टोर के विशेषज्ञ से सीधे व्हाट्सएप पर बात करें।'}
            </p>
          </div>
          <a
            href="https://wa.me/917481068602"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-emerald-300 bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
