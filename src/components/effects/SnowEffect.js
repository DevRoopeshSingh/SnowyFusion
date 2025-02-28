import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes"; // Assuming Next.js dark mode support

const SnowEffect = ({
  snowflakeCount = 50,
  speed = 15,
  maxSize = 15,
  minSize = 5,
}) => {
  const [snowflakes, setSnowflakes] = useState([]);
  const { theme } = useTheme(); // For dark mode detection

  // Generate snowflakes dynamically
  const generateSnowflakes = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return Array.from(
      { length: Math.min(snowflakeCount, Math.floor(width / 20)) },
      (_, i) => ({
        id: i,
        left: Math.random() * width, // Use pixels for precision
        delay: Math.random() * speed,
        size: Math.random() * (maxSize - minSize) + minSize,
      })
    );
  }, [snowflakeCount, speed, maxSize, minSize]);

  // Initialize and update snowflakes on mount and resize
  useEffect(() => {
    setSnowflakes(generateSnowflakes());

    const handleResize = () => setSnowflakes(generateSnowflakes());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [generateSnowflakes]);

  // Dynamic snowflake color based on theme
  const snowflakeColor = theme === "dark" ? "#E5E7EB" : "#FFFFFF"; // Light gray in dark mode, white in light

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true" // Mark as decorative for accessibility
    >
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute rounded-full"
          style={{
            left: `${(flake.left / window.innerWidth) * 100}%`, // Convert to percentage for responsiveness
            width: flake.size,
            height: flake.size,
            backgroundColor: snowflakeColor,
            filter: "blur(1px)",
          }}
          initial={{ y: -flake.size, opacity: 0 }}
          animate={{
            y: window.innerHeight + flake.size, // Ensure full traversal
            opacity: [0, 0.8, 0.4, 0], // Slightly lower peak opacity for subtlety
          }}
          transition={{
            duration: speed,
            delay: flake.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default SnowEffect;
