import { useEffect } from "react";
import { motion } from "framer-motion";

const MapSection = () => {
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      console.error("Google Maps API key is missing.");
      return;
    }

    // Check if script already exists
    if (!document.querySelector(`script[src*="${apiKey}"]`)) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=places&v=weekly`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    // Attach callback globally
    window.initMap = initMap;

    return () => {
      delete window.initMap;
    };
  }, []);

  const initMap = () => {
    if (typeof google !== "undefined") {
      const location = { lat: 19.076, lng: 72.8777 }; // Mumbai coordinates

      const map = new google.maps.Map(document.getElementById("map"), {
        center: location,
        zoom: 15,
        styles: [
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [{ color: "#6c7b8b" }],
          },
          {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [{ color: "#E6F3FF" }],
          },
        ],
      });

      new google.maps.Marker({
        position: location,
        map,
        title: "Snowy Fusion",
        animation: google.maps.Animation.DROP,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-12">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div id="map" className="w-full h-[400px]"></div>
      </div>
    </motion.div>
  );
};

export default MapSection;
