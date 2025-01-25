// components/Footer.js
import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const Footer = ({ socialMediaLinks }) => {
  // Helper function to determine color based on icon type
  const getIconColor = (icon) => {
    switch (icon) {
      case "FaFacebookF":
        return "bg-blue-600";
      case "FaTwitter":
        return "bg-blue-400";
      case "FaInstagram":
        return "bg-gradient-to-r from-pink-500 to-purple-500";
      default:
        return "bg-gray-500"; // Default color if no match
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-8 px-4">
      <div className="container mx-auto">
        <div className="mt-12 text-center md:text-left">
          <div className="flex justify-center md:justify-start items-center space-x-2 text-lg mb-4">
            <FaMapMarkerAlt className="text-xl" aria-label="Location" />
            <span>Find us in Naigaon East</span>
          </div>
          <p className="text-sm text-gray-300 mb-2">
            <Link href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>{" "}
            |{" "}
            <Link href="/terms-of-service" className="hover:underline">
              Terms of Service
            </Link>
          </p>
          <p className="text-sm text-gray-300">
            © 2025 Snowy Fusion. All Rights Reserved
          </p>

          <div className="mt-10 mb-16 flex justify-center md:justify-start space-x-6 flex-wrap">
            {socialMediaLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className={`rounded-full p-2 ${getIconColor(link.icon)}`}
                aria-label={`Follow us on ${link.platform}`}
                title={link.platform}>
                {link.icon === "FaFacebookF" ? (
                  <FaFacebookF className="text-white" />
                ) : link.icon === "FaTwitter" ? (
                  <FaTwitter className="text-white" />
                ) : link.icon === "FaInstagram" ? (
                  <FaInstagram className="text-white" />
                ) : null}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
