import { api } from './api';
import { SeedVariety, SoilAnalysis, FertilizerRec, PestControlRec } from '../types';

export const farmInputService = {
  getSeeds: async (crop: string, region: string, season: string, soil: string): Promise<SeedVariety[]> => {
    try {
      return await api.get<SeedVariety[]>(`/farm-inputs/seeds?crop=${crop}&region=${region}&season=${season}&soil=${soil}`);
    } catch (error) {
      console.warn('Failed to fetch seeds, using fallback data', error);
      return [
        { id: 'sv1', name: 'BPT 5204 (Samba Mahsuri)', crop, duration: 145, yieldPotential: 'High', resistance: ['Bacterial Leaf Blight'], pricePerKg: 45 },
        { id: 'sv2', name: 'MTU 1010', crop, duration: 120, yieldPotential: 'Medium', resistance: ['Brown Plant Hopper'], pricePerKg: 38 }
      ];
    }
  },

  analyzeSoil: async (data: any): Promise<SoilAnalysis> => {
    try {
      return await api.post<SoilAnalysis>(`/farm-inputs/soil-analysis`, data);
    } catch (error) {
      console.warn('Failed to analyze soil, using fallback data', error);
      return { ph: 6.5, nitrogen: 280, phosphorus: 22, potassium: 180, organicCarbon: 0.6, moisture: 45, status: 'good' };
    }
  },

  getFertilizer: async (crop: string, soilType: string): Promise<FertilizerRec[]> => {
    try {
      return await api.get<FertilizerRec[]>(`/farm-inputs/fertilizer?crop=${crop}&soil_type=${soilType}`);
    } catch (error) {
      console.warn('Failed to fetch fertilizers, using fallback data', error);
      return [
        { name: 'Urea (46% N)', type: 'chemical', dosage: '50 kg/acre', timing: 'Basal application', priceEstimate: 266 },
        { name: 'DAP (18-46-0)', type: 'chemical', dosage: '20 kg/acre', timing: 'At tillering stage', priceEstimate: 1350 },
        { name: 'Vermicompost', type: 'organic', dosage: '200 kg/acre', timing: 'Pre-sowing', priceEstimate: 1200 }
      ];
    }
  },

  getPestControl: async (crop: string): Promise<PestControlRec[]> => {
    try {
      return await api.get<PestControlRec[]>(`/farm-inputs/pest-control?crop=${crop}`);
    } catch (error) {
      console.warn('Failed to fetch pest control, using fallback data', error);
      return [
        { 
          pest: 'Stem Borer', 
          symptoms: ['Dead hearts in vegetative stage', 'White heads in reproductive stage'], 
          chemicalControl: 'Cartap Hydrochloride 4G @ 8 kg/acre', 
          organicControl: 'Neem seed kernel extract (NSKE) 5%', 
          preventiveMeasures: ['Use resistant varieties', 'Clip seedling tips before transplanting'] 
        }
      ];
    }
  }
};
