import React, { useState, useMemo } from 'react';
import { Search, X, BookOpen, Layers, HelpCircle, ArrowRight } from 'lucide-react';
import { SERVICES_DATA, FAQ_DATA } from '../../data/printingData';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'hi';
}

interface SearchResult {
  id: string;
  title: string;
  category: 'Service' | 'Knowledge Hub' | 'FAQ';
  snippet: string;
  targetId: string;
}

const knowledgeItems = [
  { id: 'gsm-guide', title: 'Choosing the Right GSM: 230 GSM vs 340 GSM Star Flex', snippet: 'Outdoor durability and banner thickness selection guide.' },
  { id: 'glow-sign-maintenance', title: '3D Acrylic & LED Glow Sign Board Maintenance Tips', snippet: 'Cleaning and upkeep guidelines for storefront glow signs.' },
  { id: 'storefront-material', title: 'Flex vs Vinyl vs ACP: Best Signage for Retail Stores', snippet: 'Comparison of storefront materials for retail businesses.' },
];

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose, lang }) => {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    const matches: SearchResult[] = [];

    // Search services
    SERVICES_DATA.forEach((s) => {
      if (s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)) {
        matches.push({
          id: s.id,
          title: lang === 'en' ? s.title : s.titleHi,
          category: 'Service',
          snippet: lang === 'en' ? s.description : s.descriptionHi,
          targetId: 'services',
        });
      }
    });

    // Search Knowledge Hub
    knowledgeItems.forEach((k) => {
      if (k.title.toLowerCase().includes(q) || k.snippet.toLowerCase().includes(q)) {
        matches.push({
          id: k.id,
          title: k.title,
          category: 'Knowledge Hub',
          snippet: k.snippet,
          targetId: 'knowledge-hub',
        });
      }
    });

    // Search FAQs
    FAQ_DATA.forEach((f, idx) => {
      if (f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)) {
        matches.push({
          id: `faq-${idx}`,
          title: lang === 'en' ? f.question : f.questionHi,
          category: 'FAQ',
          snippet: lang === 'en' ? f.answer : f.answerHi,
          targetId: 'faq',
        });
      }
    });

    return matches;
  }, [query, lang]);

  if (!isOpen) return null;

  const handleSelectResult = (targetId: string) => {
    onClose();
    if (targetId === 'services') {
      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
    } else if (targetId === 'faq') {
      document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // scroll to top or general
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3">
            <Search className="w-5 h-5 text-blue-400 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={lang === 'en' ? 'Search services, GSM guides, or FAQs...' : 'सेवाएं, GSM गाइड या FAQ खोजें...'}
              className="w-full bg-transparent text-white text-sm placeholder:text-slate-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Results Area */}
        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
          {query.trim() && results.length === 0 && (
            <div className="py-12 text-center text-slate-400 text-xs">
              No results found for "{query}". Try searching for "Flex", "Visiting Card", or "GSM".
            </div>
          )}

          {!query.trim() && (
            <div className="py-8 text-center text-slate-500 text-xs">
              Type keywords to search across PRINT X PRESS services, knowledge articles, and FAQs instantly.
            </div>
          )}

          {results.map((res) => (
            <div
              key={res.id}
              onClick={() => handleSelectResult(res.targetId)}
              className="bg-slate-950/80 border border-slate-800/80 hover:border-blue-500/50 rounded-2xl p-4 flex items-center justify-between gap-4 cursor-pointer group transition-all"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    res.category === 'Service' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                    res.category === 'Knowledge Hub' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                    'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}>
                    {res.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                    {res.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-400 line-clamp-1">{res.snippet}</p>
              </div>

              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 shrink-0 transform group-hover:translate-x-1 transition-transform" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
