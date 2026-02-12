export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  cuisineType: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  lat: number;
  lng: number;
  phone: string;
  website: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  images: string[];
  coverImage: string;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  halalCertType: 'certified' | 'self_declared' | 'unknown';
  isFeatured: boolean;
  isPromoted: boolean;
  isHidden: boolean;
  avgRating: number;
  totalReviews: number;
  status: 'active' | 'pending' | 'disabled';
  planType: 'free' | 'basic' | 'featured';
  openingHours: {
    [day: string]: { open: string; close: string; closed: boolean };
  };
  createdAt: string;
}

export interface Ad {
  id: string;
  title: string;
  imageUrl: string;
  destinationUrl: string;
  placement: 'homepage_banner' | 'sidebar' | 'listing_page' | 'search_top';
  status: 'active' | 'paused' | 'expired';
  startsAt: string;
  endsAt: string;
}

export interface Signup {
  id: string;
  name: string;
  email: string;
  consentGiven: boolean;
  signedUpAt: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}

export interface SiteSettings {
  featuredSlots: number;
  bannerEnabled: boolean;
}
