import React, { useState } from 'react';
import SplashScreen from './components/SplashScreen'; 
import SnakeApp from './index'; 

export default function App() {
  const [splashVisible, setSplashVisible] = useState(true);

  const handleSplashHide = () => {
    setSplashVisible(false);
  };

  return (
    <>
      {splashVisible ? (
        <SplashScreen onHide={handleSplashHide} />
      ) : (
        <SnakeApp />
      )}
    </>
  );
}
