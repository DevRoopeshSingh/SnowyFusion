import { motion } from 'framer-motion';
import Image from 'next/image';

const FeaturedItems = ({ items }) => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">Featured Treats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="glass-card p-6 dark:hover:bg-gray-800/60">
              <div className="relative h-72 mb-4">
                <Image
                  src={`/images/menu/${item.image}`}
                  alt={item.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {item.description}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {item.price}
                </span>
                <button className="btn-secondary text-sm px-4 py-2">
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