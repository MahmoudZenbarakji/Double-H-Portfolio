<<<<<<< HEAD
// src/App.jsx
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PartnersSlider from "./components/PartnersSlider";
import CreativeShowcase from "./components/CreativeShowcase"; 
import ServicesSection from "./components/ServicesSection"; 
import ProjectsSection from "./components/ProjectsSection"; 
import ContactCTA from "./components/ContactCTA"; // ✅ استيراد السكشن الجديد
import Footer from "./components/Footer"; 

function App() {
  return (
    <div className="App">
      <Navbar />

      <section id="hero">
        <Hero />
      </section>

      <PartnersSlider />

      <section id="creative-showcase">
        <CreativeShowcase />
      </section>

      <section id="services">
        <ServicesSection />
      </section>

      <section id="projects">
        <ProjectsSection />
      </section>

      {/* ✅ السكشن الجديد قبل الفوتر مباشرة */}
      <ContactCTA />

      <Footer />
    </div>
=======
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Portfolio from './components/Portfolio';
import Login from './dashboard/pages/Login';
import DashboardLayout from './dashboard/components/DashboardLayout';
import DashboardHome from './dashboard/pages/DashboardHome';
import ProjectsList from './dashboard/pages/ProjectsList';
import ProjectForm from './dashboard/pages/ProjectForm';
import ProjectDetail from './dashboard/pages/ProjectDetail';
import PartnersList from './dashboard/pages/PartnersList';
import PartnerForm from './dashboard/pages/PartnerForm';
import HeroList from './dashboard/pages/HeroList';
import HeroForm from './dashboard/pages/HeroForm';
import ProtectedRoute from './dashboard/components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Portfolio Site */}
        <Route path="/" element={<Portfolio />} />
        
        {/* Dashboard Login */}
        <Route path="/login" element={<Login />} />
        
        {/* Dashboard Routes (Protected) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="projects" element={<ProjectsList />} />
          <Route path="projects/new" element={<ProjectForm />} />
          <Route path="projects/view/:id" element={<ProjectDetail />} />
          <Route path="projects/edit/:id" element={<ProjectForm />} />
          <Route path="partners" element={<PartnersList />} />
          <Route path="partners/new" element={<PartnerForm />} />
          <Route path="partners/edit/:id" element={<PartnerForm />} />
          <Route path="hero" element={<HeroList />} />
          <Route path="hero/new" element={<HeroForm />} />
          <Route path="hero/edit/:id" element={<HeroForm />} />
        </Route>
        
        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
>>>>>>> 70f0344d9aefa64b5af8eb87617d6002e2d5b617
  );
}

export default App;
