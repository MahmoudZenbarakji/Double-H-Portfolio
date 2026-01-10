import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import API_ENDPOINTS from '../config/api';
import './PartnerForm.css';

const PartnerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: '',
  });
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      fetchPartner();
    }
  }, [id]);

  const fetchPartner = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_ENDPOINTS.partners.getById(id));
      if (response.data.success) {
        const partner = response.data.data;
        setFormData({
          name: partner.name || '',
        });
        if (partner.image) {
          setExistingImage(partner.image);
          setImagePreview(`https://double-h-portfolio.vercel.app:3000${partner.image}`);
        }
      }
    } catch (err) {
      setError('Failed to fetch partner');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
    setExistingImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);

      if (isEdit) {
        // Update partner
        if (image) {
          // If new image is uploaded, include it
          formDataToSend.append('image', image);
          await axios.put(API_ENDPOINTS.partners.update(id), formDataToSend, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        } else {
          // If no new image, just update the name
          await axios.put(API_ENDPOINTS.partners.update(id), {
            name: formData.name,
          });
        }
      } else {
        // Create new partner
        if (!image) {
          setError('Partner image is required');
          setLoading(false);
          return;
        }
        formDataToSend.append('image', image);
        await axios.post(API_ENDPOINTS.partners.create, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      navigate('/dashboard/partners');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save partner');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) {
    return (
      <div className="partner-form">
        <div className="loading">Loading partner...</div>
      </div>
    );
  }

  return (
    <div className="partner-form">
      <div className="form-header">
        <h1>{isEdit ? 'Edit Partner' : 'Add New Partner'}</h1>
        <button onClick={() => navigate('/dashboard/partners')} className="btn-secondary">
          Cancel
        </button>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-section">
          <label htmlFor="name">
            Partner Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter partner name"
            required
          />
        </div>

        <div className="form-section">
          <label htmlFor="image">
            Partner Image
            {!isEdit && <span className="required">*</span>}
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            required={!isEdit}
          />
          <p className="form-hint">Upload partner logo or image (max 5MB)</p>
        </div>

        {(imagePreview || existingImage) && (
          <div className="form-section">
            <label>Image Preview</label>
            <div className="image-preview-container">
              <div className="image-preview">
                <img
                  src={imagePreview || `https://double-h-portfolio.vercel.app:3000${existingImage}`}
                  alt="Partner preview"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="remove-image"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Saving...' : isEdit ? 'Update Partner' : 'Create Partner'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/dashboard/partners')}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PartnerForm;

