import React, { useState, useId } from 'react';
import { Calculator, MessageCircle, Printer, Check, Info, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/printingData';

interface RateCalculatorProps {
  lang: 'en' | 'hi';
  onOpenDesignPreview?: () => void;
}

interface PrintProductOption {
  id: string;
  name: string;
  nameHi: string;
  ratePerSqFt?: number;
  fixedRatePerUnit?: number;
  unit: 'sq.ft' | 'piece' | 'cards' | 'book';
  defaultWidth?: number;
  defaultHeight?: number;
  description: string;
}

const PRODUCT_OPTIONS: PrintProductOption[] = [
  {
    id: 'normal-flex',
    name: 'Normal Frontlit Flex (280 GSM)',
    nameHi: 'नॉर्मल फ्रंटलिट फ्लेक्स (280 GSM)',
    ratePerSqFt: 12,
    unit: 'sq.ft',
    defaultWidth: 4,
    defaultHeight: 3,
    description: 'Best for short term events, road rallies & seasonal banners',
  },
  {
    id: 'star-flex',
    name: 'Heavy Star Flex (340 GSM)',
    nameHi: 'हैवी स्टार फ्लेक्स (340 GSM)',
    ratePerSqFt: 18,
    unit: 'sq.ft',
    defaultWidth: 6,
    defaultHeight: 3,
    description: 'Thick, high gloss, vibrant colors for permanent shop boards',
  },
  {
    id: 'glow-sign-board',
    name: '3D LED Glow Sign Board (Complete)',
    nameHi: '3D LED ग्लो साइन बोर्ड (कम्पलीट सेट)',
    ratePerSqFt: 180,
    unit: 'sq.ft',
    defaultWidth: 6,
    defaultHeight: 3,
    description: 'Backlit acrylic box with waterproof Samsung LED modules',
  },
  {
    id: 'vinyl-sunboard-3mm',
    name: 'Eco-Solvent Vinyl + 3mm Sunboard',
    nameHi: 'विनाइल + 3mm सनबोर्ड शीट',
    ratePerSqFt: 35,
    unit: 'sq.ft',
    defaultWidth: 3,
    defaultHeight: 2,
    description: 'High definition photographic display for clinic, office & menu',
  },
  {
    id: 'one-way-vision',
    name: 'One-Way Vision Glass Sticker',
    nameHi: 'वन-वे विज़न ग्लास स्टीकर',
    ratePerSqFt: 30,
    unit: 'sq.ft',
    defaultWidth: 4,
    defaultHeight: 3,
    description: 'Perforated glass film with clear view inside and vibrant print outside',
  },
  {
    id: 'vinyl-only',
    name: 'Photo Vinyl Print (Laminated Sticker)',
    nameHi: 'फोटो विनाइल स्टीकर (लेमिनेटेड)',
    ratePerSqFt: 22,
    unit: 'sq.ft',
    defaultWidth: 4,
    defaultHeight: 2,
    description: 'Self-adhesive waterproof vinyl for glass, wall & vehicles',
  },
  {
    id: 'standee-rollup',
    name: 'Roll-Up Standee (Complete with Aluminum Stand)',
    nameHi: 'रोल-अप स्टैंडी (एल्युमिनियम स्टैंड सहित)',
    fixedRatePerUnit: 850,
    unit: 'piece',
    defaultWidth: 6,
    defaultHeight: 2.5,
    description: 'Retractable portable pull-up banner with carry case (6x2.5 ft)',
  },
  {
    id: 'visiting-cards',
    name: 'Visiting Cards (350 GSM Matte)',
    nameHi: 'विजिटिंग कार्ड्स (350 GSM मैट)',
    fixedRatePerUnit: 250,
    unit: 'cards',
    description: 'Pack of 100 premium business cards with sharp digital/offset print',
  },
  {
    id: 'custom-tshirt',
    name: 'Custom Printed T-Shirt (DTF Print)',
    nameHi: 'कस्टम टी-शर्ट (DTF लोगो प्रिंट)',
    fixedRatePerUnit: 350,
    unit: 'piece',
    description: '100% bio-washed cotton round neck with washable full-color print',
  },
  {
    id: 'custom-mug',
    name: 'Ceramic Photo Mug',
    nameHi: 'सिरेमिक फोटो मग',
    fixedRatePerUnit: 199,
    unit: 'piece',
    description: 'Glossy ceramic mug with permanent high-vibrancy photo print',
  },
  {
    id: 'bill-books',
    name: 'Duplicate Bill Book & Cash Memo',
    nameHi: 'डुप्लीकेट बिल बुक एवं कैश मेमो',
    fixedRatePerUnit: 150,
    unit: 'book',
    description: 'Numbered carbonless NCR billing book with shop logo',
  },
  {
    id: 'rubber-stamps',
    name: 'Self-Inking Rubber Stamp / Seal',
    nameHi: 'ऑटो-इंक रबर स्टाम्प एवं सील',
    fixedRatePerUnit: 150,
    unit: 'piece',
    description: 'Automatic self-inking company or doctor stamp',
  },
  {
    id: 'carry-bags',
    name: 'Branded Non-Woven Shopping Bags (100 pcs)',
    nameHi: 'दुकान के प्रचार वाले कैरी बैग (100 पीस)',
    fixedRatePerUnit: 1200,
    unit: 'piece',
    description: 'Eco-friendly promotional shopping bags with store branding',
  },
];

const PRESET_SIZES = [
  { label: '2 x 3 ft', w: 2, h: 3 },
  { label: '3 x 4 ft', w: 3, h: 4 },
  { label: '4 x 6 ft', w: 4, h: 6 },
  { label: '6 x 3 ft', w: 6, h: 3 },
  { label: '8 x 3 ft', w: 8, h: 3 },
  { label: '10 x 4 ft', w: 10, h: 4 },
  { label: '12 x 5 ft', w: 12, h: 5 },
  { label: '20 x 10 ft', w: 20, h: 10 },
];

export const RateCalculator: React.FC<RateCalculatorProps> = ({ lang, onOpenDesignPreview }) => {
  const [selectedProductId, setSelectedProductId] = useState<string>('normal-flex');
  const [width, setWidth] = useState<number>(6);
  const [height, setHeight] = useState<number>(3);
  const [quantity, setQuantity] = useState<number>(1);

  // Finishing addons
  const [hasEyelets, setHasEyelets] = useState<boolean>(true); // Free
  const [hasHemming, setHasHemming] = useState<boolean>(true); // Edge folding
  const [hasIronFrame, setHasIronFrame] = useState<boolean>(false); // +₹35/sqft
  const [hasInstallation, setHasInstallation] = useState<boolean>(false); // +₹15/sqft in Patna

  // Form IDs for accessibility
  const productSelectId = useId();
  const widthInputId = useId();
  const heightInputId = useId();
  const quantityInputId = useId();

  const currentProduct = PRODUCT_OPTIONS.find((p) => p.id === selectedProductId) || PRODUCT_OPTIONS[0];

  // Calculations
  const isSqFtBased = currentProduct.unit === 'sq.ft';
  const areaPerUnit = isSqFtBased ? Math.max(1, width * height) : 1;
  const totalArea = isSqFtBased ? areaPerUnit * quantity : 0;

  let baseRate = 0;
  let baseCost = 0;

  if (isSqFtBased && currentProduct.ratePerSqFt) {
    baseRate = currentProduct.ratePerSqFt;
    baseCost = totalArea * baseRate;
  } else if (currentProduct.fixedRatePerUnit) {
    baseRate = currentProduct.fixedRatePerUnit;
    baseCost = baseRate * quantity;
  }

  // Addons cost
  let addonsCost = 0;
  if (isSqFtBased) {
    if (hasIronFrame) {
      addonsCost += totalArea * 35; // MS Iron Pipe Frame
    }
    if (hasInstallation) {
      addonsCost += Math.max(200, totalArea * 15); // Installation in Patna
    }
  }

  // Bulk discount
  let discountPercent = 0;
  if (isSqFtBased && totalArea >= 300) {
    discountPercent = 10;
  } else if (isSqFtBased && totalArea >= 100) {
    discountPercent = 5;
  } else if (!isSqFtBased && quantity >= 10) {
    discountPercent = 10;
  } else if (!isSqFtBased && quantity >= 5) {
    discountPercent = 5;
  }

  const subTotal = baseCost + addonsCost;
  const discountAmount = Math.round((subTotal * discountPercent) / 100);
  const estimatedTotal = Math.max(0, subTotal - discountAmount);

  // Generate WhatsApp Message
  const getWhatsAppMessage = () => {
    let msg = `*New Order Inquiry - PRINT X PRESS*\n`;
    msg += `---------------------------------\n`;
    msg += `*Service:* ${currentProduct.name}\n`;
    if (isSqFtBased) {
      msg += `*Size:* ${width} ft x ${height} ft (${areaPerUnit} sq.ft per banner)\n`;
      msg += `*Total Area:* ${totalArea} sq.ft\n`;
    }
    msg += `*Quantity:* ${quantity} ${currentProduct.unit}\n`;
    if (isSqFtBased) {
      msg += `*Eyelets (छेद/रिंग):* ${hasEyelets ? 'Yes (Included)' : 'No'}\n`;
      msg += `*Border Hemming:* ${hasHemming ? 'Yes' : 'No'}\n`;
      msg += `*Iron MS Frame:* ${hasIronFrame ? 'Yes (+₹35/sq.ft)' : 'No'}\n`;
      msg += `*Patna Installation:* ${hasInstallation ? 'Yes' : 'No'}\n`;
    }
    if (discountPercent > 0) {
      msg += `*Bulk Discount:* ${discountPercent}% (-₹${discountAmount})\n`;
    }
    msg += `*Estimated Total:* ₹${estimatedTotal}\n`;
    msg += `---------------------------------\n`;
    msg += `Please confirm availability and timeline for pickup/delivery in Patna.`;
    return encodeURIComponent(msg);
  };

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <section id="calculator" className="py-16 sm:py-24 bg-slate-900/60 border-b border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-widest">
            <Calculator className="w-4 h-4" />
            <span>{lang === 'en' ? 'Transparent Factory Rates' : 'पारदर्शी फैक्टरी रेट'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {lang === 'en' ? 'Instant Printing Rate Calculator' : 'तुरंत प्रिंटिंग रेट कैलकुलेटर'}
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            {lang === 'en'
              ? 'Calculate accurate pricing for banners, boards, cards, and merchandise with instant WhatsApp booking.'
              : 'अपने बैनर, बोर्ड या कार्ड का साइज डालकर तुरंत सही रेट जानें और सीधे व्हाट्सएप पर ऑर्डर भेजें।'}
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Configuration Panel */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            
            {/* Step 1: Select Product */}
            <div>
              <label htmlFor={productSelectId} className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                1. {lang === 'en' ? 'Select Printing Material / Service' : 'प्रिंटिंग सर्विस चुनें'}
              </label>
              <select
                id={productSelectId}
                value={selectedProductId}
                onChange={(e) => {
                  const pId = e.target.value;
                  setSelectedProductId(pId);
                  const p = PRODUCT_OPTIONS.find((item) => item.id === pId);
                  if (p?.defaultWidth && p?.defaultHeight) {
                    setWidth(p.defaultWidth);
                    setHeight(p.defaultHeight);
                  }
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm font-medium text-white focus:outline-none focus:border-blue-500 transition-colors"
              >
                {PRODUCT_OPTIONS.map((prod) => (
                  <option key={prod.id} value={prod.id}>
                    {lang === 'en' ? prod.name : prod.nameHi} — {prod.unit === 'sq.ft' ? `₹${prod.ratePerSqFt}/sq.ft` : `₹${prod.fixedRatePerUnit}/${prod.unit}`}
                  </option>
                ))}
              </select>
              <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{currentProduct.description}</span>
              </p>
            </div>

            {/* Step 2: Dimensions if Sq.Ft based */}
            {isSqFtBased ? (
              <div className="space-y-3 pt-2 border-t border-slate-800/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    2. {lang === 'en' ? 'Dimensions (in Feet)' : 'साइज (फीट में)'}
                  </span>
                  <span className="text-xs text-blue-400 font-semibold tabular-nums">
                    {areaPerUnit} sq.ft / banner
                  </span>
                </div>

                {/* Preset quick buttons */}
                <div className="flex flex-wrap gap-2">
                  {PRESET_SIZES.map((preset) => {
                    const isSelected = width === preset.w && height === preset.h;
                    return (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => {
                          setWidth(preset.w);
                          setHeight(preset.h);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>

                {/* Custom inputs */}
                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div>
                    <label htmlFor={widthInputId} className="block text-xs font-medium text-slate-400 mb-1">
                      {lang === 'en' ? 'Width (Feet)' : 'चौड़ाई (फीट)'}
                    </label>
                    <input
                      id={widthInputId}
                      type="number"
                      min={1}
                      max={100}
                      step={0.5}
                      value={width}
                      onChange={(e) => setWidth(Math.max(1, parseFloat(e.target.value) || 1))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-blue-500 tabular-nums"
                    />
                  </div>
                  <div>
                    <label htmlFor={heightInputId} className="block text-xs font-medium text-slate-400 mb-1">
                      {lang === 'en' ? 'Height (Feet)' : 'ऊंचाई (फीट)'}
                    </label>
                    <input
                      id={heightInputId}
                      type="number"
                      min={1}
                      max={50}
                      step={0.5}
                      value={height}
                      onChange={(e) => setHeight(Math.max(1, parseFloat(e.target.value) || 1))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-blue-500 tabular-nums"
                    />
                  </div>
                </div>
              </div>
            ) : null}

            {/* Step 3: Quantity */}
            <div className="pt-2 border-t border-slate-800/80">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor={quantityInputId} className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  {isSqFtBased ? '3.' : '2.'} {lang === 'en' ? 'Quantity' : 'संख्या (मात्रा)'}
                </label>
                {discountPercent > 0 && (
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{discountPercent}% Bulk Discount Applied!</span>
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <input
                  id={quantityInputId}
                  type="number"
                  min={1}
                  max={5000}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-36 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm font-bold text-white focus:outline-none focus:border-blue-500 tabular-nums"
                />
                <span className="text-xs text-slate-400 font-medium">
                  {currentProduct.unit === 'sq.ft'
                    ? `Banner${quantity > 1 ? 's' : ''} (${totalArea} total sq.ft)`
                    : currentProduct.unit}
                </span>
              </div>
            </div>

            {/* Step 4: Finishing Addons for Large Format */}
            {isSqFtBased && (
              <div className="pt-2 border-t border-slate-800/80 space-y-3">
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  4. {lang === 'en' ? 'Finishing & Fabrication Add-ons' : 'फिनिशिंग एवं फ्रेमिंग विकल्प'}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                    <input
                      type="checkbox"
                      checked={hasEyelets}
                      onChange={(e) => setHasEyelets(e.target.checked)}
                      className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 bg-slate-950 border-slate-700"
                    />
                    <div className="text-xs">
                      <div className="font-semibold text-white">Metal Eyelets (रिंग)</div>
                      <div className="text-slate-400">Punch rings around edges (Free)</div>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                    <input
                      type="checkbox"
                      checked={hasHemming}
                      onChange={(e) => setHasHemming(e.target.checked)}
                      className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 bg-slate-950 border-slate-700"
                    />
                    <div className="text-xs">
                      <div className="font-semibold text-white">Edge Folding / Hemming</div>
                      <div className="text-slate-400">Reinforced double borders (Free)</div>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                    <input
                      type="checkbox"
                      checked={hasIronFrame}
                      onChange={(e) => setHasIronFrame(e.target.checked)}
                      className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 bg-slate-950 border-slate-700"
                    />
                    <div className="text-xs">
                      <div className="font-semibold text-white">Iron MS Pipe Frame</div>
                      <div className="text-slate-400">+₹35/sq.ft welded square frame</div>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                    <input
                      type="checkbox"
                      checked={hasInstallation}
                      onChange={(e) => setHasInstallation(e.target.checked)}
                      className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 bg-slate-950 border-slate-700"
                    />
                    <div className="text-xs">
                      <div className="font-semibold text-white">Patna Installation</div>
                      <div className="text-slate-400">+₹15/sq.ft on-site fitting team</div>
                    </div>
                  </label>
                </div>
              </div>
            )}

          </div>

          {/* Right Summary / Receipt Panel */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-blue-900/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {lang === 'en' ? 'Instant Quote Summary' : 'कोटेशन सारांश'}
                </h3>
                <p className="text-xs text-slate-400">Factory-direct rate estimate</p>
              </div>
              <div className="px-2.5 py-1 rounded bg-blue-950 text-blue-400 text-xs font-bold border border-blue-800/60">
                PRINT X PRESS
              </div>
            </div>

            {/* Line items */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">{lang === 'en' ? 'Selected Service:' : 'चुनी गई सेवा:'}</span>
                <span className="font-semibold text-white text-right max-w-[200px] truncate">
                  {currentProduct.name}
                </span>
              </div>

              {isSqFtBased ? (
                <>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">{lang === 'en' ? 'Dimensions & Area:' : 'साइज व क्षेत्रफल:'}</span>
                    <span className="font-semibold text-white tabular-nums">
                      {width} x {height} ft ({areaPerUnit} sq.ft)
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">{lang === 'en' ? 'Unit Base Rate:' : 'प्रति वर्ग फीट दर:'}</span>
                    <span className="font-semibold text-white tabular-nums">₹{baseRate}/sq.ft</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">{lang === 'en' ? 'Total Area:' : 'कुल क्षेत्रफल:'}</span>
                    <span className="font-semibold text-white tabular-nums">
                      {totalArea} sq.ft ({quantity} pcs)
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">{lang === 'en' ? 'Quantity:' : 'संख्या:'}</span>
                  <span className="font-semibold text-white tabular-nums">
                    {quantity} {currentProduct.unit} @ ₹{baseRate}
                  </span>
                </div>
              )}

              {/* Addons breakdown */}
              {isSqFtBased && (hasIronFrame || hasInstallation) && (
                <div className="pt-2 border-t border-slate-800/60 space-y-1 text-xs">
                  {hasIronFrame && (
                    <div className="flex justify-between text-slate-400">
                      <span>Iron MS Frame (+₹35/sqft):</span>
                      <span className="text-slate-200 tabular-nums">+₹{totalArea * 35}</span>
                    </div>
                  )}
                  {hasInstallation && (
                    <div className="flex justify-between text-slate-400">
                      <span>Installation in Patna:</span>
                      <span className="text-slate-200 tabular-nums">
                        +₹{Math.max(200, totalArea * 15)}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Discount item */}
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold text-xs pt-1">
                  <span>Bulk Discount ({discountPercent}%):</span>
                  <span className="tabular-nums">-₹{discountAmount}</span>
                </div>
              )}
            </div>

            {/* Total Cost Display */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400 font-medium">
                {lang === 'en' ? 'Estimated Total Amount' : 'अनुमानित कुल राशि'}
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white tabular-nums text-emerald-400">
                ₹{estimatedTotal.toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] text-slate-500">
                *GST extra if formal invoice required. Design assistance included.
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="space-y-3 pt-2">
              <a
                href={`https://wa.me/917481068602?text=${getWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>{lang === 'en' ? 'Send Order on WhatsApp' : 'व्हाट्सएप पर ऑर्डर भेजें'}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handlePrintSlip}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Print Slip' : 'स्लिप प्रिंट करें'}</span>
                </button>

                {onOpenDesignPreview && (
                  <button
                    type="button"
                    onClick={onOpenDesignPreview}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-semibold text-blue-300 bg-blue-950/40 hover:bg-blue-900/40 border border-blue-900/60 transition-colors cursor-pointer"
                  >
                    <span>{lang === 'en' ? 'Preview Artwork' : 'डिजाइन प्रीव्यू'}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Quality badge */}
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                {lang === 'en'
                  ? 'Guaranteed UV ink fade resistance & reinforced hemming.'
                  : 'धूप और बारिश में रंग न उड़ने की गारंटी एवं मजबूत सिलाई।'}
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
