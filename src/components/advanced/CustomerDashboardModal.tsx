import React, { useState } from 'react';
import { ShoppingBag, FileText, Image as ImageIcon, Receipt, CreditCard, RotateCcw, X, ExternalLink, CheckCircle2 } from 'lucide-react';
import { usePrintStore, OrderItem } from '../../context/PrintStore';

interface CustomerDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'hi';
  onOpenTracker: () => void;
  onOpenProofs: () => void;
  onOpenReorder: (order: OrderItem) => void;
}

export const CustomerDashboardModal: React.FC<CustomerDashboardModalProps> = ({
  isOpen,
  onClose,
  lang,
  onOpenTracker,
  onOpenProofs,
  onOpenReorder,
}) => {
  const { orders, designProofs } = usePrintStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'quotes' | 'files' | 'proofs' | 'invoices'>('orders');

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
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
              {lang === 'en' ? 'Customer Portal' : 'कस्टमर पोर्टल'}
            </span>
            <h2 className="text-2xl font-black text-white">
              {lang === 'en' ? 'My Print Dashboard' : 'मेरा प्रिंट डैशबोर्ड'}
            </h2>
            <p className="text-xs text-slate-400">
              {lang === 'en'
                ? 'Manage your orders, design proofs, saved files, quotes, and quick reorders.'
                : 'अपने आर्डर, डिज़ाइन प्रूफ, सहेजी गई फ़ाइलें और कोटेशन प्रबंधित करें।'}
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-800">
            {[
              { id: 'orders', label: lang === 'en' ? 'My Orders' : 'मेरे आर्डर', icon: <ShoppingBag className="w-3.5 h-3.5" /> },
              { id: 'quotes', label: lang === 'en' ? 'My Quotes' : 'कोटेशन', icon: <FileText className="w-3.5 h-3.5" /> },
              { id: 'files', label: lang === 'en' ? 'My Files' : 'मेरी फ़ाइलें', icon: <ImageIcon className="w-3.5 h-3.5" /> },
              { id: 'proofs', label: lang === 'en' ? 'Design Proofs' : 'डिज़ाइन प्रूफ', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
              { id: 'invoices', label: lang === 'en' ? 'Invoices' : 'इनवॉइस', icon: <Receipt className="w-3.5 h-3.5" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-4 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-4">
            {activeTab === 'orders' && (
              <div className="space-y-3">
                {orders.map((o) => (
                  <div key={o.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-blue-400">{o.orderId}</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                          {o.status}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white">{o.product}</h4>
                      <p className="text-xs text-slate-400">Size: {o.size} | Qty: {o.quantity} | Date: {o.date}</p>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                      <span className="text-sm font-black text-white mr-2">₹{o.amount}</span>
                      <button
                        onClick={onOpenTracker}
                        className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors"
                      >
                        Track
                      </button>
                      <button
                        onClick={() => onOpenReorder(o)}
                        className="py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>REORDER</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'quotes' && (
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 text-center space-y-3">
                <FileText className="w-10 h-10 text-slate-600 mx-auto" />
                <h4 className="text-sm font-bold text-white">Active Custom Quotes</h4>
                <p className="text-xs text-slate-400">All your custom quotation requests submitted via WhatsApp or portal appear here.</p>
              </div>
            )}

            {activeTab === 'files' && (
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 text-center space-y-3">
                <ImageIcon className="w-10 h-10 text-slate-600 mx-auto" />
                <h4 className="text-sm font-bold text-white">Uploaded Artwork Files</h4>
                <p className="text-xs text-slate-400">CDR, PDF, AI, and PSD files uploaded for printing are stored securely here.</p>
              </div>
            )}

            {activeTab === 'proofs' && (
              <div className="space-y-3">
                {designProofs.map((p) => (
                  <div key={p.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex justify-between items-center">
                    <div>
                      <span className="text-xs font-bold text-blue-400">{p.orderId} - Ver {p.version}</span>
                      <h4 className="text-sm font-bold text-white">{p.productName}</h4>
                      <p className="text-xs text-slate-400">Status: {p.status}</p>
                    </div>
                    <button
                      onClick={onOpenProofs}
                      className="py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors"
                    >
                      View Proof
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'invoices' && (
              <div className="space-y-3">
                {orders.map((o) => (
                  <div key={o.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex justify-between items-center">
                    <div>
                      <span className="text-xs font-bold text-blue-400">Invoice #{o.orderId}</span>
                      <h4 className="text-sm font-bold text-white">{o.product}</h4>
                      <p className="text-xs text-slate-400">Amount: ₹{o.amount} | Status: {o.paymentStatus}</p>
                    </div>
                    <button
                      onClick={() => alert(`Downloading Invoice for ${o.orderId}`)}
                      className="py-2 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-colors"
                    >
                      <Receipt className="w-3.5 h-3.5 text-blue-400" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
