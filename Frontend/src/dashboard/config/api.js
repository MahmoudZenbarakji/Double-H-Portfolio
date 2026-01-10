// API Configuration
// Use environment variable for API base URL
// In production: https://double-h-portfolio.vercel.app
// In development: http://localhost:3000
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.DEV 
    ? 'http://localhost:3000/api/v1' 
    : 'https://double-h-portfolio.vercel.app/api/v1');

export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    verify: `${API_BASE_URL}/auth/verify`,
  },
  projects: {
    getAll: `${API_BASE_URL}/projects`,
    getById: (id) => `${API_BASE_URL}/projects/${id}`,
    create: `${API_BASE_URL}/projects`,
    update: (id) => `${API_BASE_URL}/projects/${id}`,
    delete: (id) => `${API_BASE_URL}/projects/${id}`,
  },
  partners: {
    getAll: `${API_BASE_URL}/partners`,
    getById: (id) => `${API_BASE_URL}/partners/${id}`,
    create: `${API_BASE_URL}/partners`,
    update: (id) => `${API_BASE_URL}/partners/${id}`,
    delete: (id) => `${API_BASE_URL}/partners/${id}`,
  },
  hero: {
    getAll: `${API_BASE_URL}/hero`,
    create: `${API_BASE_URL}/hero`,
    update: (id) => `${API_BASE_URL}/hero/${id}`,
    delete: (id) => `${API_BASE_URL}/hero/${id}`,
  },
};

export default API_ENDPOINTS;

