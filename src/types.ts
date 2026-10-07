export type CategoryId = 'all' | 'large-format' | 'signage' | 'business' | 'apparel-gifts';

export interface ServiceVariant {
  size: string;
  price: number;
  unit?: string;
  popular?: boolean;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  titleHi: string;
  category: CategoryId;
  priceDisplay: string;
  baseRate: number;
  unit: string; // 'sq.ft' | 'piece' | '100 pcs' | 'box'
  description: string;
  descriptionHi: string;
  longDescription: string;
  longDescriptionHi: string;
  image: string;
  specs: {
    material: string;
    durability: string;
    turnaround: string;
    finish: string;
  };
  variants?: ServiceVariant[];
  calculatorAvailable?: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  titleHi: string;
  category: string;
  image: string;
  dimensions?: string;
  location?: string;
  description: string;
  serviceSlug: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  roleHi: string;
  location: string;
  rating: number;
  text: string;
  textHi: string;
  date: string;
}

export interface FAQItem {
  question: string;
  questionHi: string;
  answer: string;
  answerHi: string;
  category?: string;
}

export interface MaterialGuideItem {
  name: string;
  nameHi: string;
  gsm: string;
  lifespan: string;
  bestFor: string;
  bestForHi: string;
  advantages: string[];
  recommendationRating: number;
}
