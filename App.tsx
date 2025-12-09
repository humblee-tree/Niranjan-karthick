import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { FarmerDashboard } from './pages/FarmerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { Checkout } from './pages/Checkout';
import { OrderTracking } from './pages/OrderTracking';
import { CartProvider } from './services/cartContext';
import { AuthProvider, useAuth } from './services/authContext';
import { UserRole } from './types';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode, roles: UserRole[] }> = ({ children, roles }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) return <Navigate to="/checkout" />; // Redirect to login flow
  if (user && !roles.includes(user.role)) return <Navigate to="/" />;
  
  return <>{children}</>;
};

// Demo Role Switcher
const DemoTools = () => {
  const { switchRole, user } = useAuth();
  return (
    <div className="fixed bottom-4 right-4 bg-white p-2 rounded-lg shadow-xl border border-stone-200 z-50 flex gap-2 text-xs">
      <span className="font-bold my-auto mr-1 text-stone-500">Demo Role:</span>
      <button onClick={() => switchRole(UserRole.CUSTOMER)} className={`px-2 py-1 rounded ${user?.role === UserRole.CUSTOMER ? 'bg-emerald-600 text-white' : 'bg-stone-100'}`}>Customer</button>
      <button onClick={() => switchRole(UserRole.FARMER)} className={`px-2 py-1 rounded ${user?.role === UserRole.FARMER ? 'bg-emerald-600 text-white' : 'bg-stone-100'}`}>Farmer</button>
      <button onClick={() => switchRole(UserRole.ADMIN)} className={`px-2 py-1 rounded ${user?.role === UserRole.ADMIN ? 'bg-emerald-600 text-white' : 'bg-stone-100'}`}>Admin</button>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <DemoTools />
          <Routes>
            {/* Dashboard Routes (Use their own layout inside) */}
            <Route 
              path="/farmer-dashboard" 
              element={
                <ProtectedRoute roles={[UserRole.FARMER, UserRole.ADMIN]}>
                  <FarmerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin-dashboard" 
              element={
                <ProtectedRoute roles={[UserRole.ADMIN]}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />

            {/* Public/Customer Routes (Use Main Layout) */}
            <Route path="*" element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/cart" element={<Checkout />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-tracking" element={<OrderTracking />} />
                  <Route path="*" element={<div className="text-center py-20">404 - Page Not Found</div>} />
                </Routes>
              </Layout>
            } />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;