import axios from 'axios';
import API_ENDPOINTS from '../config/api';

// Get API base URL from environment variable
// VITE_API_BASE_URL MUST include /api/v1
const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl) {
    // Ensure it includes /api/v1
    if (envUrl.endsWith('/api/v1')) {
      return envUrl;
    }
    // If it doesn't end with /api/v1, add it
    return envUrl.endsWith('/') 
      ? `${envUrl}api/v1` 
      : `${envUrl}/api/v1`;
  }
  // Fallback based on environment
  return import.meta.env.DEV 
    ? 'http://localhost:3000/api/v1' 
    : 'https://double-h-portfolio.vercel.app/api/v1';
};

const API_BASE_URL = getApiBaseUrl();

// Create axios instance with default config
// Note: API_ENDPOINTS already includes full URLs, so baseURL is optional
// but kept for consistency and direct apiClient usage
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;

