import { motion } from 'framer-motion';
import Image from 'next/image';

const testimonials = [
  {
    name: "Priya Shah",
    image: "/images/testimonials/priya.jpg",
    text: "The Kesar Malai Gola is absolutely divine! It's like having a taste of winter in summer.",
    rating: 5,
    date: "2 days ago"
  },
  {
    name: "Rahul Mehta",
    image: "/images/testimonials/rahul.jpg",
    text: "Love the fusion of traditional Indian flavors with modern presentation. The Nutella Waffle is a must-try!",
    rating: 5,
    date: "1 week ago"
  },
  {
    name: "Anita Desai",
    image: "/images/testimonials/anita.jpg",
    text: "Perfect spot for quick refreshments. The Dragon Fruit boba tea is my new favorite!",
    rating: 4,
    date: "2 weeks ago"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-12">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="frost-bg rounded-xl p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-12 h-12">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-2">{testimonial.text}</p>
              <span className="text-sm text-gray-400">{testimonial.date}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 