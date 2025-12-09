import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DashboardLayout } from '../components/DashboardLayout';
import { MOCK_BATCHES, MOCK_ORDERS, MOCK_PRODUCTS } from '../services/mockData';
import { MushroomMonitor } from '../components/MushroomMonitor';
import { Plus, Edit3, DollarSign, Package, TrendingUp } from 'lucide-react';
import { UserRole, Order, OrderStatus } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const SALES_DATA = [
  { name: 'Mon', sales: 4200 }, { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 5000 }, { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 6890 }, { name: 'Sat', sales: 8390 }, { name: 'Sun', sales: 7490 },
];

export const FarmerDashboard: React.FC = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'overview';
  
  // Interactive Orders State
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(prev => prev.map(o => 
      o.id === orderId ? { ...o, status: newStatus as OrderStatus } : o
    ));
  };

  const renderContent = () => {
    switch(tab) {
      case 'monitoring':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-stone-800">Smart Cultivation Monitor</h1>
                <p className="text-stone-500">Real-time IoT data from your grow zones.</p>
              </div>
              <button className="btn-primary flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg shadow-emerald-200">
                <Plus size={18} /> New Batch
              </button>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {MOCK_BATCHES.map(batch => (
                <MushroomMonitor key={batch.id} batch={batch} />
              ))}
            </div>
          </div>
        );

      case 'inventory':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-stone-800">My Products</h1>
            <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-stone-50 text-stone-500 border-b">
                  <tr>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {MOCK_PRODUCTS.filter(p => p.sellerId === 'u1').map(p => (
                    <tr key={p.id}>
                      <td className="px-6 py-4 flex items-center gap-3">
                        <img src={p.image} className="w-10 h-10 rounded object-cover" alt=""/>
                        <span className="font-medium">{p.name}</span>
                      </td>
                      <td className="px-6 py-4 font-bold">₹{p.price}</td>
                      <td className="px-6 py-4">{p.stock} units</td>
                      <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">Active</span></td>
                      <td className="px-6 py-4"><button className="text-emerald-600 hover:underline">Edit</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-stone-800">Order Management</h1>
            <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
               <table className="w-full text-sm text-left">
                  <thead className="bg-stone-50 text-stone-500 border-b">
                    <tr>
                      <th className="px-6 py-4">Order ID</th>
                      <th className="px-6 py-4">Items</th>
                      <th className="px-6 py-4">Total</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Update</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {orders.map(order => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 font-mono">{order.id}</td>
                        <td className="px-6 py-4 text-stone-600">{order.items.map(i => i.name).join(', ')}</td>
                        <td className="px-6 py-4 font-bold">₹{order.total}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                            order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <select 
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className="border rounded px-2 py-1 text-xs cursor-pointer focus:ring-2 focus:ring-emerald-500 outline-none"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Packed">Packed</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Out_for_Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
          </div>
        );

      default: // Overview
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-stone-800">Welcome, Nanda Kumar</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                 <div className="flex justify-between">
                   <div>
                     <p className="text-stone-500 text-sm">Total Revenue</p>
                     <h3 className="text-3xl font-bold text-emerald-700 mt-1">₹37,850</h3>
                   </div>
                   <div className="bg-emerald-100 p-3 rounded-full text-emerald-600 h-fit"><DollarSign size={24}/></div>
                 </div>
               </div>
               <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                 <div className="flex justify-between">
                   <div>
                     <p className="text-stone-500 text-sm">Active Orders</p>
                     <h3 className="text-3xl font-bold text-blue-700 mt-1">{orders.filter(o => o.status !== 'Delivered').length}</h3>
                   </div>
                   <div className="bg-blue-100 p-3 rounded-full text-blue-600 h-fit"><Package size={24}/></div>
                 </div>
               </div>
               <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                 <div className="flex justify-between">
                   <div>
                     <p className="text-stone-500 text-sm">Sales Growth</p>
                     <h3 className="text-3xl font-bold text-purple-700 mt-1">+15%</h3>
                   </div>
                   <div className="bg-purple-100 p-3 rounded-full text-purple-600 h-fit"><TrendingUp size={24}/></div>
                 </div>
               </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
               <h3 className="font-bold text-lg mb-6">Revenue Overview</h3>
               <div className="h-80">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={SALES_DATA}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} />
                     <YAxis axisLine={false} tickLine={false} />
                     <Tooltip />
                     <Bar dataKey="sales" fill="#10b981" radius={[4, 4, 0, 0]} />
                   </BarChart>
                 </ResponsiveContainer>
               </div>
            </div>
          </div>
        );
    }
  };

  return (
    <DashboardLayout role={UserRole.FARMER}>
      {renderContent()}
    </DashboardLayout>
  );
};