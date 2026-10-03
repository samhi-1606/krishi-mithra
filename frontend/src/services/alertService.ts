import { api } from './api';
import { Alert } from '../types';
import { demoAlerts } from '../data/demoData';

export const alertService = {
  getAlerts: async (farmerId: string): Promise<Alert[]> => {
    try {
      return await api.get<Alert[]>(`/alerts/${farmerId}`);
    } catch (error) {
      console.warn('Failed to fetch alerts, using demo data', error);
      return demoAlerts;
    }
  },

  markAsRead: async (alertIds: string[]): Promise<void> => {
    try {
      await api.put(`/alerts/read`, { alertIds });
    } catch (error) {
      console.warn('Failed to mark alerts as read on server', error);
    }
  },

  createAlert: async (alert: Omit<Alert, 'id'>): Promise<Alert> => {
    try {
      return await api.post<Alert>(`/alerts`, alert);
    } catch (error) {
      console.warn('Failed to create alert on server', error);
      return { ...alert, id: `a-${Date.now()}` } as Alert;
    }
  }
};
