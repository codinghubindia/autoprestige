import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import CompareTable from '../components/car/CompareTable';
import Button from '../components/ui/Button';
import useStore from '../store/useStore';

const ComparePage: React.FC = () => {
  const { compareList, removeFromCompare, clearCompare } = useStore();
  
  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        {/* Back Link */}
        <div className="mb-6">
          <Link 
            to="/inventory" 
            className="inline-flex items-center text-primary-600 hover:text-accent-600 transition-colors"
          >
            <ChevronLeft size={18} className="mr-1" />
            <span>Back to Inventory</span>
          </Link>
        </div>
        
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl font-bold text-primary-900">Compare Vehicles</h1>
            {compareList.length > 0 && (
              <Button variant="outline" size="sm" onClick={clearCompare}>
                Clear All
              </Button>
            )}
          </div>
          <p className="text-primary-600 mt-2">
            {compareList.length > 0
              ? 'Compare specifications side by side to find the perfect vehicle for you.'
              : 'Add vehicles to compare their specifications side by side.'}
          </p>
        </div>
        
        {/* Compare Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <CompareTable
            cars={compareList}
            onRemove={removeFromCompare}
          />
        </motion.div>
        
        {/* CTA for empty state */}
        {compareList.length === 0 && (
          <div className="mt-8 text-center">
            <Link to="/inventory">
              <Button variant="primary" size="lg">
                Browse Inventory
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparePage;