import { api } from './api';
import { WeatherData, WeatherAlert } from '../types';
import { demoWeather } from '../data/demoData';

export const weatherService = {
  getWeather: async (lat: number, lon: number): Promise<WeatherData> => {
    try {
      return await api.get<WeatherData>(`/weather?lat=${lat}&lon=${lon}`);
    } catch (error) {
      console.warn('Failed to fetch weather, falling back to demo data', error);
      return demoWeather;
    }
  },

  getWeatherAlerts: async (lat: number, lon: number): Promise<WeatherAlert[]> => {
    try {
      return await api.get<WeatherAlert[]>(`/weather/alerts?lat=${lat}&lon=${lon}`);
    } catch (error) {
      console.warn('Failed to fetch weather alerts, using demo data', error);
      return [
        { id: 'wa1', type: 'rain', severity: 'high', message: 'Heavy rain expected in your area in 48 hours.', date: new Date().toISOString() }
      ];
    }
  }
};
