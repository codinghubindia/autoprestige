/**
 * Formats a number as currency
 */
export const formatCurrency = (amount: number, locale = 'en-US', currency = 'USD'): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Formats a date string to a readable format
 */
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  return new Date(dateString).toLocaleDateString('en-US', options);
};

/**
 * Formats a number with commas for thousands
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US');
};

/**
 * Truncates text to a specified length and adds ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};