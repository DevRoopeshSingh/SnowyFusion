// src/pages/confirmation.js
import Link from "next/link";
import Head from "next/head";

export default function Confirmation() {
  return (
    <>
      <Head>
        <title>Order Confirmation - Your Store</title>
        <meta
          name="description"
          content="Thank you for your order! We will notify you once it is ready for delivery."
        />
      </Head>
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Thank You for Your Order!</h1>
        <p className="text-gray-700 mb-6">
          Your order has been successfully placed. We will notify you once it is
          ready for delivery.
        </p>
        <Link
          href="/"
          aria-label="Go back to the homepage"
          className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition">
          Back to Home
        </Link>
      </div>
    </>
  );
}
