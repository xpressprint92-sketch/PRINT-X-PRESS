import React, { useState } from 'react';
import { Upload, Send, CheckCircle2, FileText, Image as ImageIcon, Sparkles, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO, SERVICES_DATA } from '../data/printingData';

interface QuoteSectionProps {
  lang: 'en' | 'hi';
}

export const QuoteSection: React.FC<QuoteSectionProps> = ({ lang }) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [service, setService] = useState(SERVICES_DATA[0]?.title || 'Flex Printing');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [requirement, setRequirement] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileDataUrl, setFileDataUrl] = useState<string | null>(null);
  const [whatsappUrlReady, setWhatsappUrlReady] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);

      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setFileDataUrl(uploadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * Helper function that generates a formatted, URL-encoded WhatsApp message.
   * Includes order summary, total estimated price, and user's provided file link/reference.
   * Replaces spaces with '%20' and newlines with '%0A'.
   */
  const generateWhatsAppMessage = (summary: string, estimatedPrice: string, fileLink: string) => {
    const rawMessage = `*New Quote Request - PRINT X PRESS*\n\n` +
      `*Order Summary:*\n${summary}\n\n` +
      `*Total Estimated Price:* ${estimatedPrice}\n` +
      `*File Link / Reference:* ${fileLink}\n\n` +
      `_Sent via Print X Press Web Portal_`;

    // URL encode while ensuring spaces become %20 and newlines become %0A
    const encoded = encodeURIComponent(rawMessage);
    return `https://wa.me/${BUSINESS_INFO.phonePrimary.replace('+', '')}?text=${encoded}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !mobile) {
      alert(lang === 'en' ? 'Please enter your Name and Mobile Number.' : 'कृपया अपना नाम और मोबाइल नंबर दर्ज करें।');
      return;
    }

    const summaryText = `Name: ${name}\nMobile: ${mobile}\nService: ${service}\nSize: ${size || 'Standard'}\nQty: ${quantity}\nNotes: ${requirement || 'None'}`;
    const estimatedPrice = '₹499 (Estimated Quote - Final confirmation on WhatsApp)';
    const fileLinkRef = uploadedFile 
      ? `[Attached File: ${uploadedFile.name} (${(uploadedFile.size / 1024).toFixed(1)} KB)]` 
      : 'No file attached';

    const url = generateWhatsAppMessage(summaryText, estimatedPrice, fileLinkRef);
    setWhatsappUrlReady(url);
    window.open(url, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="quote-section" className="py-20 bg-slate-900 border-t border-b border-slate-800 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Direct Order & Quote' : 'डायरेक्ट आर्डर एवं कोटेशन'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {lang === 'en' ? 'Send Your Printing Requirement' : 'अपनी प्रिंटिंग आवश्यकता भेजें'}
          </h2>
          <p className="text-sm text-slate-400">
            {lang === 'en'
              ? 'Upload your design files (PDF, CDR, AI, PSD, JPG, PNG) and get instant quotes sent directly to our WhatsApp.'
              : 'अपनी डिज़ाइन फ़ाइल अपलोड करें और सीधे WhatsApp पर तुरंत कोटेशन और रेट प्राप्त करें।'}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/60">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">
                {lang === 'en' ? 'Ready to Send to WhatsApp!' : 'WhatsApp पर भेजने के लिए तैयार है!'}
              </h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                {lang === 'en'
                  ? `Your order summary, estimated price, and file reference have been encoded for WhatsApp dispatch.`
                  : `आपकी आवश्यकता और फ़ाइल संदर्भ तैयार है।`}
              </p>

              {whatsappUrlReady && (
                <div className="pt-4 flex flex-col items-center gap-3">
                  <a
                    href={whatsappUrlReady}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-8 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl flex items-center gap-2 transition-transform hover:scale-105"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Open WhatsApp Chat Now</span>
                  </a>
                  {uploadedFile && (
                    <p className="text-xs text-amber-300 font-medium">
                      📎 Attached File Reference: <span className="underline font-bold">{uploadedFile.name}</span>
                    </p>
                  )}
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-slate-400 hover:text-white underline mt-2"
                  >
                    Submit another quote
                  </button>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Name */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    {lang === 'en' ? 'Your Name *' : 'आपका नाम *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={lang === 'en' ? 'e.g. Rajesh Kumar' : 'उदा. राजेश कुमार'}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Mobile Number */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    {lang === 'en' ? 'Mobile Number *' : 'मोबाइल नंबर *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder={lang === 'en' ? 'e.g. 9876543210' : 'उदा. 9876543210'}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                {/* Select Service */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    {lang === 'en' ? 'Select Service' : 'सेवा चुनें'}
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    {SERVICES_DATA.map((s) => (
                      <option key={s.id} value={s.title}>
                        {lang === 'en' ? s.title : s.titleHi}
                      </option>
                    ))}
                    <option value="Other Custom Printing">Other Custom Printing / अन्य प्रिंटिंग</option>
                  </select>
                </div>

                {/* Required Size */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    {lang === 'en' ? 'Required Size' : 'आवश्यक साइज़'}
                  </label>
                  <input
                    type="text"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    placeholder={lang === 'en' ? 'e.g. 4x3 ft or A4' : 'उदा. 4x3 फीट या A4'}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Quantity */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    {lang === 'en' ? 'Quantity' : 'मात्रा (Quantity)'}
                  </label>
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="1 piece / 100 pcs"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  {lang === 'en' ? 'Upload Design File (PDF, JPG, PNG, CDR, AI, PSD)' : 'डिज़ाइन फ़ाइल अपलोड करें (PDF, JPG, PNG, CDR, AI, PSD)'}
                </label>
                <div className="relative border-2 border-dashed border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 text-center bg-slate-900/50 transition-colors cursor-pointer group">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.cdr,.ai,.psd"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Upload className="w-6 h-6" />
                    </div>
                    {uploadedFile ? (
                      <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                        <FileText className="w-4 h-4" />
                        <span>{uploadedFile.name} (File Attached & Referenced)</span>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm font-medium text-white">
                          {lang === 'en' ? 'Click to upload or drag & drop files here' : 'फ़ाइल यहाँ अपलोड करने के लिए क्लिक करें'}
                        </p>
                        <p className="text-xs text-slate-400">
                          PDF, JPG, PNG, CDR, AI, PSD (Max 50MB)
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Requirement */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  {lang === 'en' ? 'Additional Requirement / Notes' : 'अन्य विवरण या निर्देश'}
                </label>
                <textarea
                  rows={3}
                  value={requirement}
                  onChange={(e) => setRequirement(e.target.value)}
                  placeholder={lang === 'en' ? 'Mention any specific finishing, lamination, or delivery instructions...' : 'कोई विशेष निर्देश या लेमिनेशन आवश्यकता यहाँ लिखें...'}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-base shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Send className="w-5 h-5" />
                <span>{lang === 'en' ? 'Send on WhatsApp' : 'WhatsApp पर भेजें'}</span>
              </button>

            </form>
          )}
        </div>

      </div>
    </section>
  );
};
