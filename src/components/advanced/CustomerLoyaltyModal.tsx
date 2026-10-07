import React from 'react';
import { Award, Gift, Sparkles, CheckCircle2, X } from 'lucide-react';

interface CustomerLoyaltyModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'hi';
}

export const CustomerLoyaltyModal: React.FC<CustomerLoyaltyModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div className="space-y-1 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Rewards Program</span>
            </div>
            <h2 className="text-2xl font-black text-white">
              {lang === 'en' ? 'PRINT X PRESS Loyalty Club' : 'लॉयल्टी क्लब और रिवार्ड्स'}
            </h2>
            <p className="text-xs text-slate-400">
              {lang === 'en' ? 'Earn reward points on every print order and redeem them for discounts.' : 'हर प्रिंट आर्डर पर रिवार्ड पॉइंट अर्जित करें।'}
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/30 rounded-2xl p-6 text-center space-y-3">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">Your Available Balance</span>
            <div className="text-4xl font-black text-white">
              250 <span className="text-sm font-semibold text-amber-400">Points</span>
            </div>
            <p className="text-xs text-slate-300">Equivalent to ₹250 instant discount on your next print order!</p>
          </div>

          <div className="space-y-3 text-xs">
            <h3 className="font-bold text-slate-300 uppercase tracking-wider">How to earn points:</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-200">Every ₹100 Spent on Printing</span>
                <span className="font-bold text-emerald-400">+5 Points</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-200">Refer a Friend / Business</span>
                <span className="font-bold text-emerald-400">+100 Points</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-200">Leave a Product Review</span>
                <span className="font-bold text-emerald-400">+50 Points</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
