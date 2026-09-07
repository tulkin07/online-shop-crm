import { Outlet } from "react-router-dom"


export const Content = () => {
  return (
    <div className="bg-[#F9FAFB] page-content w-full flex-1 overflow-y-auto p-6">
        <Outlet/>
    </div>
  )
}
