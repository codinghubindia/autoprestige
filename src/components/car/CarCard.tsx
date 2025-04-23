import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Car } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import StatusTag from '../ui/StatusTag';
import ImageCarousel from './ImageCarousel';
import Button from '../ui/Button';
import { PlusCircle } from 'lucide-react';

interface CarCardProps {
  car: Car;
  onAddToCompare: (car: Car) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onAddToCompare }) => {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <motion.div
      className="bg-white rounded-lg shadow-card hover:shadow-card-hover overflow-hidden flex flex-col h-full transform transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative">
        <ImageCarousel 
          images={car.images} 
          autoplay={isHovering}
          interval={2000}
        />
        
        <div className="absolute top-2 right-2">
          <StatusTag status={car.status} withAnimation={isHovering} />
        </div>
        
        {car.discountedPrice && (
          <div className="absolute top-2 left-2 bg-error-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
            SALE
          </div>
        )}
      </div>
      
      <div className="p-4 flex-grow">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-lg font-semibold text-primary-900 leading-tight">
            {car.brand} {car.model}
          </h3>
          <div className="text-sm text-primary-600 font-medium">
            {car.year}
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-primary-500 mb-3">
          <span>{formatCurrency(car.mileage)} mi</span>
          <span className="w-1 h-1 rounded-full bg-primary-300"></span>
          <span>{car.fuelType}</span>
          <span className="w-1 h-1 rounded-full bg-primary-300"></span>
          <span>{car.transmission}</span>
        </div>
        
        <div className="mb-4">
          {car.discountedPrice ? (
            <div className="flex items-baseline">
              <span className="text-xl font-bold text-primary-900">
                {formatCurrency(car.discountedPrice)}
              </span>
              <span className="ml-2 text-sm text-primary-500 line-through">
                {formatCurrency(car.price)}
              </span>
            </div>
          ) : (
            <span className="text-xl font-bold text-primary-900">
              {formatCurrency(car.price)}
            </span>
          )}
        </div>
        
        <div className="flex flex-wrap gap-1.5 mb-4">
          {car.features.slice(0, 3).map((feature, index) => (
            <span key={index} className="bg-primary-50 text-primary-700 text-xs px-2 py-1 rounded">
              {feature}
            </span>
          ))}
          {car.features.length > 3 && (
            <span className="bg-primary-50 text-primary-700 text-xs px-2 py-1 rounded">
              +{car.features.length - 3}
            </span>
          )}
        </div>
      </div>
      
      <div className="px-4 pb-4 mt-auto">
        <div className="flex space-x-2">
          <Link 
            to={`/car/${car.id}`}
            className="flex-1"
          >
            <Button 
              variant="primary" 
              fullWidth
            >
              View Details
            </Button>
          </Link>
          
          <Button
            variant="outline"
            onClick={() => onAddToCompare(car)}
            title="Add to Compare"
            aria-label="Add to Compare"
          >
            <PlusCircle size={20} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;