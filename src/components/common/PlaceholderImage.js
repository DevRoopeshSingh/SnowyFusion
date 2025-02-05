const PlaceholderImage = ({ width, height, text }) => {
  return (
    <div 
      className="bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center"
      style={{ width, height }}
    >
      <span className="text-gray-500 dark:text-gray-400 text-sm text-center px-4">
        {text || 'Image placeholder'}
      </span>
    </div>
  );
};

export default PlaceholderImage; 