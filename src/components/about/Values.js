import { motion } from 'framer-motion';
import { FaHeart, FaLeaf, FaSnowflake, FaUsers } from 'react-icons/fa';

const values = [
  {
    icon: <FaHeart className="text-4xl text-red-500" />,
    title: "Passion for Quality",
    description: "We pour our heart into every creation, using only the finest ingredients and techniques."
  },
  {
    icon: <FaLeaf className="text-4xl text-green-500" />,
    title: "Sustainability",
    description: "Committed to eco-friendly practices and sustainable sourcing."
  },
  {
    icon: <FaSnowflake className="text-4xl text-blue-500" />,
    title: "Innovation",
    description: "Constantly exploring new flavors and combinations to surprise and delight."
  },
  {
    icon: <FaUsers className="text-4xl text-purple-500" />,
    title: "Community",
    description: "Creating a welcoming space where everyone feels like family."
  }
];

const Values = () => {
  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 dark:text-white">Our Values</h2>
          <p className="text-gray-600 dark:text-gray-300">
            The principles that guide everything we do
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center"
            >
              <div className="mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{value.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values; 