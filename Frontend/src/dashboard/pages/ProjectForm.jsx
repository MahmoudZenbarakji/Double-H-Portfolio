import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import API_ENDPOINTS from '../config/api';
import './ProjectForm.css';

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    link: '',
  });
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_ENDPOINTS.projects.getById(id));
      if (response.data.success) {
        const project = response.data.data;
        setFormData({
          name: project.name || '',
          description: project.description || '',
          date: project.date ? new Date(project.date).toISOString().split('T')[0] : '',
          link: project.link || '',
        });
        setExistingImages(project.images || []);
      }
    } catch (err) {
      setError('Failed to fetch project');
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
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleRemoveExistingImage = (imagePath) => {
    setExistingImages(existingImages.filter(img => img !== imagePath));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      if (formData.date) {
        formDataToSend.append('date', formData.date);
      }
      if (formData.link) {
        formDataToSend.append('link', formData.link);
      }

      // Add new images
      images.forEach((image) => {
        formDataToSend.append('images', image);
      });

      if (isEdit) {
        // Update project - note: backend update route doesn't handle file uploads
        // You may need to add upload middleware to the update route for image updates
        await axios.put(API_ENDPOINTS.projects.update(id), {
          name: formData.name,
          description: formData.description,
          date: formData.date || undefined,
          link: formData.link || undefined,
        });
        // TODO: If you need to update images, add file upload support to the backend update route
      } else {
        await axios.post(API_ENDPOINTS.projects.create, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      navigate('/dashboard/projects');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save project');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) {
    return (
      <div className="project-form">
        <div className="loading">Loading project...</div>
      </div>
    );
  }

  return (
    <div className="project-form">
      <div className="form-header">
        <h1>{isEdit ? 'Edit Project' : 'Create New Project'}</h1>
        <button onClick={() => navigate('/dashboard/projects')} className="btn-secondary">
          Cancel
        </button>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-section">
          <label htmlFor="name">
            Project Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter project name"
            required
          />
        </div>

        <div className="form-section">
          <label htmlFor="description">
            Description <span className="required">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter project description"
            rows="6"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-section">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div className="form-section">
            <label htmlFor="link">Project Link</label>
            <input
              type="url"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="https://example.com"
            />
          </div>
        </div>

        <div className="form-section">
          <label htmlFor="images">
            {isEdit ? 'Add New Images' : 'Images'}
            {!isEdit && <span className="required">*</span>}
          </label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleImageChange}
            multiple
            accept="image/*"
            required={!isEdit}
          />
          <p className="form-hint">You can select multiple images (max 10)</p>
        </div>

        {isEdit && existingImages.length > 0 && (
          <div className="form-section">
            <label>Existing Images</label>
            <div className="existing-images">
              {existingImages.map((image, index) => (
                <div key={index} className="image-preview">
                  <img
                    src={`http://localhost:3000${image}`}
                    alt={`Project ${index + 1}`}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveExistingImage(image)}
                    className="remove-image"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {images.length > 0 && (
          <div className="form-section">
            <label>New Images Preview</label>
            <div className="image-preview-list">
              {Array.from(images).map((image, index) => (
                <div key={index} className="image-preview">
                  <img src={URL.createObjectURL(image)} alt={`Preview ${index + 1}`} />
                  <button
                    type="button"
                    onClick={() => setImages(images.filter((_, i) => i !== index))}
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
            {loading ? 'Saving...' : isEdit ? 'Update Project' : 'Create Project'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/dashboard/projects')}
            className="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;

