import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from '../types';
import { demoAlerts } from '../data/demoData';

type AlertContextType = {
  alerts: Alert[];
  unreadCount: number;
  addAlert: (alert: Omit<Alert, 'id' | 'date' | 'read'>) => void;
  markRead: (id: string) => void;
  clearAlerts: () => void;
};

const AlertContext = createContext<AlertContextType>({
  alerts: [],
  unreadCount: 0,
  addAlert: () => {},
  markRead: () => {},
  clearAlerts: () => {},
});

export const AlertProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    // Load demo alerts initially if empty
    setAlerts(demoAlerts);
  }, []);

  const unreadCount = alerts.filter(a => !a.read).length;

  const addAlert = (newAlert: Omit<Alert, 'id' | 'date' | 'read'>) => {
    const alert: Alert = {
      ...newAlert,
      id: `alert-${Date.now()}`,
      date: new Date().toISOString(),
      read: false,
    };
    setAlerts(prev => [alert, ...prev]);
  };

  const markRead = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
  };

  const clearAlerts = () => {
    setAlerts([]);
  };

  return (
    <AlertContext.Provider value={{ alerts, unreadCount, addAlert, markRead, clearAlerts }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlerts = () => useContext(AlertContext);
