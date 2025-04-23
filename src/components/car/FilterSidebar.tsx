import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filters, FuelType, CarCondition, TransmissionType } from '../../types';
import { carBrands, fuelTypes, carConditions, transmissionTypes, minYear, maxYear, minPrice, maxPrice } from '../../data/mockData';
import Button from '../ui/Button';
import { Filter, X } from 'lucide-react';

interface FilterSidebarProps {
  filters: Filters;
  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  resetFilters: () => void;
  isMobile?: boolean;
  onClose?: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  setFilter,
  resetFilters,
  isMobile = false,
  onClose,
}) => {
  const [priceRange, setPriceRange] = useState([filters.minPrice, filters.maxPrice]);
  const [yearRange, setYearRange] = useState([filters.minYear, filters.maxYear]);
  
  const updatePriceRange = (range: number[]) => {
    setPriceRange(range);
    setFilter('minPrice', range[0]);
    setFilter('maxPrice', range[1]);
  };
  
  const updateYearRange = (range: number[]) => {
    setYearRange(range);
    setFilter('minYear', range[0]);
    setFilter('maxYear', range[1]);
  };
  
  const toggleBrand = (brand: string) => {
    const updatedBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    setFilter('brands', updatedBrands);
  };
  
  const toggleFuelType = (type: FuelType) => {
    const updatedFuelTypes = filters.fuelTypes.includes(type)
      ? filters.fuelTypes.filter(t => t !== type)
      : [...filters.fuelTypes, type];
    setFilter('fuelTypes', updatedFuelTypes);
  };
  
  const toggleCondition = (condition: CarCondition) => {
    const updatedConditions = filters.conditions.includes(condition)
      ? filters.conditions.filter(c => c !== condition)
      : [...filters.conditions, condition];
    setFilter('conditions', updatedConditions);
  };
  
  const setTransmission = (transmission: TransmissionType | undefined) => {
    setFilter('transmission', transmission);
  };
  
  // Animation variants for mobile sidebar
  const sidebarVariants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  };
  
  const Sidebar = () => (
    <div className="space-y-6">
      {/* Header with title and reset button */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Filter size={20} className="text-primary-600" />
          <h3 className="text-lg font-semibold text-primary-900">Filters</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-sm text-primary-600"
          >
            Reset All
          </Button>
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden"
              aria-label="Close filters"
            >
              <X size={20} />
            </Button>
          )}
        </div>
      </div>
      
      {/* Brand Filter */}
      <div>
        <h4 className="text-sm font-medium text-primary-900 mb-2">Brand</h4>
        <div className="space-y-1.5">
          {carBrands.map((brand) => (
            <div key={brand} className="flex items-center">
              <input
                type="checkbox"
                id={`brand-${brand}`}
                checked={filters.brands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="w-4 h-4 text-accent-600 border-primary-300 rounded focus:ring-accent-500"
              />
              <label htmlFor={`brand-${brand}`} className="ml-2 text-sm text-primary-700">
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Fuel Type Filter */}
      <div>
        <h4 className="text-sm font-medium text-primary-900 mb-2">Fuel Type</h4>
        <div className="space-y-1.5">
          {fuelTypes.map((type) => (
            <div key={type} className="flex items-center">
              <input
                type="checkbox"
                id={`fuel-${type}`}
                checked={filters.fuelTypes.includes(type)}
                onChange={() => toggleFuelType(type)}
                className="w-4 h-4 text-accent-600 border-primary-300 rounded focus:ring-accent-500"
              />
              <label htmlFor={`fuel-${type}`} className="ml-2 text-sm text-primary-700">
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Condition Filter */}
      <div>
        <h4 className="text-sm font-medium text-primary-900 mb-2">Condition</h4>
        <div className="space-y-1.5">
          {carConditions.map((condition) => (
            <div key={condition} className="flex items-center">
              <input
                type="checkbox"
                id={`condition-${condition}`}
                checked={filters.conditions.includes(condition)}
                onChange={() => toggleCondition(condition)}
                className="w-4 h-4 text-accent-600 border-primary-300 rounded focus:ring-accent-500"
              />
              <label htmlFor={`condition-${condition}`} className="ml-2 text-sm text-primary-700">
                {condition}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Transmission Filter */}
      <div>
        <h4 className="text-sm font-medium text-primary-900 mb-2">Transmission</h4>
        <div className="space-y-1.5">
          <div className="flex items-center">
            <input
              type="radio"
              id="transmission-any"
              name="transmission"
              checked={!filters.transmission}
              onChange={() => setTransmission(undefined)}
              className="w-4 h-4 text-accent-600 border-primary-300 focus:ring-accent-500"
            />
            <label htmlFor="transmission-any" className="ml-2 text-sm text-primary-700">
              Any
            </label>
          </div>
          {transmissionTypes.map((type) => (
            <div key={type} className="flex items-center">
              <input
                type="radio"
                id={`transmission-${type}`}
                name="transmission"
                checked={filters.transmission === type}
                onChange={() => setTransmission(type)}
                className="w-4 h-4 text-accent-600 border-primary-300 focus:ring-accent-500"
              />
              <label htmlFor={`transmission-${type}`} className="ml-2 text-sm text-primary-700">
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Price Range Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-primary-900">Price Range</h4>
          <span className="text-xs text-primary-600">
            ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
          </span>
        </div>
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={priceRange[0]}
          onChange={(e) => updatePriceRange([parseInt(e.target.value), priceRange[1]])}
          className="w-full h-2 bg-primary-200 rounded-lg appearance-none cursor-pointer accent-accent-600"
        />
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={priceRange[1]}
          onChange={(e) => updatePriceRange([priceRange[0], parseInt(e.target.value)])}
          className="w-full h-2 bg-primary-200 rounded-lg appearance-none cursor-pointer accent-accent-600 mt-2"
        />
      </div>
      
      {/* Year Range Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-primary-900">Year Range</h4>
          <span className="text-xs text-primary-600">
            {yearRange[0]} - {yearRange[1]}
          </span>
        </div>
        <input
          type="range"
          min={minYear}
          max={maxYear}
          value={yearRange[0]}
          onChange={(e) => updateYearRange([parseInt(e.target.value), yearRange[1]])}
          className="w-full h-2 bg-primary-200 rounded-lg appearance-none cursor-pointer accent-accent-600"
        />
        <input
          type="range"
          min={minYear}
          max={maxYear}
          value={yearRange[1]}
          onChange={(e) => updateYearRange([yearRange[0], parseInt(e.target.value)])}
          className="w-full h-2 bg-primary-200 rounded-lg appearance-none cursor-pointer accent-accent-600 mt-2"
        />
      </div>
      
      {/* Apply Filters Button - only for mobile */}
      {isMobile && (
        <div className="pt-4">
          <Button
            variant="primary"
            fullWidth
            onClick={onClose}
          >
            Apply Filters
          </Button>
        </div>
      )}
    </div>
  );
  
  if (isMobile) {
    return (
      <motion.div
        className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm lg:hidden"
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      >
        <motion.div
          className="absolute top-0 left-0 bottom-0 w-80 max-w-[80%] bg-white p-6 overflow-y-auto"
          variants={sidebarVariants}
          onClick={(e) => e.stopPropagation()}
        >
          <Sidebar />
        </motion.div>
      </motion.div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-card p-6 h-fit sticky top-4">
      <Sidebar />
    </div>
  );
};

export default FilterSidebar;