import { motion } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';
import OptimizedImage from '../common/OptimizedImage';

const OrderSummary = ({ items, onRemoveItem }) => {
  const total = items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('₹', ''));
    return sum + price;
  }, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
    >
      <h2 className="text-2xl font-semibold mb-6 dark:text-white">Your Order</h2>
      
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
              <h3 className="font-medium dark:text-white">{item.name}</h3>
              <p className="text-blue-600 dark:text-blue-400">{item.price}</p>
            </div>

            <button
              onClick={() => onRemoveItem(item.id)}
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
          <span className="text-blue-600 dark:text-blue-400">₹{total.toFixed(2)}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary; 