import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX, FiShoppingCart } from "react-icons/fi";

export default function Header({ activeSection, setActiveSection, cartCount }) {
  const navItems = ["home", "menu", "contact"];
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600 dark:text-teal-400">
          Snowy Fusion
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 items-center">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveSection(item)}
              className={`capitalize transition-colors text-lg font-medium px-3 py-2 rounded-lg ${
                activeSection === item
                  ? "text-blue-600 dark:text-teal-400 underline font-semibold bg-blue-100 dark:bg-teal-800"
                  : "text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-teal-400"
              }`}>
              {item}
            </button>
          ))}

          {/* Cart Icon (Desktop) */}
          <button
            onClick={() => setActiveSection("cart")}
            className="relative"
            aria-label="Open cart">
            <FiShoppingCart className="text-2xl text-gray-700 dark:text-gray-300" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Navigation Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          aria-label={isMobileNavOpen ? "Close menu" : "Open menu"}>
          {isMobileNavOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMobileNavOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 py-4 px-6 shadow-lg transition-opacity duration-300 opacity-100">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => {
                setActiveSection(item);
                setIsMobileNavOpen(false);
              }}
              className="block w-full text-left py-2 capitalize text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-teal-400">
              {item}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}