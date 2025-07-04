import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Show welcome message after 7 seconds
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(true);
    }, 7000);

    // Hide loading screen after 10 seconds
    const loadingTimer = setTimeout(() => {
      setShowLoading(false);
      onLoadingComplete();
    }, 10000);

    return () => {
      clearTimeout(welcomeTimer);
      clearTimeout(loadingTimer);
    };
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {showLoading && (
        <motion.div 
          className="loading-screen"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="snake-container">
            <div className="snake-loader snake-1"></div>
            <div className="snake-loader snake-2"></div>
            <div className="snake-loader snake-3"></div>
          </div>
          
          <AnimatePresence>
            {showWelcome && (
              <motion.div 
                className="welcome-message"
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Welcome Hannah
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;