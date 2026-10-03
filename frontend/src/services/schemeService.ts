import { api } from './api';
import { Scheme } from '../types';
import { demoSchemes } from '../data/demoData';

export const schemeService = {
  getSchemes: async (region?: string, crop?: string): Promise<Scheme[]> => {
    try {
      const params = new URLSearchParams();
      if (region) params.append('region', region);
      if (crop) params.append('crop', crop);
      const query = params.toString() ? `?${params.toString()}` : '';
      
      return await api.get<Scheme[]>(`/schemes${query}`);
    } catch (error) {
      console.warn('Failed to fetch schemes, using demo data', error);
      return demoSchemes;
    }
  }
};
