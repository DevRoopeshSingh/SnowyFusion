const MenuSection = ({ menuData, addToOrder }) => (
  <section className="max-w-6xl mx-auto py-12 px-4">
    <h2 className="text-3xl font-bold mb-8">Our Menu</h2>
    <div className="grid md:grid-cols-2 gap-8">
      {menuData.map((category) => (
        <div key={category.category}>
          <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
          <div className="space-y-4">
            {category.items.map((item) => (
              <div key={item.name} className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span>₹{item.price}</span>
                  <button
                    onClick={() => addToOrder(item)}
                    className="bg-blue-100 text-blue-600 px-3 py-1 rounded">
                    Add to Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default MenuSection; 
