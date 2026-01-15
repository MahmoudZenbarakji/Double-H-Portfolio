import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../utils/axios';
import API_ENDPOINTS from '../config/api';
import getImageUrl from '../utils/imageUrl';
import './HeroList.css';

const HeroList = () => {
  const [heroImages, setHeroImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHeroImages();
  }, []);

  const fetchHeroImages = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(API_ENDPOINTS.hero.getAll);
      if (response.data.success) {
        setHeroImages(response.data.data);
      }
    } catch (err) {
      setError('Failed to fetch hero images');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this hero image?')) {
      return;
    }

    try {
      await apiClient.delete(API_ENDPOINTS.hero.delete(id));
      fetchHeroImages();
    } catch (err) {
      alert('Failed to delete hero image');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="hero-list">
        <div className="loading">Loading hero images...</div>
      </div>
    );
  }

  return (
    <div className="hero-list">
      <div className="hero-header">
        <div>
          <h1>Hero Section Images</h1>
          <p>Manage the images displayed in the hero section</p>
        </div>
        <Link to="/dashboard/hero/new" className="btn-primary">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Image
        </Link>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {heroImages.length === 0 ? (
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
          <h3>No hero images yet</h3>
          <p>Get started by adding your first hero image</p>
          <Link to="/dashboard/hero/new" className="btn-primary">
            Add Image
          </Link>
        </div>
      ) : (
        <div className="hero-grid">
          {heroImages.map((hero) => (
            <div key={hero._id} className="hero-card">
              <div className="hero-image">
                <img
                  src={getImageUrl(hero.images)}
                  alt="Hero section"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div className="hero-content">
                <div className="hero-info">
                  <p className="hero-date">
                    Added: {new Date(hero.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="hero-actions">
                  <Link
                    to={`/dashboard/hero/edit/${hero._id}`}
                    className="btn-edit"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(hero._id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroList;
