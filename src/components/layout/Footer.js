import { FaInstagram, FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div>
            <h3 className="text-xl font-bold gradient-text mb-4">
              Snowy Fusion
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Dive into a world of flavors with Snowy Fusion! From icy delights
              to sizzling snacks, we blend tradition with innovation to deliver
              an unforgettable culinary experience.
            </p>
            <div className="flex gap-4">
              {[FaInstagram, FaFacebook, FaTwitter, FaWhatsapp].map((Icon) => (
                <Link
                  key={Icon.displayName}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                  aria-label={`Follow us on ${Icon.displayName}`}>
                  <Icon className="text-xl" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 dark:text-white">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {["Menu", "About Us", "Contact", "Franchise", "Blog"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4 dark:text-white">
              Contact Us
            </h4>
            <address className="not-italic text-gray-600 dark:text-gray-400 space-y-2">
              <p>Snowy Fusion HQ</p>
              <p>
                Shop No. 9, Parasnath Nagari Building-1, near Seven Square
                Academy School, Naigaon East
              </p>
              <p> Vasai-Virar, Mumbai, Maharashtra 400050</p>
              <p>Phone: +91 63942 49283</p>
              <p>Email: snowyfusionofficial@gmail.com</p>
            </address>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4 dark:text-white">
              Opening Hours
            </h4>
            <ul className="text-gray-600 dark:text-gray-400 space-y-2">
              <li>Monday - Friday: 10am - 10pm</li>
              <li>Saturday: 9am - 11pm</li>
              <li>Sunday: 9am - 9pm</li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center text-gray-600 dark:text-gray-400">
          <p>
            © 2025 Snowy Fusion. All rights reserved. Designed with ❤️ in India.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
