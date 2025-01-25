// src/components/ProductCard.js

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function ProductCard({ img, label, description, delay }) {
  return (
    <motion.div
      className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg shadow-2xl overflow-hidden transform transition-all hover:scale-105 touch-friendly"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}>
      <Image
        src={`/${img}.jpg`}
        alt={label}
        width={600}
        height={400}
        className="w-full h-64 object-cover"
        loading="lazy"
        onError={(e) => {
          e.target.src = "/placeholder.jpg";
        }}
      />
      <div className="p-6 text-center">
        <h3 className="text-xl sm:text-2xl font-bold text-white">{label}</h3>
        <p className="text-sm md:text-base text-gray-300 mt-2">{description}</p>
        <Link
          href={`/menu/${label.toLowerCase().replace(" ", "-")}`}
          className="text-yellow-400 hover:text-yellow-300 block mt-4">
          Learn More
        </Link>
      </div>
    </motion.div>
  );
}
