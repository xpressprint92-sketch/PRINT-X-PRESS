import React from 'react';
import { CheckCircle2, FileCheck, Layers, Maximize, Sliders, Sparkles } from 'lucide-react';

interface PrintTipsSectionProps {
  lang: 'en' | 'hi';
}

export const PrintTipsSection: React.FC<PrintTipsSectionProps> = ({ lang }) => {
  const tips = [
    {
      icon: <Maximize className="w-6 h-6 text-blue-400" />,
      title: lang === 'en' ? 'Resolution & DPI' : 'रिज़ॉल्यूशन एवं DPI',
      desc: lang === 'en'
        ? 'For sharp, crisp printing, set your design resolution to 300 DPI for visiting cards, letterheads, and brochures. For large flex banners and outdoor hoardings, 150 DPI is ideal.'
        : 'विजिटिंग कार्ड और ब्रोशर के लिए 300 DPI और बड़े फ्लेक्स बैनर के लिए 150 DPI रिज़ॉल्यूशन सेट करें ताकि प्रिंट बिल्कुल साफ़ आए।',
    },
    {
      icon: <Layers className="w-6 h-6 text-emerald-400" />,
      title: lang === 'en' ? 'Bleed Area & Safe Margins' : 'ब्लीड एरिया एवं सेफ मार्जिन',
      desc: lang === 'en'
        ? 'Keep all vital text, phone numbers, and logos at least 0.25 inches (6mm) away from the final cut line. Add 3mm bleed around the edges for clean trimming.'
        : 'सभी महत्वपूर्ण टेक्स्ट और लोगो को कटिंग लाइन से कम से कम 6mm अंदर रखें। सही कटिंग के लिए 3mm का ब्लीड एरिया जोड़ें।',
    },
    {
      icon: <Sliders className="w-6 h-6 text-purple-400" />,
      title: lang === 'en' ? 'Color Mode (CMYK)' : 'कलर मोड (CMYK)',
      desc: lang === 'en'
        ? 'Always design and export files in CMYK color mode rather than RGB. RGB colors on screens may appear brighter than actual printed output.'
        : 'फाइल हमेशा RGB की बजाय CMYK कलर मोड में डिजाइन और एक्सपोर्ट करें ताकि स्क्रीन और प्रिंट के रंगों में अंतर न आए।',
    },
    {
      icon: <FileCheck className="w-6 h-6 text-amber-400" />,
      title: lang === 'en' ? 'Preferred File Formats' : 'पसंदीदा फ़ाइल फॉर्मेट',
      desc: lang === 'en'
        ? 'PDF (Press Quality) is best. CorelDRAW (.cdr) files must have fonts converted to curves (Ctrl+Q). AI, PSD, and high-res PNG/JPG are also accepted.'
        : 'PDF (प्रेस क्वालिटी) सबसे बेहतरीन है। CorelDRAW (.cdr) फ़ाइल में फॉन्ट को कर्व (Ctrl+Q) करना न भूलें। AI, PSD और JPG भी स्वीकार्य हैं।',
    },
  ];

  return (
    <section className="py-20 bg-slate-950 border-b border-slate-900 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-blue-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Design Guidelines' : 'डिज़ाइन गाइडलाइंस'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {lang === 'en' ? 'Print Preparation Tips' : 'प्रिंटिंग से पहले आवश्यक टिप्स'}
          </h2>
          <p className="text-sm text-slate-400">
            {lang === 'en'
              ? 'Follow these expert file preparation standards to ensure flawless printing quality, perfect color accuracy, and zero delays.'
              : 'उत्कृष्ट प्रिंटिंग क्वालिटी और सही रंगों के लिए इन विशेषज्ञ दिशा-निर्देशों का पालन करें।'}
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-300 group flex flex-col justify-between shadow-lg"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  {tip.icon}
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                  {tip.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {tip.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center gap-2 text-[11px] font-semibold text-blue-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{lang === 'en' ? 'Verified Best Practice' : 'मानक प्रमाणित'}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pro Tip Callout */}
        <div className="mt-12 bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border border-blue-900/40 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-base font-bold text-white">
              {lang === 'en' ? 'Need help checking your design file?' : 'क्या आपको अपनी डिज़ाइन फ़ाइल चेक करने में सहायता चाहिए?'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              {lang === 'en'
                ? 'Send your CDR, PDF, or PSD file directly on WhatsApp. Our prepress designers will verify it for free before printing!'
                : 'अपनी CDR, PDF या PSD फ़ाइल सीधे WhatsApp पर भेजें। हमारे डिज़ाइनर प्रिंटिंग से पहले मुफ्त में जांच करेंगे!'}
            </p>
          </div>
          <a
            href="https://wa.me/917481068602?text=Hi%20Print%20X%20Press,%20I%20want%20you%20to%20check%20my%20design%20file%20for%20printing."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-900/30 transition-colors shrink-0"
          >
            {lang === 'en' ? 'Check File on WhatsApp' : 'WhatsApp पर फाइल भेजें'}
          </a>
        </div>

      </div>
    </section>
  );
};
