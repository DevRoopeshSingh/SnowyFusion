const Header = ({ activeSection, setActiveSection, cartCount }) => (
  <nav className="sticky top-0 bg-white shadow-sm">
    <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between">
      <button
        onClick={() => setActiveSection("home")}
        className={activeSection === "home" ? "text-blue-600" : ""}>
        Home
      </button>
      <button
        onClick={() => setActiveSection("menu")}
        className={activeSection === "menu" ? "text-blue-600" : ""}>
        Menu
      </button>
      <button
        onClick={() => setActiveSection("contact")}
        className={`relative ${
          activeSection === "contact" ? "text-blue-600" : ""
        }`}>
        Order ({cartCount})
      </button>
    </div>
  </nav>
);

export default Header;
