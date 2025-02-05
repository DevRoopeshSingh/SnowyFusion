import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import Image from 'next/image';

const SearchOverlay = ({ isOpen, onClose, menuData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const allItems = menuData.flatMap(category => 
      category.items.map(item => ({
        ...item,
        category: category.category
      }))
    );

    const filtered = allItems.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setResults(filtered);
  }, [searchQuery, menuData]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-50"
        >
          <div className="container mx-auto px-4 py-20 max-w-4xl">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg focus:ring-2 focus:ring-blue-500 outline-none"
                autoFocus
              />
              <button
                onClick={onClose}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              >
                <FaTimes />
              </button>
            </div>

            {/* Results */}
            <div className="mt-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg max-h-[60vh] overflow-y-auto">
              {results.length > 0 ? (
                <div className="divide-y dark:divide-gray-800">
                  {results.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <div className="relative w-16 h-16">
                        <Image
                          src={`/images/menu/${item.image}`}
                          alt={item.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold dark:text-white">{item.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.category}
                        </p>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold">
                          {item.price}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : searchQuery ? (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  No items found matching "{searchQuery}"
                </div>
              ) : null}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay; 