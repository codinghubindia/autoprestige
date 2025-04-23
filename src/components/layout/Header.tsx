import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CarFront, Menu, X, Search, Map, User, ChevronDown } from 'lucide-react';
import Button from '../ui/Button';
import useAuthStore from '../../store/useAuthStore';
import useStore from '../../store/useStore';
import { locations } from '../../data/mockData';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuthStore();
  const { selectedLocation, setSelectedLocation } = useStore();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLocationDropdown = () => setIsLocationDropdownOpen(!isLocationDropdownOpen);
  
  const headerClasses = `fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
    isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
  }`;
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Inventory', path: '/inventory' },
    { name: 'Compare', path: '/compare' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];
  
  const selectedLocationObj = locations.find(loc => loc.name === selectedLocation);
  
  return (
    <header className={headerClasses}>
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <CarFront size={32} className="text-accent-600" />
          <span className="text-xl font-bold text-primary-900">AutoPrestige</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? 'text-accent-600'
                  : 'text-primary-800 hover:text-accent-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Location Selector */}
          <div className="relative">
            <button
              onClick={toggleLocationDropdown}
              className="flex items-center space-x-1 text-sm font-medium text-primary-800 hover:text-accent-600 transition-colors"
            >
              <Map size={18} />
              <span>{selectedLocation || 'All Locations'}</span>
              <ChevronDown size={16} className={`transition-transform ${isLocationDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {isLocationDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                >
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setSelectedLocation('');
                        setIsLocationDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${!selectedLocation ? 'text-accent-600 font-medium' : 'text-primary-800'} hover:bg-primary-50`}
                    >
                      All Locations
                    </button>
                    {locations.map((loc) => (
                      <button
                        key={loc.id}
                        onClick={() => {
                          setSelectedLocation(loc.name);
                          setIsLocationDropdownOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${selectedLocation === loc.name ? 'text-accent-600 font-medium' : 'text-primary-800'} hover:bg-primary-50`}
                      >
                        {loc.name}, {loc.country}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Search Button */}
          <button className="text-primary-800 hover:text-accent-600 transition-colors">
            <Search size={20} />
          </button>
          
          {/* Admin Link or Login */}
          {isAuthenticated ? (
            <div className="relative group">
              <button className="flex items-center space-x-2 text-sm font-medium text-primary-800 hover:text-accent-600 transition-colors">
                <User size={20} />
                <span>{user?.name || 'Admin'}</span>
                <ChevronDown size={16} />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <Link to="/admin" className="block px-4 py-2 text-sm text-primary-800 hover:bg-primary-50">
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-primary-800 hover:bg-primary-50"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/admin">
              <Button variant="outline" size="sm">
                Admin Login
              </Button>
            </Link>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-primary-800"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-primary-100"
          >
            <div className="container-custom py-4 space-y-4">
              <nav className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-base font-medium ${
                      location.pathname === link.path
                        ? 'text-accent-600'
                        : 'text-primary-800'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              
              <div className="space-y-3 pt-3 border-t border-primary-100">
                {/* Location Selector for Mobile */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-primary-600">Select Location</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedLocation('')}
                      className={`text-left px-3 py-2 text-sm rounded-md ${
                        !selectedLocation 
                          ? 'bg-accent-50 text-accent-600 font-medium' 
                          : 'bg-primary-50 text-primary-800'
                      }`}
                    >
                      All Locations
                    </button>
                    {locations.map((loc) => (
                      <button
                        key={loc.id}
                        onClick={() => setSelectedLocation(loc.name)}
                        className={`text-left px-3 py-2 text-sm rounded-md ${
                          selectedLocation === loc.name
                            ? 'bg-accent-50 text-accent-600 font-medium'
                            : 'bg-primary-50 text-primary-800'
                        }`}
                      >
                        {loc.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Admin Actions for Mobile */}
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <Link to="/admin" className="block">
                      <Button variant="outline" fullWidth>
                        Dashboard
                      </Button>
                    </Link>
                    <Button variant="secondary" fullWidth onClick={logout}>
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Link to="/admin" className="block">
                    <Button variant="primary" fullWidth>
                      Admin Login
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;