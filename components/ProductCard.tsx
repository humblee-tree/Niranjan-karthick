import React from 'react';
import { Product } from '../types';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../services/cartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

  return (
    <div className="bg-white rounded-lg border border-stone-200 hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group h-full">
      <div className="relative h-56 overflow-hidden bg-stone-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {discount}% OFF
          </span>
        )}
        <button className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full hover:bg-white hover:text-red-500 text-stone-400 transition-colors">
          <Heart size={18} />
        </button>
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
             <span className="bg-stone-800 text-white px-3 py-1 font-bold text-sm uppercase">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="text-xs text-emerald-600 font-medium mb-1">{product.category}</div>
        <h3 className="text-stone-800 font-semibold mb-1 line-clamp-2 min-h-[48px]" title={product.name}>
          {product.name}
        </h3>
        
        <div className="flex items-center gap-1 mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
            ))}
          </div>
          <span className="text-xs text-stone-500">({product.reviews})</span>
        </div>

        <div className="mt-auto pt-3 border-t border-stone-100">
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-stone-900">₹{product.price}</span>
                {product.oldPrice && (
                  <span className="text-sm text-stone-400 line-through">₹{product.oldPrice}</span>
                )}
              </div>
              <p className="text-[10px] text-stone-500">Inclusive of all taxes</p>
            </div>
            <button 
              onClick={() => addToCart(product)}
              disabled={product.stock === 0}
              className={`p-2 rounded-full transition-colors ${
                product.stock > 0 
                  ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-600 hover:text-white' 
                  : 'bg-stone-100 text-stone-300 cursor-not-allowed'
              }`}
            >
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};