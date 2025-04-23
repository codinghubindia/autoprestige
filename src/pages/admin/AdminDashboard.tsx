import React from 'react';
import { motion } from 'framer-motion';
import { Car, DollarSign, Users, Truck, Clock, Tag } from 'lucide-react';
import { cars, statusCounts } from '../../data/mockData';

const AdminDashboard: React.FC = () => {
  // Calculate basic analytics
  const totalCars = cars.length;
  const availableCars = statusCounts['Available'] || 0;
  const reservedCars = statusCounts['Reserved'] || 0;
  const soldCars = statusCounts['Sold'] || 0;
  
  // Calculate revenue (using price of sold cars + 50% of reserved cars)
  const soldRevenue = cars
    .filter(car => car.status === 'Sold')
    .reduce((sum, car) => sum + (car.discountedPrice || car.price), 0);
  
  const reservedRevenue = cars
    .filter(car => car.status === 'Reserved')
    .reduce((sum, car) => sum + (car.discountedPrice || car.price), 0) * 0.5;
  
  const totalRevenue = soldRevenue + reservedRevenue;
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-900 mb-6">Dashboard</h1>
      
      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-card">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-accent-100 rounded-lg">
              <Car size={24} className="text-accent-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-primary-600">Total Vehicles</h3>
              <p className="text-2xl font-bold text-primary-900">{totalCars}</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 pt-4 border-t border-primary-100">
            <div>
              <p className="text-xs text-primary-500">Available</p>
              <p className="text-sm font-medium text-primary-900">{availableCars}</p>
            </div>
            <div>
              <p className="text-xs text-primary-500">Reserved</p>
              <p className="text-sm font-medium text-primary-900">{reservedCars}</p>
            </div>
            <div>
              <p className="text-xs text-primary-500">Sold</p>
              <p className="text-sm font-medium text-primary-900">{soldCars}</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-card">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-success-100 rounded-lg">
              <DollarSign size={24} className="text-success-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-primary-600">Total Revenue</h3>
              <p className="text-2xl font-bold text-primary-900">${totalRevenue.toLocaleString()}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-primary-100">
            <div className="h-2 bg-primary-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-success-500 rounded-full" 
                style={{ width: `${(soldRevenue / totalRevenue) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-xs">
              <span className="text-primary-500">Sold: ${soldRevenue.toLocaleString()}</span>
              <span className="text-primary-500">Reserved: ${reservedRevenue.toLocaleString()}</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-card">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-warning-100 rounded-lg">
              <Users size={24} className="text-warning-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-primary-600">Test Drives</h3>
              <p className="text-2xl font-bold text-primary-900">24</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 pt-4 border-t border-primary-100">
            <div>
              <p className="text-xs text-primary-500">Scheduled</p>
              <p className="text-sm font-medium text-primary-900">14</p>
            </div>
            <div>
              <p className="text-xs text-primary-500">Completed</p>
              <p className="text-sm font-medium text-primary-900">10</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Recent Activity */}
      <motion.div
        className="bg-white rounded-lg shadow-card p-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-lg font-semibold text-primary-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-start p-3 rounded-md hover:bg-primary-50 transition-colors">
            <div className="p-2 bg-success-100 rounded-full mr-3">
              <Tag size={16} className="text-success-600" />
            </div>
            <div className="flex-1">
              <p className="text-primary-900 font-medium">New sale recorded</p>
              <p className="text-sm text-primary-600">
                Mercedes-Benz AMG GT 63 was sold for $149,000
              </p>
              <p className="text-xs text-primary-400 mt-1">Today, 10:30 AM</p>
            </div>
          </div>
          
          <div className="flex items-start p-3 rounded-md hover:bg-primary-50 transition-colors">
            <div className="p-2 bg-warning-100 rounded-full mr-3">
              <Clock size={16} className="text-warning-600" />
            </div>
            <div className="flex-1">
              <p className="text-primary-900 font-medium">Test drive scheduled</p>
              <p className="text-sm text-primary-600">
                BMW i7 test drive scheduled with John Smith
              </p>
              <p className="text-xs text-primary-400 mt-1">Yesterday, 5:20 PM</p>
            </div>
          </div>
          
          <div className="flex items-start p-3 rounded-md hover:bg-primary-50 transition-colors">
            <div className="p-2 bg-accent-100 rounded-full mr-3">
              <Truck size={16} className="text-accent-600" />
            </div>
            <div className="flex-1">
              <p className="text-primary-900 font-medium">Vehicle shipped</p>
              <p className="text-sm text-primary-600">
                Audi e-tron GT shipped to Paris showroom
              </p>
              <p className="text-xs text-primary-400 mt-1">2 days ago</p>
            </div>
          </div>
          
          <div className="flex items-start p-3 rounded-md hover:bg-primary-50 transition-colors">
            <div className="p-2 bg-primary-100 rounded-full mr-3">
              <Car size={16} className="text-primary-600" />
            </div>
            <div className="flex-1">
              <p className="text-primary-900 font-medium">New inventory added</p>
              <p className="text-sm text-primary-600">
                5 new vehicles added to inventory
              </p>
              <p className="text-xs text-primary-400 mt-1">1 week ago</p>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Inventory Status */}
      <motion.div
        className="bg-white rounded-lg shadow-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-lg font-semibold text-primary-900 mb-4">Inventory Status</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-primary-200">
            <thead className="bg-primary-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">Vehicle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-primary-500 uppercase tracking-wider">Added On</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-primary-100">
              {cars.slice(0, 5).map((car) => (
                <tr key={car.id} className="hover:bg-primary-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded overflow-hidden bg-primary-100 flex-shrink-0">
                        <img src={car.images[0]} alt={car.model} className="h-full w-full object-cover" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-primary-900">{car.brand} {car.model}</div>
                        <div className="text-xs text-primary-500">{car.year}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                      car.status === 'Available' ? 'bg-success-100 text-success-800' :
                      car.status === 'Reserved' ? 'bg-warning-100 text-warning-800' :
                      car.status === 'Sold' ? 'bg-error-100 text-error-800' :
                      'bg-accent-100 text-accent-800'
                    }`}>
                      {car.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-900">
                    ${(car.discountedPrice || car.price).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-500">
                    {car.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-500">
                    {new Date(car.dateAdded).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;