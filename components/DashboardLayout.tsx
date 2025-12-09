import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/authContext';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut, 
  Sprout, 
  Package, 
  TrendingUp, 
  Truck,
  Menu,
  X
} from 'lucide-react';
import { UserRole } from '../types';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: UserRole;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, role }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Define sidebar items based on role
  const farmerItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/farmer-dashboard' },
    { icon: Sprout, label: 'Cultivation Monitor', path: '/farmer-dashboard?tab=monitoring' },
    { icon: Package, label: 'My Products', path: '/farmer-dashboard?tab=inventory' },
    { icon: Truck, label: 'Orders', path: '/farmer-dashboard?tab=orders' },
    { icon: TrendingUp, label: 'Sales Analytics', path: '/farmer-dashboard?tab=sales' },
  ];

  const adminItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin-dashboard' },
    { icon: Users, label: 'User Management', path: '/admin-dashboard?tab=users' },
    { icon: ShoppingBag, label: 'All Orders', path: '/admin-dashboard?tab=orders' },
    { icon: Settings, label: 'Site Settings', path: '/admin-dashboard?tab=settings' },
  ];

  const items = role === UserRole.ADMIN ? adminItems : farmerItems;

  const isActive = (path: string) => {
    // Simple check for active state including query params
    if (path.includes('?')) {
      return location.search.includes(path.split('?')[1]);
    }
    return location.pathname === path && !location.search;
  };

  return (
    <div className="min-h-screen bg-stone-50 flex font-sans">
      {/* Sidebar - Hostinger Style (Dark Indigo/Purple) */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#2f1c6a] text-white transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:flex-shrink-0
      `}>
        <div className="h-16 flex items-center px-6 border-b border-indigo-900 bg-[#261658]">
          <span className="text-xl font-bold tracking-tight">humbleetrees</span>
          <span className="ml-2 text-xs bg-indigo-500 px-1.5 py-0.5 rounded uppercase">{role === UserRole.ADMIN ? 'Admin' : 'Partner'}</span>
          <button className="md:hidden ml-auto" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-sm font-bold border-2 border-indigo-300">
              {user?.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="font-medium text-sm truncate">{user?.name}</p>
              <p className="text-xs text-indigo-300 truncate">{user?.email}</p>
            </div>
          </div>

          <nav className="space-y-1">
            {items.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  navigate(item.path);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.path) 
                    ? 'bg-[#4f3690] text-white shadow-sm' 
                    : 'text-indigo-100 hover:bg-[#3d277e]'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-4 border-t border-indigo-900">
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-indigo-200 hover:bg-[#3d277e] transition-colors mb-1">
            <ShoppingBag size={18} /> Back to Shop
          </Link>
          <button 
            onClick={logout} 
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-300 hover:bg-red-900/30 transition-colors"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Mobile */}
        <div className="md:hidden h-16 bg-white border-b border-stone-200 flex items-center justify-between px-4">
          <span className="font-bold text-stone-800">humbleetrees</span>
          <button onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={24} className="text-stone-600" />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};