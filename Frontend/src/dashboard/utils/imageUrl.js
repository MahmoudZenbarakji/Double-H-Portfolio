// Utility to get full image URL
// Images are served from the backend at /uploads
const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  
  // If already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Get backend base URL (without /api/v1)
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
    (import.meta.env.DEV 
      ? 'http://localhost:3000/api/v1' 
      : 'https://double-h-portfolio.vercel.app/api/v1');
  
  const backendUrl = API_BASE_URL.replace('/api/v1', '');
  return `${backendUrl}${imagePath}`;
};

export default getImageUrl;

