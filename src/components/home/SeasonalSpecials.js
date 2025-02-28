import { motion } from 'framer-motion';
import Image from 'next/image';

const SeasonalSpecials = () => {
  const specials = [
    {
      name: "Mango Magic Gola",
      description: "Summer special! Fresh mango pulp with a hint of cardamom",
      price: "₹80",
      image: "/images/menu/mango-gola.jpg",
      season: "Summer Special",
      available: true
    },
    {
      name: "Chocolate Avalanche",
      description: "Winter special! Rich hot chocolate with marshmallow snow",
      price: "₹120",
      image: "/images/menu/chocolate-avalanche.jpg",
      season: "Coming Soon",
      available: false
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-12">Seasonal Delights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {specials.map((special, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="snow-card relative overflow-hidden">
              <div className="absolute top-4 right-4 z-10">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    special.available
                      ? "bg-green-100 text-green-600"
                      : "bg-blue-100 text-blue-600"
                  }`}>
                  {special.season}
                </span>
              </div>
              <div className="relative h-72 mb-4">
                <Image
                  src={special.image}
                  alt={special.name}
                  fill
                  className="object-cover rounded-t-xl"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{special.name}</h3>
                <p className="text-gray-600 mb-4">{special.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">
                    {special.price}
                  </span>
                  {special.available && (
                    <button className="btn-primary text-sm">Order Now</button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeasonalSpecials; 