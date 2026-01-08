import { useState } from "react";
import { Link } from "react-scroll";
import logo from "../assets/images/doubleh.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-[#143939] shadow-md h-20 flex items-center">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 h-full">
          <img
            src={logo}
            alt="DOUBLE H Logo"
            className="h-35 w-auto object-contain"
          />
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 text-white font-medium text-lg items-center">
          <li>
            <Link to="hero" smooth={true} duration={500} offset={-80}
              className="cursor-pointer hover:text-green-300 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="creative-showcase" smooth={true} duration={500} offset={-80}
              className="cursor-pointer hover:text-green-300 transition">
              About Us
            </Link>
          </li>
          <li>
            <Link to="services" smooth={true} duration={500} offset={-80}
              className="cursor-pointer hover:text-green-300 transition">
              Services
            </Link>
          </li>
          <li>
            <Link to="projects" smooth={true} duration={500} offset={-80}
              className="cursor-pointer hover:text-green-300 transition">
              Projects
            </Link>
          </li>

          {/* ✅ Contact Us Button */}
          <li>
            <a
              href="mailto:double.h.bim@gmail.com"
              className="ml-4 px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-[#143939] font-semibold shadow-md transition transform hover:scale-105"
            >
              Contact Us
            </a>
          </li>
        </ul>

        {/* Burger Icon (Mobile) */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Dropdown Menu (Mobile) */}
      {isOpen && (
        <div className="absolute top-20 right-6 w-45 bg-white/90 rounded-lg shadow-xl py-4 px-6 animate-bookOpenRight">
          <Link to="hero" smooth={true} duration={500} offset={-80}
            className="block text-green-800 text-lg font-semibold hover:text-green-900 transition mb-2"
            onClick={() => setIsOpen(false)}>
            Home
          </Link>

          <div className="h-px w-full bg-gradient-to-r from-green-800 to-gray-500 opacity-70 mb-2"></div>

          <Link to="creative-showcase" smooth={true} duration={500} offset={-80}
            className="block text-green-800 text-lg font-semibold hover:text-green-900 transition mb-2"
            onClick={() => setIsOpen(false)}>
            About Us
          </Link>

          <div className="h-px w-full bg-gradient-to-r from-green-800 to-gray-500 opacity-70 mb-2"></div>

          <Link to="services" smooth={true} duration={500} offset={-80}
            className="block text-green-800 text-lg font-semibold hover:text-green-900 transition mb-2"
            onClick={() => setIsOpen(false)}>
            Services
          </Link>

          <div className="h-px w-full bg-gradient-to-r from-green-800 to-gray-500 opacity-70 mb-2"></div>

          <Link to="projects" smooth={true} duration={500} offset={-80}
            className="block text-green-800 text-lg font-semibold hover:text-green-900 transition mb-2"
            onClick={() => setIsOpen(false)}>
            Projects
          </Link>

          <div className="h-px w-full bg-gradient-to-r from-green-800 to-gray-500 opacity-70 mb-2"></div>

          {/* ✅ Contact Us Button for Mobile */}
          <a
            href="mailto:double.h.bim@gmail.com"
            className="block text-center bg-gray-300 hover:bg-gray-400 text-[#143939] font-semibold rounded-lg py-2 mt-2 shadow-md transition transform hover:scale-105"
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </a>
        </div>
      )}
    </nav>
  );
}