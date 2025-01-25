// components/CartList.js
import React from "react";
import CartItem from "./CartItem";

export default function CartList({ cart, onUpdateQuantity, onRemove }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      {cart.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onUpdateQuantity={onUpdateQuantity}
          onRemove={onRemove}
        />
      ))}
      <div className="text-right mt-6">
        <h2 className="text-xl font-bold">Total: ₹{total}</h2>
        <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
