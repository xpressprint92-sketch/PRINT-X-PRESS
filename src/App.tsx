/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PrintStoreProvider, usePrintStore, OrderItem } from './context/PrintStore';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RateCalculator } from './components/RateCalculator';
import { ServicesCatalog } from './components/ServicesCatalog';
import { PortfolioGallery } from './components/PortfolioGallery';
import { MaterialGuide } from './components/MaterialGuide';
import { TestimonialsAndReviews } from './components/TestimonialsAndReviews';
import { FAQSection } from './components/FAQSection';
import { ContactAndMap } from './components/ContactAndMap';
import { Footer } from './components/Footer';
import { FloatingWhatsAppBar } from './components/FloatingWhatsAppBar';
import { DesignPreviewModal } from './components/DesignPreviewModal';
import { PrintAssistantChat } from './components/PrintAssistantChat';
import { PatnaMapExplorer } from './components/PatnaMapExplorer';
import { QuoteSection } from './components/QuoteSection';
import { PrintTipsSection } from './components/PrintTipsSection';
import { PrintingKnowledgeHub } from './components/PrintingKnowledgeHub';

// Advanced Modals
import { LiveTrackerModal } from './components/advanced/LiveTrackerModal';
import { DesignProofModal } from './components/advanced/DesignProofModal';
import { QrCodeGeneratorModal } from './components/advanced/QrCodeGeneratorModal';
import { CustomerDashboardModal } from './components/advanced/CustomerDashboardModal';
import { OnlineDesignStudioModal } from './components/advanced/OnlineDesignStudioModal';
import { BusinessPortalModal } from './components/advanced/BusinessPortalModal';

// New Premium Feature Modals
import { LiveMockupModal } from './components/advanced/LiveMockupModal';
import { AiDesignHelperModal } from './components/advanced/AiDesignHelperModal';
import { MaterialComparisonModal } from './components/advanced/MaterialComparisonModal';
import { DigitalVisitingCardModal } from './components/advanced/DigitalVisitingCardModal';
import { PrintDimensionCalculatorModal } from './components/advanced/PrintDimensionCalculatorModal';
import { PincodeCheckModal } from './components/advanced/PincodeCheckModal';
import { CustomerLoyaltyModal } from './components/advanced/CustomerLoyaltyModal';
import { AbstractMotionBackground } from './components/advanced/AbstractMotionBackground';
import { GlobalSearchModal } from './components/advanced/GlobalSearchModal';

