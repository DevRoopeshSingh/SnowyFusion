import { motion } from 'framer-motion';

const timelineData = [
  {
    year: '2020',
    event: 'Snowy Fusion was founded, bringing innovative frozen treats to the community.',
  },
  {
    year: '2021',
    event: 'Launched our first seasonal menu, featuring unique flavors and combinations.',
  },
  {
    year: '2022',
    event: 'Expanded our menu to include a variety of beverages and desserts.',
  },
  {
    year: '2023',
    event: 'Opened our second location, making our treats accessible to more customers.',
  },
];

const Timeline = () => {
  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 dark:text-white">Our Journey</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Milestones that shaped Snowy Fusion
          </p>
        </motion.div>

        <div className="space-y-8">
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{item.year}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.event}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline; 