import { useState } from "react"
import logo from "../../assets/svg/logo.svg"
import { NavLink } from "react-router-dom"
import { sidebarMenu } from "../../routes/Route"
import userPhoto from "../../assets/img/photo_2026-08-13_12-27-13.png" 

export const Sidebar = () => {
    const [openToggle, setOpenToggle] = useState(false)
  return (
    <div className={`${openToggle? "w-20" : " w-65"} sidebar transition-all duration-300 h-screen flex flex-col justify-between shrink-0` }>
        <div>
        <div className={`${openToggle ? "justify-center" : "justify-between"} flex  p-5`}>
            { 
                !openToggle ?
               <img src={logo} alt="" /> : "" 
               }
             {
                !openToggle ?
                <i onClick={()=> setOpenToggle(!openToggle)} className="bi bi-arrow-bar-left"></i> :
                <i onClick={()=> setOpenToggle(!openToggle)} className="bi bi-arrow-bar-right"></i>
            }
        </div>

        <menu className="p-3.5">
            {
              ! openToggle? <span className="text-[15px] mt-2 p-3.5">Main menu</span> : ""}
            {sidebarMenu.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 mb-2 rounded-md p-3.5
              ${
                isActive
                  ? "bg-[#4EA674] text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`
            }
          >
            <Icon size={20} />

            {
                !openToggle ?
                <span>{item.title}</span> : ""}
          </NavLink>
        );
      })}
        </menu>
        </div>
        <div className={`${openToggle ? "flex-col" : "flex"} justify-between items-center p-3.5`} >
            
              
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img src={userPhoto} alt="" className="w-full h-full object-cover"/>
            </div> 
            { 
            !openToggle?
            <div className="">
                <p className="text-black">Otabek</p>
                <span className="text-[10px]">yoldoshev02000@gmail.com</span>    
            </div> : "" }
            
          
            <div className={`${openToggle? "mt-3" : ""} flex justify-center align-middle`}>
            <i className="bi bi-box-arrow-left text-red-600"></i>
            </div> 
            
        </div>

    </div>
  )
}