function AppContent() {
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [isDesignPreviewOpen, setIsDesignPreviewOpen] = useState(false);

  const {
    isDashboardOpen,
    setIsDashboardOpen,
    isTrackerOpen,
    setIsTrackerOpen,
    isDesignStudioOpen,
    setIsDesignStudioOpen,
    isBusinessPortalOpen,
    setIsBusinessPortalOpen,
    isQrModalOpen,
    setIsQrModalOpen,
  } = usePrintStore();

  const [isProofModalOpen, setIsProofModalOpen] = useState(false);
  const [isMockupOpen, setIsMockupOpen] = useState(false);
  const [isAiHelperOpen, setIsAiHelperOpen] = useState(false);
  const [isMaterialCompOpen, setIsMaterialCompOpen] = useState(false);
  const [isVisitingCardOpen, setIsVisitingCardOpen] = useState(false);
  const [isDimensionCalcOpen, setIsDimensionCalcOpen] = useState(false);
  const [isPincodeCheckOpen, setIsPincodeCheckOpen] = useState(false);
  const [isLoyaltyOpen, setIsLoyaltyOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  const scrollToCalculator = () => {
    const el = document.getElementById('calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForCalculator = (_slug: string) => {
    scrollToCalculator();
  };

  const handleReorderFromDashboard = (order: OrderItem) => {
    setIsDashboardOpen(false);
    scrollToCalculator();
    alert(`Loaded previous order details for reorder: ${order.product} (${order.size})`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white pb-16 md:pb-0 relative overflow-x-hidden">
      {/* Premium Abstract Motion Background */}
      <AbstractMotionBackground />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col flex-1">
        {/* Top Navigation */}
        <Navbar
          lang={lang}
          onToggleLang={toggleLanguage}
          onOpenCalculator={scrollToCalculator}
          onOpenProofs={() => setIsProofModalOpen(true)}
          onOpenQr={() => setIsQrModalOpen(true)}
          onOpenDesignStudio={() => setIsDesignStudioOpen(true)}
          onOpenBusinessPortal={() => setIsBusinessPortalOpen(true)}
          onOpenDashboard={() => setIsDashboardOpen(true)}
          onOpenMockup={() => setIsMockupOpen(true)}
          onOpenAiHelper={() => setIsAiHelperOpen(true)}
          onOpenMaterialComp={() => setIsMaterialCompOpen(true)}
          onOpenVisitingCard={() => setIsVisitingCardOpen(true)}
          onOpenDimensionCalc={() => setIsDimensionCalcOpen(true)}
          onOpenPincodeCheck={() => setIsPincodeCheckOpen(true)}
          onOpenLoyalty={() => setIsLoyaltyOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
        />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          lang={lang}
          onOpenCalculator={scrollToCalculator}
          onExploreServices={scrollToServices}
        />

        {/* Instant Rate Calculator */}
        <RateCalculator
          lang={lang}
          onOpenDesignPreview={() => setIsDesignPreviewOpen(true)}
        />

        {/* Services & Catalog */}
        <ServicesCatalog
          lang={lang}
          onSelectForCalculator={handleSelectServiceForCalculator}
        />

        {/* Portfolio & Real Projects */}
        <PortfolioGallery lang={lang} />

        {/* Materials & GSM Technical Guide */}
        <MaterialGuide lang={lang} />

        {/* Print Preparation Tips */}
        <PrintTipsSection lang={lang} />

        {/* Printing Knowledge Hub */}
        <PrintingKnowledgeHub lang={lang} />

        {/* Google Maps Grounding Patna Route Explorer */}
        <PatnaMapExplorer lang={lang} />

        {/* Testimonials & Reviews */}
        <TestimonialsAndReviews lang={lang} />

        {/* Frequently Asked Questions */}
        <FAQSection lang={lang} />

        {/* File Upload / Quote Section */}
        <QuoteSection lang={lang} />

        {/* Store Location, Map, and Contact */}
        <ContactAndMap lang={lang} />
      </main>

      {/* Quiet Footer */}
      <Footer lang={lang} />

      {/* Bottom Sticky Action Bar on Mobile & Floating WhatsApp on Desktop */}
      <FloatingWhatsAppBar
        lang={lang}
        onOpenCalculator={scrollToCalculator}
        onOpenDashboard={() => setIsDashboardOpen(true)}
      />

      {/* Gemini AI Print Assistant Chat Widget */}
      <PrintAssistantChat lang={lang} />

      {/* Interactive Design & Mockup Preview Modal */}
      <DesignPreviewModal
        isOpen={isDesignPreviewOpen}
        onClose={() => setIsDesignPreviewOpen(false)}
        lang={lang}
      />

      {/* Advanced Modals */}
      <LiveTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        lang={lang}
      />

      <DesignProofModal
        isOpen={isProofModalOpen}
        onClose={() => setIsProofModalOpen(false)}
        lang={lang}
      />

      <QrCodeGeneratorModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        lang={lang}
      />

      <CustomerDashboardModal
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        lang={lang}
        onOpenTracker={() => {
          setIsDashboardOpen(false);
          setIsTrackerOpen(true);
        }}
        onOpenProofs={() => {
          setIsDashboardOpen(false);
          setIsProofModalOpen(true);
        }}
        onOpenReorder={handleReorderFromDashboard}
      />

      <OnlineDesignStudioModal
        isOpen={isDesignStudioOpen}
        onClose={() => setIsDesignStudioOpen(false)}
        lang={lang}
      />

      <BusinessPortalModal
        isOpen={isBusinessPortalOpen}
        onClose={() => setIsBusinessPortalOpen(false)}
        lang={lang}
      />

      {/* New Premium Feature Modals */}
      <LiveMockupModal
        isOpen={isMockupOpen}
        onClose={() => setIsMockupOpen(false)}
        lang={lang}
        onOpenCalculator={scrollToCalculator}
      />

      <AiDesignHelperModal
        isOpen={isAiHelperOpen}
        onClose={() => setIsAiHelperOpen(false)}
        lang={lang}
      />

      <MaterialComparisonModal
        isOpen={isMaterialCompOpen}
        onClose={() => setIsMaterialCompOpen(false)}
        lang={lang}
        onOpenCalculator={scrollToCalculator}
      />

      <DigitalVisitingCardModal
        isOpen={isVisitingCardOpen}
        onClose={() => setIsVisitingCardOpen(false)}
        lang={lang}
      />

      <PrintDimensionCalculatorModal
        isOpen={isDimensionCalcOpen}
        onClose={() => setIsDimensionCalcOpen(false)}
        lang={lang}
      />

      <PincodeCheckModal
        isOpen={isPincodeCheckOpen}
        onClose={() => setIsPincodeCheckOpen(false)}
        lang={lang}
      />

      <CustomerLoyaltyModal
        isOpen={isLoyaltyOpen}
        onClose={() => setIsLoyaltyOpen(false)}
        lang={lang}
      />

      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        lang={lang}
      />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <PrintStoreProvider>
      <AppContent />
    </PrintStoreProvider>
  );
}
