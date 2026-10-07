import React, { useState } from 'react';
import { BookOpen, Sparkles, ArrowRight, ShieldCheck, Layers, Sun, CheckCircle2, X } from 'lucide-react';

interface PrintingKnowledgeHubProps {
  lang: 'en' | 'hi';
}

interface Article {
  id: string;
  title: string;
  titleHi: string;
  category: string;
  readTime: string;
  summary: string;
  summaryHi: string;
  content: string;
  contentHi: string;
  icon: string;
}

const knowledgeArticles: Article[] = [
  {
    id: 'gsm-guide',
    title: 'Choosing the Right GSM: 230 GSM vs 340 GSM Star Flex',
    titleHi: 'सही GSM कैसे चुनें: 230 GSM बनाम 340 GSM स्टार फ्लेक्स',
    category: 'Materials & Durability',
    readTime: '3 min read',
    summary: 'Learn how to select the ideal flex banner thickness for outdoor wind resistance, sunlight exposure, and long-term branding.',
    summaryHi: 'आउटडोर हवा, धूप और लंबे समय तक ब्रांडिंग के लिए सही फ्लेक्स बैनर मोटाई चुनने का तरीका जानें।',
    content: 'When ordering outdoor banners in Patna, choosing the correct GSM (Grams per Square Meter) is crucial. Standard 230 GSM flex is lightweight and budget-friendly, ideal for short-term political events or temporary announcements lasting a few months. In contrast, 340 GSM Star Flex features a heavy-duty blockout core that prevents sunlight transparency, offers superior tear resistance against strong winds, and maintains vibrant color quality for 1–2 years. For permanent storefront branding, Star Flex is always recommended.',
    contentHi: 'पटना में आउटडोर बैनर ऑर्डर करते समय, सही GSM (ग्राम प्रति वर्ग मीटर) चुनना महत्वपूर्ण है। मानक 230 GSM फ्लेक्स हल्का और बजट के अनुकूल है, जो कुछ महीनों तक चलने वाले अस्थायी विज्ञापनों के लिए आदर्श है। इसके विपरीत, 340 GSM स्टार फ्लेक्स में एक भारी-भरकम ब्लॉकआउट कोर होता है जो धूप को पार होने से रोकता है, तेज हवाओं के खिलाफ बेहतर आंसू प्रतिरोध प्रदान करता है, और 1-2 साल तक जीवंत रंग बनाए रखता है।',
    icon: 'Layers',
  },
  {
    id: 'glow-sign-maintenance',
    title: '3D Acrylic & LED Glow Sign Board Maintenance Tips',
    titleHi: '3D ऐक्रेलिक और LED ग्लो साइन बोर्ड रखरखाव के टिप्स',
    category: 'Signage Care',
    readTime: '4 min read',
    summary: 'Essential cleaning and maintenance guidelines to keep your storefront glowing bright and dust-free for years.',
    summaryHi: 'आने वाले वर्षों में आपके स्टोरफ्रंट को चमकदार और धूल मुक्त रखने के लिए आवश्यक सफाई और रखरखाव दिशानिर्देश।',
    content: '3D Acrylic LED glow sign boards elevate your storefront, but require minimal upkeep to stay pristine. Avoid harsh chemical cleaners or abrasive scrubbers which can scratch the glossy acrylic faceplate. Instead, use a soft microfiber cloth dampened with lukewarm soapy water to gently wipe away dust and Patna road grime. Periodically check power supply housing for moisture protection and ensure waterproof sealing remains intact during monsoon seasons.',
    contentHi: '3D ऐक्रेलिक LED ग्लो साइन बोर्ड आपके स्टोरफ्रंट को चमकाते हैं। चमकदार ऐक्रेलिक फेसप्लेट को खरोंचने वाले कठोर रासायनिक क्लीनर या अपघर्षक स्क्रबर से बचें। इसके बजाय, धूल और गंदगी को हल्के से पчने के लिए गुनगुने साबुन के पानी से सिक्त एक मुलायम माइक्रोफाइबर कपड़े का उपयोग करें।',
    icon: 'Sun',
  },
  {
    id: 'storefront-material',
    title: 'Flex vs Vinyl vs ACP: Best Signage for Retail Stores',
    titleHi: 'फ्लेक्स बनाम विनील बनाम ACP: खुदरा दुकानों के लिए सर्वश्रेष्ठ साइनबोर्ड',
    category: 'Store Branding',
    readTime: '5 min read',
    summary: 'A complete comparison of storefront materials to help shop owners choose the best fit for their budget and visual impact.',
    summaryHi: 'दुकानदारों को उनके बजट और दृश्य प्रभाव के लिए सबसे अच्छा विकल्प चुनने में मदद करने के लिए स्टोरफ्रंट सामग्री की तुलना।',
    content: 'Choosing the right storefront material depends on your business goals. Flex banners provide large-format visibility at unbeatable economy. Eco-solvent vinyl stickers pasted on sunboard or glass provide a seamless, ultra-sharp photographic finish ideal for clinics, fashion boutiques, and optical stores. Premium ACP (Aluminum Composite Panel) with 3D raised acrylic letters delivers a high-end corporate identity that lasts over 5 years.',
    contentHi: 'सही स्टोरफ्रंट सामग्री चुनना आपके व्यावसायिक लक्ष्यों पर निर्भर करता है। फ्लेक्स बैनर किफायती मूल्य पर बड़े प्रारूप की दृश्यता प्रदान करते हैं। सनबोर्ड या कांच पर चिपके इको-सॉल्वेंट विनील स्टिकर क्लिनिक और बुटीक के लिए आदर्श फिनिश प्रदान करते हैं।',
    icon: 'ShieldCheck',
  },
];

export const PrintingKnowledgeHub: React.FC<PrintingKnowledgeHubProps> = ({ lang }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <section className="py-20 bg-slate-950 border-b border-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Expert Insights' : 'विशेषज्ञ ज्ञान'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {lang === 'en' ? 'Printing Knowledge Hub' : 'प्रिंटिंग ज्ञान केंद्र'}
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              {lang === 'en'
                ? 'Expert articles, material selection guides, and maintenance tips to help you make informed printing decisions.'
                : 'सूचित प्रिंटिंग निर्णय लेने में आपकी सहायता के लिए विशेषज्ञ लेख, सामग्री चयन मार्गदर्शिकाएँ और रखरखाव युक्तियाँ।'}
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {knowledgeArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[11px] font-bold border border-blue-500/20">
                    {article.category}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">{article.readTime}</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                  {lang === 'en' ? article.title : article.titleHi}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {lang === 'en' ? article.summary : article.summaryHi}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-blue-400 group-hover:text-blue-300">
                <span>{lang === 'en' ? 'Read Full Guide' : 'पूरा लेख पढ़ें'}</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20">
                {selectedArticle.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {lang === 'en' ? selectedArticle.title : selectedArticle.titleHi}
              </h2>
            </div>

            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
              <p>{lang === 'en' ? selectedArticle.content : selectedArticle.contentHi}</p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="py-2.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
