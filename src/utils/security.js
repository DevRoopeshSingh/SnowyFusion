/**
 * Basic input sanitization and validation utilities
 */

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .slice(0, 100) // Limit length
    .replace(/[<>'"&]/g, '') // Remove potentially dangerous characters
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
};

export const validateSearchQuery = (query) => {
  if (typeof query !== 'string') return false;
  
  // Validate search query format - only allow letters, numbers, spaces, and hyphens
  const pattern = /^[a-zA-Z0-9\s-]{0,50}$/;
  return pattern.test(query);
};

export const validatePrice = (price) => {
  if (typeof price !== 'string') return false;
  
  // Validate price format and range
  const numericPrice = parseFloat(price.replace('₹', ''));
  return !isNaN(numericPrice) && numericPrice >= 0 && numericPrice <= 10000;
};

export const validateMenuItem = (item) => {
  if (!item || typeof item !== 'object') return false;
  
  return (
    typeof item.id === 'string' &&
    validatePrice(item.price) &&
    typeof item.name === 'string' &&
    item.name.length <= 100
  );
};

// Simple XSS prevention for strings
export const escapeHtml = (unsafe) => {
  if (typeof unsafe !== 'string') return '';
  
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  
  return unsafe.replace(/[&<>"']/g, (m) => map[m]);
};

// Validate email format
export const validateEmail = (email) => {
  if (typeof email !== 'string') return false;
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
};

// Validate phone number format
export const validatePhone = (phone) => {
  if (typeof phone !== 'string') return false;
  const pattern = /^[0-9]{10}$/;
  return pattern.test(phone.replace(/[\s-]/g, ''));
}; 