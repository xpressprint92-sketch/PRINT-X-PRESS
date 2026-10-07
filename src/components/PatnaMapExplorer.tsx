import React, { useState } from 'react';
import { MapPin, Navigation, Sparkles, Loader2, Compass, ExternalLink } from 'lucide-react';

interface PatnaMapExplorerProps {
  lang: 'en' | 'hi';
}

export const PatnaMapExplorer: React.FC<PatnaMapExplorerProps> = ({ lang }) => {
  const [query, setQuery] = useState('How to reach Kazipur Gali Bhikhana Pahari Patna from Patna Junction?');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [groundingMetadata, setGroundingMetadata] = useState<any>(null);

  const presetQueries = [
    { label: 'Route from Patna Junction', q: 'How to reach Kazipur Gali Bhikhana Pahari Patna from Patna Junction?' },
    { label: 'Landmarks near Bhikhana Pahari', q: 'What are prominent landmarks near Bhikhana Pahari Patna?' },
    { label: 'Distance from Kankerbagh', q: 'What is the route and distance from Kankerbagh Patna to Kazipur Gali?' },
  ];

  const handleSearch = async (customQuery?: string) => {
    const q = customQuery || query;
    if (!q.trim() || loading) return;

    setLoading(true);
    setResult(null);
    setGroundingMetadata(null);

    try {
      const res = await fetch('/api/maps-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: q }),
      });
      const data = await res.json();
      if (data.text) {
        setResult(data.text);
        setGroundingMetadata(data.groundingMetadata);
      } else {
        setResult('Could not retrieve location details at the moment.');
      }
    } catch (err) {
      console.error(err);
      setResult('Error connecting to Maps Grounding service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-slate-900/40 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-widest">
            <Compass className="w-4 h-4" />
            <span>{lang === 'en' ? 'Google Maps Grounding' : 'गूगल मैप्स नेविगेशन गाइड'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {lang === 'en' ? 'Find Directions to PRINT X PRESS, Patna' : 'PRINT X PRESS, पटना तक पहुँचने का मार्ग'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {lang === 'en'
              ? 'Explore accurate routes, landmarks, and travel directions around Kazipur Gali, Bhikhana Pahari.'
              : 'काजीपुर गली, भिखाना पहाड़ी, पटना तक पहुँचने के लिए लाइव मैप्स नेविगेशन की जानकारी प्राप्त करें।'}
          </p>
        </div>

        {/* Search Box & Presets */}
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex flex-wrap gap-2 justify-center pb-2">
            {presetQueries.map((pq, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(pq.q);
                  handleSearch(pq.q);
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium transition-colors"
              >
                {pq.label}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about route, distance, or landmarks in Patna..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              onClick={() => handleSearch()}
              disabled={loading}
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 transition-colors shrink-0 disabled:opacity-50 cursor-pointer"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4" />}
              <span>{lang === 'en' ? 'Get Route' : 'मार्ग खोजें'}</span>
            </button>
          </div>

          {/* Results Card */}
          {(result || loading) && (
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Google Maps Grounding Result</span>
                </span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Kazipur+Gali+Bhikhana+Pahari+Patna"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <span>Open Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {loading ? (
                <div className="py-8 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                  <span>Fetching live Maps grounding data for Patna...</span>
                </div>
              ) : (
                <div className="text-xs sm:text-sm text-slate-200 leading-relaxed space-y-2 whitespace-pre-line">
                  {result}
                </div>
              )}

              {groundingMetadata?.webSearchQueries && (
                <div className="pt-2 border-t border-slate-900 text-[10px] text-slate-500">
                  Grounding Queries: {groundingMetadata.webSearchQueries.join(', ')}
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
