import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    // { name: 'Research Areas', href: '/research-areas' },
    { name: 'Events', href: '/events' },
    { name: 'Publications', href: '/publications' },
    { name: 'News', href: '/news' },
    { name: 'Advisory Board', href: '/advisory-board' },
    { name: 'Our Team', href: '/team' },
    // { name: 'Membership', href: '/membership' },
    // { name: 'Contact', href: '/contact' },
  ]

  const isActive = (href: string) => location.pathname === href

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-white drop-shadow-lg">
                JKKNIURS
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${isActive(item.href)
                    ? 'text-yellow-400 border-b-2 border-yellow-400'
                    : 'text-white hover:text-yellow-400'
                  } px-2 lg:px-3 py-2 text-sm lg:text-base font-medium transition-colors duration-200 whitespace-nowrap drop-shadow-md`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/login"
              className="px-6 py-2 rounded-full font-semibold text-secondary-900 transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: '#F5A623' }}
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-yellow-400 p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/90 backdrop-blur-md">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${isActive(item.href)
                    ? 'text-yellow-400 bg-white/10'
                    : 'text-white hover:text-yellow-400 hover:bg-white/10'
                  } block px-3 py-2 text-base font-medium transition-colors duration-200`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/login"
              className="block text-center mt-4 px-6 py-2 rounded-full font-semibold text-secondary-900"
              style={{ backgroundColor: '#F5A623' }}
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar