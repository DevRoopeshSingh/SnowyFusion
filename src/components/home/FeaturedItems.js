import { motion } from 'framer-motion';
import Image from 'next/image';

const FeaturedItems = ({ items }) => {
  return (
    <section
      className="py-16 bg-gradient-to-b from-white to-blue-100"
      aria-label="Featured Treats Section">
      <div className="container mx-auto px-4">
        <h2
          className="section-title text-center text-3xl font-bold text-gray-900 mb-12"
          role="heading">
          Featured Treats
        </h2>
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          role="list">
          {items.map((item, index) => (
            <motion.div
              key={item.id || index} // Use unique ID if available
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }} // Reduced delay for performance
              viewport={{ once: true }} // Animation triggers once per viewport
              className="glass-card p-4 md:p-6 rounded-lg shadow-md dark:bg-gray-800/20 dark:hover:bg-gray-800/30 transition-all duration-300">
              <div className="relative h-64 md:h-72 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={`/images/menu/${item.image}`}
                  alt={item.name}
                  fill
                  className="object-cover"
                  loading="lazy"
                  placeholder="blur" // Add blur placeholder for better UX
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgALtlaY8gAAAABJRU5ErkJggg==" // Base64 placeholder (replace with actual blur data)
                  onError={(e) => {
                    e.target.style.display = "none"; // Hide if image fails
                  }}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {item.name}
              </h3>
              <p className="text-gray-700 dark:text-gray-200 text-sm line-clamp-2">
                {item.description}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {item.price}
                </span>
                <button
                  className="btn-secondary bg-blue-600 text-white hover:bg-blue-700 focus:outline focus:outline-2 focus:outline-blue-600 px-4 py-2 rounded-md transition-colors duration-300"
                  aria-label={`Order ${item.name} now`}>
                  Order Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedItems;