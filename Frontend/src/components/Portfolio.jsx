// Portfolio component - the public-facing site
import Navbar from "./Navbar";
import Hero from "./Hero";
import PartnersSlider from "./PartnersSlider";
import CreativeShowcase from "./CreativeShowcase";
import ServicesSection from "./ServicesSection";
import ProjectsSection from "./ProjectsSection";
import Footer from "./Footer";

function Portfolio() {
  return (
    <div className="App">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section id="hero">
        <Hero />
      </section>

      {/* Partners Slider Section */}
      <PartnersSlider />

      {/* Welcome Section */}
      <section id="creative-showcase">
        <CreativeShowcase />
      </section>

      {/* Services Section */}
      <section id="services">
        <ServicesSection />
      </section>

      {/* Projects Section */}
      <section id="projects">
        <ProjectsSection />
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default Portfolio;

