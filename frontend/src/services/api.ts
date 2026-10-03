export const BASE_URL = import.meta.env.VITE_API_URL || '/api';

interface RequestOptions extends RequestInit {
  timeout?: number;
}

const fetchWithTimeout = async (url: string, options: RequestOptions = {}) => {
  const { timeout = 8000, ...rest } = options;
  
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...rest,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...rest.headers,
      },
    });
    
    clearTimeout(id);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error: any) {
    clearTimeout(id);
    if (error.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw error;
  }
};

export const api = {
  get: <T>(endpoint: string, options?: RequestOptions): Promise<T> => {
    return fetchWithTimeout(`${BASE_URL}${endpoint}`, { ...options, method: 'GET' });
  },
  
  post: <T>(endpoint: string, data: any, options?: RequestOptions): Promise<T> => {
    return fetchWithTimeout(`${BASE_URL}${endpoint}`, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  put: <T>(endpoint: string, data: any, options?: RequestOptions): Promise<T> => {
    return fetchWithTimeout(`${BASE_URL}${endpoint}`, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
};
