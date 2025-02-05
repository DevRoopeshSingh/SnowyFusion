const ContactSection = ({ cartItems }) => {
  const whatsappMessage = `Hi Snowy Fusion! I'd like to order:%0A${cartItems
    .map((item) => `- ${item.name} (₹${item.price})`)
    .join("%0A")}%0ATotal: ₹${cartItems.reduce(
    (sum, item) => sum + item.price,
    0
  )}`;

  return (
    <section className="max-w-6xl mx-auto py-12 px-4">
      <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6">Confirm Order</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>₹{item.price}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col space-y-4">
              <a
                href={`https://wa.me/91CAFE_PHONE_NUMBER?text=${whatsappMessage}`}
                className="bg-green-500 text-white px-6 py-3 rounded text-center"
                target="_blank"
                rel="noreferrer">
                Send Order via WhatsApp
              </a>

              <a
                href={`tel:CAFE_PHONE_NUMBER`}
                className="bg-blue-500 text-white px-6 py-3 rounded text-center">
                Call to Order
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
