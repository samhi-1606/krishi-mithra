import { api } from './api';
import { MarketPrice, TrendData, BestPrice } from '../types';
import { demoMarketPrices } from '../data/demoData';

export const marketService = {
  getMarketPrices: async (filters?: { crop?: string; market?: string }): Promise<MarketPrice[]> => {
    try {
      let query = '';
      if (filters) {
        const params = new URLSearchParams();
        if (filters.crop) params.append('crop', filters.crop);
        if (filters.market) params.append('market', filters.market);
        query = `?${params.toString()}`;
      }
      return await api.get<MarketPrice[]>(`/market-prices/${query}`);
    } catch (error) {
      console.warn('Failed to fetch market prices, using demo data', error);
      let prices = [...demoMarketPrices];
      if (filters?.crop) prices = prices.filter(p => p.crop === filters.crop);
      if (filters?.market) prices = prices.filter(p => p.market === filters.market);
      return prices;
    }
  },

  getMarketTrends: async (crop: string, market: string): Promise<TrendData[]> => {
    try {
      return await api.get<TrendData[]>(`/market-prices/trends?crop=${crop}&market=${market}`);
    } catch (error) {
      console.warn('Failed to fetch market trends, generating demo data', error);
      return Array.from({ length: 7 }).map((_, i) => ({
        date: new Date(Date.now() - (6 - i) * 86400000).toISOString().split('T')[0],
        price: 2000 + Math.random() * 500
      }));
    }
  },

  getBestNearbyPrice: async (crop: string, lat: number, lon: number): Promise<BestPrice> => {
    try {
      return await api.get<BestPrice>(`/market-prices/best?crop=${crop}&lat=${lat}&lon=${lon}`);
    } catch (error) {
      console.warn('Failed to fetch best price, using demo data', error);
      return {
        crop,
        market: 'Warangal Mandi',
        price: 2450,
        distance: 12.5,
        transportCost: 150,
        netProfit: 2300
      };
    }
  }
};
