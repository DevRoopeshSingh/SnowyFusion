import Image from 'next/image';
import { useState } from 'react';

const OptimizedImage = ({ src, alt, type = 'default', className = '' }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Predefined sizes for different image types
  const sizes = {
    menu: { width: 400, height: 300 },
    thumbnail: { width: 100, height: 100 },
    default: { width: 300, height: 200 }
  };

  const { width, height } = sizes[type] || sizes.default;

  return (
    <div className="relative w-full h-full">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`
          duration-700 ease-in-out
          ${isLoading ? 'scale-110 blur-lg' : 'scale-100 blur-0'}
          ${className}
        `}
        onLoadingComplete={() => setIsLoading(false)}
        loading="lazy"
        quality={80}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse" />
      )}
    </div>
  );
};

export default OptimizedImage; 