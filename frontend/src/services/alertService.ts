import { api } from './api';
import { Alert } from '../types';
import { demoAlerts } from '../data/demoData';

export const alertService = {
  getAlerts: async (farmerId: string): Promise<Alert[]> => {
    try {
      return await api.get<Alert[]>(`/alerts/?farmer_id=${farmerId}`);
    } catch (error) {
      console.warn('Failed to fetch alerts, using demo data', error);
      return demoAlerts;
    }
  },

  markAsRead: async (alertId: string): Promise<void> => {
    try {
      await api.post(`/alerts/read`, { alert_id: alertId });
    } catch (error) {
      console.warn('Failed to mark alert as read on server', error);
    }
  },

  createAlert: async (alert: { farmer_id: string; category: string; message: string; priority: string }): Promise<any> => {
    try {
      return await api.post(`/alerts/`, alert);
    } catch (error) {
      console.warn('Failed to create alert on server', error);
      return { ...alert, id: `a-${Date.now()}`, read: false };
    }
  }
};
