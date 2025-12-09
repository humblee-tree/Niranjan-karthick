export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  FARMER = 'FARMER',
  ADMIN = 'ADMIN'
}

export type OrderStatus = 
  | 'Pending' 
  | 'COD_Pending'
  | 'Placed'
  | 'Paid' 
  | 'Processing' 
  | 'Packed' 
  | 'Shipped' 
  | 'Out_for_Delivery' 
  | 'Delivered'
  | 'Cancelled'
  | 'Refunded';

export interface Address {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  isVerified?: boolean;
  addresses?: Address[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  stock: number;
  sellerId: string;
  sellerName?: string;
  isApproved?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  date: string;
  paymentId?: string;
  paymentMethod: 'COD' | 'RAZORPAY';
  shippingAddress: Address;
  timeline: { status: OrderStatus; timestamp: string }[];
}

export interface SensorReading {
  timestamp: string;
  temperature: number;
  humidity: number;
  co2: number;
}

export interface CultivationBatch {
  id: string;
  farmerId: string;
  name: string;
  species: string;
  startDate: string;
  estimatedHarvestDate: string;
  status: 'Healthy' | 'Warning' | 'Critical';
  stage: 'Spawn Run' | 'Pinning' | 'Fruiting' | 'Harvesting';
  location: string;
  notes?: string;
  readings: SensorReading[];
}