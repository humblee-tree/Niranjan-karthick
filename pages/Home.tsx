import React from 'react';
import { MOCK_PRODUCTS } from '../services/mockData';
import { ProductCard } from '../components/ProductCard';
import { ArrowRight, Truck, ShieldCheck, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1611566026373-c6c8dd4471b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
          alt="Fresh Mushrooms" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/60 to-transparent flex items-center p-8 md:p-16">
          <div className="max-w-xl text-white space-y-6">
            <span className="bg-emerald-500 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded">Organic & Fresh</span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Grow Your Own <br/> <span className="text-emerald-400">Superfood</span>
            </h1>
            <p className="text-lg text-stone-200">
              Premium mushroom grow kits, fresh farm produce, and supplements delivered straight to your door from certified local farmers.
            </p>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-md font-bold transition-all transform hover:translate-x-1">
              Shop Now <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 flex items-center gap-4">
          <div className="bg-emerald-100 p-3 rounded-full text-emerald-600">
            <Sprout size={32} />
          </div>
          <div>
            <h3 className="font-bold text-lg">Fresh from Farm</h3>
            <p className="text-sm text-stone-500">Directly from our verified farmers</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 flex items-center gap-4">
          <div className="bg-emerald-100 p-3 rounded-full text-emerald-600">
            <Truck size={32} />
          </div>
          <div>
            <h3 className="font-bold text-lg">Fast Delivery</h3>
            <p className="text-sm text-stone-500">Secure shipping across India</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 flex items-center gap-4">
          <div className="bg-emerald-100 p-3 rounded-full text-emerald-600">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h3 className="font-bold text-lg">Quality Guarantee</h3>
            <p className="text-sm text-stone-500">100% Organic certified products</p>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold text-stone-800">Best Sellers</h2>
          <Link to="/shop" className="text-emerald-600 font-medium hover:underline">View All</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_PRODUCTS.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

       {/* Banner */}
       <section className="bg-stone-800 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-white relative overflow-hidden">
         <div className="relative z-10 max-w-lg">
           <h2 className="text-3xl font-bold mb-4">Start Your Mushroom Journey</h2>
           <p className="text-stone-300 mb-6">Join thousands of home growers. Get our starter kit today and harvest your first batch in less than 2 weeks.</p>
           <button className="bg-white text-stone-900 px-6 py-3 rounded font-bold hover:bg-stone-100">
             Get Starter Kit - ₹499
           </button>
         </div>
         <div className="relative z-10">
            <img src="https://picsum.photos/400/300?grayscale" alt="Kit" className="rounded-lg shadow-lg opacity-80" />
         </div>
         {/* Abstract BG Pattern */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full blur-[100px] opacity-20"></div>
       </section>
    </div>
  );
};