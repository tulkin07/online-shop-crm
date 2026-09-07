import React from 'react';
import { Sidebar } from '../../../../widgets/sidebar/ui/Sidebar';
import { Header } from '../../../../widgets/header/ui/Header';
import { MoreVertical, ArrowUpRight, ArrowDownRight, Filter, Search, Plus } from 'lucide-react';
import Chart from 'react-apexcharts';
import rectangle from '../../../../assets/Rectangle.svg';

export const DashboardPage: React.FC = () => {
  const dataSeries = [
    Array.from({ length: 12 }, () => ({ value: Math.floor(Math.random() * 20000000) })),
    Array.from({ length: 18 }, () => ({ value: Math.floor(Math.random() * 20000000) })),
    Array.from({ length: 12 }, () => ({ value: Math.floor(Math.random() * 20000000) })),
  ];

  const base = new Date('01 Jan 2025 GMT').getTime();
  let ts1 = base;
  let ts2 = base + 86400000;
  let ts3 = base + 518400000;

  const dataSet: [number, number][][] = [[], [], []];

  for (let i = 0; i < 12; i++) {
    ts1 = ts1 + 86400000;
    dataSet[0].push([ts1, dataSeries[2][i].value]);
  }
  for (let i = 0; i < 18; i++) {
    ts2 = ts2 + 86400000;
    dataSet[1].push([ts2, dataSeries[1][i].value]);
  }
  for (let i = 0; i < 12; i++) {
    ts3 = ts3 + 86400000;
    dataSet[2].push([ts3, dataSeries[0][i].value]);
  }

  const chartOptions: Record<string, any> = {
    series: [
      { name: 'Auth API', data: dataSet[0] },
      { name: 'Search API', data: dataSet[1] },
      { name: 'Media API', data: dataSet[2] },
    ],
    chart: {
      type: 'area',
      stacked: false,
      height: 250,
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: ['#00E396', '#008FFB', '#FEB019'],
    dataLabels: { enabled: false },
    markers: { size: 0 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100, 100, 100],
      },
    },
    yaxis: {
      labels: {
        style: { colors: '#8e8da4' },
        formatter: function (val: number) {
          return (val / 1000000).toFixed(1) + 'M';
        },
      },
      title: { text: 'Requests' },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    xaxis: {
      type: 'datetime',
      tickAmount: 8,
      min: new Date('01/01/2025').getTime(),
      max: new Date('01/20/2025').getTime(),
      labels: {
        rotate: -15,
        rotateAlways: true,
        format: 'dd MMM yyyy',
      },
    },
    title: {
      text: 'Requests by Service (irregular intervals)',
      align: 'left',
      offsetX: 14,
    },
    tooltip: { shared: true },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      offsetX: -10,
    },
  };

  const revenueAreaChartOptions = {
    chart: {
      type: 'area' as const,
      height: 280,
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' as const, width: 3, colors: ['#10B981'] },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.0,
        stops: [0, 90, 100],
        colorStops: [
          { offset: 0, color: '#10B981', opacity: 0.4 },
          { offset: 100, color: '#10B981', opacity: 0.0 },
        ],
      },
    },
    xaxis: {
      categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: '#9CA3AF', fontSize: '12px' } },
    },
    yaxis: {
      min: 0,
      max: 50000,
      tickAmount: 5,
      labels: {
        formatter: (val: number) => `${val / 1000}k`,
        style: { colors: '#9CA3AF', fontSize: '12px' },
      },
    },
    grid: {
      borderColor: '#F3F4F6',
      strokeDashArray: 4,
    },
    tooltip: {
      x: { format: 'dd MMM' },
    },
  };

  const revenueAreaSeries = [
    {
      name: 'Revenue',
      data: [15000, 22000, 19000, 31000, 42000, 25000, 28000],
    },
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-8 space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-gray-500 text-sm font-medium">Total Sales</h3>
                  <p className="text-xs text-gray-400">Last 7 days</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={18} /></button>
              </div>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-bold text-gray-900">$350K</span>
                <span className='text-sm font-medium'>Sales</span>
                <span className="text-emerald-600 text-sm font-medium flex items-center">
                  <ArrowUpRight size={16} /> 10.4%
                </span>
              </div>
              <div className="flex justify-between items-center pt-4 border-gray-100">
                <span className="text-xs text-gray-500">Previous 7days <strong className="text-blue-600">($235)</strong></span>
                <button className="text-xs font-semibold text-blue-600 border border-blue-600 px-4 py-1.5 rounded-full hover:bg-emerald-50 mt-5">Details</button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
                  <p className="text-xs text-gray-400">Last 7 days</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={18} /></button>
              </div>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-bold text-gray-900">10.7K</span>
                <span className="text-emerald-600 text-sm font-medium flex items-center">
                  <ArrowUpRight size={16} /> 14.4%
                </span>
              </div>
              <div className="flex justify-between items-center pt-4 border-gray-100">
                <span className="text-xs text-gray-500">Previous 7days <strong className="text-blue-600">(7.6k)</strong></span>
                <button className="text-xs font-semibold text-blue-600 border mt-4 border-blue-600 px-4 py-1.5 rounded-full hover:bg-emerald-50">Details</button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-gray-500 text-sm font-medium">Pending & Canceled</h3>
                  <p className="text-xs text-gray-400">Last 7 days</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={18} /></button>
              </div>
              <div className="flex items-baseline gap-6 mb-4">
                <div>
                  <span className="text-xs text-gray-400 block">Pending</span>
                  <span className="text-2xl font-bold text-gray-900">509 <span className="text-xs text-emerald-600 font-medium">user 204</span></span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block">Canceled</span>
                  <span className="text-2xl font-bold text-gray-900">94 <span className="text-xs text-rose-500 font-medium flex items-center inline-flex"><ArrowDownRight size={14} /> 14.4%</span></span>
                </div>
              </div>
              <div className="flex justify-end pt-4 ">
                <button className="text-xs font-semibold text-blue-600 border border-blue-600 px-4 py-1.5 rounded-full hover:bg-emerald-50">Details</button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white p-6 rounded-2xl border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Report for this week</h3>
                <div className="bg-emerald-50 p-1 rounded-full flex text-xs font-medium">
                  <button className="bg-white text-emerald-600 px-4 py-1.5 rounded-full shadow-sm">This week</button>
                  <button className="text-gray-500 px-4 py-1.5">Last week</button>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-4 mb-6">
                <div>
                  <span className="text-xl font-bold text-gray-900 block">52k <br />
                    <span className="text-xs text-gray-400">Customers</span>
                  </span>
                </div>
                <div>
                  <span className="text-xl font-bold text-gray-900 block">3.5k</span>
                  <span className="text-xs text-gray-400">Total Products</span>
                </div>
                <div>
                  <span className="text-xl font-bold text-gray-900 block">2.5k</span>
                  <span className="text-xs text-gray-400">Stock Products</span>
                </div>
                <div>
                  <span className="text-xl font-bold text-gray-900 block">0.5k</span>
                  <span className="text-xs text-gray-400">Out of Stock</span>
                </div>
                <div>
                  <span className="text-xl font-bold text-gray-900 block">250k</span>
                  <span className="text-xs text-gray-400">Revenue</span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-emerald-100 p-2">
                <Chart options={revenueAreaChartOptions} series={revenueAreaSeries} type="area" height={280} />
              </div>
            </div>

            <div className="space-y-6">
          
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                 <div className="bg-white p-6 rounded-2xl  border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-400">Users in last 30 minutes</span>
                  <MoreVertical size={16} className="text-gray-400" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-1">21.5K</h2>
                <p className="text-xs text-gray-400 mb-4">Users per minute</p>

                <div className="flex items-end gap-1.5 h-10 mb-6">
                  {[40, 60, 30, 80, 50, 90, 40, 70, 60, 85, 30, 95, 40, 70, 80, 60, 90, 100].map((h, i) => (
                    <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-[#10B981] rounded-t-[2px]"></div>
                  ))}
                </div>
              </div>
                <div className="p-6 pb-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-gray-900 text-sm">Sales by Country</h4>
                    <span className="text-xs text-gray-400 font-medium">Sales</span>
                  </div>
                </div>


                <div className="relative w-full px-6 py-5">
             
                  <div
                    className="absolute inset-0 opacity-15  bg-cover bg-center"
                    style={{ backgroundImage: `url(${rectangle})` }}
                  ></div>

                  <div className="relative z-10 space-y-5">
           
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">🇺🇸</span>
                        <div>
                          <p className="text-xs font-bold text-gray-800">30k</p>
                          <p className="text-[10px] text-gray-400">US</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
                          <div className="bg-indigo-600 h-full rounded-full" style={{ width: '80%' }}></div>
                        </div>
                        <span className="text-xs text-emerald-600 font-medium flex items-center gap-0.5">▲ 25.8%</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">🇧🇷</span>
                        <div>
                          <p className="text-xs font-bold text-gray-800">30k</p>
                          <p className="text-[10px] text-gray-400">Brazil</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
                          <div className="bg-indigo-600 h-full rounded-full" style={{ width: '60%' }}></div>
                        </div>
                        <span className="text-xs text-rose-500 font-medium flex items-center gap-0.5">▼ 15.8%</span>
                      </div>
                    </div>

           
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">🇦🇺</span>
                        <div>
                          <p className="text-xs font-bold text-gray-800">25k</p>
                          <p className="text-[10px] text-gray-400">Australia</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
                          <div className="bg-indigo-600 h-full rounded-full" style={{ width: '70%' }}></div>
                        </div>
                        <span className="text-xs text-emerald-600 font-medium flex items-center gap-0.5">▲ 35.8%</span>
                      </div>
                    </div>
                  </div>
                </div>

           
                <div className="p-6 pt-2">
                  <button className="w-full text-xs font-semibold text-blue-600 border border-indigo-200 py-3 rounded-full hover:bg-indigo-50 transition-colors text-center shadow-sm">
                    View Insight
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white p-6 rounded-2xl border border-gray-200 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Transaction</h3>
                  <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-emerald-700">
                    <Filter size={14} /> Filter
                  </button>
                </div>

                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 text-xs text-gray-400">
                      <th className="pb-3 font-medium">No</th>
                      <th className="pb-3 font-medium">Id Customer</th>
                      <th className="pb-3 font-medium">Order Date</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-50">
                    {[
                      { no: '1.', id: '#6545', date: '01 Oct | 11:29 am', status: 'Paid', color: 'bg-emerald-500', amount: '$64' },
                      { no: '2.', id: '#5412', date: '01 Oct | 11:29 am', status: 'Pending', color: 'bg-amber-400', amount: '$557' },
                      { no: '3.', id: '#6622', date: '01 Oct | 11:29 am', status: 'Paid', color: 'bg-emerald-500', amount: '$156' },
                      { no: '4.', id: '#6462', date: '01 Oct | 11:29 am', status: 'Paid', color: 'bg-emerald-500', amount: '$265' },
                      { no: '5.', id: '#6462', date: '01 Oct | 11:29 am', status: 'Paid', color: 'bg-emerald-500', amount: '$265' },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50">
                        <td className="py-3 text-gray-500">{row.no}</td>
                        <td className="py-3 font-medium text-gray-800">{row.id}</td>
                        <td className="py-3 text-gray-500 text-xs">{row.date}</td>
                        <td className="py-3">
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-700">
                            <span className={`w-2 h-2 rounded-full ${row.color}`}></span> {row.status}
                          </span>
                        </td>
                        <td className="py-3 font-semibold text-gray-900 text-right">{row.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end pt-4 mt-4 border-t border-gray-100">
                <button className="text-xs font-semibold text-blue-600 border border-blue-600 px-6 py-2 rounded-full hover:bg-emerald-50">
                  Details
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-base font-bold text-gray-900">Top Products</h3>
                  <a href="#" className="text-xs text-blue-600 font-medium hover:underline">All product</a>
                </div>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                  <input type="text" placeholder="Search" className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-1.5 text-xs focus:outline-none focus:border-emerald-500" />
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Apple iPhone 13', item: '#FXZ-4567', price: '$999.00', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100' },
                    { name: 'Nike Air Jordan', item: '#FXZ-4567', price: '$72.40', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100' },
                    { name: 'T-shirt', item: '#FXZ-4567', price: '$35.40', img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=100' },
                    { name: 'Assorted Cross Bag', item: '#FXZ-4567', price: '$80.00', img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=100' },
                  ].map((p, i) => (
                    <div key={i} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <img src={p.img} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                        <div>
                          <h4 className="text-xs font-bold text-gray-800">{p.name}</h4>
                          <p className="text-[10px] text-gray-400">Item: {p.item}</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-gray-900">{p.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white p-6 rounded-2xl border border-gray-200 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Best selling product</h3>
                  <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-emerald-700">
                    <Filter size={14} /> Filter
                  </button>
                </div>

                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#EAF5EC] text-xs text-gray-600 border-b border-gray-200">
                      <th className="py-3 px-4 font-semibold border-r border-gray-200">PRODUCT</th>
                      <th className="py-3 px-4 font-semibold border-r border-gray-200">TOTAL ORDER</th>
                      <th className="py-3 px-4 font-semibold border-r border-gray-200">STATUS</th>
                      <th className="py-3 px-4 font-semibold">PRICE</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-200">
                    {[
                      { name: 'Apple iPhone 13', order: '104', status: 'Stock', statusColor: 'text-emerald-600 bg-emerald-50', price: '$999.00', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100' },
                      { name: 'Nike Air Jordan', order: '56', status: 'Stock out', statusColor: 'text-rose-500 bg-rose-50', price: '$999.00', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100' },
                      { name: 'T-shirt', order: '266', status: 'Stock', statusColor: 'text-emerald-600 bg-emerald-50', price: '$999.00', img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=100' },
                      { name: 'Cross Bag', order: '506', status: 'Stock', statusColor: 'text-emerald-600 bg-emerald-50', price: '$999.00', img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=100' },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50">
                        <td className="py-3 px-4 flex items-center gap-3 border-r border-gray-200">
                          <img src={row.img} alt={row.name} className="w-8 h-8 rounded-lg object-cover bg-gray-100" />
                          <span className="font-semibold text-xs text-gray-800">{row.name}</span>
                        </td>
                        <td className="py-3 px-4 text-xs text-gray-600 border-r border-gray-200">{row.order}</td>
                        <td className="py-3 px-4 border-r border-gray-200">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${row.statusColor}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span> {row.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-semibold text-xs text-gray-900">{row.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end pt-4 mt-4 border-t border-gray-100">
                <button className="text-xs font-semibold text-blue-600 border border-blue-600 px-6 py-2 rounded-full hover:bg-emerald-50">
                  Details
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-gray-900">Add New Product</h3>
                <button className="text-xs font-semibold text-blue-600 flex items-center gap-1 hover:underline">
                  <Plus size={14} /> Add New
                </button>
              </div>

              <div>
                <p className="text-xs text-gray-400 mb-3">Categories</p>
                <div className="space-y-2">
                  {[
                    { name: 'Electronic', icon: '💻' },
                    { name: 'Fashion', icon: '👕' },
                    { name: 'Home', icon: '🏠' },
                  ].map((cat, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <span className="text-base">{cat.icon}</span>
                        <span className="text-xs font-semibold text-gray-800">{cat.name}</span>
                      </div>
                      <span className="text-gray-400 text-xs">›</span>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-2">
                  <a href="#" className="text-[11px] text-blue-600 hover:text-gray-600">See more</a>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-400 mb-3">Product</p>
                <div className="space-y-3">
                  {[
                    { name: 'Smart Fitness Tracker', price: '$39.99', img: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=100' },
                    { name: 'Leather Wallet', price: '$19.99', img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=100' },
                    { name: 'Electric Hair Trimmer', price: '$34.99', img: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=100' },
                  ].map((prod, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <img src={prod.img} alt={prod.name} className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                        <div>
                          <h4 className="text-xs font-bold text-gray-800">{prod.name}</h4>
                          <p className="text-xs text-emerald-600 font-semibold">{prod.price}</p>
                        </div>
                      </div>
                      <button className="bg-emerald-500 hover:bg-emerald-600 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1">
                        <Plus size={12} /> Add
                      </button>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-3">
                  <a href="#" className="text-[11px] text-blue-600 hover:text-gray-600">See more</a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};