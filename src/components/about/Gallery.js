import { motion } from 'framer-motion';
import Image from 'next/image';

const galleryImages = [
  '/images/about/team1.jpg',
  '/images/about/team2.jpg',
  '/images/about/cafe1.jpg',
  '/images/about/cafe2.jpg',
  '/images/about/products1.jpg',
  '/images/about/products2.jpg',
];

const Gallery = () => {
  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 dark:text-white">Gallery</h2>
          <p className="text-gray-600 dark:text-gray-300">
            A glimpse into our world
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative h-64"
            >
              <Image
                src={src}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover rounded-lg"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery; 