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
          <div className="snake-loader"></div>
          
          <AnimatePresence>
            {showWelcome && (
              <motion.div 
                className="welcome-message"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
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