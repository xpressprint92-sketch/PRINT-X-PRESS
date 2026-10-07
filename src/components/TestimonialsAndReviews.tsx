import React, { useState, useEffect } from 'react';
import { Star, MessageSquarePlus, Check, UserCheck, X } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/printingData';
import { TestimonialItem } from '../types';

interface TestimonialsAndReviewsProps {
  lang: 'en' | 'hi';
}

interface StoredReviewItem extends TestimonialItem {
  timestamp?: number;
}

export const TestimonialsAndReviews: React.FC<TestimonialsAndReviewsProps> = ({ lang }) => {
  const [reviews, setReviews] = useState<StoredReviewItem[]>(TESTIMONIALS_DATA);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Load any local reviews from localStorage and ensure actual dates are rendered gracefully
  useEffect(() => {
    try {
      const saved = localStorage.getItem('printxpress_user_reviews');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const updatedParsed = parsed.map((r: StoredReviewItem) => ({
            ...r,
            timestamp: r.timestamp || (Date.now() - 24 * 60 * 60 * 1000),
          }));
          setReviews([...updatedParsed, ...TESTIMONIALS_DATA]);
        }
      }
    } catch {
      // Ignore
    }
  }, []);

  // Helper to format actual calendar date for dynamic reviews
  const formatActualDate = (timestamp?: number, fallbackDate?: string) => {
    if (!timestamp) return fallbackDate || 'Oct 5, 2026';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    const now = Date.now();
    const formattedDate = new Date(now).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const newReview: StoredReviewItem = {
      id: `rev-${now}`,
      name: name.trim(),
      role: role.trim() || 'Valued Customer',
      roleHi: role.trim() || 'ग्राहक',
      location: location.trim() || 'Patna, Bihar',
      rating,
      text: text.trim(),
      textHi: text.trim(),
      date: formattedDate,
      timestamp: now,
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);

    try {
      const stored = localStorage.getItem('printxpress_user_reviews');
      const existing = stored ? JSON.parse(stored) : [];
      localStorage.setItem('printxpress_user_reviews', JSON.stringify([newReview, ...existing]));
    } catch {
      // Ignore
    }

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsWriteReviewOpen(false);
      setName('');
      setRole('');
      setLocation('');
      setText('');
      setRating(5);
    }, 1500);
  };

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-slate-900/50 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-400">
              {lang === 'en' ? 'Verified Client Feedback' : 'ग्राहकों के अनुभव'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {lang === 'en' ? 'Trusted by 5,000+ Businesses' : '5,000+ व्यापारियों का अटूट विश्वास'}
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              {lang === 'en'
                ? 'Read genuine reviews from local shopkeepers, doctors, schools, and event organizers across Patna & Bihar.'
                : 'पटना, पटना और गया के दुकानदारों, डॉक्टरों और संस्थानों की सच्ची राय।'}
            </p>
          </div>

          <button
            onClick={() => setIsWriteReviewOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors self-start md:self-auto cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>{lang === 'en' ? 'Write a Review' : 'अपनी समीक्षा दें'}</span>
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-950 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors shadow-sm"
            >
              <div className="space-y-3">
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{lang === 'en' ? rev.text : rev.textHi}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-900 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{rev.name}</span>
                    <UserCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {lang === 'en' ? rev.role : rev.roleHi} · {rev.location}
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 font-medium bg-slate-900 px-2 py-0.5 rounded">
                  {formatActualDate(rev.timestamp, rev.date)}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Write a Review Modal */}
      {isWriteReviewOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in"
          onClick={() => setIsWriteReviewOpen(false)}
        >
          <div
            className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {lang === 'en' ? 'Share Your Experience' : 'अपनी समीक्षा साझा करें'}
              </h3>
              <button
                onClick={() => setIsWriteReviewOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {isSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">
                  {lang === 'en' ? 'Thank You for Your Review!' : 'समीक्षा के लिए धन्यवाद!'}
                </h4>
                <p className="text-xs text-slate-400">Your feedback has been successfully published.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-300">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Amit Sharma"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-300">Business / Role</label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="e.g. Shopkeeper"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-300">Location (Patna Area)</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Kankerbagh, Patna"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-300">Rating</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none focus:border-blue-500"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5/5 Stars)</option>
                      <option value={4}>⭐⭐⭐⭐ (4/5 Stars)</option>
                      <option value={3}>⭐⭐⭐ (3/5 Stars)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">Your Review *</label>
                  <textarea
                    rows={3}
                    required
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write about print quality, speed, or staff behavior..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white text-xs focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors"
                >
                  Publish Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
