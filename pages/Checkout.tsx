import React, { useState } from 'react';
import { useCart } from '../services/cartContext';
import { useAuth } from '../services/authContext';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, MapPin, Plus, Check, Truck, CreditCard, Lock, Banknote } from 'lucide-react';
import { Address, UserRole } from '../types';
import { MOCK_ADDRESSES } from '../services/mockData';

export const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user, login } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1); // 1: Auth/Address, 2: Review, 3: Payment
  const [loading, setLoading] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(user?.addresses?.[0]?.id || null);
  const [addresses, setAddresses] = useState<Address[]>(user?.addresses || MOCK_ADDRESSES);
  
  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'RAZORPAY'>('COD');
  
  // New Address Form State
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: '', phone: '', addressLine1: '', city: '', state: '', pincode: ''
  });

  // Auth State for inline login
  const [email, setEmail] = useState('');

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-stone-100 p-6 rounded-full mb-4">
          <Truck size={48} className="text-stone-400" />
        </div>
        <h2 className="text-2xl font-bold text-stone-800 mb-2">Your cart is empty</h2>
        <p className="text-stone-500 mb-6">Looks like you haven't added any mushroom goodies yet.</p>
        <button onClick={() => navigate('/shop')} className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-emerald-700">
          Start Shopping
        </button>
      </div>
    );
  }

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const address: Address = {
      id: `new_${Date.now()}`,
      userId: user?.id || 'temp',
      ...newAddress,
      isDefault: false
    };
    setAddresses([...addresses, address]);
    setSelectedAddressId(address.id);
    setShowAddAddress(false);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);

    if (paymentMethod === 'RAZORPAY') {
      await handleRazorpayPayment();
    } else {
      await handleCODPayment();
    }
  };

  const handleCODPayment = async () => {
    // Simulate API call for COD Order
    setTimeout(() => {
      const orderId = `ORD-${Math.floor(Math.random() * 10000)}`;
      console.log(`COD Order Placed: ${orderId}`);
      
      clearCart();
      // Redirect to tracking page with the new ID
      navigate(`/order-tracking?id=${orderId}&new=true`);
      setLoading(false);
    }, 1500);
  };

  const handleRazorpayPayment = async () => {
    // Simulate Server Order Creation
    setTimeout(() => {
      const options = {
        key: "RZP_TEST_KEY_ID_HERE", // Using placeholder as requested
        amount: cartTotal * 100, // paise
        currency: "INR",
        name: "humbleetrees",
        description: "Mushroom Order Payment",
        image: "https://via.placeholder.com/150", 
        handler: function (response: any) {
          // Success Callback
          console.log("Payment Successful", response);
          const orderId = `ORD-${Math.floor(Math.random() * 10000)}`;
          clearCart();
          navigate(`/order-tracking?id=${orderId}&new=true`); 
        },
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: user?.phone || "9360439995"
        },
        theme: { color: "#059669" }
      };

      const rzp = (window as any).Razorpay ? new (window as any).Razorpay(options) : null;
      
      if (rzp) {
        rzp.open();
        setLoading(false);
      } else {
        alert("Razorpay SDK not loaded. Simulating success for Test Mode.");
        const orderId = `ORD-${Math.floor(Math.random() * 10000)}`;
        clearCart();
        navigate(`/order-tracking?id=${orderId}&new=true`); 
      }
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Stepper */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center w-full max-w-2xl">
          <div className={`flex flex-col items-center relative z-10 ${step >= 1 ? 'text-emerald-600' : 'text-stone-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${step >= 1 ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white border-stone-300'}`}>1</div>
            <span className="text-xs font-bold mt-2">Address</span>
          </div>
          <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-emerald-600' : 'bg-stone-200'}`}></div>
          <div className={`flex flex-col items-center relative z-10 ${step >= 2 ? 'text-emerald-600' : 'text-stone-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${step >= 2 ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white border-stone-300'}`}>2</div>
            <span className="text-xs font-bold mt-2">Summary</span>
          </div>
          <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-emerald-600' : 'bg-stone-200'}`}></div>
          <div className={`flex flex-col items-center relative z-10 ${step >= 3 ? 'text-emerald-600' : 'text-stone-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${step >= 3 ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white border-stone-300'}`}>3</div>
            <span className="text-xs font-bold mt-2">Payment</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Step 1: Address */}
          {step === 1 && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <MapPin className="text-emerald-600" /> Select Delivery Address
              </h2>

              {!user ? (
                <div className="text-center py-8">
                  <p className="mb-4 text-stone-600">Please login to manage addresses and checkout.</p>
                  <input 
                    type="email" placeholder="Enter Email" value={email} onChange={e=>setEmail(e.target.value)}
                    className="border border-stone-300 rounded px-4 py-2 mr-2"
                  />
                  <button onClick={() => login(email, UserRole.CUSTOMER)} className="bg-emerald-600 text-white px-6 py-2 rounded">
                    Login / Guest Checkout
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map(addr => (
                      <div 
                        key={addr.id}
                        onClick={() => setSelectedAddressId(addr.id)}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all relative ${selectedAddressId === addr.id ? 'border-emerald-600 bg-emerald-50' : 'border-stone-200 hover:border-emerald-300'}`}
                      >
                        {selectedAddressId === addr.id && (
                          <div className="absolute top-2 right-2 text-emerald-600"><Check size={20} /></div>
                        )}
                        <p className="font-bold text-stone-800">{addr.fullName}</p>
                        <p className="text-sm text-stone-600 mt-1">{addr.addressLine1}</p>
                        <p className="text-sm text-stone-600">{addr.city}, {addr.state} - {addr.pincode}</p>
                        <p className="text-sm text-stone-600 mt-2 font-medium">Ph: {addr.phone}</p>
                      </div>
                    ))}
                    
                    <button 
                      onClick={() => setShowAddAddress(true)}
                      className="p-4 rounded-lg border-2 border-dashed border-stone-300 flex flex-col items-center justify-center text-stone-500 hover:text-emerald-600 hover:border-emerald-400 transition-colors min-h-[160px]"
                    >
                      <Plus size={32} />
                      <span className="font-bold mt-2">Add New Address</span>
                    </button>
                  </div>

                  {showAddAddress && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                      <div className="bg-white rounded-xl p-6 w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4">Add New Address</h3>
                        <form onSubmit={handleAddAddress} className="space-y-3">
                          <input required placeholder="Full Name" className="w-full border p-2 rounded" value={newAddress.fullName} onChange={e => setNewAddress({...newAddress, fullName: e.target.value})} />
                          <input required placeholder="Phone Number" className="w-full border p-2 rounded" value={newAddress.phone} onChange={e => setNewAddress({...newAddress, phone: e.target.value})} />
                          <input required placeholder="Address Line 1" className="w-full border p-2 rounded" value={newAddress.addressLine1} onChange={e => setNewAddress({...newAddress, addressLine1: e.target.value})} />
                          <div className="grid grid-cols-2 gap-3">
                            <input required placeholder="City" className="border p-2 rounded" value={newAddress.city} onChange={e => setNewAddress({...newAddress, city: e.target.value})} />
                            <input required placeholder="State" className="border p-2 rounded" value={newAddress.state} onChange={e => setNewAddress({...newAddress, state: e.target.value})} />
                          </div>
                          <input required placeholder="Pincode" className="w-full border p-2 rounded" value={newAddress.pincode} onChange={e => setNewAddress({...newAddress, pincode: e.target.value})} />
                          <div className="flex gap-3 mt-4">
                            <button type="button" onClick={() => setShowAddAddress(false)} className="flex-1 bg-stone-200 py-2 rounded font-bold">Cancel</button>
                            <button type="submit" className="flex-1 bg-emerald-600 text-white py-2 rounded font-bold">Save</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}

                  <button 
                    disabled={!selectedAddressId}
                    onClick={() => setStep(2)}
                    className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold disabled:opacity-50 mt-6"
                  >
                    Deliver Here
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Summary */}
          {step === 2 && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
               <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Truck className="text-emerald-600" /> Order Summary
              </h2>
              <div className="divide-y divide-stone-100">
                {cart.map(item => (
                  <div key={item.id} className="py-4 flex gap-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded bg-stone-100" />
                    <div className="flex-1">
                      <h4 className="font-bold text-stone-800">{item.name}</h4>
                      <p className="text-sm text-stone-500">Qty: {item.quantity}</p>
                      <p className="text-emerald-600 font-bold mt-1">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-6">
                <button onClick={() => setStep(1)} className="flex-1 bg-stone-100 text-stone-600 py-3 rounded-lg font-bold">Back</button>
                <button onClick={() => setStep(3)} className="flex-1 bg-emerald-600 text-white py-3 rounded-lg font-bold">Proceed to Pay</button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <CreditCard className="text-emerald-600" /> Payment Method
              </h2>
              
              <div className="space-y-4">
                {/* COD Option */}
                <label className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'COD' ? 'border-emerald-600 bg-emerald-50 ring-1 ring-emerald-600' : 'border-stone-200 hover:bg-stone-50'}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === 'COD'} 
                    onChange={() => setPaymentMethod('COD')} 
                    className="w-5 h-5 text-emerald-600 focus:ring-emerald-500" 
                  />
                  <div className="flex-1">
                    <p className="font-bold text-stone-800">Cash on Delivery</p>
                    <p className="text-xs text-stone-500">Pay via Cash/UPI when your order arrives</p>
                  </div>
                  <Banknote className={paymentMethod === 'COD' ? 'text-emerald-600' : 'text-stone-400'} />
                </label>

                {/* Razorpay Option */}
                <label className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'RAZORPAY' ? 'border-emerald-600 bg-emerald-50 ring-1 ring-emerald-600' : 'border-stone-200 hover:bg-stone-50'}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === 'RAZORPAY'} 
                    onChange={() => setPaymentMethod('RAZORPAY')} 
                    className="w-5 h-5 text-emerald-600 focus:ring-emerald-500" 
                  />
                  <div className="flex-1">
                    <p className="font-bold text-stone-800">Razorpay Secure Payment</p>
                    <p className="text-xs text-stone-500">Credit Card, Debit Card, UPI, NetBanking</p>
                  </div>
                  <ShieldCheck className={paymentMethod === 'RAZORPAY' ? 'text-emerald-600' : 'text-stone-400'} />
                </label>
              </div>

              <button 
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-lg font-bold mt-8 flex items-center justify-center gap-2 shadow-lg shadow-emerald-200 transition-all disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing Order...' : `Pay ₹${cartTotal}`} {paymentMethod === 'RAZORPAY' && <Lock size={18} />}
              </button>
              
              <p className="text-center text-xs text-stone-400 mt-4">
                By processing, you agree to our Terms of Service.
              </p>
            </div>
          )}
        </div>

        {/* Order Sidebar */}
        <div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 sticky top-24">
            <h3 className="font-bold text-stone-800 mb-4">Price Details</h3>
            <div className="space-y-3 text-sm text-stone-600 mb-6">
              <div className="flex justify-between">
                <span>Price ({cart.length} items)</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>Included</span>
              </div>
            </div>
            <div className="border-t border-stone-100 pt-4 flex justify-between items-center font-bold text-lg text-stone-900">
              <span>Total Amount</span>
              <span>₹{cartTotal}</span>
            </div>
            
            <div className="mt-6 bg-emerald-50 p-3 rounded text-xs text-emerald-800 text-center flex items-center justify-center gap-2">
              <ShieldCheck size={14} /> Safe and Secure Payments
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};