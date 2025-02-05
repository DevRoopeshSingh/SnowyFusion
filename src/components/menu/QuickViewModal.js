import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FaTimes, FaLeaf, FaFire, FaClock, FaInfoCircle } from 'react-icons/fa';

const QuickViewModal = ({ item, isOpen, onClose, onAddToCart }) => {
  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
              <div className="relative h-64">
                <Image
                  src={`/images/menu/${item.image}`}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-gray-900/80 rounded-full hover:bg-white dark:hover:bg-gray-900"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 dark:text-white">
                  {item.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {item.description}
                </p>

                {/* Item Details */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <FaLeaf className={item.isVegetarian ? "text-green-500" : "text-gray-400"} />
                    <span className="dark:text-gray-300">
                      {item.isVegetarian ? "Vegetarian" : "Non-Vegetarian"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FaFire className={item.isSpicy ? "text-red-500" : "text-gray-400"} />
                    <span className="dark:text-gray-300">
                      {item.isSpicy ? "Spicy" : "Non-Spicy"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FaClock className="text-blue-500" />
                    <span className="dark:text-gray-300">{item.preparationTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FaInfoCircle className="text-blue-500" />
                    <span className="dark:text-gray-300">{item.calories} cal</span>
                  </div>
                </div>

                {/* Customizations */}
                {item.customizations && (
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2 dark:text-white">Customizations</h3>
                    <div className="flex flex-wrap gap-2">
                      {item.customizations.map((custom, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm dark:text-gray-300"
                        >
                          {custom}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Price</span>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {item.price}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onAddToCart(item);
                      onClose();
                    }}
                    className="btn-primary"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuickViewModal; 