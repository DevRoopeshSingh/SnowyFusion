import { motion } from 'framer-motion';
import { FaTimes, FaFilter } from 'react-icons/fa';

const FiltersModal = ({
  filters,
  setFilters,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
  onClose,
  onApply
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Filters</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <FaTimes />
          </button>
        </div>

        {/* Mobile Filters Content */}
        <div className="space-y-4">
          {/* Price Range */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Price Range</label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                className="w-full accent-primary-500"
              />
              <span className="min-w-[80px] text-right">
                ₹{priceRange[0]} - ₹{priceRange[1]}
              </span>
            </div>
          </div>

          {/* Filter Options */}
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(filters).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setFilters(prev => ({ ...prev, [key]: !value }))}
                className={`p-3 rounded-lg flex items-center justify-center gap-2 ${
                  value
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}
              >
                <FaFilter className="text-sm" />
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>

          {/* Sort Options */}
          <div>
            <label className="text-sm font-medium block mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-3 rounded-lg border dark:border-gray-700 dark:bg-gray-700"
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="popular">Popularity</option>
            </select>
          </div>
        </div>

        {/* Apply Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            onApply();
            onClose();
          }}
          className="w-full mt-6 bg-primary-500 text-white py-4 rounded-xl text-lg font-medium"
        >
          Apply Filters
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default FiltersModal; 