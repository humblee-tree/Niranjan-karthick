import React from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { MOCK_USERS, MOCK_ORDERS } from '../services/mockData';
import { Users, ShoppingBag, ShieldCheck, AlertCircle } from 'lucide-react';
import { UserRole } from '../types';

export const AdminDashboard: React.FC = () => {
  return (
    <DashboardLayout role={UserRole.ADMIN}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-stone-800">Admin Overview</h1>
          <p className="text-stone-500">Global system status.</p>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 flex items-center justify-between">
             <div>
               <p className="text-stone-500 text-sm font-medium">Total Users</p>
               <h3 className="text-3xl font-bold text-stone-800">{MOCK_USERS.length}</h3>
             </div>
             <div className="bg-indigo-100 p-3 rounded-lg text-indigo-600"><Users size={24} /></div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 flex items-center justify-between">
             <div>
               <p className="text-stone-500 text-sm font-medium">Total Orders</p>
               <h3 className="text-3xl font-bold text-stone-800">{MOCK_ORDERS.length}</h3>
             </div>
             <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600"><ShoppingBag size={24} /></div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 flex items-center justify-between">
             <div>
               <p className="text-stone-500 text-sm font-medium">Pending Approvals</p>
               <h3 className="text-3xl font-bold text-amber-600">3</h3>
             </div>
             <div className="bg-amber-100 p-3 rounded-lg text-amber-600"><AlertCircle size={24} /></div>
          </div>
        </div>

        {/* User Management Table */}
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
          <div className="p-6 border-b border-stone-100">
            <h3 className="font-bold text-lg text-stone-800">User Management</h3>
          </div>
          <table className="w-full text-sm text-left">
            <thead className="bg-stone-50 text-stone-500">
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {MOCK_USERS.map(user => (
                <tr key={user.id}>
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img src={user.avatar} className="w-8 h-8 rounded-full bg-stone-100" alt="" />
                    <div>
                      <p className="font-medium text-stone-800">{user.name}</p>
                      <p className="text-xs text-stone-400">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-stone-100 px-2 py-1 rounded text-xs font-medium text-stone-600">{user.role}</span>
                  </td>
                  <td className="px-6 py-4">
                    {user.isVerified ? (
                       <span className="text-green-600 flex items-center gap-1 text-xs font-bold"><ShieldCheck size={14}/> Verified</span>
                    ) : (
                       <span className="text-stone-400 text-xs">Unverified</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-indigo-600 font-bold cursor-pointer hover:underline">Manage</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};