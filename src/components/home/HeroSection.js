import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import FloatingSnowflakes from '../effects/FloatingSnowflakes';

const HeroSection = ({ onMenuClick }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const stats = [
    { 
      number: '50+', 
      label: 'Flavors',
      icon: '🍧'
    },
    { 
      number: '1000+', 
      label: 'Happy Customers',
      icon: '😊'
    },
    { 
      number: '4.9', 
      label: 'Rating',
      icon: '⭐'
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <FloatingSnowflakes />
      
      {/* Background Layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white dark:from-gray-900/50 dark:to-gray-800" />
        <motion.div 
          className="absolute inset-0 bg-[url('/images/patterns/snow-pattern.png')] opacity-10"
          style={{ y, opacity }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              whileHover={{ scale: 1 }}
              className="mb-8"
            >
              <h1 className="text-6xl md:text-7xl font-bold mb-4">
                <span className="gradient-text">Snowy</span>
                <br />
                <span className="gradient-text">Fusion</span>
              </h1>
              <h2 className="text-3xl md:text-4xl font-bold dark:text-gray-100">
                Where Winter Meets Flavor
              </h2>
            </motion.div>

            <motion.p 
              className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Experience the magic of Indian street flavors with a winter twist.
              From <span className="font-semibold text-blue-600 dark:text-blue-400">Kesar Malai Gola</span> to 
              <span className="font-semibold text-teal-600 dark:text-teal-400"> Dragon Fruit Boba Tea</span>,
              every treat is a frosty adventure.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onMenuClick}
              >
                Explore Menu
              </motion.button>
              <motion.button
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Table
              </motion.button>
            </motion.div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-6 mt-16">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="frost-bg rounded-xl p-4 text-center"
                >
                  <span className="text-2xl mb-2 block">{stat.icon}</span>
                  <div className="text-2xl font-bold gradient-text">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Hero Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div 
              className="relative h-[600px] w-full"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/images/hero/main-gola.png"
                alt="Signature Gola"
                fill
                className="object-contain"
                priority
              />
              
              {/* Decorative Elements */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [-10, 10],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <Image
                    src="/images/decorative/snowflake.png"
                    alt="Snowflake"
                    width={30}
                    height={30}
                    className="opacity-60"
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="text-gray-400 dark:text-gray-500 text-sm">Scroll Down</div>
        <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-teal-400 mx-auto mt-2 rounded-full" />
      </motion.div>
    </section>
  );
};

export default HeroSection; 