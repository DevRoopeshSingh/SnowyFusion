import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaThLarge, FaList, FaChevronDown, FaTimes, FaChevronUp } from 'react-icons/fa';
import api from '@/utils/api';
import Menu from './Menu';
import FiltersModal from './FiltersModal';
import { sanitizeInput, validateSearchQuery } from '@/utils/security';
import { event, ecommerceEvent } from '@/utils/analytics';

const MenuSection = ({ menuData, addToOrder }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    vegetarian: false,
    spicy: false,
    popular: false,
  });
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const [isLoading, setIsLoading] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategoryScroll, setActiveCategoryScroll] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const searchTimeout = useRef(null);

  // Handle scroll for sticky header and scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Memoize filtered menu to prevent unnecessary recalculations
  const filteredMenu = useMemo(() => {
    return {
      categories: menuData.categories
        .map(category => ({
          ...category,
          items: category.items.filter(item => {
            const matchesSearch = 
              searchQuery === '' ||
              item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.description.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory = 
              activeCategory === 'all' || 
              category.name === activeCategory;

            const matchesFilters = 
              (!filters.vegetarian || item.isVegetarian) &&
              (!filters.spicy || item.isSpicy) &&
              (!filters.popular || item.popular);

            return matchesSearch && matchesCategory && matchesFilters;
          })
        }))
        .filter(category => category.items.length > 0)
    };
  }, [menuData, searchQuery, activeCategory, filters, priceRange]);

  // Debounce search input
  const debouncedSearch = useCallback((value) => {
    const sanitizedValue = sanitizeInput(value);
    if (!validateSearchQuery(sanitizedValue)) {
      console.error('Invalid search query');
      return;
    }
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    searchTimeout.current = setTimeout(() => {
      setSearchQuery(sanitizedValue);
      // Track search event
      event({
        action: 'search',
        category: 'Menu',
        label: sanitizedValue
      });
    }, 300);
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const category = entry.target.dataset.category;
            setActiveCategoryScroll(category);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-category]').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [filteredMenu]);

  const sortedMenu = {
    categories: filteredMenu.categories.map(category => ({
      ...category,
      items: [...category.items].sort((a, b) => {
        switch (sortBy) {
          case 'price':
            return parseFloat(a.price.replace('₹', '')) - parseFloat(b.price.replace('₹', ''));
          case 'popular':
            return b.popular - a.popular;
          default:
            return a.name.localeCompare(b.name);
        }
      })
    }))
  };

  const handleFilter = async () => {
    setIsLoading(true);
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsLoading(false);
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  // Add keyboard navigation support
  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  // Track category changes
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    event({
      action: 'select_category',
      category: 'Menu',
      label: category
    });
  };

  // Secure order handling
  const handleSecureOrder = async (item) => {
    try {
      // Verify item data before processing
      const response = await api.post('/api/verify-item', {
        itemId: item.id,
        price: item.price
      });
      
      if (response.data.verified) {
        addToOrder(item);
        // Track add to cart event
        ecommerceEvent.addToCart(item);
      } else {
        console.error('Item verification failed');
      }
    } catch (error) {
      console.error('Error verifying item:', error);
    }
  };

  return (
    <div 
      className="flex flex-col lg:flex-row"
      role="region"
      aria-label="Menu Section"
    >
      {/* Mobile Category Navigation */}
      <nav
        className="lg:hidden overflow-x-auto sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm"
        role="navigation"
        aria-label="Menu Categories"
      >
        <div className="flex p-4 space-x-3">
          <button
            onClick={() => setActiveCategory('all')}
            onKeyPress={(e) => handleKeyPress(e, () => setActiveCategory('all'))}
            className={`px-4 py-3 rounded-full whitespace-nowrap transition-colors ${
              activeCategory === 'all'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800'
            }`}
            aria-pressed={activeCategory === 'all'}
            aria-label="Show all menu items"
          >
            All Items
          </button>
          {menuData.categories.map(category => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              onKeyPress={(e) => handleKeyPress(e, () => setActiveCategory(category.name))}
              className={`px-4 py-3 rounded-full whitespace-nowrap transition-colors ${
                activeCategory === category.name
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800'
              }`}
              aria-pressed={activeCategory === category.name}
              aria-label={`Show ${category.name} menu items`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Action Buttons */}
      <div 
        className="lg:hidden fixed bottom-4 right-4 z-50 flex flex-col gap-3"
        role="complementary"
        aria-label="Menu Actions"
      >
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="bg-white dark:bg-gray-800 p-4 rounded-full shadow-lg"
            aria-label="Scroll to top of page"
          >
            <FaChevronUp className="text-primary-500" aria-hidden="true" />
          </motion.button>
        )}
        <button
          onClick={() => setIsMobileFiltersOpen(true)}
          className="bg-primary-500 text-white p-4 rounded-full shadow-lg"
          aria-label="Open filters menu"
          aria-expanded={isMobileFiltersOpen}
        >
          <FaFilter aria-hidden="true" />
        </button>
      </div>

      {/* Search Bar with ARIA */}
      <div className="lg:hidden sticky top-[72px] z-40 bg-white dark:bg-gray-900 px-4 py-2">
        <div className="relative">
          <label htmlFor="mobile-search" className="sr-only">
            Search menu items
          </label>
          <FaSearch 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
            aria-hidden="true"
          />
          <input
            id="mobile-search"
            type="search"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => debouncedSearch(e.target.value)}
            maxLength={50}
            pattern="[a-zA-Z0-9\s-]+"
            className="w-full pl-12 pr-4 py-3 rounded-full border dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 text-base"
            aria-label="Search menu items"
            onInvalid={(e) => e.target.setCustomValidity('Please use only letters, numbers, and hyphens')}
          />
        </div>
      </div>

      {/* Filters Modal with ARIA */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <FiltersModal
            filters={filters}
            setFilters={setFilters}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onClose={() => setIsMobileFiltersOpen(false)}
            onApply={handleFilter}
          />
        )}
      </AnimatePresence>

      {/* Desktop Sidebar with ARIA */}
      <aside
        className="hidden lg:block w-64 shrink-0 sticky top-24 self-start h-[calc(100vh-6rem)] overflow-y-auto p-4"
        role="complementary"
        aria-label="Menu filters and categories"
      >
        <div className="space-y-6">
          {/* Category Navigation */}
          <nav className="space-y-2">
            {menuData.categories.map(category => (
              <a
                key={category.name}
                href={`#${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="block px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {category.name}
              </a>
            ))}
          </nav>

          {/* Desktop Filters */}
          <div className="flex items-center gap-3">
            <div className="flex rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${
                  viewMode === 'grid' 
                    ? 'bg-white dark:bg-gray-700 shadow-sm' 
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <FaThLarge />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${
                  viewMode === 'list' 
                    ? 'bg-white dark:bg-gray-700 shadow-sm' 
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <FaList />
              </button>
            </div>
            {Object.entries(filters).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setFilters(prev => ({ ...prev, [key]: !value }))}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  value
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <FaFilter className="text-sm" />
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content with ARIA */}
      <main className="flex-1 min-w-0">
        {isLoading ? (
          <div 
            className="flex items-center justify-center py-12"
            role="status"
            aria-label="Loading menu items"
          >
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          filteredMenu.categories.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-gray-500 dark:text-gray-400"
              role="status"
            >
              No items found matching your criteria
            </motion.div>
          ) : (
            <div role="feed" aria-label="Menu items">
              {filteredMenu.categories.map((category) => (
                <div
                  key={category.name}
                  data-category={category.name}
                  className="mb-12"
                >
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
          )
        )}
      </main>
    </div>
  );
};

export default MenuSection; 