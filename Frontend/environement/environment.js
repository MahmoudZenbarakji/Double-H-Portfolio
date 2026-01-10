// API Configuration
const API_CONFIG = {
  // Local development
  local: {
    baseURL: 'https://double-h-portfolio.vercel.app',
    projects: 'https://double-h-portfolio.vercel.app/api/v1/projects',
    partners: 'https://double-h-portfolio.vercel.app/api/v1/partners',
  },
  // Production
  production: {
    baseURL: 'https://double-h-portfolio-git-main-mahmouds-projects-a72a8653.vercel.app/',
    projects: 'https://double-h-portfolio-git-main-mahmouds-projects-a72a8653.vercel.app/api/v1/projects',
    partners: 'https://double-h-portfolio-git-main-mahmouds-projects-a72a8653.vercel.app//api/v1/partners',
    hero: 'https://double-h-portfolio.vercel.app/api/v1/hero',
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

