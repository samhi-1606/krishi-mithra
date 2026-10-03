import { api } from './api';
import { Farmer } from '../types';
import { demoFarmers } from '../data/demoData';

export const farmerService = {
  getFarmer: async (farmerId: string): Promise<Farmer> => {
    try {
      return await api.get<Farmer>(`/farmer/${farmerId}`);
    } catch (error) {
      console.warn('Failed to fetch farmer, using demo data', error);
      const farmer = demoFarmers.find(f => f.id === farmerId);
      if (!farmer) throw new Error('Farmer not found');
      return farmer;
    }
  },

  getDemoFarmers: async (): Promise<Farmer[]> => {
    // Demo farmers are primarily client-side for testing
    return demoFarmers;
  },

  updateFarmer: async (farmerId: string, data: Partial<Farmer>): Promise<Farmer> => {
    try {
      return await api.put<Farmer>(`/farmer/${farmerId}`, data);
    } catch (error) {
      console.warn('Failed to update farmer on server', error);
      const current = demoFarmers.find(f => f.id === farmerId);
      if (!current) throw new Error('Farmer not found');
      return { ...current, ...data };
    }
  },

  createFarmer: async (data: Omit<Farmer, 'id'>): Promise<Farmer> => {
    try {
      return await api.post<Farmer>(`/farmer/`, data);
    } catch (error) {
      console.warn('Failed to create farmer on server', error);
      return { ...data, id: `f-${Date.now()}` };
    }
  }
};
