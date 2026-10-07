import React, { useState } from 'react';
import { Search, CheckCircle2, Clock, Truck, Package, X, ShieldCheck } from 'lucide-react';
import { usePrintStore, OrderItem } from '../../context/PrintStore';

interface LiveTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'hi';
}

const statusSteps: OrderItem['status'][] = [
  'Order Received',
  'Quote Confirmed',
  'Designing',
  'Proof Ready',
  'Design Approved',
  'Printing',
  'Finishing',
  'Ready',
  'Delivered'
];

export const LiveTrackerModal: React.FC<LiveTrackerModalProps> = ({ isOpen, onClose, lang }) => {
  const { orders } = usePrintStore();
  const [searchId, setSearchId] = useState('');
  const [searchMobile, setSearchMobile] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<OrderItem | null>(null);
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const found = orders.find(
      (o) =>
        o.orderId.toLowerCase().includes(searchId.trim().toLowerCase()) ||
        o.mobile.includes(searchMobile.trim())
    );
    setTrackedOrder(found || null);
  };

  const getStepIndex = (status: OrderItem['status']) => {
    return statusSteps.indexOf(status);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
              {lang === 'en' ? 'Live Order Tracking' : 'लाइव आर्डर ट्रैकिंग'}
            </span>
            <h2 className="text-2xl font-black text-white">
              {lang === 'en' ? 'Track Your Print Order' : 'अपने प्रिंट आर्डर की स्थिति देखें'}
            </h2>
            <p className="text-xs text-slate-400">
              {lang === 'en'
                ? 'Enter your Order ID (e.g. XP-8942) or Mobile Number to view real-time progress.'
                : 'रियल-टाइम प्रगति देखने के लिए अपना आर्डर आईडी या मोबाइल नंबर दर्ज करें।'}
            </p>
          </div>

          <form onSubmit={handleTrack} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder={lang === 'en' ? 'Order ID (XP-8942)' : 'आर्डर आईडी'}
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
            />
            <input
              type="tel"
              placeholder={lang === 'en' ? 'Mobile Number' : 'मोबाइल नंबर'}
              value={searchMobile}
              onChange={(e) => setSearchMobile(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-colors"
            >
              <Search className="w-4 h-4" />
              <span>{lang === 'en' ? 'Track Status' : 'ट्रैक करें'}</span>
            </button>
          </form>

          {searched && (
            <div className="mt-6">
              {trackedOrder ? (
                <div className="space-y-6 bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-800">
                    <div>
                      <div className="text-xs font-semibold text-blue-400">{trackedOrder.orderId}</div>
                      <h3 className="text-lg font-bold text-white">{trackedOrder.product}</h3>
                      <p className="text-xs text-slate-400">Size: {trackedOrder.size} | Qty: {trackedOrder.quantity}</p>
                    </div>
                    <div className="text-right">
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                        {trackedOrder.status}
                      </span>
                      <p className="text-[11px] text-slate-400 mt-1">Date: {trackedOrder.date}</p>
                    </div>
                  </div>

                  {/* Visual Progress Timeline */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      {lang === 'en' ? 'Order Progress Timeline' : 'आर्डर प्रगति समयरेखा'}
                    </h4>
                    <div className="space-y-3 pt-2">
                      {statusSteps.map((step, idx) => {
                        const currentIndex = getStepIndex(trackedOrder.status);
                        const isCompleted = idx <= currentIndex;
                        const isCurrent = idx === currentIndex;

                        return (
                          <div key={step} className="flex items-center gap-3">
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                                isCompleted
                                  ? 'bg-emerald-600 text-white shadow-md'
                                  : 'bg-slate-800 text-slate-500 border border-slate-700'
                              }`}
                            >
                              {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                            </div>
                            <div className="flex-1 flex items-center justify-between">
                              <span
                                className={`text-xs font-medium ${
                                  isCurrent ? 'text-white font-bold' : isCompleted ? 'text-slate-300' : 'text-slate-500'
                                }`}
                              >
                                {step}
                              </span>
                              {isCurrent && (
                                <span className="text-[10px] text-blue-400 font-semibold animate-pulse">
                                  Current Status
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center space-y-3 bg-slate-900/40 rounded-2xl border border-slate-800">
                  <Clock className="w-10 h-10 text-slate-600 mx-auto" />
                  <p className="text-sm font-semibold text-white">
                    {lang === 'en' ? 'No order found with these details.' : 'इन विवरणों के साथ कोई आर्डर नहीं मिला।'}
                  </p>
                  <p className="text-xs text-slate-400">
                    {lang === 'en' ? 'Try checking your Order ID (e.g. XP-8942) or call us at +91 7481068602' : 'अपनी आर्डर आईडी जांचें या कॉल करें।'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
