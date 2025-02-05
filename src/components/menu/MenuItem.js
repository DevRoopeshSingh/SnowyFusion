import { useState } from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaFire } from "react-icons/fa";
import OptimizedImage from "../common/OptimizedImage";

const MenuItem = ({ item, onOrder }) => {
  const [selectedCustomizations, setSelectedCustomizations] = useState([]);

  const handleCustomizationChange = (option) => {
    setSelectedCustomizations((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleOrder = () => {
    onOrder({
      ...item,
      selectedCustomizations,
    });
    setSelectedCustomizations([]);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Image Section */}
      <div className="relative h-75">
        <OptimizedImage
          src={`/images/menu/${item.image}`}
          alt={item.name}
          type="menu"
          className="transition-transform hover:scale-105 object-cover w-full h-full"
        />
        {item.popular && (
          <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Popular
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-4">
        {/* Title and Price */}
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold dark:text-white">{item.name}</h3>
          <span className="text-blue-600 dark:text-blue-400 font-bold">
            ₹{item.price}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {item.description}
        </p>

        {/* Tags (Veg/Spicy/Prep Time) */}
        <div className="flex items-center gap-4">
          {item.isVegetarian && (
            <div className="flex items-center gap-1 text-sm text-green-600">
              <FaLeaf />
              <span>Veg</span>
            </div>
          )}
          {item.isSpicy && (
            <div className="flex items-center gap-1 text-sm text-red-600">
              <FaFire />
              <span>Spicy</span>
            </div>
          )}
          <div className="text-sm text-gray-500">{item.preparationTime}</div>
        </div>

        {/* Customizations */}
        {item.customizations?.length > 0 && (
          <div>
            <p className="text-sm font-medium">Customizations:</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {item.customizations.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleCustomizationChange(option)}
                  className={`text-xs px-2 py-1 rounded-full transition-colors ${
                    selectedCustomizations.includes(option)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                  }`}>
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={handleOrder}
          className="w-full btn-primary py-2 text-sm">
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

export default MenuItem;
