import React from 'react';
import { Sidebar } from '../../../../widgets/sidebar/ui/Sidebar';
import { Header } from '../../../../widgets/header/ui/Header';
import { 
  Search, Plus, Bookmark, Image as ImageIcon, 
  Calendar, ChevronDown,  RefreshCw 
} from 'lucide-react';

export const AddProductPage: React.FC = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen">
     
      <Sidebar />

     
      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-8 space-y-6">
     
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">Add New Product</h1>
            <div className="flex items-center gap-3">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input 
                  type="text" 
                  placeholder="Search product for add" 
                  className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-emerald-500 shadow-sm"
                />
              </div>
              <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-colors">
                Publish Product
              </button>
              <button className="flex items-center gap-2 border border-gray-200 bg-white text-gray-700 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-gray-50 shadow-sm transition-colors">
                <Bookmark size={14} /> Save to draft
              </button>
              <button className="p-2 border border-gray-200 bg-white text-gray-600 rounded-xl hover:bg-gray-50 shadow-sm">
                <Plus size={16} />
              </button>
            </div>
          </div>

        
          <div className="grid grid-cols-3 gap-6">
            
         
            <div className="col-span-2 space-y-6">
              
            
              <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4">
                <h3 className="text-sm font-bold text-gray-900">Basic Details</h3>
                
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Product Name</label>
                  <input 
                    type="text" 
                    defaultValue="iPhone 15" 
                    className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Product Description</label>
                  <div className="relative">
                    <textarea 
                      rows={4}
                      defaultValue="The iPhone 15 delivers cutting-edge performance with the A16 Bionic chip, an immersive Super Retina XDR display, advanced dual-camera system, and exceptional battery life, all encased in stunning aerospace-grade aluminum."
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-xl p-3 text-xs text-gray-700 focus:outline-none focus:border-emerald-500 resize-none"
                    ></textarea>
                    <div className="absolute right-3 bottom-3 flex items-center gap-2 text-gray-400">
                      <button className="hover:text-gray-600"><Plus size={14} /></button>
                      <button className="hover:text-gray-600"><ImageIcon size={14} /></button>
                    </div>
                  </div>
                </div>
              </div>

        
              <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4">
                <h3 className="text-sm font-bold text-gray-900">Pricing</h3>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Product Price</label>
                  <div className="relative flex items-center">
                    <input 
                      type="text" 
                      defaultValue="$999.89" 
                      className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-800 focus:outline-none focus:border-emerald-500"
                    />
                    <div className="absolute right-3 flex items-center gap-1.5 bg-gray-100 px-2 py-1 rounded-lg text-xs font-medium cursor-pointer">
                      <span>🇺🇸</span> <ChevronDown size={12} className="text-gray-500" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Discounted Price <span className="text-gray-400 font-normal">(Optional)</span></label>
                    <div className="flex items-center bg-gray-50/50 border border-gray-200 rounded-xl px-3 py-2 text-xs">
                      <span className="text-gray-400 mr-2">$</span>
                      <input type="text" defaultValue="99" className="w-12 bg-transparent focus:outline-none font-semibold text-gray-800" />
                      <span className="text-gray-400 ml-auto">Sale= $900.89</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Tax Included</label>
                    <div className="flex items-center gap-6 pt-2">
                      <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer">
                        <input type="radio" name="tax" defaultChecked className="text-emerald-600 focus:ring-emerald-500" /> Yes
                      </label>
                      <label className="flex items-center gap-2 text-xs font-medium text-gray-500 cursor-pointer">
                        <input type="radio" name="tax" className="text-emerald-600 focus:ring-emerald-500" /> No
                      </label>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Expiration</label>
                    <div className="relative">
                      <input type="text" placeholder="Start" className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-400 focus:outline-none" />
                      <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">&nbsp;</label>
                    <div className="relative">
                      <input type="text" placeholder="End" className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-400 focus:outline-none" />
                      <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl  border-gray-200 space-y-4">
                <h3 className="text-sm font-bold text-gray-900">Inventory</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Stock Quantity</label>
                    <input type="text" defaultValue="Unlimited" className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-800 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Stock Status</label>
                    <div className="relative">
                      <select className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-800 focus:outline-none appearance-none">
                        <option>In Stock</option>
                        <option>Out of Stock</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-5 bg-emerald-600 rounded-full relative flex items-center px-0.5 cursor-pointer">
                      <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                    </div>
                    <span className="text-xs font-medium text-gray-700">Unlimited</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                  <span className="text-xs text-gray-600">Highlight this product in a featured section.</span>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <button className="flex items-center gap-2 border border-gray-200 bg-white text-gray-700 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-gray-50 shadow-sm">
                    <Bookmark size={14} /> Save to draft
                  </button>
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-sm transition-colors">
                    Publish Product
                  </button>
                </div>
              </div>
              </div>

              

            </div>

     
            <div className="space-y-6">
              
            
              <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4">
                <h3 className="text-sm font-bold text-gray-900">Upload Product Image</h3>
                <span className="text-xs text-gray-400 block -mt-2">Product Image</span>

            
                <div className="border border-gray-200 rounded-2xl p-4 flex flex-col items-center justify-center relative bg-gray-50/30">
                  <img 
                    src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300" 
                    alt="iPhone 15" 
                    className="h-48 object-contain my-2" 
                  />
                  <div className="flex items-center justify-between w-full mt-4 pt-3 border-t border-gray-100">
                    <button className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-700 px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-gray-50 shadow-sm">
                      <ImageIcon size={14} /> Browse
                    </button>
                    <button className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-700 px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-gray-50 shadow-sm">
                      <RefreshCw size={14} /> Replace
                    </button>
                  </div>
                </div>

 
                <div className="grid grid-cols-3 gap-3">
                  <div className="border border-gray-200 rounded-xl p-2 relative bg-white">
                    <img src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=100" alt="thumb" className="h-16 w-full object-contain" />
                    <span className="absolute top-1 right-1 w-4 h-4 bg-gray-500 text-white rounded-full flex items-center justify-center text-[10px] cursor-pointer">×</span>
                  </div>
                  <div className="border border-gray-200 rounded-xl p-2 relative bg-white">
                    <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100" alt="thumb" className="h-16 w-full object-contain" />
                    <span className="absolute top-1 right-1 w-4 h-4 bg-gray-500 text-white rounded-full flex items-center justify-center text-[10px] cursor-pointer">×</span>
                  </div>
                  <div className="border border-dashed border-gray-300 rounded-xl p-2 flex flex-col items-center justify-center bg-gray-50/50 cursor-pointer hover:border-emerald-500">
                    <div className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-1">
                      <Plus size={14} />
                    </div>
                    <span className="text-[10px] font-semibold text-gray-600">Add Image</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4">
                <h3 className="text-sm font-bold text-gray-900">Categories</h3>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Product Categories</label>
                  <div className="relative">
                    <select className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-800 focus:outline-none appearance-none">
                      <option>Select your product</option>
                      <option>Electronics</option>
                      <option>Fashion</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Product Tag</label>
                  <div className="relative">
                    <select className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-800 focus:outline-none appearance-none">
                      <option>Select your product</option>
                      <option>New Arrival</option>
                      <option>Best Seller</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">Select your color</label>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 border border-emerald-200 cursor-pointer"></div>
                    <div className="w-7 h-7 rounded-lg bg-rose-100 border border-rose-200 cursor-pointer"></div>
                    <div className="w-7 h-7 rounded-lg bg-slate-200 border border-slate-300 cursor-pointer"></div>
                    <div className="w-7 h-7 rounded-lg bg-amber-100 border border-amber-200 cursor-pointer"></div>
                    <div className="w-7 h-7 rounded-lg bg-gray-800 cursor-pointer"></div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
};