import React from 'react';
import { MOCK_ORDERS, MOCK_ADDRESSES } from '../services/mockData';
import { Check, Package, Truck, Home, Clock, AlertCircle } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

export const OrderTracking: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id');
  const isNew = searchParams.get('new');
  
  // Find order or default to first mock order if not found (or if it's the specific COD mock)
  let order = MOCK_ORDERS.find(o => o.id === orderId) || MOCK_ORDERS[0];

  // If it's a "New" simulated order from checkout, create a temporary visual state
  if (isNew && !MOCK_ORDERS.find(o => o.id === orderId)) {
    order = {
      ...MOCK_ORDERS[0],
      id: orderId || 'ORD-NEW',
      status: 'Placed' as any,
      date: new Date().toISOString(),
      timeline: [{ status: 'Placed' as any, timestamp: new Date().toISOString() }],
      total: 1200 // Mock
    };
  }

  const steps = [
    { status: 'Pending', label: 'Order Placed', icon: Clock },
    { status: 'Paid', label: 'Confirmed', icon: Check }, // Or 'Placed' for COD
    { status: 'Processing', label: 'Processing', icon: Package },
    { status: 'Shipped', label: 'Shipped', icon: Truck },
    { status: 'Delivered', label: 'Delivered', icon: Home },
  ];

  const currentStepIndex = steps.findIndex(s => s.status === order.status);
  // Fallback visual index for 'Placed' or 'COD_Pending'
  const visualStepIndex = order.status === 'Placed' || order.status === 'COD_Pending' ? 0 : (currentStepIndex === -1 ? 1 : currentStepIndex);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {isNew && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-lg mb-6 flex items-center gap-3">
          <Check size={20} className="text-emerald-600" />
          <div>
            <p className="font-bold">Order Placed Successfully!</p>
            <p className="text-sm">Thank you for shopping with humbleetrees. Your order ID is {order.id}</p>
          </div>
        </div>
      )}

      <div className="mb-8">
        <Link to="/shop" className="text-emerald-600 text-sm hover:underline">&larr; Continue Shopping</Link>
        <div className="flex justify-between items-end mt-2">
            <div>
                <h1 className="text-2xl font-bold text-stone-800">Order #{order.id}</h1>
                <p className="text-stone-500">Placed on {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <div className="text-right">
                <p className="text-sm text-stone-500">Total Amount</p>
                <p className="text-xl font-bold text-stone-900">₹{order.total}</p>
            </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-200 mb-8 overflow-x-auto">
        <div className="relative flex justify-between min-w-[500px]">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-stone-200 -z-10 -translate-y-1/2 rounded-full"></div>
          <div 
             className="absolute top-1/2 left-0 h-1 bg-emerald-500 -z-10 -translate-y-1/2 rounded-full transition-all duration-1000"
             style={{ width: `${(visualStepIndex / (steps.length - 1)) * 100}%` }}
          ></div>

          {steps.map((step, index) => {
            const isCompleted = index <= visualStepIndex;
            const Icon = step.icon;

            return (
              <div key={step.status} className="flex flex-col items-center bg-white px-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  isCompleted ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-white border-stone-300 text-stone-300'
                }`}>
                  <Icon size={18} />
                </div>
                <span className={`text-xs mt-2 font-medium ${isCompleted ? 'text-emerald-700' : 'text-stone-400'}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
           <h3 className="font-bold text-lg mb-4">Items Ordered</h3>
           <div className="space-y-4">
             {order.items.map((item, idx) => (
               <div key={item.id || idx} className="flex gap-4">
                 <img src={item.image} className="w-16 h-16 rounded object-cover bg-stone-100" alt="" />
                 <div>
                   <p className="font-medium text-stone-800">{item.name}</p>
                   <p className="text-sm text-stone-500">Qty: {item.quantity}</p>
                   <p className="font-bold text-stone-900">₹{item.price * item.quantity}</p>
                 </div>
               </div>
             ))}
           </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
          <h3 className="font-bold text-lg mb-4">Delivery Details</h3>
          <div className="space-y-2 text-sm text-stone-600">
            {order.shippingAddress ? (
                <>
                    <p><span className="font-bold text-stone-800">{order.shippingAddress.fullName}</span></p>
                    <p>{order.shippingAddress.addressLine1}</p>
                    <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                    <p>Phone: {order.shippingAddress.phone}</p>
                </>
            ) : (
                <p>Address details unavailable for this mock order.</p>
            )}
          </div>
          
          <div className="mt-6 pt-6 border-t border-stone-100">
             <h4 className="font-bold text-sm mb-3">Order Activity</h4>
             <div className="space-y-4">
               {order.timeline.map((event, i) => (
                 <div key={i} className="flex gap-3 text-sm">
                   <div className="min-w-[80px] text-stone-400 text-xs pt-0.5">
                     {new Date(event.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                   </div>
                   <div className="text-stone-700">
                     Status updated to <span className="font-bold text-emerald-700">{event.status.replace(/_/g, ' ')}</span>
                   </div>
                 </div>
               ))}
               {order.timeline.length === 0 && (
                   <p className="text-stone-400 text-xs italic">No updates yet.</p>
               )}
             </div>
          </div>
        </div>
      </div>

    </div>
  );
};