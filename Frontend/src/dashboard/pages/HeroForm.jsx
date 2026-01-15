import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../utils/axios';
import API_ENDPOINTS from '../config/api';
import getImageUrl from '../utils/imageUrl';
import './HeroForm.css';

const HeroForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [images, setImages] = useState([]);
  const [existingImage, setExistingImage] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const previewsRef = useRef([]);

  useEffect(() => {
    if (isEdit) {
      fetchHeroImage();
    }
  }, [id]);

  // Update ref when previews change
  useEffect(() => {
    previewsRef.current = imagePreviews;
  }, [imagePreviews]);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      previewsRef.current.forEach(preview => {
        if (preview && preview.startsWith('blob:')) {
          URL.revokeObjectURL(preview);
        }
      });
    };
  }, []);

  const fetchHeroImage = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(API_ENDPOINTS.hero.getAll);
      if (response.data.success) {
        const heroImage = response.data.data.find(img => img._id === id);
        if (heroImage) {
          setExistingImage(heroImage.images);
          setImagePreviews([getImageUrl(heroImage.images)]);
        }
      }
    } catch (err) {
      setError('Failed to fetch hero image');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // Limit to 10 images
      const filesToAdd = files.slice(0, 10);
      const newImages = [...images, ...filesToAdd];
      setImages(newImages);
      
      // Create previews for new images
      const newPreviews = filesToAdd.map(file => URL.createObjectURL(file));
      setImagePreviews([...imagePreviews, ...newPreviews]);
    }
  };

  const handleRemoveImage = (index) => {
    // Revoke the object URL to free memory
    if (imagePreviews[index]) {
      URL.revokeObjectURL(imagePreviews[index]);
    }
    
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    
    setImages(newImages);
    setImagePreviews(newPreviews);
    
    // If editing and removing the only existing image
    if (isEdit && existingImage && newPreviews.length === 0) {
      setExistingImage(null);
    }
  };

  const handleRemoveAllImages = () => {
    // Revoke all object URLs
    imagePreviews.forEach(preview => {
      if (preview && preview.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    });
    
    setImages([]);
    setImagePreviews([]);
    setExistingImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formDataToSend = new FormData();

      if (isEdit) {
        // Update hero image (single image for edit)
        if (images.length > 0) {
          formDataToSend.append('image', images[0]);
          await apiClient.put(API_ENDPOINTS.hero.update(id), formDataToSend, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        } else {
          setError('Please select a new image to update');
          setLoading(false);
          return;
        }
      } else {
        // Create new hero images (multiple images allowed)
        if (images.length === 0) {
          setError('Please select at least one image');
          setLoading(false);
          return;
        }
        
        // Append all images
        images.forEach((image) => {
          formDataToSend.append('images', image);
        });
        
        await apiClient.post(API_ENDPOINTS.hero.create, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      // Clean up object URLs
      imagePreviews.forEach(preview => {
        if (preview && preview.startsWith('blob:')) {
          URL.revokeObjectURL(preview);
        }
      });

      navigate('/dashboard/hero');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save hero image(s)');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) {
    return (
      <div className="hero-form">
        <div className="loading">Loading hero image...</div>
      </div>
    );
  }

  return (
    <div className="hero-form">
      <div className="form-header">
        <h1>{isEdit ? 'Edit Hero Image' : 'Add New Hero Image'}</h1>
        <button onClick={() => navigate('/dashboard/hero')} className="btn-secondary">
          Cancel
        </button>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-section">
          <label htmlFor="images">
            Hero Image{isEdit ? '' : 's'} <span className="required">*</span>
          </label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleImageChange}
            accept="image/*"
            multiple={!isEdit}
            required={!isEdit || !existingImage}
          />
          <p className="form-hint">
            {isEdit 
              ? 'Upload hero section image (max 5MB, recommended: 1920x1080 or higher)'
              : 'Upload hero section images (max 10 images, 5MB each, recommended: 1920x1080 or higher)'}
          </p>
          {!isEdit && images.length > 0 && (
            <p className="form-hint" style={{ color: '#059669', marginTop: '4px' }}>
              {images.length} image{images.length !== 1 ? 's' : ''} selected
            </p>
          )}
        </div>

        {(imagePreviews.length > 0 || existingImage) && (
          <div className="form-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <label>Image Preview{!isEdit && imagePreviews.length > 1 ? 's' : ''}</label>
              {!isEdit && images.length > 0 && (
                <button
                  type="button"
                  onClick={handleRemoveAllImages}
                  className="btn-remove-all"
                >
                  Remove All
                </button>
              )}
            </div>
            <div className="image-preview-container multiple">
              {existingImage && imagePreviews.length === 0 && (
                <div className="image-preview">
                  <img
                    src={getImageUrl(existingImage)}
                    alt="Hero preview"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(0)}
                    className="remove-image"
                  >
                    ×
                  </button>
                </div>
              )}
              {imagePreviews.map((preview, index) => (
                <div key={index} className="image-preview">
                  <img
                    src={preview}
                    alt={`Hero preview ${index + 1}`}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="remove-image"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Saving...' : isEdit ? 'Update Image' : images.length > 1 ? `Add ${images.length} Images` : 'Add Image'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/dashboard/hero')}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default HeroForm;
