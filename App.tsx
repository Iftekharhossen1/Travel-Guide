
import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import AuthScreen from './components/AuthScreen';
import HomeScreen from './components/HomeScreen';
import DestinationDetailScreen from './components/DestinationDetailScreen';
import { AnimatePresence } from 'framer-motion';
import AdBanner from './components/AdBanner';

type Screen = 'splash' | 'auth' | 'home' | 'detail';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('splash');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setScreen(isAuthenticated ? 'home' : 'auth');
    }, 4000);

    return () => clearTimeout(splashTimer);
  }, [isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setScreen('home');
  };

  const handleSelectDestination = (destination: string) => {
    setSelectedDestination(destination);
    setScreen('detail');
  };

  const handleBackToHome = () => {
    setSelectedDestination(null);
    setScreen('home');
  };

  const renderScreen = () => {
    switch (screen) {
      case 'splash':
        return <SplashScreen key="splash" />;
      case 'auth':
        return <AuthScreen key="auth" onAuthSuccess={handleLogin} />;
      case 'home':
        return <HomeScreen key="home" onSelectDestination={handleSelectDestination} />;
      case 'detail':
        if (selectedDestination) {
          return (
            <DestinationDetailScreen
              key="detail"
              destinationName={selectedDestination}
              onBack={handleBackToHome}
            />
          );
        }
        return <HomeScreen key="home" onSelectDestination={handleSelectDestination} />;
      default:
        return <SplashScreen key="splash" />;
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white antialiased pb-16">
        <AnimatePresence mode="wait">
            {renderScreen()}
        </AnimatePresence>
        {isAuthenticated && <AdBanner />}
    </div>
  );
};

export default App;