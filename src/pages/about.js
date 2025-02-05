import { motion } from 'framer-motion';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TeamMember from '@/components/about/TeamMember';
import Timeline from '@/components/about/Timeline';
import Values from '@/components/about/Values';
import Gallery from '@/components/about/Gallery';
import { FaHeart, FaLeaf, FaSnowflake } from 'react-icons/fa';

export default function About() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
        <Image
          src="/images/about/hero-bg.jpg"
          alt="Snowy Fusion Cafe"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <motion.div 
          className="relative text-center text-white px-4"
          {...fadeIn}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Story</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Bringing winter magic to every cup and cone since 2020
          </p>
        </motion.div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6 dark:text-white">Our Mission</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              At Snowy Fusion, we're on a mission to create magical moments through 
              innovative frozen treats and beverages. We believe in crafting experiences 
              that bring joy, surprise, and a touch of winter wonder to every customer, 
              every day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <Values />

      {/* Our Journey Timeline */}
      <Timeline />

      {/* Team Section */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 dark:text-white">Meet Our Team</h2>
            <p className="text-gray-600 dark:text-gray-300">
              The passionate people behind your favorite frozen treats
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TeamMember
              name="John Doe"
              role="Founder & Head Chef"
              image="/images/team/john.jpg"
              bio="With 15 years of culinary experience, John brings creativity and innovation to every recipe."
            />
            {/* Add more team members */}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <Gallery />

      {/* Call to Action */}
      <section className="py-16 px-4 bg-primary-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Come Visit Us</h2>
            <p className="text-xl mb-8">
              Experience the magic of Snowy Fusion in person. We'd love to serve you!
            </p>
            <button className="bg-white text-primary-500 px-8 py-3 rounded-full text-lg font-medium hover:bg-opacity-90 transition-colors">
              Find Our Location
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 