import React from 'react';
import { Building2, ShoppingBag, FileText, Receipt, RotateCcw, X } from 'lucide-react';
import { usePrintStore } from '../../context/PrintStore';

interface BusinessPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'hi';
}

export const BusinessPortalModal: React.FC<BusinessPortalModalProps> = ({ isOpen, onClose, lang }) => {
  const { orders } = usePrintStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-4xl w-full p-6 sm:p-8 relative shadow-2xl overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>B2B Account Portal</span>
            </div>
            <h2 className="text-2xl font-black text-white">
              {lang === 'en' ? 'Business Customer Portal' : 'व्यावसायिक ग्राहक पोर्टल'}
            </h2>
            <p className="text-xs text-slate-400">
              {lang === 'en'
                ? 'Manage corporate print accounts, saved brand designs, bulk orders, and invoices.'
                : 'कॉर्पोरेट प्रिंट खाते, सहेजे गए ब्रांड डिज़ाइन और थोक ऑर्डर प्रबंधित करें।'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2">
              <span className="text-[11px] font-bold text-blue-400 uppercase">Corporate Account</span>
              <h3 className="text-lg font-bold text-white">Patna Enterprises</h3>
              <p className="text-xs text-slate-400">GSTIN: 10AAAAA0000A1Z5</p>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2">
              <span className="text-[11px] font-bold text-emerald-400 uppercase">Credit Facility</span>
              <h3 className="text-lg font-bold text-white">Active (Net 30)</h3>
              <p className="text-xs text-slate-400">Available Limit: ₹50,000</p>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2">
              <span className="text-[11px] font-bold text-purple-400 uppercase">Frequent Orders</span>
              <h3 className="text-lg font-bold text-white">14 Recurring Items</h3>
              <p className="text-xs text-slate-400">Ready for instant 1-click reorder</p>
            </div>
          </div>

          {/* Previous Orders & Quick Reorder */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Frequently Ordered Business Items</h3>
            <div className="space-y-3">
              {orders.map((o) => (
                <div key={o.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="text-xs font-bold text-blue-400">{o.orderId}</span>
                    <h4 className="text-base font-bold text-white">{o.product}</h4>
                    <p className="text-xs text-slate-400">Size: {o.size} | Qty: {o.quantity}</p>
                  </div>
                  <button
                    onClick={() => alert(`Reordering business item: ${o.product}`)}
                    className="py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Quick Reorder</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
