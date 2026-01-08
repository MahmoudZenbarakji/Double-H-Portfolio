import logo from "../assets/images/doubleh.png";
import { Link } from "react-scroll";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    // غير كلاس الـ footer في ملف الفوتر:
<footer className="w-full bg-gradient-to-b from-[#143939] to-[#0d2424] text-white pt-16 pb-8 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Logo + Description */}
        <div className="flex flex-col items-start gap-6 -mt-16">
          <img
            src={logo}
            alt="DOUBLE H Logo"
            className="h-40 w-auto object-contain"
          />
          <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
            DOUBLE H BIM SERVICES — Modern architectural designs and integrated
            visual identity.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-6 relative after:content-[''] after:block after:w-12 after:h-[2px] after:bg-green-400 after:mt-2">
            Quick Links
          </h3>
          <ul className="space-y-3 text-gray-300">
            {[
              { to: "hero", label: "Home" },
              { to: "creative-showcase", label: "About Us" },
              { to: "services", label: "Services" }, // Linked to ServicesSection
              { to: "projects", label: "Projects" }, // Linked to ProjectsSection
            ].map((link, i) => (
              <li key={i}>
                <Link
                  to={link.to}
                  smooth={true}
                  duration={500}
                  offset={-80} // optional: adjust if you have sticky header
                  className="cursor-pointer hover:text-green-300 transition relative group"
                >
                  {link.label}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-300 transition-all group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-6 relative after:content-[''] after:block after:w-12 after:h-[2px] after:bg-green-400 after:mt-2">
            Contact
          </h3>
          <p className="text-gray-300 text-l">Email: double.h.bim@gmail.com</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-6 relative after:content-[''] after:block after:w-12 after:h-[2px] after:bg-green-400 after:mt-2">
            Follow Us
          </h3>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-gray-300 hover:text-green-300 transition"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-green-300 transition"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-green-300 transition"
            >
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-16 border-t border-gray-700/50 pt-6 text-center text-gray-400 text-sm tracking-wide">
        © {new Date().getFullYear()} DOUBLE H BIM SERVICES. All rights reserved.
      </div>
    </footer>
  );
}