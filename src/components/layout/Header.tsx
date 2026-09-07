import { Bell, Moon, Search, Sun } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom"
import userPhoto from "../../assets/img/photo_2026-08-13_12-27-13.png"

export const Header = () => {
  const location = useLocation()

  const getPageTitle = (pathname: string) => {
    if (pathname.startsWith("/dashboard")) return "Dashboard";
    if (pathname.startsWith("/orders")) return "Order Management";
    if (pathname.startsWith("/customers")) return "Customers";
    if (pathname.startsWith("/categories")) return "Categories";
    if (pathname.startsWith("/products")) return "Products";
  
    return "Dashboard";
  };
  const title = getPageTitle[location.pathname] || "Dashboard";

  const [dark, setDark] = useState(false);

  return (
    <div className="header w-full h-24 flex items-center justify-between px-6">
      <div>
      <span className="text-[#023337] text-2xl ">{title}</span>
      </div>
      <div className="flex gap-8">
      <div className="search flex items-center w-101.75 h-12  bg-[#F9FAFB]  px-4 gap-3">
            <input type="text" className="flex-1 outline-none border-none bg-transparent text-black placeholder:text-[#00000099]" placeholder="Search data, users, or reports" />
            <Search className="text-[#00000099] w-5 h-5"/>
          </div>
        <div className="flex gap-5">
            {/* // Qo'ng'iroq */}
        <div className="flex items-center">
          <Bell/>
        </div>
        {/* Mood  */}
        <div className="flex items-center">
          <button
              onClick={() => setDark(!dark)}
              className={`w-10 h-7 rounded-full p-1 flex items-center transition-all ${
                dark ? "bg-[#023337] justify-end" : "bg-[#EAF7E8] justify-start"
              }`}
            >
              <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                {dark ? (
                  <Moon size={13} />
                ) : (
                  <Sun size={13} />
                )}
              </div>
            </button>
        </div>
        {/* User */}
        <div className="w-12 h-12 rounded-full overflow-hidden">
                <img src={userPhoto} alt="" className="w-full h-full object-cover"/>
            </div>
        <div>
        </div>
        </div>
      </div>
    </div>
  )
}
