/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enables React's Strict Mode for development
  experimental: {
    appDir: false, // Ensure the app directory isn't used (as you're using `pages`)
  },
  images: {
    domains: ["example.com"], // Replace with domains for external images if applicable
  },
  trailingSlash: false, // Adjust based on your URL preferences
};

export default nextConfig;
  