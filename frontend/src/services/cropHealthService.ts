import { api } from './api';
import { CropHealthGrid, ZoneDetail } from '../types';
import { demoCropHealth } from '../data/demoData';

export const cropHealthService = {
  analyzeFarm: async (farmId: string): Promise<CropHealthGrid> => {
    try {
      return await api.post<CropHealthGrid>(`/crop-health/analyze`, { farmId });
    } catch (error) {
      console.warn('Failed to analyze farm, using demo data', error);
      return demoCropHealth;
    }
  },

  getCropHealth: async (farmId: string): Promise<CropHealthGrid> => {
    try {
      return await api.get<CropHealthGrid>(`/crop-health/${farmId}`);
    } catch (error) {
      console.warn('Failed to get crop health, using demo data', error);
      return demoCropHealth;
    }
  },

  getZoneDetail: async (zoneId: string): Promise<ZoneDetail> => {
    try {
      return await api.get<ZoneDetail>(`/crop-health/zone/${zoneId}`);
    } catch (error) {
      console.warn('Failed to get zone detail, using demo data', error);
      const isProblemZone = zoneId === 'B7';
      return {
        zoneId,
        healthScore: isProblemZone ? 45 : 92,
        moistureLevel: 65,
        nitrogenLevel: 40,
        diseases: isProblemZone ? [{
          name: 'Leaf Blight',
          confidence: 85,
          severity: 'high',
          treatment: ['Apply Mancozeb 75% WP @ 2g/litre', 'Ensure proper drainage']
        }] : [],
        recommendation: isProblemZone ? 'Immediate fungicidal spray required.' : 'Zone is healthy. Continue standard care.',
      };
    }
  }
};
