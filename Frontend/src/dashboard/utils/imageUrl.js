// Utility to get full image URL
// Images are now stored in Cloudinary, so they're already full URLs
const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  
  // If already a full URL (Cloudinary), return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Fallback: if it's a local path (shouldn't happen with Cloudinary), construct URL
  // This is for backward compatibility
  const getBackendBaseUrl = () => {
    const envUrl = import.meta.env.VITE_API_BASE_URL;
    if (envUrl) {
      return envUrl.replace('/api/v1', '').replace(/\/$/, '');
    }
    return import.meta.env.DEV 
      ? 'http://localhost:3000' 
      : 'https://double-h-portfolio.vercel.app';
  };
  
  const backendUrl = getBackendBaseUrl();
  const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${backendUrl}${normalizedPath}`;
};

export default getImageUrl;

