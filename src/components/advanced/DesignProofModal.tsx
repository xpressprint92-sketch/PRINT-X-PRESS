import React, { useState } from 'react';
import { Eye, CheckCircle2, AlertCircle, MessageSquare, History, X, Send } from 'lucide-react';
import { usePrintStore, DesignProofItem } from '../../context/PrintStore';

interface DesignProofModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'hi';
}

export const DesignProofModal: React.FC<DesignProofModalProps> = ({ isOpen, onClose, lang }) => {
  const { designProofs, updateProofStatus } = usePrintStore();
  const [selectedProof, setSelectedProof] = useState<DesignProofItem | null>(designProofs[0] || null);
  const [feedback, setFeedback] = useState('');
  const [showChangesBox, setShowChangesBox] = useState(false);

  if (!isOpen) return null;

  const handleApprove = (id: string) => {
    updateProofStatus(id, 'Approved');
    alert(lang === 'en' ? 'Design proof successfully approved! Proceeding to print.' : 'डिज़ाइन प्रूफ स्वीकृत हो गया!');
  };

  const handleRequestChanges = (id: string) => {
    if (!feedback.trim()) {
      alert(lang === 'en' ? 'Please describe the required changes.' : 'कृपया आवश्यक बदलावों का विवरण दें।');
      return;
    }
    updateProofStatus(id, 'Changes Requested', feedback);
    setFeedback('');
    setShowChangesBox(false);
    alert(lang === 'en' ? 'Change request sent to our designer!' : 'सुधार का अनुरोध डिजाइनर को भेज दिया गया है!');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 relative shadow-2xl overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
              {lang === 'en' ? 'Online Design Proofing' : 'ऑनलाइन डिज़ाइन प्रूफ अप्रूवल'}
            </span>
            <h2 className="text-2xl font-black text-white">
              {lang === 'en' ? 'Review Your Design Proof' : 'अपनी डिज़ाइन प्रूफ की समीक्षा करें'}
            </h2>
            <p className="text-xs text-slate-400">
              {lang === 'en'
                ? 'Check high-resolution previews, version history, and approve or request revisions.'
                : 'उच्च-रिज़ॉल्यूशन पूर्वावलोकन की जाँच करें और अनुमोदन करें या संशोधन का अनुरोध करें।'}
            </p>
          </div>

          {/* Proof Selector / List */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {designProofs.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedProof(p);
                  setShowChangesBox(false);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
                  selectedProof?.id === p.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <span>{p.productName}</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-950/60 text-[10px]">Ver {p.version}</span>
              </button>
            ))}
          </div>

          {selectedProof ? (
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-blue-400">{selectedProof.orderId}</span>
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 text-[10px] font-bold">
                      Version {selectedProof.version}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1">{selectedProof.productName}</h3>
                  <p className="text-xs text-slate-400">Uploaded on: {selectedProof.date}</p>
                </div>
                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      selectedProof.status === 'Approved'
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        : selectedProof.status === 'Changes Requested'
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                        : 'bg-blue-500/20 text-blue-400 border-blue-500/40'
                    }`}
                  >
                    {selectedProof.status}
                  </span>
                </div>
              </div>

              {/* Mockup Preview Box */}
              <div className="aspect-[16/9] w-full bg-slate-950 rounded-xl border border-slate-800 relative flex items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 to-purple-950/30 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 mb-3">
                    <Eye className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-bold text-white">{selectedProof.productName} (Proof V{selectedProof.version})</h4>
                  <p className="text-xs text-slate-400 mt-1">High-Resolution CMYK Layout Verified</p>
                </div>
              </div>

              {/* Designer Note */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Designer Note:</span>
                <p className="text-xs text-slate-200">{selectedProof.designerNote}</p>
              </div>

              {/* Action Buttons */}
              {selectedProof.status !== 'Approved' && (
                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => handleApprove(selectedProof.id)}
                      className="flex-1 py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{lang === 'en' ? 'APPROVE DESIGN' : 'डिज़ाइन स्वीकृत करें'}</span>
                    </button>
                    <button
                      onClick={() => setShowChangesBox(!showChangesBox)}
                      className="flex-1 py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-700 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{lang === 'en' ? 'REQUEST CHANGES' : 'बदलाव का अनुरोध करें'}</span>
                    </button>
                  </div>

                  {showChangesBox && (
                    <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800 animate-fadeIn">
                      <label className="block text-xs font-semibold text-slate-300 uppercase">
                        {lang === 'en' ? 'Describe Required Changes:' : 'आवश्यक बदलावों का वर्णन करें:'}
                      </label>
                      <textarea
                        rows={3}
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="e.g. Please increase phone number font size and adjust logo colors..."
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-blue-500 resize-none"
                      />
                      <button
                        onClick={() => handleRequestChanges(selectedProof.id)}
                        className="py-2.5 px-5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-colors"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{lang === 'en' ? 'Send Feedback to Designer' : 'डिजाइनर को भेजें'}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="py-12 text-center text-slate-500 text-xs">No design proofs found.</div>
          )}
        </div>
      </div>
    </div>
  );
};
