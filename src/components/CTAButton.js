// src/components/CTAButton.js

// Reusable CTA Button component for consistent styling and logic
import Link from "next/link";

export default function CTAButton({ href, children, color }) {
  return (
    <Link
      href={href}
      className={`cta-button bg-${color}-600 text-white px-4 py-3 md:px-6 md:py-4 rounded-lg shadow-lg hover:bg-${color}-700 hover:shadow-xl transform hover:-translate-y-1 transition-all w-full md:w-auto text-center flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-${color}-300`}>
      {children}
    </Link>
  );
}
