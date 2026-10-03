import { api } from './api';
import { CalendarData } from '../types';
import { demoCalendar } from '../data/demoData';

export const calendarService = {
  getCropCalendar: async (region: string, crop: string, season: string): Promise<CalendarData> => {
    try {
      const params = new URLSearchParams({ region, crop, season });
      return await api.get<CalendarData>(`/crop-calendar?${params.toString()}`);
    } catch (error) {
      console.warn('Failed to fetch crop calendar, using demo data', error);
      return demoCalendar;
    }
  }
};
