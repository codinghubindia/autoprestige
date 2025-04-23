import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Filter, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import CarCard from '../components/car/CarCard';
import FilterSidebar from '../components/car/FilterSidebar';
import CarDetailsModal from '../components/car/CarDetailsModal';
import Button from '../components/ui/Button';
import useStore from '../store/useStore';
import { Car } from '../types';

const InventoryPage: React.FC = () => {
  const { location } = useParams<{ location: string }>();
  const navigate = useNavigate();
  
  const { 
    filteredCars, 
    filters, 
    sortBy, 
    setFilter, 
    resetFilters, 
    setSortBy, 
    addToCompare, 
    setSelectedLocation,
  } = useStore();
  
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Set location filter based on URL parameter
  useEffect(() => {
    if (location) {
      setSelectedLocation(location);
    }
  }, [location, setSelectedLocation]);
  
  const handleViewDetails = (car: Car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  const toggleFilterSidebar = () => {
    setIsFilterSidebarOpen(!isFilterSidebarOpen);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  
  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-900 mb-2">
            {location ? `Cars in ${location}` : 'All Vehicles'}
          </h1>
          <p className="text-primary-600">
            Browse our selection of premium vehicles{location ? ` in ${location}` : ''}.
          </p>
        </div>
        
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <Button
            variant="outline"
            fullWidth
            onClick={toggleFilterSidebar}
            className="flex items-center justify-center"
          >
            <Filter size={18} className="mr-2" />
            <span>Filters</span>
          </Button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar for Desktop */}
          <div className="hidden lg:block w-64">
            <FilterSidebar
              filters={filters}
              setFilter={setFilter}
              resetFilters={resetFilters}
            />
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {/* Sort and Results Count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <p className="text-primary-600">
                <span className="font-medium">{filteredCars.length}</span> vehicles found
              </p>
              
              <div className="relative">
                <label className="text-sm text-primary-600 mb-1 block sm:hidden">Sort By:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none bg-white border border-primary-200 rounded-md py-2 px-4 pr-10 text-sm text-primary-900 focus:outline-none focus:ring-2 focus:ring-accent-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="priceAsc">Price: Low to High</option>
                  <option value="priceDesc">Price: High to Low</option>
                  <option value="mileageAsc">Lowest Mileage</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-600 pointer-events-none sm:translate-y-0" />
              </div>
            </div>
            
            {/* Car Grid */}
            {filteredCars.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredCars.map((car) => (
                  <motion.div key={car.id} variants={itemVariants}>
                    <CarCard car={car} onAddToCompare={addToCompare} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="bg-white rounded-lg shadow-card p-8 text-center">
                <h3 className="text-xl font-semibold text-primary-800 mb-2">No Cars Found</h3>
                <p className="text-primary-600 mb-6">
                  We couldn't find any cars matching your current filters.
                </p>
                <Button variant="primary" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Filter Sidebar */}
      <AnimatePresence>
        {isFilterSidebarOpen && (
          <FilterSidebar
            filters={filters}
            setFilter={setFilter}
            resetFilters={resetFilters}
            isMobile
            onClose={() => setIsFilterSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Car Details Modal */}
      {selectedCar && (
        <CarDetailsModal
          car={selectedCar}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default InventoryPage;