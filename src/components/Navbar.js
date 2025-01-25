// src/components/Navbar.js
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Snowy Fusion
        </Link>
        <div className="space-x-4">
          <Link href="/menu" className="hover:text-blue-400">
            Menu
          </Link>
          <Link href="/cart" className="hover:text-blue-400">
            Cart
          </Link>
          <Link href="/about" className="hover:text-blue-400">
            About
          </Link>
          <Link href="/contact" className="hover:text-blue-400">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
