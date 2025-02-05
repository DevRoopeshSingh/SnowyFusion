import { motion } from 'framer-motion';
import Image from 'next/image';

const SpecialOffers = () => {
  const offers = [
    {
      title: "Winter Special",
      description: "Buy any 2 Golas, get 1 free! Valid on weekdays.",
      code: "WINTER2024",
      image: "/images/offers/winter-special.jpg",
      validTill: "31st Jan 2024"
    },
    {
      title: "Student Discount",
      description: "Show your student ID and get 15% off on all items!",
      code: "STUDENT15",
      image: "/images/offers/student-offer.jpg",
      validTill: "Ongoing"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="section-title text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Special Offers
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {offers.map((offer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.5 }}
              className="frost-bg rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="relative h-48">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold">{offer.title}</h3>
                  <p className="text-sm opacity-90">Valid till: {offer.validTill}</p>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {offer.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="bg-blue-50 dark:bg-gray-800 px-4 py-2 rounded-full">
                    <span className="text-blue-600 dark:text-blue-400 font-mono font-bold">
                      {offer.code}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary text-sm"
                  >
                    Claim Offer
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers; 