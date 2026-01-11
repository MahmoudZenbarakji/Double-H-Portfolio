// API Configuration
// VITE_API_BASE_URL MUST include /api/v1
// Production: https://double-h-portfolio.vercel.app/api/v1
// Development: http://localhost:3000/api/v1

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

