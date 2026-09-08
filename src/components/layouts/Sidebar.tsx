import LOGO from "../../assets/svg/DealPort.svg"

export default function Sidebar({ open, setOpen }) {
    return (
        <div className={`
            ${open ? "w-3xs" : "w-18"}
         bg-[rgba(255,255,255,1)] h-screen shadow-[0px_0px_12px_#ccc] p-5 transition-all duration-280`}>

            <div className={`flex justify-between ${!open && "justify-center items-center"}`}>
                {
                    open && <img src={LOGO} alt="" />
                }
                {
                    open ? <i onClick={() => setOpen(state => !state)} className="bi bi-caret-left-square cursor-pointer"></i>
                        : <i onClick={() => setOpen(state => !state)} className="bi bi-caret-right-square cursor-pointer"></i>
                }

            </div>
            {
                open ? <p className="m-[10px_0px] text-[rgba(106,113,127,1)]">Main menu</p> : <p className={`m-[10px_0px] text-[rgba(106,113,127,1)] ${!open && "m-[0px_auto]"}`}>Main</p>
            }
            <div>
                <div className={` text-[rgba(106,113,127,1)] ${!open && "justify-center items-center"}text-[rgba(106,113,127,1)] w-full flex gap-3 p-[9px_16px] rounded-md border-0 transition-all duration-200  hover:bg-[#ccc] cursor-pointer`}>
                    <i className="bi bi-house-door-fill"></i>
                    {
                        open && <p>Dashboard</p>
                    }
                </div>
                <div className={` text-[rgba(106,113,127,1)] ${!open && "justify-center items-center"}text-[rgba(106,113,127,1)] w-full flex gap-3 p-[9px_16px] rounded-md border-0 transition-all duration-200  hover:bg-[#ccc] cursor-pointer`}>
                    <i className="bi bi-cart3"></i>
                    {
                        open && <p>Order Management</p>
                    }
                </div>
                <div className={` text-[rgba(106,113,127,1)] ${!open && "justify-center items-center"}text-[rgba(106,113,127,1)] w-full flex gap-3 p-[9px_16px] rounded-md border-0 transition-all duration-200  hover:bg-[#ccc] cursor-pointer`}>
                    <i className="bi bi-people"></i>
                    {
                        open && <p>Customers</p>
                    }
                </div>
                <div className={` text-[rgba(106,113,127,1)] ${!open && "justify-center items-center"}text-[rgba(106,113,127,1)] w-full flex gap-3 p-[9px_16px] rounded-md border-0 transition-all duration-200  hover:bg-[#ccc] cursor-pointer`}>
                    <i className="bi bi-intersect"></i>
                    {
                        open && <p>Categories</p>
                    }
                </div>
                <div className={` text-[rgba(106,113,127,1)] ${!open && "justify-center items-center"}text-[rgba(106,113,127,1)] w-full flex gap-3 p-[9px_16px] rounded-md border-0 transition-all duration-200  hover:bg-[#ccc] cursor-pointer`}>
                    <i className="bi bi-box-seam-fill"></i>
                    {
                        open && <p>Products</p>
                    }
                </div>
            </div>
        </div>
    )
}
