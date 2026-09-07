import React from 'react';
import { Sidebar } from '../../../../widgets/sidebar/ui/Sidebar';
import { Header } from '../../../../widgets/header/ui/Header';
import { 
  MoreVertical, ArrowUpRight, MessageSquare, Trash2, 
  ChevronLeft, ChevronRight, 
} from 'lucide-react';

export const CustomersPage: React.FC = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen">
    
      <Sidebar />

  
      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-8 space-y-6">
         
          <div className="grid grid-cols-3 gap-6">
            
      
            <div className="space-y-6">
           
              <div className="bg-white p-6 rounded-2xl border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-gray-500 text-sm font-medium">Total Customers</h3>
                   
                  </div>
                  <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={18} /></button>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-gray-900">11,040</span>
                  <span className="text-emerald-600 text-sm font-medium flex items-center">
                    <ArrowUpRight size={16} /> 14.4%
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
              </div>

            
              <div className="bg-white p-6 rounded-2xl border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-gray-500 text-sm font-medium">New Customers</h3>
                  
                  </div>
                  <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={18} /></button>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-gray-900">2,370</span>
                  <span className="text-emerald-600 text-sm font-medium flex items-center">
                    <ArrowUpRight size={16} /> 20%
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
              </div>

           
              <div className="bg-white p-6 rounded-2xl border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-gray-500 text-sm font-medium">Visitor</h3>
                    
                  </div>
                  <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={18} /></button>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-gray-900">250k</span>
                  <span className="text-emerald-600 text-sm font-medium flex items-center">
                    <ArrowUpRight size={16} /> 20%
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Last 7 days</p>
              </div>
              
            </div>

        
            <div className="col-span-2 bg-white p-6 rounded-2xl border border-gray-200 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Customer Overview</h3>
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-50 p-1 rounded-full flex text-xs font-medium">
                      <button className="bg-white text-emerald-600 px-4 py-1.5 rounded-full shadow-sm">This week</button>
                      <button className="text-gray-500 px-4 py-1.5">Last week</button>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={18} /></button>
                  </div>
                </div>

            
                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div>
                    <span className="text-2xl font-bold text-gray-900 block">25k</span>
                    <span className="text-xs text-gray-400">Active Customers</span>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-gray-900 block">5.6k</span>
                    <span className="text-xs text-gray-400">Repeat Customers</span>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-gray-900 block">250k</span>
                    <span className="text-xs text-gray-400">Shop Visitor</span>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-gray-900 block">5.5%</span>
                    <span className="text-xs text-gray-400">Conversion Rate</span>
                  </div>
                </div>
              </div>

         
              <div className="h-44 bg-emerald-50/40 rounded-xl border border-emerald-100 flex items-center justify-center text-emerald-600 font-medium relative overflow-hidden">
                <div className="absolute inset-x-0 bottom-4 px-6 flex justify-between text-[11px] text-gray-400">
                  <span>Sun</span><span>Mon</span><span>Tue</span><span className="text-emerald-700 font-bold">Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                </div>
                [ Interactive Overview Chart ]
              </div>
            </div>

          </div>

      
          <div className="bg-white pb-2.5 rounded-2xl border border-gray-200 space-y-6">
         

            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-emerald-50/60 text-xs text-gray-500 rounded-lg">
                  <th className="py-3 px-4 font-semibold rounded-l-xl">Customer Id</th>
                  <th className="py-3 px-4 font-semibold">Name</th>
                  <th className="py-3 px-4 font-semibold">Phone</th>
                  <th className="py-3 px-4 font-semibold">Order Count</th>
                  <th className="py-3 px-4 font-semibold">Total Spend</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-50">
                {[
                  { id: '#CUST001', name: 'John Doe', phone: '+1234567890', orders: '25', spend: '3,450.00', status: 'Active', statusColor: 'text-emerald-600', dot: 'bg-emerald-500' },
                  { id: '#CUST001', name: 'John Doe', phone: '+1234567890', orders: '25', spend: '3,450.00', status: 'Active', statusColor: 'text-emerald-600', dot: 'bg-emerald-500' },
                  { id: '#CUST001', name: 'John Doe', phone: '+1234567890', orders: '25', spend: '3,450.00', status: 'Active', statusColor: 'text-emerald-600', dot: 'bg-emerald-500' },
                  { id: '#CUST001', name: 'John Doe', phone: '+1234567890', orders: '25', spend: '3,450.00', status: 'Active', statusColor: 'text-emerald-600', dot: 'bg-emerald-500' },
                  { id: '#CUST001', name: 'Jane Smith', phone: '+1234567890', orders: '5', spend: '250.00', status: 'Inactive', statusColor: 'text-rose-500', dot: 'bg-rose-500' },
                  { id: '#CUST001', name: 'Emily Davis', phone: '+1234567890', orders: '30', spend: '4,600.00', status: 'VIP', statusColor: 'text-amber-500', dot: 'bg-amber-400' },
                  { id: '#CUST001', name: 'Jane Smith', phone: '+1234567890', orders: '5', spend: '250.00', status: 'Inactive', statusColor: 'text-rose-500', dot: 'bg-rose-500' },
                  { id: '#CUST001', name: 'John Doe', phone: '+1234567890', orders: '25', spend: '3,450.00', status: 'Active', statusColor: 'text-emerald-600', dot: 'bg-emerald-500' },
                  { id: '#CUST001', name: 'Emily Davis', phone: '+1234567890', orders: '30', spend: '4,600.00', status: 'VIP', statusColor: 'text-amber-500', dot: 'bg-amber-400' },
                  { id: '#CUST001', name: 'Jane Smith', phone: '+1234567890', orders: '5', spend: '250.00', status: 'Inactive', statusColor: 'text-rose-500', dot: 'bg-rose-500' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50">
                    <td className="py-3 px-4 text-xs font-bold text-gray-800">{row.id}</td>
                    <td className="py-3 px-4 text-xs font-semibold text-gray-800">{row.name}</td>
                    <td className="py-3 px-4 text-xs text-gray-500">{row.phone}</td>
                    <td className="py-3 px-4 text-xs text-gray-700">{row.orders}</td>
                    <td className="py-3 px-4 text-xs font-semibold text-gray-900">${row.spend}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${row.statusColor}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${row.dot}`}></span> {row.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2 text-gray-400">
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg hover:text-gray-600"><MessageSquare size={14} /></button>
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg hover:text-rose-500"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <button className="flex items-center gap-1 text-xs font-semibold ml-3 text-gray-600 border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50">
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

              <button className="flex items-center gap-1 text-xs font-semibold mr-3 text-gray-600 border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50">
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};