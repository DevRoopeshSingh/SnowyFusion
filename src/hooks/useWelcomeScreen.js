import { useState, useEffect } from "react";
import { hasVisited, setVisited } from "../utils/storage";

export default function useWelcomeScreen() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!hasVisited()) {
      setShowWelcome(true);
    } else {
      setVisited();
    }
    setIsLoading(false);
  }, []);

  const handleContinue = () => setShowWelcome(false);

  return { showWelcome, handleContinue, isLoading };
}
