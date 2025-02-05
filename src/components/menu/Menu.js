import { motion } from "framer-motion";
import MenuItem from "./MenuItem";

const Menu = ({ name, description, items = [], addToOrder }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  console.log("Menu props:", { name, description, items }); // Debug log
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12">
          <h2 className="section-title mb-4">{name}</h2>
          {description && (
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto px-4">
          {items.map((item, index) => (
            <MenuItem
              key={item.id || index}
              item={item}
              onOrder={() => addToOrder(item)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Menu;
