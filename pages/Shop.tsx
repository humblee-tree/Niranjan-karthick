import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../services/mockData';
import { ProductCard } from '../components/ProductCard';
import { Filter } from 'lucide-react';

export const Shop: React.FC = () => {
  const [category, setCategory] = useState('All');

  const filteredProducts = category === 'All' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === category);

  const categories = ['All', ...new Set(MOCK_PRODUCTS.map(p => p.category))];

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 space-y-6">
        <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-sm">
          <div className="flex items-center gap-2 font-bold text-stone-800 mb-4 border-b border-stone-100 pb-2">
            <Filter size={18} /> Filters
          </div>
          
          <div className="space-y-3">
            <p className="font-semibold text-sm">Category</p>
            {categories.map(cat => (
              <label key={cat} className="flex items-center gap-2 text-sm text-stone-600 cursor-pointer hover:text-emerald-600">
                <input 
                  type="radio" 
                  name="category" 
                  checked={category === cat} 
                  onChange={() => setCategory(cat)}
                  className="text-emerald-600 focus:ring-emerald-500"
                />
                {cat}
              </label>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            <p className="font-semibold text-sm">Price Range</p>
            <div className="flex gap-2 text-sm">
              <input type="number" placeholder="Min" className="w-20 px-2 py-1 border rounded" />
              <span className="text-stone-400">-</span>
              <input type="number" placeholder="Max" className="w-20 px-2 py-1 border rounded" />
            </div>
            <button className="text-xs bg-stone-100 hover:bg-stone-200 px-3 py-1 rounded w-full">Apply</button>
          </div>
        </div>
      </aside>

      {/* Product Grid */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
           <h1 className="text-2xl font-bold text-stone-800">{category} Products</h1>
           <span className="text-stone-500 text-sm">{filteredProducts.length} results</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};