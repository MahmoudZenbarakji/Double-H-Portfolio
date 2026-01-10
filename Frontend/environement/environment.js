// API Configuration
const API_CONFIG = {
  // Local development
  local: {
    baseURL: 'http://localhost:3000',
    projects: 'http://localhost:3000/api/v1/projects',
    partners: 'http://localhost:3000/api/v1/partners',
  },
  // Production
  production: {
    baseURL: 'https://your-production-domain.com',
    projects: 'https://your-production-domain.com/api/v1/projects',
    partners: 'https://your-production-domain.com/api/v1/partners',
  },
};

// Determine which environment to use
const isDevelopment = import.meta.env.DEV || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const currentEnv = isDevelopment ? API_CONFIG.local : API_CONFIG.production;

// Export API endpoints
export const API_BASE_URL = currentEnv.baseURL;
export const API_PROJECTS = currentEnv.projects;
export const API_PARTNERS = currentEnv.partners;

export default {
  API_BASE_URL,
  API_PROJECTS,
  API_PARTNERS,
};

