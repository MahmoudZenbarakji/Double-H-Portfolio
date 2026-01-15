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
  );
}

export default App;