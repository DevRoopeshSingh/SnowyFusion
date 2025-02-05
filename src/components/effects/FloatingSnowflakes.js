import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const FloatingSnowflakes = () => {
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    const generateSnowflakes = () => {
      return Array.from({ length: 30 }, (_, i) => ({
        id: i,
        size: Math.random() * 15 + 5,
        left: `${Math.random() * 100}vw`,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 10,
        rotation: Math.random() * 360,
      }));
    };

    setSnowflakes(generateSnowflakes());
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute bg-white dark:bg-gray-200 rounded-full opacity-60"
          style={{
            width: flake.size,
            height: flake.size,
            left: flake.left,
            filter: 'blur(1px)',
          }}
          initial={{ y: -100, rotate: 0 }}
          animate={{
            y: '110vh',
            rotate: flake.rotation,
            opacity: [0, 0.5, 0.2, 0],
          }}
          transition={{
            duration: flake.duration,
            delay: flake.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

export default FloatingSnowflakes; 