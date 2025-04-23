import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlusCircle, Search, Filter, Edit, Trash, Eye, AlertCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import StatusTag from '../../components/ui/StatusTag';
import { cars } from '../../data/mockData';
import { formatCurrency } from '../../utils/formatters';
import { Car, CarStatus } from '../../types';

const AdminInventory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<CarStatus | 'All'>('All');
  const [selectedCars, setSelectedCars] = useState<string[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // Filter cars based on search term and status
  const filteredCars = cars.filter((car) => {
    const matchesSearch = 
      car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.year.toString().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || car.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleStatusFilterChange = (status: CarStatus | 'All') => {
    setStatusFilter(status);
  };
  
  const handleSelectCar = (carId: string) => {
    setSelectedCars((prev) => {
      if (prev.includes(carId)) {
        return prev.filter((id) => id !== carId);
      } else {
        return [...prev, carId];
      }
    });
  };
  
  const handleSelectAll = () => {
    if (selectedCars.length === filteredCars.length) {
      setSelectedCars([]);
    } else {
      setSelectedCars(filteredCars.map((car) => car.id));
    }
  };
  
  const handleConfirmDelete = () => {
    // In real application, this would call an API to delete the selected cars
    console.log('Deleting cars with IDs:', selectedCars);
    setSelectedCars([]);
    setShowDeleteConfirm(false);
  };
  
  // Get status counts for filters
  const statusCounts = cars.reduce((counts, car) => {
    counts[car.status] = (counts[car.status] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);
  
  // Add "All" count
  const statusCountsWithAll = {
    All: cars.length,
    ...statusCounts,
  };
  
  return (
    <Routes>
      <Route path="/" element={
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-primary-900">Inventory Management</h1>
            <Link to="/admin/inventory/add">
              <Button
                variant="primary"
                className="flex items-center"
              >
                <PlusCircle size={18} className="mr-2" />
                <span>Add Vehicle</span>
              </Button>
            </Link>
          </div>
          
          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-card p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-primary-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search inventory..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="form-input pl-10"
                />
              </div>
              
              {/* Status Filters */}
              <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
                {Object.entries(statusCountsWithAll).map(([status, count]) => (
                  <button
                    key={status}
                    onClick={() => handleStatusFilterChange(status as CarStatus | 'All')}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                      statusFilter === status
                        ? 'bg-primary-900 text-white'
                        : 'bg-primary-100 text-primary-800 hover:bg-primary-200'
                    }`}
                  >
                    {status} ({count})
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Actions Bar */}
          {selectedCars.length > 0 && (
            <motion.div
              className="bg-primary-800 text-white rounded-lg p-3 mb-4 flex justify-between items-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="flex items-center">
                <span className="text-sm font-medium">{selectedCars.length} cars selected</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-white border-white/30 hover:bg-white/10"
                  onClick={() => setSelectedCars([])}
                >
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-error-300 border-error-300/30 hover:bg-error-500/10"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <Trash size={16} className="mr-1" />
                  <span>Delete</span>
                </Button>
              </div>
            </motion.div>
          )}
          
          {/* Inventory Table */}
          <div className="bg-white rounded-lg shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-primary-200">
                <thead className="bg-primary-50">
                  <tr>
                    <th className="px-4 py-3.5 text-left">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-accent-600 border-primary-300 rounded focus:ring-accent-500"
                          checked={selectedCars.length === filteredCars.length && filteredCars.length > 0}
                          onChange={handleSelectAll}
                        />
                      </div>
                    </th>
                    <th className="px-4 py-3.5 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">Vehicle</th>
                    <th className="px-4 py-3.5 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3.5 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">Price</th>
                    <th className="px-4 py-3.5 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">Location</th>
                    <th className="px-4 py-3.5 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">Date Added</th>
                    <th className="px-4 py-3.5 text-right text-xs font-medium text-primary-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-primary-100">
                  {filteredCars.length > 0 ? (
                    filteredCars.map((car) => (
                      <tr key={car.id} className="hover:bg-primary-50 transition-colors">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-accent-600 border-primary-300 rounded focus:ring-accent-500"
                            checked={selectedCars.includes(car.id)}
                            onChange={() => handleSelectCar(car.id)}
                          />
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded bg-primary-100">
                              <img src={car.images[0]} alt={car.model} className="h-full w-full object-cover" />
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-primary-900">{car.brand} {car.model}</div>
                              <div className="text-xs text-primary-500">{car.year} • {formatCurrency(car.mileage)} mi</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <StatusTag status={car.status} />
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          {car.discountedPrice ? (
                            <div>
                              <div className="text-sm font-medium text-primary-900">{formatCurrency(car.discountedPrice)}</div>
                              <div className="text-xs text-primary-500 line-through">{formatCurrency(car.price)}</div>
                            </div>
                          ) : (
                            <div className="text-sm font-medium text-primary-900">{formatCurrency(car.price)}</div>
                          )}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-primary-500">
                          {car.location}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-primary-500">
                          {new Date(car.dateAdded).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <Link 
                              to={`/car/${car.id}`}
                              className="text-primary-600 hover:text-primary-900"
                              title="View"
                            >
                              <Eye size={18} />
                            </Link>
                            <Link 
                              to={`/admin/inventory/edit/${car.id}`}
                              className="text-accent-600 hover:text-accent-800"
                              title="Edit"
                            >
                              <Edit size={18} />
                            </Link>
                            <button
                              className="text-error-600 hover:text-error-800"
                              title="Delete"
                              onClick={() => {
                                setSelectedCars([car.id]);
                                setShowDeleteConfirm(true);
                              }}
                            >
                              <Trash size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-10 text-center text-primary-600">
                        <div className="flex flex-col items-center">
                          <Filter size={24} className="text-primary-400 mb-2" />
                          <p className="text-lg font-medium text-primary-800 mb-1">No vehicles found</p>
                          <p className="text-primary-500">Try adjusting your search or filter to find what you're looking for.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Delete Confirmation Dialog */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <div className="flex items-center text-error-600 mb-4">
                  <AlertCircle size={24} className="mr-2" />
                  <h3 className="text-lg font-bold">Confirm Deletion</h3>
                </div>
                <p className="text-primary-700 mb-6">
                  Are you sure you want to delete {selectedCars.length === 1 ? 'this vehicle' : `these ${selectedCars.length} vehicles`}? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    className="bg-error-600 hover:bg-error-700"
                    onClick={handleConfirmDelete}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      } />
      
      <Route path="/add" element={<div className="p-4">Add Vehicle Form (placeholder)</div>} />
      <Route path="/edit/:id" element={<div className="p-4">Edit Vehicle Form (placeholder)</div>} />
    </Routes>
  );
};

export default AdminInventory;