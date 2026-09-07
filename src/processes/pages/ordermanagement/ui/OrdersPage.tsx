import React from 'react';
import { Sidebar } from '../../../../widgets/sidebar/ui/Sidebar';
import { Header } from '../../../../widgets/header/ui/Header';
import { 
  MoreVertical, ArrowUpRight, ArrowDownRight, Plus, 
  Search, Filter, ArrowUpDown, MoreHorizontal, ChevronLeft, ChevronRight 
} from 'lucide-react';

export const OrdersPage: React.FC = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen">
  
      <Sidebar />

  
      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-8 space-y-6">
       
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Order List</h2>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-emerald-700">
                <Plus size={16} /> Add Order
              </button>
              <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-gray-50">
                More Action <MoreVertical size={14} />
              </button>
            </div>
          </div>

       
          <div className="grid grid-cols-4 gap-6">
       
            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
                 
                </div>
                <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={18} /></button>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-gray-900">1,240</span>
                <span className="text-emerald-600 text-sm font-medium flex items-center">
                  <ArrowUpRight size={16} /> 14.4%
                </span>
              </div>
               <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
            </div>

      
            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-gray-500 text-sm font-medium">New Orders</h3>
              
                </div>
                <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={18} /></button>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-gray-900">240</span>
                <span className="text-emerald-600 text-sm font-medium flex items-center">
                  <ArrowUpRight size={16} /> 20%
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
            </div>

  
            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-gray-500 text-sm font-medium">Completed Orders</h3>
                  
                </div>
                <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={18} /></button>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-gray-900">960</span>
                <span className="text-emerald-600 text-sm font-medium">85%</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
            </div>

         
            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-gray-500 text-sm font-medium">Canceled Orders</h3>
                 
                </div>
                <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={18} /></button>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-gray-900">87</span>
                <span className="text-rose-500 text-sm font-medium flex items-center">
                  <ArrowDownRight size={16} /> 5%
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
            </div>
          </div>

     
          <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-6">
        
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 bg-emerald-100 p-1 rounded-xl text-xs font-medium">
                <button className="bg-white text-black px-4 py-2 rounded-lg font-semibold">All order <span className='text-emerald-400' >(240)</span></button>
                <button className="text-gray-500 px-4 py-2 hover:bg-gray-100 rounded-lg">Completed</button>
                <button className="text-gray-500 px-4 py-2 hover:bg-gray-100 rounded-lg">Pending</button>
                <button className="text-gray-500 px-4 py-2 hover:bg-gray-100 rounded-lg">Canceled</button>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                  <input 
                    type="text" 
                    placeholder="Search order report" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <button className="p-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50"><Filter size={16} /></button>
                <button className="p-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50"><ArrowUpDown size={16} /></button>
                <button className="p-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50"><MoreHorizontal size={16} /></button>
              </div>
            </div>


            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-emerald-50/60 text-xs text-gray-500 rounded-lg">
                  <th className="py-3 px-4 font-semibold rounded-l-xl w-12"><input type="checkbox" className="rounded border-gray-300" /></th>
                  <th className="py-3 px-4 font-semibold">No.</th>
                  <th className="py-3 px-4 font-semibold">Order Id</th>
                  <th className="py-3 px-4 font-semibold">Product</th>
                  <th className="py-3 px-4 font-semibold">Date</th>
                  <th className="py-3 px-4 font-semibold">Price</th>
                  <th className="py-3 px-4 font-semibold">Payment</th>
                  <th className="py-3 px-4 font-semibold rounded-r-xl">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-50">
                {[
                  { id: '#ORD0001', prod: 'Wireless Bluetooth Headphones', date: '01-01-2025', price: '49.99', pay: 'Paid', payColor: 'text-emerald-600', payDot: 'bg-emerald-500', status: 'Delivered', statusColor: 'text-emerald-600 bg-emerald-50', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100' },
                  { id: '#ORD0001', prod: "Men's T-Shirt", date: '01-01-2025', price: '14.99', pay: 'Unpaid', payColor: 'text-rose-500', payDot: 'bg-rose-500', status: 'Pending', statusColor: 'text-amber-500 bg-amber-50', img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=100' },
                  { id: '#ORD0001', prod: "Men's Leather Wallet", date: '01-01-2025', price: '49.99', pay: 'Paid', payColor: 'text-emerald-600', payDot: 'bg-emerald-500', status: 'Delivered', statusColor: 'text-emerald-600 bg-emerald-50', img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=100' },
                  { id: '#ORD0001', prod: 'Memory Foam Pillow', date: '01-01-2025', price: '39.99', pay: 'Paid', payColor: 'text-emerald-600', payDot: 'bg-emerald-500', status: 'Shipped', statusColor: 'text-blue-600 bg-blue-50', img: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=100' },
                  { id: '#ORD0001', prod: 'Adjustable Dumbbells', date: '01-01-2025', price: '14.99', pay: 'Unpaid', payColor: 'text-rose-500', payDot: 'bg-rose-500', status: 'Pending', statusColor: 'text-amber-500 bg-amber-50', img: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=100' },
                  { id: '#ORD0001', prod: 'Coffee Maker', date: '01-01-2025', price: '79.99', pay: 'Unpaid', payColor: 'text-rose-500', payDot: 'bg-rose-500', status: 'Cancelled', statusColor: 'text-rose-500 bg-rose-50', img: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=100' },
                  { id: '#ORD0001', prod: 'Casual Baseball Cap', date: '01-01-2025', price: '49.99', pay: 'Paid', payColor: 'text-emerald-600', payDot: 'bg-emerald-500', status: 'Delivered', statusColor: 'text-emerald-600 bg-emerald-50', img: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=100' },
                  { id: '#ORD0001', prod: 'Full HD Webcam', date: '01-01-2025', price: '39.99', pay: 'Paid', payColor: 'text-emerald-600', payDot: 'bg-emerald-500', status: 'Delivered', statusColor: 'text-emerald-600 bg-emerald-50', img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=100' },
                  { id: '#ORD0001', prod: 'Smart LED Color Bulb', date: '01-01-2025', price: '79.99', pay: 'Unpaid', payColor: 'text-rose-500', payDot: 'bg-rose-500', status: 'Delivered', statusColor: 'text-emerald-600 bg-emerald-50', img: 'https://images.unsplash.com/photo-1550985616-11610c812251?w=100' },
                  { id: '#ORD0001', prod: "Men's T-Shirt", date: '01-01-2025', price: '14.99', pay: 'Unpaid', payColor: 'text-rose-500', payDot: 'bg-rose-500', status: 'Delivered', statusColor: 'text-emerald-600 bg-emerald-50', img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=100' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50">
                    <td className="py-3 px-4"><input type="checkbox" className="rounded border-gray-300" /></td>
                    <td className="py-3 px-4 text-xs text-gray-500">{idx + 1}</td>
                    <td className="py-3 px-4 text-xs font-bold text-gray-800">{row.id}</td>
                    <td className="py-3 px-4 flex items-center gap-3">
                      <img src={row.img} alt={row.prod} className="w-8 h-8 rounded-lg object-cover bg-gray-100" />
                      <span className="text-xs font-semibold text-gray-800">{row.prod}</span>
                    </td>
                    <td className="py-3 px-4 text-xs text-gray-500">{row.date}</td>
                    <td className="py-3 px-4 text-xs font-semibold text-gray-900">{row.price}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${row.payColor}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${row.payDot}`}></span> {row.pay}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${row.statusColor}`}>
                        {row.status}
                      </span>
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