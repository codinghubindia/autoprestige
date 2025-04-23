export type CarCondition = 'New' | 'Used' | 'Certified Pre-Owned';
export type CarStatus = 'Available' | 'Reserved' | 'Sold' | 'Shipping';
export type FuelType = 'Gasoline' | 'Diesel' | 'Electric' | 'Hybrid' | 'Plug-in Hybrid';
export type TransmissionType = 'Automatic' | 'Manual' | 'Semi-Automatic';

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  discountedPrice?: number;
  mileage: number;
  fuelType: FuelType;
  transmission: TransmissionType;
  condition: CarCondition;
  status: CarStatus;
  location: string;
  color: string;
  images: string[];
  features: string[];
  description: string;
  specs: {
    engine: string;
    power: string;
    acceleration: string;
    topSpeed: string;
    fuelConsumption: string;
    co2Emissions: string;
  };
  pros: string[];
  cons: string[];
  dateAdded: string;
}

export interface Location {
  id: string;
  name: string;
  country: string;
  address: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  token?: string;
}

export interface Booking {
  id: string;
  carId: string;
  userId: string;
  date: string;
  time: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
  notes?: string;
}

export interface Filters {
  brands: string[];
  fuelTypes: FuelType[];
  conditions: CarCondition[];
  minYear: number;
  maxYear: number;
  minPrice: number;
  maxPrice: number;
  location: string;
  transmission?: TransmissionType;
}