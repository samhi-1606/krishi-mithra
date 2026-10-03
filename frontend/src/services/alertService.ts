import { api } from './api';
import { Alert } from '../types';
import { demoAlerts } from '../data/demoData';

export const alertService = {
  getAlerts: async (farmerId: string): Promise<Alert[]> => {
    try {
      return await api.get<Alert[]>(`/alerts?farmer_id=${encodeURIComponent(farmerId)}`);
    } catch (error) {
      console.warn('Failed to fetch alerts, using demo data', error);
      return demoAlerts;
    }
  },

  markAsRead: async (alertIds: string[]): Promise<void> => {
    try {
      await Promise.all(alertIds.map(alertId => api.post(`/alerts/read`, { alertId })));
    } catch (error) {
      console.warn('Failed to mark alerts as read on server', error);
    }
  },

  createAlert: async (farmerId: string, alert: Omit<Alert, 'id' | 'date' | 'read'>): Promise<Alert> => {
    try {
      return await api.post<Alert>(`/alerts`, { farmerId, ...alert });
    } catch (error) {
      console.warn('Failed to create alert on server', error);
      return { ...alert, id: `a-${Date.now()}`, date: new Date().toISOString(), read: false };
    }
  }
};
