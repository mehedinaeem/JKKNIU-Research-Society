import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">JKKNIU Research Society</h3>
            <p className="text-secondary-300 mb-4">
              Advancing research excellence and fostering innovation at Jatiya Kabi Kazi Nazrul Islam University.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/JKKNIURS" target="_blank" rel="noopener noreferrer" className="text-secondary-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-secondary-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://www.linkedin.com/company/jkkniu-research-society/" target="_blank" rel="noopener noreferrer" className="text-secondary-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-secondary-300 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-secondary-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/research-areas" className="text-secondary-300 hover:text-white transition-colors">
                  Research Areas
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-secondary-300 hover:text-white transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/publications" className="text-secondary-300 hover:text-white transition-colors">
                  Publications
                </Link>
              </li>
              <li>
                <Link to="/membership" className="text-secondary-300 hover:text-white transition-colors">
                  Membership
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/news" className="text-secondary-300 hover:text-white transition-colors">
                  News & Announcements
                </Link>
              </li>
              <li>
                <Link to="/advisory-board" className="text-secondary-300 hover:text-white transition-colors">
                  Advisory Board
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-secondary-300 hover:text-white transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-white transition-colors">
                  Research Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-white transition-colors">
                  Code of Conduct
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-secondary-300 mt-1 flex-shrink-0" />
                <p className="text-secondary-300">
                  Jatiya Kabi Kazi Nazrul Islam University<br />
                  Trishal, Mymensingh<br />
                  Bangladesh
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-secondary-300 flex-shrink-0" />
                <a href="mailto:jkkniurs7@gmail.com" className="text-secondary-300 hover:text-white transition-colors">
                  jkkniurs7@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-secondary-300 flex-shrink-0" />
                <a href="tel:+88019" className="text-secondary-300 hover:text-white transition-colors">
                  +88019...
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-700 mt-8 pt-8 text-center">
          <p className="text-secondary-300">
            © {new Date().getFullYear()} JKKNIU Research Society. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer