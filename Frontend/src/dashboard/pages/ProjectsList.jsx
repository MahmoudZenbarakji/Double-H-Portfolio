import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../utils/axios';
import API_ENDPOINTS from '../config/api';
import getImageUrl from '../utils/imageUrl';
import './ProjectsList.css';

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(API_ENDPOINTS.projects.getAll);
      if (response.data.success) {
        setProjects(response.data.data);
      }
    } catch (err) {
      setError('Failed to fetch projects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      await apiClient.delete(API_ENDPOINTS.projects.delete(id));
      fetchProjects();
    } catch (err) {
      alert('Failed to delete project');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="projects-list">
        <div className="loading">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="projects-list">
      <div className="projects-header">
        <div>
          <h1>Projects</h1>
          <p>Manage your portfolio projects</p>
        </div>
        <Link to="/dashboard/projects/new" className="btn-primary">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          New Project
        </Link>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {projects.length === 0 ? (
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          </svg>
          <h3>No projects yet</h3>
          <p>Get started by creating your first project</p>
          <Link to="/dashboard/projects/new" className="btn-primary">
            Create Project
          </Link>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project._id} className="project-card">
              {project.images && project.images.length > 0 && (
                <div className="project-image">
                  <img
                    src={getImageUrl(project.images[0])}
                    alt={project.name}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
              <div className="project-content">
                <h3>{project.name}</h3>
                <p className="project-description">
                  {project.description?.substring(0, 100)}
                  {project.description?.length > 100 ? '...' : ''}
                </p>
                {project.date && (
                  <p className="project-date">
                    {new Date(project.date).toLocaleDateString()}
                  </p>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    View Project →
                  </a>
                )}
                <div className="project-actions">
                  <Link
                    to={`/dashboard/projects/view/${project._id}`}
                    className="btn-view"
                  >
                    View
                  </Link>
                  <Link
                    to={`/dashboard/projects/edit/${project._id}`}
                    className="btn-edit"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(project._id)}
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

export default ProjectsList;

