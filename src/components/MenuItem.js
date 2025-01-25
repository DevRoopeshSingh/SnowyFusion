// src/components/MenuItem.js

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const MenuItem = ({ item }) => {
  const {
    name,
    description,
    price,
    image,
    isVegetarian,
    popular,
    preparationTime,
  } = item;

  return (
    <div className="flex justify-between gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          {isVegetarian && (
            <span className="text-green-600 text-sm">● Veg</span>
          )}
          {popular && (
            <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
              Popular
            </span>
          )}
        </div>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-lg font-bold text-blue-600">{price}</span>
          {preparationTime && (
            <span className="text-xs text-gray-500">⏱️ {preparationTime}</span>
          )}
        </div>
      </div>
      {image && (
        <div className="relative w-24 h-24 flex-shrink-0">
          <Image
            src={`/images/${image}`}
            alt={name}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default MenuItem;
