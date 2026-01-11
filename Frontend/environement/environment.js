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

// API base URL (includes /api/v1)
const API_BASE_URL = getApiBaseUrl();

// Backend base URL (without /api/v1) - for images served from /uploads
const getBackendBaseUrl = () => {
  return API_BASE_URL.replace('/api/v1', '');
};

const BACKEND_BASE_URL = getBackendBaseUrl();

// API endpoints
export const API_PROJECTS = `${API_BASE_URL}/projects`;
export const API_PARTNERS = `${API_BASE_URL}/partners`;
export const API_HERO = `${API_BASE_URL}/hero`;

// Export URLs
export { API_BASE_URL, BACKEND_BASE_URL };

export default {
  API_BASE_URL,
  BACKEND_BASE_URL,
  API_PROJECTS,
  API_PARTNERS,
  API_HERO,
};

