import './DashboardHome.css';

const DashboardHome = () => {
  const username = localStorage.getItem('username') || 'Admin';

  return (
    <div className="dashboard-home">
      <div className="dashboard-header">
        <h1>Welcome back, {username}!</h1>
        <p>Manage your portfolio projects from here</p>
      </div>
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon projects">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            </svg>
          </div>
          <div className="stat-content">
            <h3>Projects</h3>
            <p>Manage your portfolio projects</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon add">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
          <div className="stat-content">
            <h3>Add New</h3>
            <p>Create a new project</p>
          </div>
        </div>
      </div>
      <div className="dashboard-quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <a href="/dashboard/projects" className="action-card">
            <h3>View All Projects</h3>
            <p>See and manage all your projects</p>
          </a>
          <a href="/dashboard/projects/new" className="action-card">
            <h3>Create New Project</h3>
            <p>Add a new project to your portfolio</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

