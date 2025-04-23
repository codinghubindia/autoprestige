import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  Share, 
  Printer, 
  PlusCircle, 
  CheckCircle,
  Phone,
  Calendar,
  Star,
  Truck,
  Shield
} from 'lucide-react';
import ImageCarousel from '../components/car/ImageCarousel';
import Button from '../components/ui/Button';
import StatusTag from '../components/ui/StatusTag';
import useStore from '../store/useStore';
import { cars } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';
import { Car } from '../types';

const CarDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { compareList, addToCompare, removeFromCompare } = useStore();
  
  const [car, setCar] = useState<Car | null>(null);
  const [isInCompareList, setIsInCompareList] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'specifications' | 'features'>('overview');
  
  // Find car by ID
  useEffect(() => {
    const foundCar = cars.find((c) => c.id === id);
    
    if (foundCar) {
      setCar(foundCar);
    } else {
      navigate('/404');
    }
  }, [id, navigate]);
  
  // Check if car is in compare list
  useEffect(() => {
    if (car) {
      setIsInCompareList(compareList.some((c) => c.id === car.id));
    }
  }, [car, compareList]);
  
  const handleCompareToggle = () => {
    if (!car) return;
    
    if (isInCompareList) {
      removeFromCompare(car.id);
    } else {
      addToCompare(car);
    }
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: car ? `${car.brand} ${car.model}` : 'Car Details',
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };
  
  if (!car) {
    return (
      <div className="pt-24 pb-16 container-custom">
        <div className="bg-white rounded-lg shadow-card p-8 text-center">
          <p className="text-lg text-primary-600">Loading car details...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        {/* Back Link */}
        <div className="mb-6">
          <Link 
            to="/inventory" 
            className="inline-flex items-center text-primary-600 hover:text-accent-600 transition-colors"
          >
            <ChevronLeft size={18} className="mr-1" />
            <span>Back to Inventory</span>
          </Link>
        </div>
        
        {/* Car Details */}
        <div className="bg-white rounded-lg shadow-card overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0">
            {/* Image Section */}
            <div className="p-6">
              <div className="relative">
                <ImageCarousel 
                  images={car.images} 
                  showThumbnails
                  className="rounded-lg overflow-hidden"
                />
                <div className="absolute top-2 left-2">
                  <StatusTag status={car.status} />
                </div>
              </div>
            </div>
            
            {/* Content Section */}
            <div className="p-6 lg:border-l border-primary-100">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-primary-900 mb-1">
                    {car.brand} {car.model}
                  </h1>
                  <p className="text-primary-600 mb-2">
                    {car.year} • {formatCurrency(car.mileage)} mi • {car.fuelType} • {car.transmission}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrint}
                    aria-label="Print"
                    title="Print"
                  >
                    <Printer size={18} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                    aria-label="Share"
                    title="Share"
                  >
                    <Share size={18} />
                  </Button>
                  <Button
                    variant={isInCompareList ? 'secondary' : 'outline'}
                    size="sm"
                    onClick={handleCompareToggle}
                    aria-label={isInCompareList ? 'Remove from Compare' : 'Add to Compare'}
                    title={isInCompareList ? 'Remove from Compare' : 'Add to Compare'}
                  >
                    {isInCompareList ? (
                      <CheckCircle size={18} className="text-success-600 mr-2" />
                    ) : (
                      <PlusCircle size={18} className="mr-2" />
                    )}
                    <span>{isInCompareList ? 'In Compare' : 'Compare'}</span>
                  </Button>
                </div>
              </div>
              
              {/* Price Section */}
              <div className="mb-6">
                {car.discountedPrice ? (
                  <div>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-primary-900">
                        {formatCurrency(car.discountedPrice)}
                      </span>
                      <span className="ml-2 text-lg text-primary-500 line-through">
                        {formatCurrency(car.price)}
                      </span>
                    </div>
                    <div className="mt-1 bg-error-50 text-error-600 px-2 py-1 rounded-md inline-block text-sm font-medium">
                      Save {formatCurrency(car.price - car.discountedPrice)}
                    </div>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-primary-900">
                    {formatCurrency(car.price)}
                  </span>
                )}
              </div>
              
              {/* CTA Buttons */}
              <div className="space-y-3 mb-6">
                <Button
                  variant="primary"
                  fullWidth
                  className="py-3"
                >
                  <Phone size={18} className="mr-2" />
                  Contact Dealer
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  className="py-3"
                >
                  <Calendar size={18} className="mr-2" />
                  Schedule Test Drive
                </Button>
              </div>
              
              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-primary-50 p-3 rounded-md">
                  <p className="text-xs text-primary-500 mb-1">Location</p>
                  <p className="text-sm font-medium">{car.location}</p>
                </div>
                <div className="bg-primary-50 p-3 rounded-md">
                  <p className="text-xs text-primary-500 mb-1">Condition</p>
                  <p className="text-sm font-medium">{car.condition}</p>
                </div>
                <div className="bg-primary-50 p-3 rounded-md">
                  <p className="text-xs text-primary-500 mb-1">Exterior Color</p>
                  <p className="text-sm font-medium">{car.color}</p>
                </div>
                <div className="bg-primary-50 p-3 rounded-md">
                  <p className="text-xs text-primary-500 mb-1">VIN</p>
                  <p className="text-sm font-medium">WBA#####</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="px-6 border-t border-primary-100">
            <div className="flex overflow-x-auto scrollbar-hide">
              <button
                className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'overview'
                    ? 'border-accent-600 text-accent-600'
                    : 'border-transparent text-primary-600 hover:text-primary-900'
                }`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'specifications'
                    ? 'border-accent-600 text-accent-600'
                    : 'border-transparent text-primary-600 hover:text-primary-900'
                }`}
                onClick={() => setActiveTab('specifications')}
              >
                Specifications
              </button>
              <button
                className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === 'features'
                    ? 'border-accent-600 text-accent-600'
                    : 'border-transparent text-primary-600 hover:text-primary-900'
                }`}
                onClick={() => setActiveTab('features')}
              >
                Features
              </button>
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="p-6 border-t border-primary-100">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="prose max-w-none text-primary-800">
                  <h3 className="text-xl font-semibold text-primary-900 mb-4">Vehicle Overview</h3>
                  <p className="mb-6">{car.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-lg font-semibold text-primary-900 mb-3">Pros</h4>
                      <ul className="space-y-2">
                        {car.pros.map((pro, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle size={18} className="text-success-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-primary-900 mb-3">Cons</h4>
                      <ul className="space-y-2">
                        {car.cons.map((con, index) => (
                          <li key={index} className="flex items-start">
                            <X size={18} className="text-error-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-primary-50 p-4 rounded-lg mb-6">
                    <h4 className="text-lg font-semibold text-primary-900 mb-3">Vehicle Benefits</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="flex items-start">
                        <Star size={18} className="text-accent-500 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <h5 className="font-medium text-primary-900">Extended Warranty</h5>
                          <p className="text-sm text-primary-600">12-month comprehensive coverage</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Truck size={18} className="text-accent-500 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <h5 className="font-medium text-primary-900">Free Delivery</h5>
                          <p className="text-sm text-primary-600">Within 100 miles of dealership</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Shield size={18} className="text-accent-500 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <h5 className="font-medium text-primary-900">Service Plan</h5>
                          <p className="text-sm text-primary-600">Optional 3-year maintenance</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'specifications' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-primary-900 mb-4">Technical Specifications</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div className="border-b border-primary-100 pb-3">
                    <h4 className="text-sm text-primary-500">Engine</h4>
                    <p className="font-medium">{car.specs.engine}</p>
                  </div>
                  <div className="border-b border-primary-100 pb-3">
                    <h4 className="text-sm text-primary-500">Power</h4>
                    <p className="font-medium">{car.specs.power}</p>
                  </div>
                  <div className="border-b border-primary-100 pb-3">
                    <h4 className="text-sm text-primary-500">Transmission</h4>
                    <p className="font-medium">{car.transmission}</p>
                  </div>
                  <div className="border-b border-primary-100 pb-3">
                    <h4 className="text-sm text-primary-500">Fuel Type</h4>
                    <p className="font-medium">{car.fuelType}</p>
                  </div>
                  <div className="border-b border-primary-100 pb-3">
                    <h4 className="text-sm text-primary-500">Acceleration</h4>
                    <p className="font-medium">{car.specs.acceleration}</p>
                  </div>
                  <div className="border-b border-primary-100 pb-3">
                    <h4 className="text-sm text-primary-500">Top Speed</h4>
                    <p className="font-medium">{car.specs.topSpeed}</p>
                  </div>
                  <div className="border-b border-primary-100 pb-3">
                    <h4 className="text-sm text-primary-500">Fuel Consumption</h4>
                    <p className="font-medium">{car.specs.fuelConsumption}</p>
                  </div>
                  <div className="border-b border-primary-100 pb-3">
                    <h4 className="text-sm text-primary-500">CO2 Emissions</h4>
                    <p className="font-medium">{car.specs.co2Emissions}</p>
                  </div>
                  <div className="border-b border-primary-100 pb-3">
                    <h4 className="text-sm text-primary-500">Mileage</h4>
                    <p className="font-medium">{formatCurrency(car.mileage)} mi</p>
                  </div>
                  <div className="border-b border-primary-100 pb-3">
                    <h4 className="text-sm text-primary-500">Color</h4>
                    <p className="font-medium">{car.color}</p>
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'features' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold text-primary-900 mb-4">Features & Equipment</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle size={16} className="text-success-500 mr-2 flex-shrink-0" />
                      <span className="text-primary-800">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      {/* WhatsApp Button */}
      <a
        href="#"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-colors z-30"
        aria-label="Contact via WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
        </svg>
      </a>
    </div>
  );
};

export default CarDetailsPage;