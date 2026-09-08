import { useState } from "react"


export default function Header() {

  const [isDark, setIsDark] = useState(false)


  return (
    <div className='h-24 w-full p-[35px_25px] flex justify-between items-center'>
      <p className="font-bold text-2xl">Dashboard</p>
      <div className="flex items-center gap-8">
        <div className="bg-[#F9FAFB] p-[8px_27px] rounded-full flex items-center gap-1.5 border border-gray-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition-all duration-200">
          <input
            type="text"
            placeholder="Search data, users, or reports"
            className="w-55 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
          />
          <i className="bi bi-search text-gray-400"></i>
        </div>
        <i className="bi bi-bell"></i>
        <button
          onClick={() => setIsDark(!isDark)}
          className={`relative w-16 h-9 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${isDark ? 'bg-slate-800' : 'bg-[#EBF7EE]'
            }`}
        >
          {/* Dumaloq harakatlanuvchi sharikcha */}
          <div
            className={`w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center transform transition-transform duration-300 ${isDark ? 'translate-x-7' : 'translate-x-0'
              }`}
          >
            {isDark ? (
              /* Oy ikonka (Dark Mode) */
              <i className="bi bi-moon-stars-fill text-slate-800 text-sm"></i>
            ) : (
              /* Quyosh ikonka (Light Mode) */
              <i className="bi bi-sun-fill text-amber-500 text-sm"></i>
            )}
          </div>
        </button>
      </div>
    </div>
  )
}
