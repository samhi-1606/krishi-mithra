import { api } from './api';
import { CalendarData } from '../types';
import { demoCalendar } from '../data/demoData';

export const calendarService = {
  getCropCalendar: async (region: string, crop: string, season: string): Promise<CalendarData> => {
    try {
      return await api.get<CalendarData>(`/calendar?region=${region}&crop=${crop}&season=${season}`);
    } catch (error) {
      console.warn('Failed to fetch crop calendar, using demo data', error);
      return demoCalendar;
    }
  }
};
