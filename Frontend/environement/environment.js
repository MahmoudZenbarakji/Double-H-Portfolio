// environment.js
const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl) {
    return envUrl.endsWith('/api/v1') ? envUrl : envUrl.replace(/\/?$/, '/api/v1');
  }
  return import.meta.env.DEV ? 'http://localhost:3000/api/v1' : 'https://double-h-portfolio.vercel.app/api/v1';
};

export const API_BASE_URL = getApiBaseUrl();
export const BACKEND_BASE_URL = API_BASE_URL.replace('/api/v1', '');

// API Endpoints
export const API_PROJECTS = `${API_BASE_URL}/projects`;
export const API_PARTNERS = `${API_BASE_URL}/partners`;
export const API_HERO = `${API_BASE_URL}/hero`;
