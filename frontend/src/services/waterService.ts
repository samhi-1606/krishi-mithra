import { api } from './api';
import { WaterBody, WaterRisk, SimulationResult } from '../types';
import { demoWaterBodies } from '../data/demoData';

export const waterService = {
  getNearbyWaterBodies: async (lat: number, lon: number): Promise<WaterBody[]> => {
    try {
      return await api.get<WaterBody[]>(`/water/nearby?lat=${lat}&lon=${lon}`);
    } catch (error) {
      console.warn('Failed to get water bodies, using demo data', error);
      return demoWaterBodies;
    }
  },

  getWaterRisk: async (farmId: string): Promise<WaterRisk> => {
    try {
      return await api.get<WaterRisk>(`/water/risk/${farmId}`);
    } catch (error) {
      console.warn('Failed to get water risk, using demo data', error);
      return {
        farmId,
        riskLevel: 'medium',
        riskType: 'flood',
        factors: ['Upstream dam releasing water', 'Heavy rainfall predicted'],
        recommendations: ['Clear drainage channels', 'Move pump motors to higher ground']
      };
    }
  },

  simulateDamRelease: async (damId: string): Promise<SimulationResult> => {
    try {
      return await api.post<SimulationResult>(`/water/simulate`, { damId });
    } catch (error) {
      console.warn('Failed to simulate dam release, using demo data', error);
      return {
        damId,
        releaseAmount: 5000,
        impactedFarms: ['f1', 'f2'],
        estimatedWaterLevelRise: 1.2,
        timeToReach: 4.5
      };
    }
  }
};
