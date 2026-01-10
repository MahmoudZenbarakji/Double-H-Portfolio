import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import API_ENDPOINTS from '../config/api';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_ENDPOINTS.projects.getById(id));
      if (response.data.success) {
        setProject(response.data.data);
        if (response.data.data.images && response.data.data.images.length > 0) {
          setSelectedImage(0);
        }
      }
    } catch (err) {
      setError('Failed to fetch project');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      await axios.delete(API_ENDPOINTS.projects.delete(id));
      navigate('/dashboard/projects');
    } catch (err) {
      alert('Failed to delete project');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="project-detail">
        <div className="loading">Loading project...</div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="project-detail">
        <div className="error-banner">{error || 'Project not found'}</div>
        <Link to="/dashboard/projects" className="btn-back">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="project-detail">
      <div className="project-detail-header">
        <button 
          type="button"
          onClick={() => navigate('/dashboard/projects')} 
          className="btn-back"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"></path>
          </svg>
          Back to Projects
        </button>
        <div className="header-actions">
          <Link to={`/dashboard/projects/edit/${id}`} className="btn-edit-header">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            Edit
          </Link>
          <button onClick={handleDelete} className="btn-delete-header">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
            Delete
          </button>
        </div>
      </div>

      <div className="project-detail-content">
        <div className="project-main-info">
          <h1>{project.name}</h1>
          
          {project.date && (
            <div className="project-meta">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>{new Date(project.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
          )}

          {project.link && (
            <div className="project-meta">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="project-link"
              >
                {project.link}
              </a>
            </div>
          )}

          <div className="project-description-full">
            <h2>Description</h2>
            <p>{project.description}</p>
          </div>
        </div>

        {project.images && project.images.length > 0 && (
          <div className="project-images-section">
            <h2>Project Images ({project.images.length})</h2>
            
            {selectedImage !== null && (
              <div className="main-image-container">
                <img
                  src={`http://localhost:3000${project.images[selectedImage]}`}
                  alt={`${project.name} - Image ${selectedImage + 1}`}
                  className="main-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="image-error" style={{ display: 'none' }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                  <p>Image not available</p>
                </div>
              </div>
            )}

            {project.images.length > 1 && (
              <div className="image-thumbnails">
                {project.images.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={`http://localhost:3000${image}`}
                      alt={`Thumbnail ${index + 1}`}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;

