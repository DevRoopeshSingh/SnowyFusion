import Link from "next/link";

export default function Header({ activeSection, setActiveSection, cartCount }) {
  const navItems = ["home", "menu", "contact"];

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold gradient-text">
            Snowy Fusion
          </h1>
          
          <div className="flex gap-6 items-center">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveSection(item)}
                className={`capitalize transition-colors ${
                  activeSection === item
                    ? "text-blue-600 dark:text-blue-400 font-semibold"
                    : "text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                }`}
              >
                {item}
              </button>
            ))}
            {cartCount > 0 && (
              <span className="bg-gradient-to-r from-blue-600 to-teal-400 
                             dark:from-blue-500 dark:to-teal-400 
                             text-white px-3 py-1 rounded-full text-sm">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
} 