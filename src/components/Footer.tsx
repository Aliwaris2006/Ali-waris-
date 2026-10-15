import { Link } from 'react-router-dom'
import { Instagram, Youtube, Facebook, Music } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-cricket-charcoal text-white">
      <div className="container-x py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 bg-cricket-red rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm">CP</span>
              </div>
              <div>
                <span className="block font-black text-lg leading-none">CRICKET PRO</span>
                <span className="block text-[10px] uppercase tracking-wider text-gray-400 leading-none mt-0.5">Play Like a Champion</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Premium cricket equipment for champions. Quality gear engineered for performance, protection, and confidence on the pitch.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" aria-label="Instagram" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-cricket-red transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" aria-label="YouTube" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-cricket-red transition-colors"><Youtube className="w-4 h-4" /></a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-cricket-red transition-colors"><Facebook className="w-4 h-4" /></a>
              <a href="#" aria-label="TikTok" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-cricket-red transition-colors"><Music className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wide mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Shop</Link></li>
              <li><Link to="/shop?category=cricket-bats" className="hover:text-white transition-colors">Cricket Bats</Link></li>
              <li><Link to="/shop?category=protective-equipment" className="hover:text-white transition-colors">Protective Gear</Link></li>
              <li><Link to="/news" className="hover:text-white transition-colors">Cricket News</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wide mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/contact" className="hover:text-white transition-colors">Shipping Information</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Returns and Refunds</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Size Guide</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Shopping */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wide mb-4">Shopping</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/contact" className="hover:text-white transition-colors">My Account</Link></li>
              <li><Link to="/wishlist" className="hover:text-white transition-colors">Wishlist</Link></li>
              <li><Link to="/cart" className="hover:text-white transition-colors">Shopping Cart</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Order Tracking</Link></li>
            </ul>
          </div>
        </div>

        {/* Contact */}
        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="text-sm text-gray-400">
              <p className="font-semibold text-white mb-1">Contact</p>
              <p>Email: support@cricketpro.example</p>
              <p className="text-xs text-gray-500 mt-1">Phone and address — editable placeholders</p>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-gray-400">
              <Link to="/contact" className="hover:text-white">Newsletter</Link>
              <Link to="/contact" className="hover:text-white">Privacy Policy</Link>
              <Link to="/contact" className="hover:text-white">Terms & Conditions</Link>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-6 text-center">
            © 2026 CRICKET PRO. All rights reserved. Product images and prices are for demonstration purposes.
          </p>
        </div>
      </div>
    </footer>
  )
}
