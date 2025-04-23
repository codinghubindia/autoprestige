import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home, Search } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50 px-4 pt-16 pb-20">
      <motion.div 
        className="max-w-lg w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary-100">
          <AlertTriangle size={32} className="text-primary-600" />
        </div>
        
        <h1 className="text-6xl font-bold text-primary-900 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-primary-800 mb-4">Page Not Found</h2>
        
        <p className="text-primary-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
          Please check the URL or navigate back to the homepage.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button variant="primary" className="flex items-center justify-center">
              <Home size={18} className="mr-2" />
              <span>Back to Home</span>
            </Button>
          </Link>
          
          <Link to="/inventory">
            <Button variant="outline" className="flex items-center justify-center">
              <Search size={18} className="mr-2" />
              <span>Browse Inventory</span>
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;