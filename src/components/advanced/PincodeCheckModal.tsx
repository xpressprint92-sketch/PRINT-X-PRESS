import React, { useState } from 'react';
import { MapPin, CheckCircle2, Truck, Store, X } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/printingData';

interface PincodeCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'hi';
}

export const PincodeCheckModal: React.FC<PincodeCheckModalProps> = ({ isOpen, onClose, lang }) => {
  const [pincode, setPincode] = useState('800016');
  const [result, setResult] = useState<{ available: boolean; message: string } | null>({
    available: true,
    message: 'Express Delivery & Shop Pickup Available in Patna (Kazipur, Kankerbagh, Boring Road, Ashok Rajpath & nearby areas).',
  });

  if (!isOpen) return null;

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.startsWith('800')) {
      setResult({
        available: true,
        message: `Delivery & Pickup Available for Pincode ${pincode} (Patna Region - Same day dispatch possible).`,
      });
    } else {
      setResult({
        available: true,
        message: `Pan-Bihar Courier Delivery available for Pincode ${pincode} (3-4 Business Days).`,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6 text-center">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>Delivery Checker</span>
            </div>
            <h2 className="text-2xl font-black text-white">
              {lang === 'en' ? 'Check Pincode Availability' : 'पिनकोड डिलीवरी जांच'}
            </h2>
            <p className="text-xs text-slate-400">
              {lang === 'en' ? 'Enter your postal pincode to check local delivery and store pickup.' : 'स्थानीय डिलीवरी और स्टोर पिकअप की जाँच करें।'}
            </p>
          </div>

          <form onSubmit={handleCheck} className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter Pincode (e.g. 800016)"
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-xs font-bold tracking-wider placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-colors"
              >
                Check
              </button>
            </div>
          </form>

          {result && (
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 text-left space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Service Available</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">{result.message}</p>
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1"><Store className="w-3.5 h-3.5 text-blue-400" /> Store Pickup Available</span>
                <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5 text-emerald-400" /> Doorstep Delivery</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
