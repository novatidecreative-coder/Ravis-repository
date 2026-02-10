export const SERVICE_OPTIONS = [
  "Roof Installation",
  "Roof Repair",
  "Rubber/EPDM Roofing",
  "Flat Roof Services",
  "Masonry Work",
  "Concrete Services",
  "Foundation Repair",
  "Basement Waterproofing",
  "Stucco & Exterior Painting",
  "Brick Pointing",
  "Gutter Replacement",
  "Plumbing Services",
  "Heating & Boiler Installation",
  "Other",
] as const;

export type ServiceOption = (typeof SERVICE_OPTIONS)[number];

export type PropertyType = "Residential" | "Commercial";

export type PreferredContact = "Phone" | "Email" | "Text";

export interface QuoteFormData {
  fullName: string;
  email: string;
  phone: string;
  service: ServiceOption | string;
  propertyType: PropertyType;
  zipCode: string;
  projectDetails?: string;
  preferredContact: PreferredContact;
  otherService?: string;
  honeypot?: string;
}

export interface GalleryCategory {
  id: string;
  label: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  beforeImage: string;
  afterImage: string;
  description?: string;
  services?: string[];
  location?: string;
  duration?: string;
  materials?: string[];
}

export interface Testimonial {
  id: string;
  customerName: string;
  customerInitial?: string;
  rating: number;
  review: string;
  service: string;
  date: string;
  source?: string;
  verified?: boolean;
  avatar?: string;
}

export interface ServiceArea {
  id: string;
  name: string;
  slug: string;
  coordinates?: { lat: number; lng: number };
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
