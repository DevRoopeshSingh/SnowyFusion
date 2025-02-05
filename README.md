# Snowy Fusion 🍧

A modern ice cream and beverages store built with Next.js, featuring a dynamic menu system, real-time ordering, and an engaging user interface.

## ✨ Key Features

### 🍨 Browse a Dynamic and Interactive Menu
Explore our wide selection of ice creams and beverages, categorized for easy navigation. Our menu system offers:
- Real-time search functionality for quick item discovery
- High-performance image loading with smooth transitions
- Detailed item descriptions and customization options
- Quick view modals for in-depth item information
- Categories organized for intuitive browsing

### 🛒 Smart and Real-Time Cart System
Experience seamless ordering with our intelligent cart:
- Instant cart updates and total calculations
- Customization options for toppings, flavors, and sizes
- Comprehensive order summary
- Quick and efficient checkout process
- Easy item removal and quantity adjustments

### 💫 Modern and Responsive Design
Enjoy a visually stunning experience across all devices:
- Responsive layout that adapts to any screen size
- Elegant dark mode for comfortable night-time browsing
- Delightful snow effect animations
- Smooth transitions and loading states
- Clean and intuitive user interface

## 🚀 Quick Start

1. **Install Dependencies**
```bash
npm install
```

2. **Set Up Environment**
```bash
# Copy example env file
cp .env.example .env.local

# Add your Google Maps API key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key
```

3. **Run Development Server**
```bash
npm run dev
```

4. **Setup Images**
```bash
npm run setup-images
```

## 🛠️ Built With

- **Next.js 13+** - React Framework
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Google Maps** - Location Services

## 📁 Project Structure

```
next-snowy-fusion/
├── public/
│   ├── data/           # Menu and content data
│   └── images/         # Static images
├── src/
│   ├── components/     # React components
│   ├── pages/          # Next.js pages
│   └── utils/          # Utility functions
└── scripts/           # Setup scripts
```

## 🎨 Customization

### Menu Items
Update `public/data/menu.json` to modify menu categories and items:

```json
{
  "categories": [
    {
      "name": "Category Name",
      "items": [
        {
          "name": "Item Name",
          "price": "₹120",
          "description": "Description",
          "customizations": ["Option 1", "Option 2"]
        }
      ]
    }
  ]
}
```

### Theme
Modify colors and styles in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {...},
      secondary: {...}
    }
  }
}
```

## 📱 PWA Support

- Offline functionality
- Install to home screen
- Fast loading times
- Push notifications support

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

MIT License - feel free to use this project for your own purposes.

## 🙋‍♂️ Support

For support or queries, please open an issue in the repository.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
