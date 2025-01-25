// src/components/Menu.js
import { motion } from "framer-motion";
import MenuItem from "@/components/MenuItem";

const Menu = ({ category, items }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      {/* Category Header with Icon */}
      <div className="flex items-center gap-3 mb-6 border-b pb-4">
        <span className="text-3xl transform hover:scale-110 transition-transform cursor-default">
          {category.split(" ")[0]}
        </span>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {category.split(" ").slice(1).join(" ")}
          </h2>
          <p className="text-sm text-gray-500">
            {items.length} items •{" "}
            {items.filter((item) => item.isVegetarian).length} vegetarian
          </p>
        </div>
      </div>

      {/* Menu Items Grid with Better Spacing */}
      <div className="grid gap-8">
        {items.map((item, index) => (
          <motion.div
            key={item.name}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className={`${
              index !== items.length - 1 ? "border-b border-gray-100" : ""
            } pb-6 last:pb-0`}>
            <MenuItem item={item} />
          </motion.div>
        ))}
      </div>

      {/* Popular Items Section with Better Styling */}
      {items.some((item) => item.popular) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 pt-4 border-t border-gray-100 bg-gradient-to-r from-yellow-50 to-transparent p-3 rounded-lg">
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <span className="text-lg">⭐</span>
            <span className="font-medium">
              Popular picks from {category.split(" ").slice(1).join(" ")}
            </span>
          </p>
        </motion.div>
      )}

      {/* Quick Actions */}
      <div className="mt-6 flex justify-end gap-3">
        <button
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          Back to top ↑
        </button>
      </div>
    </motion.div>
  );
};

export default Menu;
