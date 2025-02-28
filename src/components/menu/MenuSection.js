import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaFilter,
  FaThLarge,
  FaList,
  FaChevronUp,
} from "react-icons/fa";
import api from "@/utils/api";
import Menu from "./Menu"; // Assumes this renders items with customizations
import FiltersModal from "./FiltersModal";
import { sanitizeInput, validateSearchQuery } from "@/utils/security";
import { event, ecommerceEvent } from "@/utils/analytics";

// Constants
const DEBOUNCE_DELAY = 300;
const SCROLL_TOP_THRESHOLD = 500;
const MAX_PRICE = 90; // Matches highest price in data

// Custom debounce hook
const useDebounce = (callback, delay) => {
  const timeoutRef = useRef(null);
  return (...args) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => callback(...args), delay);
  };
};

// Category Navigation Component
const CategoryNav = ({ categories, activeCategory, setActiveCategory }) => (
  <nav
    className="lg:hidden overflow-x-auto sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm"
    role="navigation"
    aria-label="Menu Categories">
    <div className="flex p-4 space-x-3">
      <button
        onClick={() => setActiveCategory("all")}
        className={`px-4 py-3 rounded-full whitespace-nowrap transition-colors ${
          activeCategory === "all"
            ? "bg-primary-500 text-white"
            : "bg-gray-100 dark:bg-gray-800"
        }`}
        aria-pressed={activeCategory === "all"}>
        All Items
      </button>
      {categories.map((category) => (
        <button
          key={category.name}
          onClick={() => setActiveCategory(category.name)}
          className={`px-4 py-3 rounded-full whitespace-nowrap transition-colors ${
            activeCategory === category.name
              ? "bg-primary-500 text-white"
              : "bg-gray-100 dark:bg-gray-800"
          }`}
          aria-pressed={activeCategory === category.name}>
          {category.name}
        </button>
      ))}
    </div>
  </nav>
);

