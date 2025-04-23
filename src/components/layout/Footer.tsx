import React from 'react';
import { Link } from 'react-router-dom';
import { CarFront, Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary-900 text-primary-100 pt-12 pb-6">
      <div className="container-custom">
        {/* Footer Top - Logo and Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <CarFront size={32} className="text-accent-400" />
              <span className="text-xl font-bold text-white">AutoPrestige</span>
            </Link>
            <p className="mt-4 text-primary-300 text-sm">
              Premium dealership for luxury and performance vehicles. 
              Experience excellence in automotive retail.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-primary-300 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-primary-300 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-primary-300 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-primary-300 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-300 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/inventory" className="text-primary-300 hover:text-white transition-colors text-sm">
                  Inventory
                </Link>
              </li>
              <li>
                <Link to="/compare" className="text-primary-300 hover:text-white transition-colors text-sm">
                  Compare
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-300 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-300 hover:text-white transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Our Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-primary-300 hover:text-white transition-colors text-sm">
                  Car Sales
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-300 hover:text-white transition-colors text-sm">
                  Trade-In
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-300 hover:text-white transition-colors text-sm">
                  Financing
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-300 hover:text-white transition-colors text-sm">
                  Service & Maintenance
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-300 hover:text-white transition-colors text-sm">
                  Parts & Accessories
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail size={18} className="text-primary-300 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-primary-300 text-sm">
                  info@autoprestige.com
                </span>
              </li>
              <li className="flex items-start">
                <Phone size={18} className="text-primary-300 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-primary-300 text-sm">
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="text-primary-300 text-sm">
                <p className="mb-1">Headquarters:</p>
                <address className="not-italic">
                  123 Luxury Lane<br />
                  Beverly Hills, CA 90210<br />
                  United States
                </address>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Footer Bottom - Copyright */}
        <div className="pt-6 border-t border-primary-800 text-center sm:flex sm:justify-between sm:text-left">
          <p className="text-primary-400 text-sm">
            &copy; {currentYear} AutoPrestige. All rights reserved.
          </p>
          <div className="mt-2 sm:mt-0 text-sm text-primary-400 space-x-4">
            <a href="#" className="hover:text-primary-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary-300 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary-300 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;