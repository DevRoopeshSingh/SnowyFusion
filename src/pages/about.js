import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Define animations for better reusability
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5 },
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <>
      <Head>
        <title>About Us - Snowy Fusion</title>
        <meta
          name="description"
          content="Discover Snowy Fusion in Naigaon East, where we blend traditional flavors with modern twists to create a unique culinary experience."
        />
        <meta property="og:title" content="About Us - Snowy Fusion" />
        <meta
          property="og:description"
          content="Welcome to Snowy Fusion in Naigaon East, where every visit promises exceptional quality, freshness, and hospitality."
        />
        <meta
          property="og:image"
          content={`${siteUrl}/images/about-hero.jpg`}
        />
        <meta property="og:url" content={`${siteUrl}/about`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AboutPage",
              name: "About Us - Snowy Fusion",
              description:
                "Discover Snowy Fusion in Naigaon East, where we blend traditional flavors with modern twists to create a unique culinary experience.",
              image: `${siteUrl}/images/about-hero.jpg`,
              url: `${siteUrl}/about`,
            }),
          }}
        />
      </Head>
      <main className="container mx-auto py-12 px-6 md:px-12">
        <section className="text-center mb-12">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-gray-800 mb-6"
            {...fadeInUp}>
            About Snowy Fusion
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
            {...fadeInUp}>
            Discover the heart of Naigaon East&apos;s unique culinary
            experience, blending traditional flavors with modern creativity.
          </motion.p>
        </section>

        <section className="flex flex-col md:flex-row items-center gap-8">
          <motion.div className="w-full md:w-1/2" {...fadeInLeft}>
            <Image
              src="/images/about-hero.jpg"
              alt="Snowy Fusion Culinary Delights"
              width={600}
              height={500}
              className="rounded-lg shadow-xl object-cover"
            />
          </motion.div>
          <motion.div className="w-full md:w-1/2 space-y-4" {...fadeInRight}>
            <h2 className="text-3xl font-semibold text-gray-800">Our Story</h2>
            <p className="text-gray-600">
              At Snowy Fusion, we take pride in bringing people together over
              food. From classic flavors to innovative recipes, we ensure every
              dish is a masterpiece crafted with love and passion.
            </p>
            <p className="text-gray-600">
              Join us to savor an unforgettable dining experience where
              tradition meets innovation.
            </p>
          </motion.div>
        </section>
      </main>
    </>
  );
}
