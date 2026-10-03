import React, { createContext, useContext, useState, useEffect } from 'react';
import { Farmer } from '../types';
import { demoFarmers } from '../data/demoData';

type FarmerContextType = {
  farmer: Farmer | null;
  setFarmer: (farmer: Farmer) => void;
  isDemo: boolean;
  selectDemoFarmer: (id: string) => void;
  clearFarmer: () => void;
};

const FarmerContext = createContext<FarmerContextType>({
  farmer: null,
  setFarmer: () => {},
  isDemo: false,
  selectDemoFarmer: () => {},
  clearFarmer: () => {},
});

export const FarmerProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [farmer, setFarmerState] = useState<Farmer | null>(null);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('krishi_current_farmer');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFarmerState(parsed);
        setIsDemo(demoFarmers.some(df => df.id === parsed.id));
      } catch (e) {
        console.error("Failed to parse saved farmer");
      }
    } else {
      // Auto-select first demo farmer if none selected
      setFarmerState(demoFarmers[0]);
      setIsDemo(true);
    }
  }, []);

  const setFarmer = (newFarmer: Farmer) => {
    setFarmerState(newFarmer);
    localStorage.setItem('krishi_current_farmer', JSON.stringify(newFarmer));
    setIsDemo(demoFarmers.some(df => df.id === newFarmer.id));
  };

  const selectDemoFarmer = (id: string) => {
    const df = demoFarmers.find(f => f.id === id);
    if (df) {
      setFarmer(df);
    }
  };

  const clearFarmer = () => {
    setFarmerState(null);
    localStorage.removeItem('krishi_current_farmer');
    setIsDemo(false);
  };

  return (
    <FarmerContext.Provider value={{ farmer, setFarmer, isDemo, selectDemoFarmer, clearFarmer }}>
      {children}
    </FarmerContext.Provider>
  );
};

export const useFarmer = () => useContext(FarmerContext);
