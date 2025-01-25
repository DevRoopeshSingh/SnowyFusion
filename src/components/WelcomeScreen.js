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

  const menuItems = ["Menu", "About", "Contact"];

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

        <ul className="hidden md:flex space-x-6 text-white text-lg">
          {menuItems.map((item) => (
            <li key={item} className="cursor-pointer hover:underline">
              <Link href={`/${item.toLowerCase()}`}>{item}</Link>
            </li>
          ))}
        </ul>

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
                    key={item}
                    className="px-4 py-2 text-white hover:bg-teal-700">
                    <Link href={`/${item.toLowerCase()}`}>{item}</Link>
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
const WelcomePage = ({ menuCategories }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Reduced from 1000ms to 500ms for quicker feedback
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Snowy Fusion | Fusion of Flavors</title>
        <meta
          name="description"
          content="Explore a fusion of delightful flavors including Golas, Wraps, and Waffles."
        />
        <meta property="og:title" content="Snowy Fusion | Fusion of Flavors" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/hero1.jpg" />
        <meta property="og:url" content="your-site-url.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Restaurant",
              "name": "Snowy Fusion",
              "image": "/images/hero1.jpg",
              "telephone": "your-phone-number",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Your Street Address",
                "addressLocality": "Your City",
                "addressRegion": "Your State",
                "postalCode": "Your Postal Code",
                "addressCountry": "Your Country"
              }
            }
          `}
        </script>
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-red-400 to-teal-400 text-white">
        <Navbar />
        <HeroSlider />
        <section className="container mx-auto my-10 px-4">
          <motion.h2
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-8">
            Explore Our Menu
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
        <Newsletter />
      </div>
    </>
  );
};
WelcomePage.displayName = "WelcomePage";

export default WelcomePage;
