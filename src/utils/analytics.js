// Check if we're in production environment
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Only track in production
export const isProduction = process.env.NODE_ENV === 'production';

// Initialize GA
export const initGA = () => {
  if (isProduction && !window.gtag) {
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_TRACKING_ID, {
      page_path: window.location.pathname,
      send_page_view: true
    });
  }
};

// Track page views
export const pageview = (url) => {
  if (isProduction && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track events
export const event = ({ action, category, label, value }) => {
  if (isProduction && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// E-commerce events
export const ecommerceEvent = {
  viewItem: (item) => {
    if (isProduction && window.gtag) {
      window.gtag('event', 'view_item', {
        currency: 'INR',
        items: [{
          item_id: item.id,
          item_name: item.name,
          price: parseFloat(item.price.replace('₹', '')),
          item_category: item.category,
        }]
      });
    }
  },

  addToCart: (item) => {
    if (isProduction && window.gtag) {
      window.gtag('event', 'add_to_cart', {
        currency: 'INR',
        items: [{
          item_id: item.id,
          item_name: item.name,
          price: parseFloat(item.price.replace('₹', '')),
          quantity: 1,
        }]
      });
    }
  },

  beginCheckout: (items, total) => {
    if (isProduction && window.gtag) {
      window.gtag('event', 'begin_checkout', {
        currency: 'INR',
        items: items.map(item => ({
          item_id: item.id,
          item_name: item.name,
          price: parseFloat(item.price.replace('₹', '')),
          quantity: 1,
        })),
        value: total
      });
    }
  }
}; 