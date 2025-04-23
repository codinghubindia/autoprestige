import { Car, Location } from '../types';

// Utility function to generate a random ID
const generateId = () => Math.random().toString(36).substring(2, 12);

// Car Images - using stock photos
const carImages = {
  mercedes: [
    "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3166786/pexels-photo-3166786.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3822844/pexels-photo-3822844.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  ],
  bmw: [
    "https://images.pexels.com/photos/100656/pexels-photo-100656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/892522/pexels-photo-892522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  ],
  audi: [
    "https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  ],
  porsche: [
    "https://images.pexels.com/photos/3136673/pexels-photo-3136673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3954410/pexels-photo-3954410.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  ],
  tesla: [
    "https://images.pexels.com/photos/3422964/pexels-photo-3422964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/12861857/pexels-photo-12861857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/13861/pexels-photo-13861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  ],
};

// Mock Locations
export const locations: Location[] = [
  {
    id: 'loc-1',
    name: 'Berlin',
    country: 'Germany',
    address: 'Kurfürstendamm 123, 10711 Berlin, Germany',
  },
  {
    id: 'loc-2',
    name: 'Munich',
    country: 'Germany',
    address: 'Leopoldstraße 45, 80802 Munich, Germany',
  },
  {
    id: 'loc-3',
    name: 'London',
    country: 'United Kingdom',
    address: '123 Park Lane, London W1K 7JA, UK',
  },
  {
    id: 'loc-4',
    name: 'Paris',
    country: 'France',
    address: '789 Avenue des Champs-Élysées, 75008 Paris, France',
  },
];

// Mock Cars
export const cars: Car[] = [
  {
    id: generateId(),
    brand: 'Mercedes-Benz',
    model: 'S-Class',
    year: 2023,
    price: 125000,
    mileage: 0,
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    condition: 'New',
    status: 'Available',
    location: 'Berlin',
    color: 'Obsidian Black',
    images: carImages.mercedes,
    features: [
      'Leather Interior',
      'Panoramic Roof',
      'Heated Seats',
      'Navigation System',
      'Premium Sound System',
      'Blind Spot Monitoring',
      'Lane Departure Warning',
    ],
    description: 'The new Mercedes-Benz S-Class is the epitome of luxury and performance. With its sleek design, advanced technology, and unparalleled comfort, it sets new standards in the luxury sedan segment.',
    specs: {
      engine: '3.0L 6-Cylinder Hybrid',
      power: '429 hp',
      acceleration: '0-60 mph in 4.8 seconds',
      topSpeed: '155 mph (electronically limited)',
      fuelConsumption: '27 mpg combined',
      co2Emissions: '178 g/km',
    },
    pros: [
      'Exceptional ride comfort',
      'Cutting-edge technology',
      'Impressive fuel efficiency for its class',
      'Luxurious interior materials',
    ],
    cons: [
      'High price point',
      'Complex infotainment system',
      'Limited cargo space compared to SUVs',
    ],
    dateAdded: '2023-10-15',
  },
  {
    id: generateId(),
    brand: 'BMW',
    model: '7 Series',
    year: 2023,
    price: 117000,
    discountedPrice: 109000,
    mileage: 0,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    condition: 'New',
    status: 'Available',
    location: 'Munich',
    color: 'Alpine White',
    images: carImages.bmw,
    features: [
      'Leather Interior',
      'Panoramic Roof',
      'Heated and Ventilated Seats',
      'Advanced Driver Assistance',
      'Premium Sound System',
      'Gesture Control',
    ],
    description: 'The BMW 7 Series redefines luxury with its bold design, innovative technology, and exceptional performance. Experience the future of premium mobility.',
    specs: {
      engine: '4.4L V8 Twin-Turbo',
      power: '536 hp',
      acceleration: '0-60 mph in 4.2 seconds',
      topSpeed: '155 mph (electronically limited)',
      fuelConsumption: '24 mpg combined',
      co2Emissions: '215 g/km',
    },
    pros: [
      'Powerful engine options',
      'Cutting-edge infotainment system',
      'Spacious and luxurious cabin',
      'Advanced autonomous driving features',
    ],
    cons: [
      'Bold design may not appeal to traditionalists',
      'Expensive options',
      'Firm ride with larger wheels',
    ],
    dateAdded: '2023-10-10',
  },
  {
    id: generateId(),
    brand: 'Audi',
    model: 'A8',
    year: 2023,
    price: 110000,
    mileage: 0,
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    condition: 'New',
    status: 'Reserved',
    location: 'Berlin',
    color: 'Mythos Black',
    images: carImages.audi,
    features: [
      'Valcona Leather',
      'Panoramic Sunroof',
      'Heated and Cooled Seats',
      'Audi Virtual Cockpit',
      'Bang & Olufsen Sound System',
      'Night Vision Assistant',
    ],
    description: 'The Audi A8 combines elegance with cutting-edge technology to deliver an extraordinary driving experience. Its refined interior, exceptional comfort, and advanced features make it a masterpiece of engineering.',
    specs: {
      engine: '3.0L V6 Hybrid',
      power: '457 hp',
      acceleration: '0-60 mph in 4.9 seconds',
      topSpeed: '155 mph (electronically limited)',
      fuelConsumption: '28 mpg combined',
      co2Emissions: '168 g/km',
    },
    pros: [
      'Refined and quiet cabin',
      'Excellent build quality',
      'Advanced lighting technology',
      'Smooth hybrid powertrain',
    ],
    cons: [
      'Conservative styling',
      'Infotainment learning curve',
      'Less engaging to drive than some competitors',
    ],
    dateAdded: '2023-10-05',
  },
  {
    id: generateId(),
    brand: 'Porsche',
    model: '911 Carrera',
    year: 2023,
    price: 122000,
    mileage: 0,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    condition: 'New',
    status: 'Available',
    location: 'Munich',
    color: 'GT Silver Metallic',
    images: carImages.porsche,
    features: [
      'Sport Chrono Package',
      'Adaptive Sport Seats Plus',
      'BOSE® Surround Sound System',
      'Sport Exhaust System',
      'Lane Change Assist',
      'Adaptive Cruise Control',
    ],
    description: 'The iconic Porsche 911 Carrera continues to set the standard for sports cars. With its distinctive design, impressive performance, and everyday usability, it delivers an unmatched driving experience.',
    specs: {
      engine: '3.0L Twin-Turbo Flat-Six',
      power: '443 hp',
      acceleration: '0-60 mph in 3.5 seconds',
      topSpeed: '182 mph',
      fuelConsumption: '20 mpg combined',
      co2Emissions: '260 g/km',
    },
    pros: [
      'Exceptional handling and performance',
      'High-quality interior',
      'Everyday usability',
      'Strong resale value',
    ],
    cons: [
      'Limited rear seat space',
      'Expensive options',
      'Road and tire noise',
    ],
    dateAdded: '2023-09-28',
  },
  {
    id: generateId(),
    brand: 'Tesla',
    model: 'Model S Plaid',
    year: 2023,
    price: 135000,
    mileage: 0,
    fuelType: 'Electric',
    transmission: 'Automatic',
    condition: 'New',
    status: 'Available',
    location: 'London',
    color: 'Midnight Silver Metallic',
    images: carImages.tesla,
    features: [
      'Autopilot',
      'Full Self-Driving Capability',
      'Glass Roof',
      'Premium Interior and Sound',
      'Yoke Steering',
      'Ultra High-Performance Brakes',
    ],
    description: 'The Tesla Model S Plaid is the fastest accelerating production car ever made. With its three-motor powertrain, advanced technology, and luxurious interior, it redefines the electric vehicle experience.',
    specs: {
      engine: 'Tri Motor Electric',
      power: '1,020 hp',
      acceleration: '0-60 mph in 1.99 seconds',
      topSpeed: '200 mph',
      fuelConsumption: '348 miles range (EPA est.)',
      co2Emissions: '0 g/km',
    },
    pros: [
      'Incredible acceleration',
      'Long electric range',
      'Advanced autonomous features',
      'Extensive Supercharger network',
    ],
    cons: [
      'Unconventional yoke steering',
      'No Apple CarPlay or Android Auto',
      'Build quality concerns',
    ],
    dateAdded: '2023-09-20',
  },
  {
    id: generateId(),
    brand: 'BMW',
    model: 'i7',
    year: 2023,
    price: 145000,
    mileage: 0,
    fuelType: 'Electric',
    transmission: 'Automatic',
    condition: 'New',
    status: 'Available',
    location: 'Paris',
    color: 'Oxide Grey',
    images: carImages.bmw,
    features: [
      'Merino Leather Interior',
      'Executive Lounge Seating',
      'Theatre Screen',
      'Bowers & Wilkins Diamond Surround Sound',
      'Panoramic Sky Lounge LED Roof',
      'Driving Assistant Professional',
    ],
    description: 'The all-electric BMW i7 combines luxury, performance, and sustainability in a flagship sedan. With its striking design, spacious interior, and advanced technology, it offers a premium electric driving experience.',
    specs: {
      engine: 'Dual Motor Electric',
      power: '536 hp',
      acceleration: '0-60 mph in 4.5 seconds',
      topSpeed: '149 mph',
      fuelConsumption: '318 miles range (WLTP)',
      co2Emissions: '0 g/km',
    },
    pros: [
      'Whisper-quiet operation',
      'Luxurious and spacious interior',
      'Cutting-edge entertainment system',
      'Impressive electric range',
    ],
    cons: [
      'Very high price point',
      'Polarizing front design',
      'Heavy weight affects agility',
    ],
    dateAdded: '2023-09-15',
  },
  {
    id: generateId(),
    brand: 'Mercedes-Benz',
    model: 'AMG GT 63',
    year: 2022,
    price: 165000,
    discountedPrice: 149000,
    mileage: 5000,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    condition: 'Used',
    status: 'Available',
    location: 'London',
    color: 'Designo Selenite Grey Magno',
    images: carImages.mercedes,
    features: [
      'AMG Performance Seats',
      'Burmester® High-End 3D Surround Sound',
      'Active Ride Control',
      'Head-Up Display',
      'Warmth & Comfort Package',
      'Night Package',
    ],
    description: 'This pre-owned Mercedes-AMG GT 63 offers exceptional performance with its handcrafted V8 engine. With low mileage and in excellent condition, it delivers the perfect blend of luxury and sports car dynamics.',
    specs: {
      engine: '4.0L V8 Biturbo',
      power: '630 hp',
      acceleration: '0-60 mph in 3.1 seconds',
      topSpeed: '196 mph',
      fuelConsumption: '17 mpg combined',
      co2Emissions: '292 g/km',
    },
    pros: [
      'Blistering performance',
      'Exceptional build quality',
      'Practical four-door design',
      'Customizable driving modes',
    ],
    cons: [
      'Thirsty V8 engine',
      'Firm ride quality',
      'Limited rear visibility',
    ],
    dateAdded: '2023-10-01',
  },
  {
    id: generateId(),
    brand: 'Audi',
    model: 'e-tron GT',
    year: 2023,
    price: 140000,
    mileage: 0,
    fuelType: 'Electric',
    transmission: 'Automatic',
    condition: 'New',
    status: 'Shipping',
    location: 'Paris',
    color: 'Daytona Gray',
    images: carImages.audi,
    features: [
      'Carbon Fiber Roof',
      'Matrix LED Headlights',
      'Bang & Olufsen 3D Premium Sound',
      'Head-Up Display',
      'Adaptive Air Suspension',
      'Sport Seats Pro',
    ],
    description: 'The Audi e-tron GT is a fully electric grand tourer that combines stunning design with exhilarating performance. Its innovative technology, luxurious interior, and instant acceleration deliver a unique driving experience.',
    specs: {
      engine: 'Dual Motor Electric',
      power: '522 hp (up to 637 hp with overboost)',
      acceleration: '0-60 mph in 3.9 seconds',
      topSpeed: '152 mph',
      fuelConsumption: '298 miles range (WLTP)',
      co2Emissions: '0 g/km',
    },
    pros: [
      'Stunning design',
      'Excellent performance',
      'Fast charging capability',
      'High-quality interior',
    ],
    cons: [
      'Less range than some competitors',
      'Limited rear headroom',
      'Expensive options',
    ],
    dateAdded: '2023-09-10',
  },
];

// Brands for filters
export const carBrands = [...new Set(cars.map(car => car.brand))];

// Fuel types for filters
export const fuelTypes = [...new Set(cars.map(car => car.fuelType))];

// Car conditions for filters
export const carConditions = [...new Set(cars.map(car => car.condition))];

// Min and Max year
export const minYear = Math.min(...cars.map(car => car.year));
export const maxYear = Math.max(...cars.map(car => car.year));

// Min and Max price
export const minPrice = Math.min(...cars.map(car => car.price));
export const maxPrice = Math.max(...cars.map(car => car.price));

// Status counts
export const statusCounts = cars.reduce((acc, car) => {
  acc[car.status] = (acc[car.status] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

// Transmission types
export const transmissionTypes = [...new Set(cars.map(car => car.transmission))];