import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaPhone,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaClock,
  FaEnvelope,
} from "react-icons/fa";
import ContactForm from "./ContactForm";
import OrderSummary from "./OrderSummary";
import dynamic from "next/dynamic";
import DeliveryArea from "./DeliveryArea";

// Dynamically import MapSection to avoid SSR issues with Google Maps
const MapSection = dynamic(() => import("./MapSection"), {
  ssr: false,
  loading: () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="w-full h-[400px] flex items-center justify-center">
        <span className="text-gray-500">Loading map...</span>
      </div>
    </div>
  ),
});

const ContactSection = ({ cartItems, removeFromOrder }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: <FaPhone className="text-blue-500" />,
      title: "Phone",
      details: "+91 63942 49283",
      action: "tel:+916394249283",
    },
    {
      icon: <FaWhatsapp className="text-green-500" />,
      title: "WhatsApp",
      details: "+91 63942 49283",
      action: "https://wa.me/916394249283",
    },
    {
      icon: <FaMapMarkerAlt className="text-red-500" />,
      title: "Location",
      details:
        "Shop No. 9, Parasnath Nagari Building-1, near Seven Square Academy School, Naigaon East, Vasai-Virar, Maharashtra 401208",
      action: "https://maps.google.com/?q=SnowFusion",
    },
    {
      icon: <FaClock className="text-purple-500" />,
      title: "Hours",
      details: "Mon-Sun: 10 AM - 09 PM",
    },
    {
      icon: <FaEnvelope className="text-yellow-500" />,
      title: "Email",
      details: "snowyfusionofficial@gmail.com",
      action: "mailto:snowyfusionofficial@gmail.com",
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6 dark:text-white">
                Contact Information
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-medium dark:text-white">
                        {info.title}
                      </h3>
                      {info.action ? (
                        <a
                          href={info.action}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline">
                          {info.details}
                        </a>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-400">
                          {info.details}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {cartItems.length > 0 && (
              <OrderSummary items={cartItems} onRemoveItem={removeFromOrder} />
            )}

            <DeliveryArea />
          </div>

          {/* Contact Form */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12">
                  <div className="text-green-500 text-5xl mb-4">✓</div>
                  <h3 className="text-2xl font-semibold mb-2 dark:text-white">
                    Thank You!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    We've received your message and will get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <ContactForm
                  onSubmitSuccess={() => setFormSubmitted(true)}
                  hasOrder={cartItems.length > 0}
                />
              )}
            </div>

            <MapSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
