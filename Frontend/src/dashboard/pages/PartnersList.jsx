import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../utils/axios';
import API_ENDPOINTS from '../config/api';
import getImageUrl from '../utils/imageUrl';
import './PartnersList.css';

const PartnersList = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(API_ENDPOINTS.partners.getAll);
      if (response.data.success) {
        setPartners(response.data.data);
      }
    } catch (err) {
      setError('Failed to fetch partners');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this partner?')) {
      return;
    }

    try {
      await apiClient.delete(API_ENDPOINTS.partners.delete(id));
      fetchPartners();
    } catch (err) {
      alert('Failed to delete partner');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="partners-list">
        <div className="loading">Loading partners...</div>
      </div>
    );
  }

  return (
    <div className="partners-list">
      <div className="partners-header">
        <div>
          <h1>Partners</h1>
          <p>Manage your success partners</p>
        </div>
        <Link to="/dashboard/partners/new" className="btn-primary">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          New Partner
        </Link>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {partners.length === 0 ? (
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <h3>No partners yet</h3>
          <p>Get started by adding your first partner</p>
          <Link to="/dashboard/partners/new" className="btn-primary">
            Add Partner
          </Link>
        </div>
      ) : (
        <div className="partners-grid">
          {partners.map((partner) => (
            <div key={partner._id} className="partner-card">
              {partner.image && (
                <div className="partner-image">
                  <img
                    src={getImageUrl(partner.image)}
                    alt={partner.name}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
              <div className="partner-content">
                <h3>{partner.name}</h3>
                <div className="partner-actions">
                  <Link
                    to={`/dashboard/partners/edit/${partner._id}`}
                    className="btn-edit"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(partner._id)}
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

export default PartnersList;

