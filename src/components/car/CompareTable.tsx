import React from 'react';
import { Car } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import StatusTag from '../ui/StatusTag';
import Button from '../ui/Button';
import { X } from 'lucide-react';

interface CompareTableProps {
  cars: Car[];
  onRemove: (carId: string) => void;
}

const CompareTable: React.FC<CompareTableProps> = ({ cars, onRemove }) => {
  if (cars.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-card p-8 text-center">
        <h3 className="text-xl font-semibold text-primary-800 mb-4">No Cars to Compare</h3>
        <p className="text-primary-600 mb-6">
          Add vehicles to the comparison list to see their specifications side by side.
        </p>
      </div>
    );
  }

  // Define comparison categories and properties
  const categories = [
    {
      name: 'Basic Information',
      properties: [
        { label: 'Brand', key: 'brand' as keyof Car },
        { label: 'Model', key: 'model' as keyof Car },
        { label: 'Year', key: 'year' as keyof Car },
        { label: 'Price', key: 'price' as keyof Car, format: (value: number) => formatCurrency(value) },
        { label: 'Mileage', key: 'mileage' as keyof Car, format: (value: number) => `${value.toLocaleString()} mi` },
        { label: 'Condition', key: 'condition' as keyof Car },
        { label: 'Status', key: 'status' as keyof Car, custom: (car: Car) => <StatusTag status={car.status} /> },
      ],
    },
    {
      name: 'Engine & Performance',
      properties: [
        { label: 'Fuel Type', key: 'fuelType' as keyof Car },
        { label: 'Transmission', key: 'transmission' as keyof Car },
        { label: 'Engine', key: 'engine' as keyof Car, nested: 'specs' },
        { label: 'Power', key: 'power' as keyof Car, nested: 'specs' },
        { label: 'Acceleration', key: 'acceleration' as keyof Car, nested: 'specs' },
        { label: 'Top Speed', key: 'topSpeed' as keyof Car, nested: 'specs' },
        { label: 'Fuel Consumption', key: 'fuelConsumption' as keyof Car, nested: 'specs' },
        { label: 'CO2 Emissions', key: 'co2Emissions' as keyof Car, nested: 'specs' },
      ],
    },
    {
      name: 'Features',
      properties: [
        { label: 'Key Features', key: 'features' as keyof Car, custom: (car: Car) => (
          <ul className="list-disc pl-5 space-y-1">
            {car.features.map((feature, index) => (
              <li key={index} className="text-sm">{feature}</li>
            ))}
          </ul>
        )},
      ],
    },
    {
      name: 'Pros & Cons',
      properties: [
        { label: 'Advantages', key: 'pros' as keyof Car, custom: (car: Car) => (
          <ul className="list-disc pl-5 space-y-1 text-success-600">
            {car.pros.map((pro, index) => (
              <li key={index} className="text-sm">{pro}</li>
            ))}
          </ul>
        )},
        { label: 'Disadvantages', key: 'cons' as keyof Car, custom: (car: Car) => (
          <ul className="list-disc pl-5 space-y-1 text-error-600">
            {car.cons.map((con, index) => (
              <li key={index} className="text-sm">{con}</li>
            ))}
          </ul>
        )},
      ],
    },
  ];

  // Helper to get property value, handling nested properties
  const getPropertyValue = (car: Car, property: any) => {
    if (property.custom) {
      return property.custom(car);
    }
    
    if (property.nested) {
      const value = (car as any)[property.nested][property.key];
      return property.format ? property.format(value) : value;
    }
    
    const value = (car as any)[property.key];
    return property.format ? property.format(value) : value;
  };

  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden">
      {/* Car Images and Remove Buttons */}
      <div className="grid grid-cols-3 divide-x divide-primary-100">
        {cars.map((car) => (
          <div key={car.id} className="relative">
            <div className="aspect-[16/9] max-h-40">
              <img 
                src={car.images[0]} 
                alt={`${car.brand} ${car.model}`}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full hover:bg-white transition-colors"
              onClick={() => onRemove(car.id)}
              aria-label={`Remove ${car.brand} ${car.model}`}
            >
              <X size={16} className="text-primary-800" />
            </button>
            <div className="text-center p-3 border-b border-primary-100">
              <h3 className="font-semibold text-primary-900">{car.brand} {car.model}</h3>
              <p className="text-sm text-primary-600">{car.year}</p>
            </div>
          </div>
        ))}
        {Array.from({ length: 3 - cars.length }).map((_, index) => (
          <div key={`empty-${index}`} className="p-4 text-center flex flex-col items-center justify-center min-h-[160px] bg-primary-50">
            <div className="text-primary-400 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <line x1="12" x2="12" y1="8" y2="16" />
                <line x1="8" x2="16" y1="12" y2="12" />
              </svg>
            </div>
            <p className="text-primary-600 text-sm">Add another vehicle</p>
          </div>
        ))}
      </div>
      
      {/* Comparison Table */}
      <div className="overflow-x-auto">
        {categories.map((category) => (
          <div key={category.name}>
            <div className="px-6 py-3 bg-primary-50 font-semibold text-primary-800 border-t border-primary-200">
              {category.name}
            </div>
            <table className="w-full">
              <tbody>
                {category.properties.map((property) => (
                  <tr key={property.label} className="border-t border-primary-100">
                    <td className="px-6 py-3 text-sm font-medium text-primary-600 w-48">
                      {property.label}
                    </td>
                    {cars.map((car) => (
                      <td key={`${car.id}-${property.label}`} className="px-6 py-3 text-sm border-l border-primary-100">
                        {getPropertyValue(car, property)}
                      </td>
                    ))}
                    {Array.from({ length: 3 - cars.length }).map((_, index) => (
                      <td key={`empty-${property.label}-${index}`} className="px-6 py-3 text-sm border-l border-primary-100">
                        -
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      
      {/* Action Buttons */}
      <div className="grid grid-cols-3 divide-x divide-primary-100 border-t border-primary-200">
        {cars.map((car) => (
          <div key={car.id} className="p-4">
            <Button 
              variant="primary" 
              fullWidth
              as="link"
              href={`/car/${car.id}`}
            >
              View Details
            </Button>
          </div>
        ))}
        {Array.from({ length: 3 - cars.length }).map((_, index) => (
          <div key={`empty-action-${index}`} className="p-4">
            <Button 
              variant="outline"
              disabled
              fullWidth
            >
              View Details
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompareTable;