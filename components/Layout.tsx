import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, Leaf, Sprout, BarChart3, LogOut, Phone, Mail, MapPin } from 'lucide-react';
import { useCart } from '../services/cartContext';
import { useAuth } from '../services/authContext';
import { UserRole } from '../types';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const isActive = (path: string) => location.pathname === path ? 'text-emerald-200' : 'text-white hover:text-emerald-100';

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      {/* Top Notification Bar */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-1 px-4 text-center hidden md:block">
        Free Shipping on Orders over ₹999 | Use Code: HUMBLEE10 for 10% Off
      </div>

      {/* Main Header */}
      <header className="bg-emerald-800 text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-white p-1.5 rounded-full text-emerald-800 group-hover:scale-110 transition-transform">
                <Leaf size={24} fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight leading-none">humbleetrees</span>
                <span className="text-[10px] text-emerald-200 uppercase tracking-widest leading-none">Nature's Best</span>
              </div>
            </Link>

            {/* Search Bar (Amazon Style) */}
            <div className="hidden md:flex flex-1 max-w-2xl">
              <div className="flex w-full bg-white rounded-md overflow-hidden ring-1 ring-emerald-600 focus-within:ring-2 focus-within:ring-emerald-400">
                <select className="bg-stone-100 text-stone-700 text-xs px-2 border-r border-stone-300 outline-none hover:bg-stone-200 cursor-pointer">
                  <option>All</option>
                  <option>Fresh Mushrooms</option>
                  <option>Grow Kits</option>
                  <option>Supplements</option>
                </select>
                <input 
                  type="text" 
                  placeholder="Search for fresh mushrooms, seeds, or kits..." 
                  className="flex-1 px-4 py-2 text-stone-800 text-sm outline-none"
                />
                <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 flex items-center justify-center transition-colors">
                  <Search size={20} />
                </button>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6 text-sm font-medium">
              {/* User Account */}
              <div className="relative group cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="bg-emerald-700 p-1.5 rounded-full">
                    <User size={18} />
                  </div>
                  <div className="hidden lg:block leading-tight">
                    <p className="text-xs text-emerald-200">Hello, {user ? user.name.split(' ')[0] : 'Sign In'}</p>
                    <p className="font-bold">Account</p>
                  </div>
                </div>
                
                {/* Dropdown */}
                <div className="absolute right-0 top-full pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-white text-stone-800 rounded-md shadow-xl py-2 border border-emerald-100 overflow-hidden">
                    {user ? (
                      <>
                        {user.role === UserRole.FARMER && (
                          <Link to="/farmer-dashboard" className="block px-4 py-2 hover:bg-emerald-50 text-emerald-800 flex items-center gap-2">
                            <Sprout size={16} /> Farmer Dashboard
                          </Link>
                        )}
                        {user.role === UserRole.ADMIN && (
                          <Link to="/admin-dashboard" className="block px-4 py-2 hover:bg-emerald-50 text-emerald-800 flex items-center gap-2">
                            <BarChart3 size={16} /> Admin Panel
                          </Link>
                        )}
                         <Link to="/order-tracking" className="block px-4 py-2 hover:bg-emerald-50">Your Orders</Link>
                         <div className="h-px bg-stone-200 my-1"></div>
                         <button onClick={logout} className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2">
                           <LogOut size={16} /> Sign Out
                         </button>
                      </>
                    ) : (
                      <Link to="/checkout" className="block px-4 py-2 hover:bg-emerald-50 text-center font-bold text-emerald-700">Sign In</Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Cart */}
              <Link to="/cart" className="flex items-center gap-2 relative">
                <div className="relative">
                  <ShoppingCart size={28} />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-yellow-400 text-emerald-900 text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-emerald-800">
                      {cartItemCount}
                    </span>
                  )}
                </div>
                <span className="hidden lg:inline font-bold">Cart</span>
              </Link>

              {/* Mobile Menu Toggle */}
              <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Nav */}
        <div className="bg-emerald-700 text-sm py-2 px-4 overflow-x-auto whitespace-nowrap">
          <div className="container mx-auto flex gap-6">
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="/shop" className={isActive('/shop')}>All Products</Link>
            <Link to="/shop?cat=kits" className={isActive('/shop?cat=kits')}>Grow Kits</Link>
            <Link to="/shop?cat=fresh" className={isActive('/shop?cat=fresh')}>Fresh Produce</Link>
            <Link to="/shop?cat=supplements" className={isActive('/shop?cat=supplements')}>Supplements</Link>
            <Link to="/farmer-dashboard" className={isActive('/farmer-dashboard')}>Sell on Humbleetrees</Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 pt-12 pb-6 text-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4 text-lg">humbleetrees</h3>
              <p className="mb-4 text-stone-400">Connecting sustainable farmers with conscious consumers. Premium quality mushrooms and grow kits delivered to your doorstep.</p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <MapPin size={16} className="mt-1 text-emerald-500" />
                  <span>No. 21, Anna Salai,<br/>Chennai, Tamil Nadu, 600001</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={16} className="text-emerald-500" />
                  <span>+91 93604 39995</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={16} className="text-emerald-500" />
                  <span>nkps192365068@gmail.com</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/shop" className="hover:text-emerald-400">Shop Now</Link></li>
                <li><Link to="/farmer-dashboard" className="hover:text-emerald-400">Farmer Registration</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Newsletter</h4>
              <div className="flex">
                <input type="email" placeholder="Your email" className="bg-stone-800 text-white px-3 py-2 rounded-l-md outline-none border border-stone-700 focus:border-emerald-500 w-full" />
                <button className="bg-emerald-600 px-4 py-2 rounded-r-md text-white hover:bg-emerald-500">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-stone-800 pt-6 flex justify-between items-center">
            <p>&copy; {new Date().getFullYear()} humbleetrees. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};