import React, { createContext, useContext, useState } from 'react';

export interface OrderItem {
  id: string;
  orderId: string;
  product: string;
  size: string;
  quantity: string;
  material: string;
  finishing: string;
  amount: number;
  status: 'Order Received' | 'Quote Confirmed' | 'Designing' | 'Proof Ready' | 'Design Approved' | 'Printing' | 'Finishing' | 'Ready' | 'Delivered';
  date: string;
  customerName: string;
  mobile: string;
  paymentStatus: 'Paid' | 'Pending' | 'COD';
  fileUrl?: string;
  readinessScore?: number;
}

export interface DesignProofItem {
  id: string;
  orderId: string;
  productName: string;
  version: number;
  date: string;
  designerNote: string;
  status: 'Pending' | 'Approved' | 'Changes Requested';
  changesFeedback?: string;
}

interface PrintContextType {
  orders: OrderItem[];
  addOrder: (order: Omit<OrderItem, 'id' | 'date'>) => void;
  updateOrderStatus: (id: string, status: OrderItem['status']) => void;
  designProofs: DesignProofItem[];
  updateProofStatus: (id: string, status: DesignProofItem['status'], feedback?: string) => void;
  addDesignProof: (proof: Omit<DesignProofItem, 'id'>) => void;
  coupons: Record<string, number>;
  appliedCoupon: string | null;
  discountPercent: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  isDashboardOpen: boolean;
  setIsDashboardOpen: (open: boolean) => void;
  isTrackerOpen: boolean;
  setIsTrackerOpen: (open: boolean) => void;
  isDesignStudioOpen: boolean;
  setIsDesignStudioOpen: (open: boolean) => void;
  isBusinessPortalOpen: boolean;
  setIsBusinessPortalOpen: (open: boolean) => void;
  isQrModalOpen: boolean;
  setIsQrModalOpen: (open: boolean) => void;
}

const PrintContext = createContext<PrintContextType | undefined>(undefined);

export const PrintStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<OrderItem[]>([
    {
      id: 'ord-101',
      orderId: 'XP-8942',
      product: 'Star Flex Banner (340 GSM)',
      size: '10x4 ft',
      quantity: '2 Pcs',
      material: 'Star Flex 340 GSM',
      finishing: 'Metal Eyelets & Heat Hemming',
      amount: 720,
      status: 'Printing',
      date: '2026-10-04',
      customerName: 'Rahul Sharma',
      mobile: '9876543210',
      paymentStatus: 'Paid',
      readinessScore: 92,
    },
    {
      id: 'ord-102',
      orderId: 'XP-8943',
      product: '3D Acrylic Glow Sign Board',
      size: '8x3 ft',
      quantity: '1 Pcs',
      material: 'Acrylic + LED Waterproof',
      finishing: 'Aluminum Channel Framing',
      amount: 4320,
      status: 'Proof Ready',
      date: '2026-10-05',
      customerName: 'Amit Verma',
      mobile: '9123456780',
      paymentStatus: 'Pending',
      readinessScore: 95,
    }
  ]);

  const [designProofs, setDesignProofs] = useState<DesignProofItem[]>([
    {
      id: 'prf-1',
      orderId: 'XP-8943',
      productName: '3D Acrylic Glow Sign Board',
      version: 1,
      date: '2026-10-05',
      designerNote: 'Please check font alignment and logo placement for the LED board.',
      status: 'Pending',
    },
    {
      id: 'prf-2',
      orderId: 'XP-8942',
      productName: 'Star Flex Banner (340 GSM)',
      version: 2,
      date: '2026-10-04',
      designerNote: 'Adjusted telephone number font size as requested in V1 review.',
      status: 'Approved',
    }
  ]);

  const [coupons] = useState<Record<string, number>>({
    'WELCOME10': 10,
    'PRINT5': 5,
    'BULK10': 15,
  });

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isDesignStudioOpen, setIsDesignStudioOpen] = useState(false);
  const [isBusinessPortalOpen, setIsBusinessPortalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const addOrder = (newOrder: Omit<OrderItem, 'id' | 'date'>) => {
    const item: OrderItem = {
      ...newOrder,
      id: `ord-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setOrders([item, ...orders]);
  };

  const updateOrderStatus = (id: string, status: OrderItem['status']) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
  };

  const updateProofStatus = (id: string, status: DesignProofItem['status'], feedback?: string) => {
    setDesignProofs(designProofs.map(p => p.id === id ? { ...p, status, changesFeedback: feedback } : p));
  };

  const addDesignProof = (proof: Omit<DesignProofItem, 'id'>) => {
    const item: DesignProofItem = {
      ...proof,
      id: `prf-${Date.now()}`,
    };
    setDesignProofs([item, ...designProofs]);
  };

  const applyCoupon = (code: string) => {
    const upper = code.toUpperCase().trim();
    if (coupons[upper] !== undefined) {
      setAppliedCoupon(upper);
      setDiscountPercent(coupons[upper]);
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscountPercent(0);
  };

  return (
    <PrintContext.Provider
      value={{
        orders,
        addOrder,
        updateOrderStatus,
        designProofs,
        updateProofStatus,
        addDesignProof,
        coupons,
        appliedCoupon,
        discountPercent,
        applyCoupon,
        removeCoupon,
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
      }}
    >
      {children}
    </PrintContext.Provider>
  );
};

export const usePrintStore = () => {
  const context = useContext(PrintContext);
  if (!context) {
    throw new Error('usePrintStore must be used within a PrintStoreProvider');
  }
  return context;
};
