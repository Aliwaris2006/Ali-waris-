import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Search, User, Heart, ShoppingCart, Menu, X, Home as HomeIcon } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import SearchOverlay from './SearchOverlay'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'Cricket Bats', path: '/shop?category=cricket-bats' },
  { label: 'Protective Gear', path: '/shop?category=protective-equipment' },
  { label: 'Clothing', path: '/shop?category=cricket-clothing' },
  { label: 'Cricket News', path: '/news' },
  { label: 'Contact', path: '/contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { totalItems, setIsOpen } = useCart()
  const { count } = useWishlist()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname === path.split('?')[0]
  }

  return (
    <>
      <header className={`sticky top-0 z-50 bg-white transition-shadow ${scrolled ? 'shadow-md' : 'border-b border-gray-100'}`}>
        <div className="container-x">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 bg-cricket-red rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm">CP</span>
              </div>
              <div className="hidden sm:block">
                <span className="block font-black text-lg leading-none text-cricket-black">CRICKET PRO</span>
                <span className="block text-[10px] uppercase tracking-wider text-cricket-gray leading-none mt-0.5">Play Like a Champion</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                    isActive(link.path)
                      ? 'text-cricket-red'
                      : 'text-cricket-black hover:text-cricket-red'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right icons */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button onClick={() => setSearchOpen(true)} aria-label="Search" className="p-2 hover:text-cricket-red transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <Link to="/wishlist" aria-label="Wishlist" className="p-2 hover:text-cricket-red transition-colors relative">
                <Heart className="w-5 h-5" />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-cricket-red text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {count}
                  </span>
                )}
              </Link>
              <button onClick={() => setIsOpen(true)} aria-label="Cart" className="p-2 hover:text-cricket-red transition-colors relative">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-cricket-red text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <button onClick={() => navigate('/contact')} aria-label="Account" className="p-2 hover:text-cricket-red transition-colors hidden sm:block">
                <User className="w-5 h-5" />
              </button>
              <button onClick={() => setMobileOpen(true)} aria-label="Menu" className="p-2 lg:hidden">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-xl animate-slide-in-right overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-black text-lg">CRICKET PRO</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="p-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-semibold transition-colors ${
                    isActive(link.path) ? 'bg-cricket-red/10 text-cricket-red' : 'text-cricket-black hover:bg-gray-100'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t pt-2 mt-2 space-y-1">
                <Link to="/wishlist" className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-semibold hover:bg-gray-100">
                  <Heart className="w-5 h-5" /> Wishlist ({count})
                </Link>
                <Link to="/cart" className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-semibold hover:bg-gray-100">
                  <ShoppingCart className="w-5 h-5" /> Cart ({totalItems})
                </Link>
                <Link to="/about" className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-semibold hover:bg-gray-100">
                  <User className="w-5 h-5" /> About Us
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
