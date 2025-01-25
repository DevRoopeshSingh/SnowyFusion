// src/pages/cart.js
import CartItem from "../components/CartItem";

export default function Cart() {
  const cartItems = [
    { id: 1, name: "Latte", price: 150, quantity: 2 },
    { id: 2, name: "Espresso", price: 120, quantity: 1 },
  ];

  const calculateTotal = (items) =>
    items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const total = calculateTotal(cartItems);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
        <p className="text-gray-600 text-center">Your cart is empty!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div className="mt-8 text-right">
        <h2 className="text-2xl font-bold">Total: ₹{total}</h2>
        <button
          aria-label="Proceed to checkout"
          className="bg-green-500 text-white px-6 py-3 rounded mt-4 hover:bg-green-600 transition">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
