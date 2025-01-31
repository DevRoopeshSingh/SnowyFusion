import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";


// Newsletter subscription component
const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!email.includes("@")) {
      setStatus("Please enter a valid email address.");
      setIsSubmitting(false);
      return; 
    }
    // Here you would typically send this to your backend.
    // For this example, we'll just simulate a delay.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus("Subscribed! Thank you.");
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 my-10">
      <h3 className="text-2xl font-bold mb-4">Stay Updated!</h3>
      <p className="mb-4">
        Subscribe for special offers and new flavor alerts!
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className={`flex-1 px-4 py-2 rounded-lg text-black ${
            status
              ? status.includes("Please")
                ? "border-red-500"
                : "border-green-500"
              : ""
          }`}
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-teal-600 px-6 py-2 rounded-lg hover:bg-teal-700 disabled:opacity-50">
          {isSubmitting ? "Submitting..." : "Subscribe"}
        </button>
      </form>
      {status && (
        <p
          className={`mt-2 text-sm ${
            status.includes("Please") ? "text-red-500" : "text-green-500"
          }`}>
          {status}
        </p>
      )}
    </div>
  );
};

// Navbar with mobile menu and scroll effect
const Navbar = React.memo(() => {
  const [scrolling, setScrolling] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolling(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Define navigation items with proper paths
  const menuItems = [
    { name: "Menu", path: "/menu" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // Close mobile menu when navigating
  const handleNavigation = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 p-4 transition-all duration-300 ${
        scrolling ? "bg-teal-600 shadow-lg" : "bg-transparent"
      }`}>
      <nav className="flex justify-between items-center max-w-6xl mx-auto">
        <Link href="/" aria-label="Navigate to Snowy Fusion homepage">
          <h1 className="text-white text-2xl font-bold cursor-pointer">
            Snowy Fusion
          </h1>
        </Link>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 text-white text-lg">
          {menuItems.map((item) => (
            <li key={item.name} className="hover:underline">
              <Link
                href={item.path}
                className="px-3 py-2 transition-colors hover:text-teal-200">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-teal-600 md:hidden">
              <ul className="py-2">
                {menuItems.map((item) => (
                  <li
                    key={item.name}
                    className="px-4 py-2 hover:bg-teal-700 transition-colors">
                    <Link
                      href={item.path}
                      onClick={handleNavigation}
                      className="block w-full">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
});
Navbar.displayName = "Navbar";

// Hero slider for homepage
const HeroSlider = () => {
  const images = [
    "/images/hero1.jpg",
    "/images/hero2.jpg",
    "/images/hero3.jpg",
  ];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      className="relative h-screen bg-cover bg-center transition-all duration-500"
      style={{ backgroundImage: `url(${images[currentImage]})` }}>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70"></div>
      <div className="relative z-10 text-center text-white flex flex-col items-center justify-center h-screen px-4">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-4xl sm:text-3xl font-bold mb-4 text-shadow-md">
          Welcome to Snowy Fusion
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-lg sm:text-base">
          Discover the fusion of flavors with our Golas, Wraps, Waffles, and
          more!
        </motion.p>
      </div>
    </div>
  );
};

// Menu card component for displaying menu items
const MenuCard = ({ category, index }) => (
  <motion.div
    key={category.name}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-white text-black rounded-lg shadow-md overflow-hidden hover:shadow-lg transform transition-all duration-300"
    whileHover={{ scale: 1.03 }}>
    <div className="relative h-48">
      <Image
        src={category.image}
        alt={`Image of ${category.name}`}
        layout="fill"
        objectFit="cover"
        priority={index < 3}
      />
      {category.popular && (
        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
          Popular
        </div>
      )}
    </div>
    <div className="p-4">
      <div className="flex flex-wrap gap-2 mb-2">
        {category.badges?.map((badge) => (
          <span
            key={badge}
            className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">
            {badge}
          </span>
        ))}
      </div>
      <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
      <p className="text-gray-700 mb-4">{category.description}</p>
      <div className="flex justify-between items-center">
        <p className="text-teal-600 font-bold">{category.price}</p>
        <p className="text-sm text-gray-500">{category.availableTime}</p>
      </div>
      <p className="text-xs text-gray-400 mt-2">
        Prep time: {category.preparationTime}
      </p>
    </div>
  </motion.div>
);

// Main Welcome Page Component
const WelcomePage = ({ onContinue, menuCategories }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Snowy Fusion | Fusion of Flavors</title>
        <meta
          name="description"
          content="Located in Naigaon East's heart, Snowy Fusion serves ice golas, waffles, wraps, momos, burgers, and boba tea. Experience traditional favorites with modern twists."
        />
        <meta
          property="og:title"
          content="Snowy Fusion | Your Craving, Our Fusion"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/hero1.jpg" />
        <meta property="og:url" content="https://snowyfusion.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {`
              {
                "@context": "https://schema.org",
                "@type": "Restaurant",
                "name": "Snowy Fusion",
                "description": "Blending traditional favorites with modern twists in Naigaon East",
                "image": "/images/hero1.jpg",
                "telephone": "+91 73024 66350",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Shop No. 5, Naigaon East Main Road",
                  "addressLocality": "Naigaon East",
                  "addressRegion": "Maharashtra",
                  "postalCode": "401208",
                  "addressCountry": "India"
                },
                "servesCuisine": ["Ice Golas", "Waffles", "Wraps", "Momo", "Burgers", "Boba Tea"],
                "openingHours": "Mo-Su 11:00-23:00"
              }
            `}
        </script>
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-red-400 to-teal-400 text-white">
        <Navbar />
        <HeroSlider />

        {/* Fixed Explore Now Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-8 left-0 right-0 text-center z-50">
          <button
            onClick={onContinue}
            className="bg-white/20 backdrop-blur-lg px-8 py-3 rounded-full 
                       text-lg font-semibold hover:bg-white/30 transition-all
                       flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl">
            Explore Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </motion.div>

        {/* Menu Section */}
        <section className="container mx-auto my-10 px-4 relative pt-16">
          <motion.h2
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-8">
            Explore Our Fusion Menu
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="col-span-full text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block w-8 h-8 border-4 border-white rounded-full border-t-transparent"
                />
              </div>
            ) : (
              menuCategories?.map((category, index) => (
                <MenuCard
                  key={category.name}
                  category={category}
                  index={index}
                />
              ))
            )}
          </div>
        </section>

        {/* About Section */}
        <section className="container mx-auto my-16 px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lg max-w-2xl mx-auto">
              At Snowy Fusion, we bring together the finest flavors to satisfy
              your cravings. Located in Naigaon East's heart, we serve a
              delightful range of ice golas, waffles, wraps, momos, burgers, and
              refreshing boba tea. Our menu blends traditional favorites with
              modern twists, ensuring a unique culinary experience for every
              visitor.
            </p>
          </motion.div>
        </section>

        <Newsletter />
      </div>
    </>
  );
};

export default WelcomePage;
