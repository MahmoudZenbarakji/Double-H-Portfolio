// Utility to get full image URL
// Images are served from the backend at /uploads (not under /api/v1)
const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  
  // If already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Get backend base URL (without /api/v1)
  // VITE_API_BASE_URL includes /api/v1, so we remove it to get backend base
  const getBackendBaseUrl = () => {
    const envUrl = import.meta.env.VITE_API_BASE_URL;
    if (envUrl) {
      // Remove /api/v1 if present
      return envUrl.replace('/api/v1', '').replace(/\/$/, '');
    }
    // Fallback based on environment
    return import.meta.env.DEV 
      ? 'http://localhost:3000' 
      : 'https://double-h-portfolio.vercel.app';
  };
  
  const backendUrl = getBackendBaseUrl();
  // Ensure imagePath starts with / if it doesn't already
  const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${backendUrl}${normalizedPath}`;
};

export default getImageUrl;

