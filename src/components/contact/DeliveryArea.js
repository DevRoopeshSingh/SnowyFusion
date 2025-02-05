import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const DeliveryArea = () => {
  const areas = [
    { name: "Naigaon East", time: "15-25 mins", minOrder: "₹100" },
    { name: "Naigaon West", time: "20-30 mins", minOrder: "₹150" },
    { name: "Mira Road East", time: "25-40 mins", minOrder: "₹200" },
    { name: "Vasai East", time: "30-45 mins", minOrder: "₹250" },
    { name: "Nalasopara East", time: "40-55 mins", minOrder: "₹300" },
    // Add more areas as needed...
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6 dark:text-white">
        Delivery Areas
      </h2>
      <div className="space-y-4">
        {areas.map((area, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-green-500" />
              <div>
                <h3 className="font-medium dark:text-white">{area.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Delivery time: {area.time}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Min. order:
              </span>
              <p className="font-medium text-blue-600 dark:text-blue-400">
                {area.minOrder}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DeliveryArea;
