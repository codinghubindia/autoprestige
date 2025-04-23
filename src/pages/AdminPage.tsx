import React from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Car, 
  Users, 
  Calendar, 
  Settings, 
  BarChart, 
  PlusCircle, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import AdminDashboard from './admin/AdminDashboard';
import AdminInventory from './admin/AdminInventory';
import AdminLogin from './admin/AdminLogin';
import Button from '../components/ui/Button';
import useAuthStore from '../store/useAuthStore';

const AdminPage: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  
  // Show only login page if route is /admin/login
  if (location.pathname === '/admin/login') {
    return <AdminLogin />;
  }
  
  const sidebarItems = [
    { 
      name: 'Dashboard', 
      path: '/admin/dashboard', 
      icon: <BarChart size={20} className="mr-3" /> 
    },
    { 
      name: 'Inventory', 
      path: '/admin/inventory', 
      icon: <Car size={20} className="mr-3" /> 
    },
    { 
      name: 'Bookings', 
      path: '/admin/bookings', 
      icon: <Calendar size={20} className="mr-3" /> 
    },
    { 
      name: 'Customers', 
      path: '/admin/customers', 
      icon: <Users size={20} className="mr-3" /> 
    },
    { 
      name: 'Settings', 
      path: '/admin/settings', 
      icon: <Settings size={20} className="mr-3" /> 
    },
  ];
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="bg-primary-50 min-h-screen">
      {/* Admin Header */}
      <header className="bg-white shadow-sm py-3 px-4 fixed top-0 left-0 right-0 z-20">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button
              className="lg:hidden mr-3 text-primary-800"
              onClick={toggleSidebar}
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/admin/dashboard" className="flex items-center space-x-2">
              <Car size={24} className="text-accent-600" />
              <span className="text-lg font-bold text-primary-900">Sony's Auto Admin</span>
            </Link>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={logout} 
            className="flex items-center"
          >
            <LogOut size={18} className="mr-2" />
            <span>Logout</span>
          </Button>
        </div>
      </header>
      
      <div className="flex pt-14">
        {/* Sidebar for Desktop */}
        <aside className="hidden lg:block w-64 bg-white shadow-sm h-[calc(100vh-3.5rem)] fixed top-14 left-0 overflow-y-auto">
          <nav className="p-4">
            <ul className="space-y-1">
              {sidebarItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                      location.pathname === item.path
                        ? 'bg-accent-50 text-accent-700 font-medium'
                        : 'text-primary-700 hover:bg-primary-50'
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 pt-6 border-t border-primary-100">
              <Link to="/admin/inventory/add">
                <Button
                  variant="primary"
                  fullWidth
                  className="flex items-center justify-center"
                >
                  <PlusCircle size={18} className="mr-2" />
                  <span>Add New Vehicle</span>
                </Button>
              </Link>
            </div>
          </nav>
        </aside>
        
        {/* Mobile Sidebar */}
        {isSidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
          >
            <motion.aside
              className="w-64 bg-white h-screen overflow-y-auto shadow-lg"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="p-4">
                <div className="flex items-center justify-between mb-6">
                  <Link to="/admin/dashboard" className="flex items-center space-x-2">
                    <Car size={24} className="text-accent-600" />
                    <span className="text-lg font-bold text-primary-900">Sony's Auto</span>
                  </Link>
                  <button
                    className="text-primary-800"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <ul className="space-y-1">
                  {sidebarItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                        className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                          location.pathname === item.path
                            ? 'bg-accent-50 text-accent-700 font-medium'
                            : 'text-primary-700 hover:bg-primary-50'
                        }`}
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 pt-6 border-t border-primary-100">
                  <Link to="/admin/inventory/add" onClick={() => setIsSidebarOpen(false)}>
                    <Button
                      variant="primary"
                      fullWidth
                      className="flex items-center justify-center"
                    >
                      <PlusCircle size={18} className="mr-2" />
                      <span>Add New Vehicle</span>
                    </Button>
                  </Link>
                </div>
              </nav>
            </motion.aside>
          </motion.div>
        )}
        
        {/* Main Content */}
        <main className="flex-1 ml-0 lg:ml-64 p-6">
          <Routes>
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/inventory/*" element={<AdminInventory />} />
            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;