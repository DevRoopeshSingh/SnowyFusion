import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SnowEffect = () => {
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    const generateSnowflakes = () => {
      return Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 15,
        size: Math.random() * 10 + 5,
      }));
    };

    setSnowflakes(generateSnowflakes());
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="snowflake absolute bg-white rounded-full"
          style={{
            left: flake.left,
            width: flake.size,
            height: flake.size,
            filter: 'blur(1px)',
          }}
          initial={{ y: -20, opacity: 0 }}
          animate={{
            y: '110vh',
            opacity: [0, 1, 0.5, 0],
          }}
          transition={{
            duration: 15,
            delay: flake.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

export default SnowEffect; 