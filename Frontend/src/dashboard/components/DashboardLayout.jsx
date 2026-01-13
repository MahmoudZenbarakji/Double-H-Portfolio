import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './DashboardLayout.css';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    try {
      const saved = localStorage.getItem('sidebarOpen');
      if (saved === null || saved === '') {
        return true;
      }
      return JSON.parse(saved);
    } catch (error) {
      // If parsing fails, clear the invalid value and return default
      localStorage.removeItem('sidebarOpen');
      return true;
    }
  });

  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      <div className={`dashboard-content ${!isSidebarOpen ? 'sidebar-collapsed' : ''}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;

