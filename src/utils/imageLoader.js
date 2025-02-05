import { useState, useEffect } from 'react';

export const getImageUrl = (imagePath, optimized = true) => {
  if (!imagePath) return '/images/placeholders/food-placeholder.jpg';
  
  if (optimized && (imagePath.endsWith('.jpg') || imagePath.endsWith('.png'))) {
    return imagePath.replace(/\.(jpg|png)$/, '-optimized.jpg');
  }
  
  return imagePath;
};

export const getImageFallback = (type = 'food') => {
  const fallbacks = {
    food: '/images/placeholders/food-placeholder.jpg',
    hero: '/images/placeholders/hero-placeholder.jpg',
    square: '/images/placeholders/square-placeholder.jpg',
    menu: '/images/placeholders/menu-placeholder.jpg',
    offer: '/images/placeholders/offer-placeholder.jpg'
  };
  
  return fallbacks[type] || fallbacks.food;
};

// Custom hook for image loading with fallback
export const useImageLoader = (src, fallbackType = 'food') => {
  const [imageSrc, setImageSrc] = useState(getImageUrl(src));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      setIsLoading(false);
      setError(null);
    };

    img.onerror = () => {
      setError(new Error('Failed to load image'));
      setImageSrc(getImageFallback(fallbackType));
      setIsLoading(false);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageSrc, fallbackType]);

  return { imageSrc, isLoading, error };
};

// Image dimensions for different types
export const IMAGE_DIMENSIONS = {
  menu: { width: 800, height: 600 },
  hero: { width: 1920, height: 1080 },
  square: { width: 400, height: 400 },
  thumbnail: { width: 200, height: 200 },
  offer: { width: 600, height: 400 }
};

// Image quality presets
export const IMAGE_QUALITY = {
  low: { quality: 60, width: 400 },
  medium: { quality: 80, width: 800 },
  high: { quality: 90, width: 1200 },
  original: { quality: 100, width: null }
}; 