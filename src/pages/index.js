// src/pages/index.js

import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaShoppingCart,
  FaUtensils,
} from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ProductCard } from "../components/ProductCard";
import Footer from "../components/Footer";

export default function Home({ products, socialMediaLinks, menuCategories }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const controls = useAnimation();

  useEffect(() => {
    const initializePage = async () => {
      try {
        setIsLoading(true);
        await controls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: "easeOut" },
        });
      } catch (err) {
        setError("Failed to load animations");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    initializePage();
  }, [controls]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Head>
        <title>Snowy Fusion - Ice Golas, Waffles, Wraps, and Boba Tea</title>
        <meta
          name="description"
          content="Explore the fusion of flavors with our Ice Golas, Waffles, Wraps, and Boba Tea at Snowy Fusion in Naigaon East."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Snowy Fusion" />
        <meta
          property="og:description"
          content="Your Craving, Our Fusion in Naigaon East!"
        />
        <meta property="og:image" content="/snowy-fusion-logo.png" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="container mx-auto px-4 py-12 md:px-8 lg:px-12">
            <motion.header
              className="text-center mb-10 md:mb-16"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}>
              <motion.div animate={controls}>
                <Image
                  src="/snowy-fusion-logo.png"
                  alt="Snowy Fusion Logo"
                  width={200}
                  height={200}
                  className="mx-auto mb-4 rounded-full border-4 border-white"
                  priority
                />
              </motion.div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold drop-shadow-lg">
                Welcome to Snowy Fusion
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mt-4">
                Your Craving, Our Fusion in Naigaon East!
              </p>
            </motion.header>

            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
                Our Delights
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map(({ img, label, description }, index) => (
                  <ProductCard
                    key={index}
                    img={img}
                    label={label}
                    description={description}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </section>

            <div className="mt-8 mb-16 flex flex-wrap justify-center space-y-4 space-x-4 sm:space-y-0 sm:space-x-6 md:justify-start">
              <Link
                href="/menu"
                prefetch={true}
                className="bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-3 rounded-full shadow-lg transform transition-transform hover:scale-110 flex items-center touch-friendly">
                <FaUtensils className="mr-2" /> Explore Our Menu
              </Link>
              <Link
                href="/cart"
                prefetch={true}
                className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-full shadow-lg transform transition-transform hover:scale-110 flex items-center touch-friendly">
                <FaShoppingCart className="mr-2" /> View Cart
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer socialMediaLinks={socialMediaLinks} />
    </>
  );
}

export async function getStaticProps() {
  const products = require("../../public/data/products.json");
  const socialMediaLinks = require("../../public/data/socialMediaLinks.json");
  const menuCategories = require("../../public/data/menuCategories.json");
  return {
    props: {
      products,
      socialMediaLinks,
      menuCategories,
    },
  };
}

Home.propTypes = {
  // Add if you have props
};
