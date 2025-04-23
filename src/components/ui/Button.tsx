import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  fullWidth = false,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-accent-600 text-white hover:bg-accent-700 focus:ring-accent-500',
    secondary: 'bg-primary-100 text-primary-900 hover:bg-primary-200 focus:ring-primary-500',
    outline: 'border border-primary-300 bg-white text-primary-700 hover:bg-primary-50 focus:ring-primary-500',
    ghost: 'bg-transparent text-primary-700 hover:bg-primary-50 focus:ring-primary-500',
  };
  
  const sizes = {
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-2.5 px-5 text-lg',
  };
  
  const variantClass = variants[variant];
  const sizeClass = sizes[size];
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <motion.button
      className={`${baseClasses} ${variantClass} ${sizeClass} ${widthClass} ${className} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
      disabled={isLoading || props.disabled}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {icon && !isLoading && <span className="mr-2">{icon}</span>}
      {children}
    </motion.button>
  );
};

export default Button;