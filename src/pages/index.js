import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SnowEffect from "@/components/effects/SnowEffect";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import Testimonials from "@/components/home/Testimonials";
import SeasonalSpecials from "@/components/home/SeasonalSpecials";
import SpecialOffers from "@/components/home/SpecialOffers";
import Loading from "@/components/common/Loading";
import CartDrawer from "@/components/cart/CartDrawer";
import QuickViewModal from "@/components/menu/QuickViewModal";
import SearchOverlay from "@/components/search/SearchOverlay";
import MenuSection from "@/components/menu/MenuSection";

// Dynamic imports
const HeroSection = dynamic(() => import("@/components/home/HeroSection"));
const Menu = dynamic(() => import("@/components/menu/Menu"));
const FeaturedItems = dynamic(() => import("@/components/home/FeaturedItems"));

// Dynamically import sections to avoid any potential SSR issues
const ContactSection = dynamic(() =>
  import("@/components/contact/ContactSection")
);

export default function Home({ menuData, error }) {
  const [activeSection, setActiveSection] = useState("home");
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMenu, setFilteredMenu] = useState(menuData);

  const handleMenuClick = useCallback(() => {
    setActiveSection("menu");
  }, []);

  const addToOrder = useCallback((item) => {
    setCartItems((prev) => [...prev, { ...item, id: Date.now() }]);
  }, []);

  const removeFromOrder = useCallback((itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  useEffect(() => {
    // Simulate loading time for dynamic imports
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredMenu(menuData);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = {
      categories: menuData.categories
        .map((category) => ({
          ...category,
          items: category.items.filter(
            (item) =>
              item.name.toLowerCase().includes(query) ||
              item.description.toLowerCase().includes(query)
          ),
        }))
        .filter((category) => category.items.length > 0),
    };

    setFilteredMenu(filtered);
  }, [searchQuery, menuData]);

  // Add error handling in the UI
  if (error) {
    return <div className="text-center p-8">Error: {error}</div>;
  }

  // Add loading indicator in the return statement
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <SnowEffect />
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        cartCount={cartItems.length}
        onCartClick={() => setIsCartOpen(true)}
        onSearch={setSearchQuery}
        onSearchClick={() => setIsSearchOpen(true)}
      />

      <main>
        {activeSection === "home" && (
          <>
            <HeroSection onMenuClick={handleMenuClick} />
            <SeasonalSpecials />
            <FeaturedItems
              items={
                (menuData?.categories || [])
                  .flatMap((category) => category?.items || [])
                  .filter((item) => item?.popular) || []
              }
            />
            <SpecialOffers />
            <Testimonials />
          </>
        )}

        {activeSection === "menu" && menuData && (
          <MenuSection menuData={menuData} addToOrder={addToOrder} />
        )}

        {activeSection === "contact" && (
          <ContactSection
            cartItems={cartItems}
            removeFromOrder={removeFromOrder}
          />
        )}
      </main>

      <WhatsAppButton />
      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={removeFromOrder}
      />

      <QuickViewModal
        item={selectedItem}
        isOpen={isQuickViewOpen}
        onClose={() => {
          setIsQuickViewOpen(false);
          setSelectedItem(null);
        }}
        onAddToCart={addToOrder}
      />

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        menuData={menuData}
      />
    </div>
  );
}

export async function getStaticProps() {
  try {
    const menuData = await import("../../public/data/menu.json");
    const defaultMenuData = {
      categories: [],
    };

    // Transform the array structure to categories
    const combinedMenuData = {
      categories: menuData.default
        .map((category) => {
          if (!category) return null;

          if (category.items) {
            // This is a category with nested items
            return {
              name: category.category || "Uncategorized",
              description: category.description || "",
              items: category.items.map((item) => ({
                ...item,
                id:
                  item.id ||
                  `${category.category || "item"}-${item.name || Date.now()}`
                    .toLowerCase()
                    .replace(/\s+/g, "-"),
                description: item.description || "",
                price: item.price || "₹0",
                image:
                  item.image || "/images/placeholders/food-placeholder.jpg",
                isVegetarian: item.isVegetarian || false,
                isSpicy: item.isSpicy || false,
                popular: item.popular || false,
                calories: item.calories || "N/A",
                preparationTime: item.preparationTime || "5-10 mins",
                customizations: item.customizations || [],
              })),
            };
          } else {
            // This is a category that is also an item
            return {
              name: category.category || "Menu",
              description: category.description || "",
              items: [
                {
                  id:
                    category.id ||
                    (category.name
                      ? category.name.toLowerCase().replace(/\s+/g, "-")
                      : `item-${Date.now()}`),
                  name: category.name || "Unnamed Item",
                  description: category.description || "",
                  price: category.price || "₹0",
                  image:
                    category.image ||
                    "/images/placeholders/food-placeholder.jpg",
                  isVegetarian: category.isVegetarian || false,
                  isSpicy: category.isSpicy || false,
                  popular: category.popular || false,
                  calories: category.calories || "N/A",
                  preparationTime: category.preparationTime || "5-10 mins",
                  customizations: category.customizations || [],
                },
              ],
            };
          }
        })
        .filter(Boolean)
        .filter((category) => category.items && category.items.length > 0),
    };

    // Ensure all values are serializable
    const serializedData = JSON.parse(JSON.stringify(combinedMenuData));

    console.log(
      "Transformed Menu Data:",
      JSON.stringify(serializedData, null, 2)
    );

    return {
      props: {
        menuData: serializedData || defaultMenuData,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Error loading menu data:", error);
    return {
      props: {
        menuData: {
          categories: [],
        },
        error: "Failed to load menu data",
      },
    };
  }
}
