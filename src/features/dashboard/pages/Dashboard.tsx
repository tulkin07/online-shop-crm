import ApexChart from "../../../components/ui/ApexChart"
import "../styles/diogramm.css"
import UsersInfo from "./UsersInfo"


export const Dashboard = () => {
  return (
    <div className="w-full">
    <div className="grid grid-cols-3 gap-4 w-full">
      
      {/* Total Sales */}
      <div className="h-55.5 rounded-lg p-5 bg-white">
        <div className="flex justify-between items-center">
          <b className="text-[18px] text-[#23272E]">Total Sales</b>
          <span>
            <i className="bi bi-three-dots-vertical"></i>
          </span>
        </div>
  
        <span className="text-[#6A717F] text-[14px]">Last 7 days</span>
  
        <div className="flex items-center gap-4">
          <p className="text-[32px]">$350K</p>
          <span>
            Sales
            <span className="text-[#21C45D] ps-1">
              <i className="bi bi-arrow-up"></i> 10.4%
            </span>
          </span>
        </div>
  
        <span className="text-[14px] text-[#23272E]">
          Previous 7days{" "}
          <span className="text-[#6467F2]">($235)</span>
        </span>
  
        <div className="flex justify-end mt-5">
          <button className="cursor-pointer text-[#6467F2] px-[24.5px] py-1 rounded-[50px] border-2 border-[#6467F2]">
            Details
          </button>
        </div>
      </div>
  
      {/* Total Orders */}
      <div className="h-55.5 rounded-lg p-5 bg-white">
        <div className="flex justify-between items-center">
          <b className="text-[18px] text-[#23272E]">Total Orders</b>
          <span>
            <i className="bi bi-three-dots-vertical"></i>
          </span>
        </div>
  
        <span className="text-[#6A717F] text-[14px]">Last 7 days</span>
  
        <div className="flex items-center gap-4">
          <p className="text-[32px]">$350K</p>
          <span>
            Order
            <span className="text-[#21C45D] ps-1">
              <i className="bi bi-arrow-up"></i> 10.4%
            </span>
          </span>
        </div>
  
        <span className="text-[14px] text-[#23272E]">
          Previous 7days{" "}
          <span className="text-[#6467F2]">($235)</span>
        </span>
  
        <div className="flex justify-end mt-5">
          <button className="cursor-pointer text-[#6467F2] px-[24.5px] py-1 rounded-[50px] border-2 border-[#6467F2]">
            Details
          </button>
        </div>
      </div>
  
      {/* Pending & Canceled */}
      <div className="h-55.5 rounded-lg p-5 bg-white">
        <div className="flex justify-between items-center">
          <b className="text-[18px] text-[#23272E]">
            Pending & Canceled
          </b>
          <span>
            <i className="bi bi-three-dots-vertical"></i>
          </span>
        </div>
  
        <span className="text-[#6A717F] text-[14px]">Last 7 days</span>
  
        <div className="flex items-center gap-4">
          <p className="text-[32px]">$350K</p>
          <span>
            Sales
            <span className="text-[#21C45D] ps-1">
              <i className="bi bi-arrow-up"></i> 10.4%
            </span>
          </span>
        </div>
  
        <span className="text-[14px] text-[#23272E]">
          Previous 7days{" "}
          <span className="text-[#6467F2]">($235)</span>
        </span>
  
        <div className="flex justify-end mt-5">
          <button className="cursor-pointer text-[#6467F2] px-[24.5px] py-1 rounded-[50px] border-2 border-[#6467F2]">
            Details
          </button>
        </div>
      </div>
  
    </div>
  
    <div className="diogramm mt-5 grid grid-cols-12 gap-4">
      <ApexChart />
      <UsersInfo/>
    </div>
  </div>
  )
}