// Filter Controls Component (Desktop Sidebar)
const FilterControls = ({
  filters,
  setFilters,
  viewMode,
  setViewMode,
  categories,
}) => (
  <aside
    className="hidden lg:block w-64 shrink-0 sticky top-24 self-start h-[calc(100vh-6rem)] overflow-y-auto p-4"
    role="complementary"
    aria-label="Menu filters and categories">
    <div className="space-y-6">
      <nav className="space-y-2">
        {categories.map((category) => (
          <a
            key={category.name}
            href={`#${category.name.toLowerCase().replace(/\s+/g, "-")}`}
            className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            {category.name}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        <div className="flex rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded ${
              viewMode === "grid"
                ? "bg-white dark:bg-gray-700 shadow-sm"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            aria-label="Grid view">
            <FaThLarge />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded ${
              viewMode === "list"
                ? "bg-white dark:bg-gray-700 shadow-sm"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            aria-label="List view">
            <FaList />
          </button>
        </div>
        {Object.entries(filters).map(([key, value]) => (
          <button
            key={key}
            onClick={() => setFilters((prev) => ({ ...prev, [key]: !value }))}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              value
                ? "bg-primary-500 text-white"
                : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}>
            <FaFilter className="text-sm" />
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>
    </div>
  </aside>
);

// Main MenuSection Component
const MenuSection = ({ menuData, addToOrder }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    vegetarian: false,
    spicy: false,
    popular: false,
  });
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("name");
  const [isLoading, setIsLoading] = useState(false);
  const [priceRange, setPriceRange] = useState([0, MAX_PRICE]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const filterButtonRef = useRef(null);

  // Scroll handling
  useEffect(() => {
    const handleScroll = () =>
      setShowScrollTop(window.scrollY > SCROLL_TOP_THRESHOLD);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Debounced search
  const debouncedSearch = useDebounce((value) => {
    const sanitizedValue = sanitizeInput(value);
    if (validateSearchQuery(sanitizedValue)) {
      setSearchQuery(sanitizedValue);
      event({ action: "search", category: "Menu", label: sanitizedValue });
    }
  }, DEBOUNCE_DELAY);

  // Memoized filtered and sorted menu
  const filteredMenu = useMemo(() => {
    return {
      categories: menuData.categories
        .filter((category) => category.name !== "Menu") // Exclude placeholder category
        .map((category) => ({
          ...category,
          items: category.items
            .filter((item) => {
              const matchesSearch =
                searchQuery === "" ||
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase());
              const matchesCategory =
                activeCategory === "all" || category.name === activeCategory;
              const matchesFilters =
                (!filters.vegetarian || item.isVegetarian) &&
                (!filters.spicy || item.isSpicy) &&
                (!filters.popular || item.popular);
              const itemPrice = parseFloat(item.price.replace("₹", "")) || 0;
              const matchesPrice =
                itemPrice >= priceRange[0] && itemPrice <= priceRange[1];
              return (
                matchesSearch &&
                matchesCategory &&
                matchesFilters &&
                matchesPrice
              );
            })
            .sort((a, b) => {
              switch (sortBy) {
                case "price":
                  return (
                    parseFloat(a.price.replace("₹", "")) -
                    parseFloat(b.price.replace("₹", ""))
                  );
                case "popular":
                  return b.popular - a.popular;
                case "calories":
                  return (
                    parseFloat(a.calories || 0) - parseFloat(b.calories || 0)
                  );
                default:
                  return a.name.localeCompare(b.name);
              }
            }),
        }))
        .filter((category) => category.items.length > 0),
    };
  }, [menuData, searchQuery, activeCategory, filters, priceRange, sortBy]);

  // Secure order handling with customizations
  const handleSecureOrder = async (item, selectedCustomizations = []) => {
    try {
      const orderItem = { ...item, selectedCustomizations };
      const response = await api.post("/api/verify-item", {
        itemId: item.id,
        price: item.price,
        customizations: selectedCustomizations,
      });
      if (response.data.verified) {
        addToOrder(orderItem);
        ecommerceEvent.addToCart(orderItem);
      } else {
        console.error("Item verification failed");
      }
    } catch (error) {
      console.error("Error verifying item:", error);
    }
  };

  // Filter application
  const handleFilter = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500)); // Placeholder async logic
    setIsLoading(false);
  };

  return (
    <div
      className="flex flex-col lg:flex-row"
      role="region"
      aria-label="Menu Section">
      <CategoryNav
        categories={menuData.categories}
        activeCategory={activeCategory}
        setActiveCategory={(category) => {
          setActiveCategory(category);
          event({
            action: "select_category",
            category: "Menu",
            label: category,
          });
        }}
      />

      {/* Mobile Action Buttons */}
      <div
        className="lg:hidden fixed bottom-4 right-4 z-50 flex flex-col gap-3"
        role="complementary"
        aria-label="Menu Actions">
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-white dark:bg-gray-800 p-4 rounded-full shadow-lg"
              aria-label="Scroll to top">
              <FaChevronUp className="text-primary-500" />
            </motion.button>
          )}
        </AnimatePresence>
        <button
          ref={filterButtonRef}
          onClick={() => setIsMobileFiltersOpen(true)}
          className="bg-primary-500 text-white p-4 rounded-full shadow-lg"
          aria-label="Open filters"
          aria-expanded={isMobileFiltersOpen}>
          <FaFilter />
        </button>
      </div>

      {/* Mobile Search Bar */}
      <div className="lg:hidden sticky top-[72px] z-40 bg-white dark:bg-gray-900 px-4 py-2">
        <div className="relative">
          <FaSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search ice creams & beverages..."
            value={searchQuery}
            onChange={(e) => debouncedSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-primary-500"
            aria-label="Search menu items"
          />
        </div>
      </div>

      {/* Filters Modal */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <FiltersModal
            filters={filters}
            setFilters={setFilters}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onClose={() => {
              setIsMobileFiltersOpen(false);
              filterButtonRef.current?.focus();
            }}
            onApply={handleFilter}
          />
        )}
      </AnimatePresence>

      <FilterControls
        filters={filters}
        setFilters={setFilters}
        viewMode={viewMode}
        setViewMode={setViewMode}
        categories={menuData.categories}
      />

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {isLoading ? (
          <div
            className="flex items-center justify-center py-12"
            role="status"
            aria-label="Loading menu items">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
            <span className="sr-only">Loading...</span>
          </div>
        ) : filteredMenu.categories.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-500 dark:text-gray-400"
            role="status">
            No items found matching your criteria
          </motion.div>
        ) : (
          <div role="feed" aria-label="Menu items">
            {filteredMenu.categories.map((category) => (
              <div
                key={category.name}
                data-category={category.name}
                className="mb-12">
                <Menu
                  name={category.name}
                  description={category.description}
                  items={category.items}
                  addToOrder={handleSecureOrder}
                  viewMode={viewMode}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MenuSection;
