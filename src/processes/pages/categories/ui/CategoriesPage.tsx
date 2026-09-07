import React from 'react';
import { Sidebar } from '../../../../widgets/sidebar/ui/Sidebar';
import { Header } from '../../../../widgets/header/ui/Header';
import { 
  Plus, MoreVertical, ChevronRight, Search, Filter, 
  Edit2, Trash2, PlusCircle ,ChevronLeft
} from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen">
  
      <Sidebar />

   
      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-8 space-y-6">

          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">Discover</h1>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-colors">
                <Plus size={16} /> Add Product
              </button>
              <button className="flex items-center gap-2 border border-gray-200 bg-white text-gray-700 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-gray-50 transition-colors">
                More Action <MoreVertical size={14} />
              </button>
            </div>
          </div>


          <div className="relative">
            <div className="grid grid-cols-4 gap-4">
              {[
                { title: 'Electronics', count: '128 items', img: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=100' },
                { title: 'Fashion', count: '342 items', img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=100' },
                { title: 'Accessories', count: '94 items', img: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=100' },
                { title: 'Home & Kitchen', count: '215 items', img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=100' },
                { title: 'Sports & Outdoors', count: '67 items', img: 'https://images.unsplash.com/photo-1517649763962-0c6232660102?w=100' },
                { title: 'Toys & Games', count: '83 items', img: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=100' },
                { title: 'Health & Fitness', count: '142 items', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100' },
                { title: 'Books', count: '520 items', img: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=100' },
              ].map((cat, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-200 flex items-center gap-4 hover:border-emerald-500 transition-all cursor-pointer group">
                  <div className="w-14 h-14 bg-gray-50 rounded-xl p-2 flex items-center justify-center border border-gray-100 flex-shrink-0">
                    <img src={cat.img} alt={cat.title} className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{cat.title}</h3>
                    <p className="text-xs text-gray-400">{cat.count}</p>
                  </div>
                </div>
              ))}
            </div>

       
            <button className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 shadow-md rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-50">
              <ChevronRight size={20} />
            </button>
          </div>

         
          <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-6">
   
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 bg-emerald-50/60 p-1.5 rounded-2xl">
                <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm">All Product (145)</button>
                <button className="text-gray-600 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-white/50 transition-colors">Featured Products</button>
                <button className="text-gray-600 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-white/50 transition-colors">On Sale</button>
                <button className="text-gray-600 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-white/50 transition-colors">Out of Stock</button>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                  <input 
                    type="text" 
                    placeholder="Search your product" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <button className="p-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50"><Filter size={16} /></button>
                <button className="p-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50"><PlusCircle size={16} /></button>
                <button className="p-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50"><MoreVertical size={16} /></button>
              </div>
            </div>

        
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-emerald-50/60 text-xs text-gray-500 rounded-lg">
                  <th className="py-3 px-4 font-semibold rounded-l-xl w-24">No.</th>
                  <th className="py-3 px-4 font-semibold">Product</th>
                  <th className="py-3 px-4 font-semibold">Created Date</th>
                  <th className="py-3 px-4 font-semibold">Order</th>
                  <th className="py-3 px-4 font-semibold text-right rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-50">
                {[
                  { id: '1', name: 'Wireless Bluetooth Headphones', date: '01-01-2025', order: '25', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100' },
                  { id: '1', name: "Men's T-Shirt", date: '01-01-2025', order: '20', img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=100' },
                  { id: '1', name: "Men's Leather Wallet", date: '01-01-2025', order: '35', img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=100' },
                  { id: '1', name: 'Memory Foam Pillow', date: '01-01-2025', order: '40', img: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=100' },
                  { id: '1', name: 'Coffee Maker', date: '01-01-2025', order: '45', img: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=100' },
                  { id: '1', name: 'Casual Baseball Cap', date: '01-01-2025', order: '55', img: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=100' },
                  { id: '1', name: 'Full HD Webcam', date: '01-01-2025', order: '20', img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=100' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50">
                    <td className="py-3 px-4 text-xs font-semibold text-gray-500">
                      <div className="flex items-center gap-3">
                        <input type="checkbox" className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                        <span>{row.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-50 rounded-xl p-1 border border-gray-100 flex-shrink-0">
                          <img src={row.img} alt={row.name} className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <span className="text-xs font-semibold text-gray-800">{row.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-xs text-gray-500">{row.date}</td>
                    <td className="py-3 px-4 text-xs font-medium text-gray-800">{row.order}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2 text-gray-400">
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg hover:text-gray-600"><Edit2 size={14} /></button>
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg hover:text-rose-500"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <button className="flex items-center gap-1 text-xs font-semibold text-gray-600 border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50">
                <ChevronLeft size={14} /> Previous
              </button>
              
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center">1</button>
                <button className="w-8 h-8 hover:bg-gray-100 rounded-lg text-xs font-semibold text-gray-600 flex items-center justify-center">2</button>
                <button className="w-8 h-8 hover:bg-gray-100 rounded-lg text-xs font-semibold text-gray-600 flex items-center justify-center">3</button>
                <button className="w-8 h-8 hover:bg-gray-100 rounded-lg text-xs font-semibold text-gray-600 flex items-center justify-center">4</button>
                <button className="w-8 h-8 hover:bg-gray-100 rounded-lg text-xs font-semibold text-gray-600 flex items-center justify-center">5</button>
                <span className="text-gray-400 px-1">...</span>
                <button className="w-8 h-8 hover:bg-gray-100 rounded-lg text-xs font-semibold text-gray-600 flex items-center justify-center">24</button>
              </div>

              <button className="flex items-center gap-1 text-xs font-semibold text-gray-600 border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50">
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};