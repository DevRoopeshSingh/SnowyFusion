import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaTimes, FaTrash } from 'react-icons/fa';
import Image from 'next/image';
import OptimizedImage from '../common/OptimizedImage';

const CartDrawer = ({ isOpen, onClose, items, onRemove }) => {
  const total = items.reduce((sum, item) => {
    const price =
      typeof item.price === "string"
        ? parseFloat(item.price.replace("₹", "").trim())
        : typeof item.price === "number"
        ? item.price
        : 0; // Default to 0 if price is invalid

    return sum + price;
  }, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold dark:text-white">Your Cart</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                >
                  <FaTimes className="text-gray-500" />
                </button>
              </div>

              {items.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">
                    Your cart is empty
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-4 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
                      >
                        <div className="relative w-16 h-16">
                          <OptimizedImage
                            src={`/images/menu/${item.image}`}
                            alt={item.name}
                            type="thumbnail"
                            className="rounded-md"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-medium dark:text-white">
                            {item.name}
                          </h3>
                          <p className="text-blue-600 dark:text-blue-400">
                            {item.price}
                          </p>
                          {item.selectedCustomizations?.length > 0 && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {item.selectedCustomizations.join(', ')}
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => onRemove(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                        >
                          <FaTrash />
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  <div className="border-t dark:border-gray-700 pt-4">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span className="dark:text-white">Total</span>
                      <span className="text-blue-600 dark:text-blue-400">
                        ₹{total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button className="w-full btn-primary py-3 mt-6">
                    Proceed to Checkout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer; 