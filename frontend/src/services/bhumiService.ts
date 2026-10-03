import { api } from './api';
import { ChatMessage, ChatResponse, Farmer } from '../types';
import { getDemoBhumiResponse } from '../data/demoData';

export const bhumiService = {
  chat: async (message: string, farmerContext: Farmer | null, preferredLanguage: string): Promise<ChatResponse> => {
    try {
      const backendResponse = await api.post<{ response: string }>(`/bhumi/chat`, {
        message,
        farmer_context: farmerContext ? {
          id: farmerContext.id,
          name: farmerContext.name,
          crops: [farmerContext.farmDetails?.primaryCrop].filter(Boolean),
          location: farmerContext.location?.region || ''
        } : null,
        preferred_language: preferredLanguage
      });
      // Map backend response shape to frontend ChatResponse shape
      return { text: backendResponse.response };
    } catch (error) {
      console.warn('Failed to reach Bhumi API, using fallback engine', error);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return getDemoBhumiResponse(message);
    }
  },

  getHistory: async (farmerId: string): Promise<ChatMessage[]> => {
    try {
      return await api.get<ChatMessage[]>(`/bhumi/history/${farmerId}`);
    } catch (error) {
      console.warn('Failed to fetch chat history, returning empty', error);
      return [
        {
          id: 'msg-1',
          sender: 'bot',
          text: 'Namaskaram! I am Bhumi, your Krishi Mithra. How can I assist you with your farm today?',
          timestamp: new Date().toISOString()
        }
      ];
    }
  }
};
