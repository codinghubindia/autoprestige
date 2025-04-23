import React from 'react';
import { CarStatus } from '../../types';
import { motion } from 'framer-motion';

interface StatusTagProps {
  status: CarStatus;
  className?: string;
  withAnimation?: boolean;
}

const StatusTag: React.FC<StatusTagProps> = ({ 
  status, 
  className = '',
  withAnimation = false
}) => {
  let bgColor = '';
  let textColor = 'text-white';
  
  switch (status) {
    case 'Available':
      bgColor = 'bg-success-500';
      break;
    case 'Reserved':
      bgColor = 'bg-warning-500';
      break;
    case 'Sold':
      bgColor = 'bg-error-500';
      break;
    case 'Shipping':
      bgColor = 'bg-accent-500';
      break;
    default:
      bgColor = 'bg-primary-500';
  }

  const baseClasses = `inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor} ${className}`;
  
  if (!withAnimation) {
    return <span className={baseClasses}>{status}</span>;
  }
  
  return (
    <motion.span
      className={baseClasses}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {status}
    </motion.span>
  );
};

export default StatusTag;