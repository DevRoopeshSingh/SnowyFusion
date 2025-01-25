// src/components/CartItem.js
import PropTypes from "prop-types";

export default function CartItem({ item }) {
  return (
    <div className="flex justify-between items-center border-b py-4">
      <div>
        <h2 className="text-lg font-bold">{item.name}</h2>
        <p className="text-gray-600">
          ₹{item.price} x {item.quantity}
        </p>
      </div>
      <p className="text-lg font-bold">₹{item.price * item.quantity}</p>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};
