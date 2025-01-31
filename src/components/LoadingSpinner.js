import { motion } from "framer-motion";

const LoadingSpinner = ({
  size = "w-12 h-12",
  color = "border-white",
  fullScreen = true,
  speed = 1,
}) => (
  <div
    role="status"
    aria-label="Loading"
    className={`${
      fullScreen ? "min-h-screen" : ""
    } flex items-center justify-center`}>
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      className={`${size} border-4 ${color} rounded-full border-t-transparent`}
    />
  </div>
);

export default LoadingSpinner;