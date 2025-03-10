import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { v4 as uuidv4 } from "uuid"; // For unique cart item IDs
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SnowEffect from "@/components/effects/SnowEffect";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import Loading from "@/components/common/Loading";
import CartDrawer from "@/components/cart/CartDrawer";
import QuickViewModal from "@/components/menu/QuickViewModal";
import SearchOverlay from "@/components/search/SearchOverlay";
import MenuSection from "@/components/menu/MenuSection";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ErrorComponent from "./ErrorComponent";
import { useCart } from "@/context/CartContext";
import HomeSection from "./HomeSection";

// Dynamic imports
const HeroSection = dynamic(() => import("@/components/home/HeroSection"), {
  ssr: false,
});
const FeaturedItems = dynamic(() => import("@/components/home/FeaturedItems"), {
  ssr: false,
});
const ContactSection = dynamic(
  () => import("@/components/contact/ContactSection"),
  { ssr: false }
);

export default function Home({ menuData, error }) {
  const [activeSection, setActiveSection] = useState("home");
  const { cart, addToCart, removeFromCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle menu navigation
  const handleMenuClick = useCallback(() => {
    setActiveSection("menu");
  }, []);

  // Add item to cart with unique ID
  const addToOrder = useCallback(
    (item, selectedCustomizations = []) => {
      addToCart({ ...item, cartId: uuidv4(), selectedCustomizations });
    },
    [addToCart]
  );

  // Handle quick view
  const openQuickView = useCallback((item) => {
    setSelectedItem(item);
    setIsQuickViewOpen(true);
  }, []);

  // Simulate initial loading (replace with real dynamic import tracking if needed)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Error handling
  if (error) {
    return <ErrorComponent error={error} />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <SnowEffect snowflakeCount={30} speed={10} />
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        cartCount={cart.length}
        onCartClick={() => setIsCartOpen(true)}
        onSearch={setSearchQuery}
        onSearchClick={() => setIsSearchOpen(true)}>
        <LanguageSwitcher />
      </Header>

      <main className="relative z-10">
        {activeSection === "home" && (
          // <section role="region" aria-label="Home Content">
          //   <HeroSection onMenuClick={handleMenuClick} />
          //   <SeasonalSpecials />
          //   <FeaturedItems
          //     items={menuData.categories
          //       .flatMap((category) => category.items)
          //       .filter((item) => item.popular)}
          //     onItemClick={openQuickView}
          //   />
          //   <SpecialOffers />
          //   <Testimonials />
          // </section>
          <HomeSection
            menuData={menuData}
            onMenuClick={handleMenuClick}
            onItemClick={openQuickView}
          />
        )}

        {activeSection === "menu" && menuData && (
          <section role="region" aria-label="Menu">
            <MenuSection
              menuData={menuData}
              addToOrder={addToOrder}
              searchQuery={searchQuery} // Pass search query to MenuSection
            />
          </section>
        )}

        {activeSection === "contact" && (
          <section role="region" aria-label="Contact">
            <ContactSection cartItems={cart} removeFromOrder={removeFromCart} />
          </section>
        )}
      </main>

      <WhatsAppButton />
      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemove={removeFromCart}
      />

      <QuickViewModal
        item={selectedItem}
        isOpen={isQuickViewOpen}
        onClose={() => {
          setIsQuickViewOpen(false);
          setSelectedItem(null);
        }}
        onAddToCart={addToCart}
      />

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        menuData={menuData}
        onSearch={setSearchQuery}
        onItemClick={openQuickView}
      />
    </div>
  );
}

export async function getStaticProps() {
  try {
    const menuData = await import("../../public/data/menu.json");
    const defaultMenuData = { categories: [] };

    const combinedMenuData = {
      categories: menuData.default
        .map((category) => {
          if (!category) return null;

          if (category.items) {
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
                isVegetarian: item.isVegetarian ?? false,
                isSpicy: item.isSpicy ?? false,
                popular: item.popular ?? false,
                calories: item.calories || "N/A",
                preparationTime: item.preparationTime || "5-10 mins",
                customizations: item.customizations || [],
              })),
            };
          } else {
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
                  isVegetarian: category.isVegetarian ?? false,
                  isSpicy: category.isSpicy ?? false,
                  popular: category.popular ?? false,
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

    return {
      props: {
        menuData: combinedMenuData || defaultMenuData,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error("Error loading menu data:", error.message);
    return {
      props: {
        menuData: { categories: [] },
        error: "Failed to load menu data. Please try again later.",
      },
    };
  }
}
