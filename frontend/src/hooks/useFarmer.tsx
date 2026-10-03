import React, { createContext, useContext, useState } from 'react';
import { Farmer } from '../types';
import { demoFarmers } from '../data/demoData';

const STORAGE_KEY = 'krishi_current_farmer';

const readSavedFarmer = (): Farmer | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as Farmer) : null;
  } catch {
    console.error('Failed to read saved farmer');
    return null;
  }
};

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
  // Loaded eagerly: a null first render would bounce a returning farmer to onboarding.
  const [farmer, setFarmerState] = useState<Farmer | null>(readSavedFarmer);
  const [isDemo, setIsDemo] = useState(() => demoFarmers.some(df => df.id === readSavedFarmer()?.id));

  const setFarmer = (newFarmer: Farmer) => {
    setFarmerState(newFarmer);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFarmer));
    } catch {
      console.error('Failed to persist farmer');
    }
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
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      console.error('Failed to clear saved farmer');
    }
    setIsDemo(false);
  };

  return (
    <FarmerContext.Provider value={{ farmer, setFarmer, isDemo, selectDemoFarmer, clearFarmer }}>
      {children}
    </FarmerContext.Provider>
  );
};

export const useFarmer = () => useContext(FarmerContext);
