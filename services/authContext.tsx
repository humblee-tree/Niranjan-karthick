import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { MOCK_USERS } from './mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
  switchRole: (role: UserRole) => void; // Helper for demo
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to null or a user from local storage (simulated)
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Auto-login the first mock user (Farmer) for demo convenience
    // In a real app, this would check a token or cookie
    // setUser(MOCK_USERS[0]); 
  }, []);

  const login = (email: string, role: UserRole) => {
    // Simulating login logic
    const foundUser = MOCK_USERS.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
    } else {
      // Create temp user for demo if not found
      const newUser: User = {
        id: `u_${Date.now()}`,
        name: 'New User',
        email,
        role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
      };
      setUser(newUser);
    }
  };

  const logout = () => {
    setUser(null);
    window.location.href = '/';
  };

  const switchRole = (role: UserRole) => {
    const targetUser = MOCK_USERS.find(u => u.role === role);
    if (targetUser) setUser(targetUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};