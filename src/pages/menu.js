// src/pages/menu.js
import { useState } from "react";
import { motion } from "framer-motion";
import Menu from "../components/Menu";

export default function MenuPage({ menuData }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter menu items based on search and category
  const filteredMenu = menuData.filter((category) => {
    if (selectedCategory !== "all" && category.category !== selectedCategory) {
      return false;
    }
    if (searchQuery) {
      return category.items.some(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Our Delightful Menu
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our fusion of flavors, from refreshing golas to delicious
            snacks
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-transparent outline-none"
            />
            <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}>
              All Items
            </button>
            {menuData.map((category) => (
              <button
                key={category.category}
                onClick={() => setSelectedCategory(category.category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === category.category
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}>
                {category.category}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredMenu.map((category) => (
            <Menu
              key={category.category}
              category={category.category}
              items={category.items}
            />
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredMenu.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No items found. Try adjusting your search or filters.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export async function getStaticProps() {
  const menuData = require("../../public/data/menu.json");
  return {
    props: {
      menuData,
    },
  };
}
