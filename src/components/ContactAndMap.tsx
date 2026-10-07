import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/printingData';

interface ContactAndMapProps {
  lang: 'en' | 'hi';
}

export const ContactAndMap: React.FC<ContactAndMapProps> = ({ lang }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Flex Printing');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const text = `*New Website Inquiry*\nName: ${name}\nPhone: ${phone}\nService Needed: ${service}\nDetails: ${message || 'N/A'}`;
    const url = `https://wa.me/917481068602?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');

    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setName('');
      setPhone('');
      setMessage('');
    }, 2000);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-900/60 border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-400">
            {lang === 'en' ? 'Visit Our Patna Press' : 'हमारे पटना स्टोर पर पधारें'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {lang === 'en' ? 'Get In Touch & Visit Us' : 'संपर्क करें एवं विजिट करें'}
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            {lang === 'en'
              ? 'Conveniently located near Palan G Mall & MI Realme Store in Patna. Walk in for instant print samples!'
              : 'पालन जी मॉल एवं रियलमी स्टोर के पास स्थित। प्रत्यक्ष आकर विभिन्न मटेरियल के सैंपल देखें।'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Info & Store Details */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Store Location Card */}
            <a
              href={BUSINESS_INFO.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 transition-colors group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                    {lang === 'en' ? 'Physical Store Address' : 'प्रेस का पता'}
                  </div>
                  <h3 className="text-base font-bold text-white leading-snug">
                    {lang === 'en' ? BUSINESS_INFO.address : BUSINESS_INFO.addressHi}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {lang === 'en'
                      ? 'Serving Patna, Kako, Makhdumpur, Ghosi, Patna & all Bihar districts.'
                      : 'पटना, काको, मखदुमपुर, घोसी, पटना एवं पूरे बिहार में सेवा उपलब्ध।'}
                  </p>
                  <span className="inline-block text-xs font-semibold text-blue-400 group-hover:underline pt-1">
                    {lang === 'en' ? 'Open in Google Maps →' : 'गूगल मैप्स में रास्ता देखें →'}
                  </span>
                </div>
              </div>
            </a>

            {/* Direct Phone Numbers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={`tel:${BUSINESS_INFO.phonePrimary}`}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 transition-colors flex items-center gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-medium">Primary Order Hotline</div>
                  <div className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors tabular-nums">
                    {BUSINESS_INFO.phoneDisplay}
                  </div>
                </div>
              </a>

              <a
                href={`tel:${BUSINESS_INFO.phoneSecondary}`}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 transition-colors flex items-center gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-medium">Alternate Contact</div>
                  <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors tabular-nums">
                    {BUSINESS_INFO.phoneSecondaryDisplay}
                  </div>
                </div>
              </a>
            </div>

            {/* Hours & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-medium">Operational Hours</div>
                  <div className="text-xs font-bold text-white">9:00 AM - 9:00 PM (Daily)</div>
                  <div className="text-[10px] text-emerald-400">Open 7 Days a Week</div>
                </div>
              </div>

              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 transition-colors flex items-center gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <div className="text-[11px] text-slate-400 font-medium">Official Email</div>
                  <div className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors truncate">
                    {BUSINESS_INFO.email}
                  </div>
                </div>
              </a>
            </div>

            {/* Quick WhatsApp Action Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-emerald-900/20 to-slate-950 border border-emerald-900/50 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-emerald-400">Direct WhatsApp Chat</div>
                <p className="text-[11px] text-slate-300">Share your banner CDR file or design photo instantly</p>
              </div>
              <a
                href={`https://wa.me/917481068602`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shrink-0 flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>Chat Now</span>
              </a>
            </div>

          </div>

          {/* Right Column: Send Inquiry Form */}
          <div className="lg:col-span-6 bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl">
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                {lang === 'en' ? 'Send Printing Requirement' : 'प्रिंटिंग रिक्वायरमेंट भेजें'}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'en'
                  ? 'We reply within 15 minutes with quotation and turnaround time.'
                  : '15 मिनट के अंदर आपको कोटेशन और डिलीवरी का समय बता दिया जाएगा।'}
              </p>
            </div>

            {isSent ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-white">Opening WhatsApp...</h4>
                <p className="text-xs text-slate-400">
                  Your inquiry has been prepared and forwarded to PRINT X PRESS.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-slate-300 mb-1">
                      {lang === 'en' ? 'Your Name *' : 'आपका नाम *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rakesh Kumar"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-300 mb-1">
                      {lang === 'en' ? 'Mobile / WhatsApp Number *' : 'मोबाइल / व्हाट्सएप नंबर *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 tabular-nums"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-slate-300 mb-1">
                    {lang === 'en' ? 'Printing Service Required' : 'जरूरी सर्विस चुनें'}
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Normal Flex Banner">Normal Flex Banner (280 GSM)</option>
                    <option value="Star Flex Banner">Star Flex Banner (340 GSM)</option>
                    <option value="3D LED Glow Sign Board">3D Acrylic / LED Glow Sign Board</option>
                    <option value="Vinyl + Sunboard Sheet">Vinyl + 3mm/5mm Sunboard Sheet</option>
                    <option value="Roll-up Standee">Roll-up Exhibition Standee</option>
                    <option value="Visiting Cards">Business / Visiting Cards</option>
                    <option value="Custom T-Shirt / Mug">Custom T-Shirt or Photo Mug</option>
                    <option value="School / Office ID Cards">PVC ID Cards & Lanyards</option>
                    <option value="Iron Frame Fabrication">Iron Frame Fabrication & Installation</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-300 mb-1">
                    {lang === 'en' ? 'Dimensions or Details (Optional)' : 'साइज या अन्य विवरण (वैकल्पिक)'}
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. Need 10x4 ft flex banner for shop opening this Friday with iron frame."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-500 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-600/20"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {lang === 'en' ? 'Submit Inquiry via WhatsApp' : 'व्हाट्सएप पर इनक्वायरी भेजें'}
                  </span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
