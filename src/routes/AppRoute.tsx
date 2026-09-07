import { Route, Routes } from "react-router-dom"
import { Layout } from "../components/layout/Layout"
import { Dashboard } from "../features/dashboard/pages/Dashboard"
import { Products } from "../features/products/pages/Products"
import { OrderManagement } from "../features/order_Management/pages/OrderManagement"
import { Categories } from "../features/categories/pages/Categories"
import { Customers } from "../features/customers/pages/Customers"


export const AppRoute = () => {
  return (
    <Routes>
        <Route path="/" element={<Layout/>} >
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/products" element={<Products/>}/>
            <Route path="/orders" element={<OrderManagement/>}/>
            <Route path="/categories" element={<Categories/>}/>
            <Route path="/customers" element={<Customers/>}/>
        </Route>
    </Routes>
  )
}
