import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car } from '../../types';
import Button from '../ui/Button';
import StatusTag from '../ui/StatusTag';
import { X } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { Link } from 'react-router-dom';

interface CarDetailsModalProps {
  car: Car;
  isOpen: boolean;
  onClose: () => void;
}

const CarDetailsModal: React.FC<CarDetailsModalProps> = ({ car, isOpen, onClose }) => {
  // Stop propagation to prevent closing when clicking inside
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={handleModalClick}
          >
            <div className="absolute top-2 right-2 z-10">
              <button 
                className="p-1.5 rounded-full bg-white/80 text-primary-900 hover:bg-white transition-colors"
                onClick={onClose}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Car Image */}
            <div className="relative h-48 sm:h-64">
              <img
                src={car.images[0]}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2">
                <StatusTag status={car.status} />
              </div>
            </div>
            
            {/* Content */}
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-semibold text-primary-900">
                    {car.brand} {car.model}
                  </h3>
                  <p className="text-sm text-primary-600">
                    {car.year} • {car.mileage.toLocaleString()} mi • {car.location}
                  </p>
                </div>
                <div className="text-right">
                  {car.discountedPrice ? (
                    <>
                      <p className="text-xl font-bold text-primary-900">
                        {formatCurrency(car.discountedPrice)}
                      </p>
                      <p className="text-sm text-primary-500 line-through">
                        {formatCurrency(car.price)}
                      </p>
                    </>
                  ) : (
                    <p className="text-xl font-bold text-primary-900">
                      {formatCurrency(car.price)}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1.5 mb-4">
                {car.features.slice(0, 5).map((feature, index) => (
                  <span key={index} className="bg-primary-50 text-primary-700 text-xs px-2 py-1 rounded">
                    {feature}
                  </span>
                ))}
                {car.features.length > 5 && (
                  <span className="bg-primary-50 text-primary-700 text-xs px-2 py-1 rounded">
                    +{car.features.length - 5} more
                  </span>
                )}
              </div>
              
              <div className="mb-4">
                <p className="text-primary-700">{car.description.substring(0, 200)}...</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div>
                  <h4 className="text-xs text-primary-500">Engine</h4>
                  <p className="text-sm font-medium">{car.specs.engine}</p>
                </div>
                <div>
                  <h4 className="text-xs text-primary-500">Power</h4>
                  <p className="text-sm font-medium">{car.specs.power}</p>
                </div>
                <div>
                  <h4 className="text-xs text-primary-500">Acceleration</h4>
                  <p className="text-sm font-medium">{car.specs.acceleration}</p>
                </div>
                <div>
                  <h4 className="text-xs text-primary-500">Fuel Consumption</h4>
                  <p className="text-sm font-medium">{car.specs.fuelConsumption}</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Link to={`/car/${car.id}`} className="flex-1">
                  <Button variant="primary" fullWidth>
                    View Full Details
                  </Button>
                </Link>
                <Button variant="outline">
                  Book Test Drive
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CarDetailsModal;