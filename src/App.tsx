import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


import { DashboardPage } from './processes/pages/dashboard/ui/DashboardPage';
import { OrdersPage } from './processes/pages/ordermanagement/ui/OrdersPage';
import { CustomersPage } from './processes/pages/customers/ui/CustomersPage';
import { CategoriesPage } from './processes/pages/categories/ui/CategoriesPage';
import { AddProductPage } from './processes/pages/products/ui/AddProductPage';
import { ProfileUpdate } from './processes/pages/adminrole/ui/AdminRole';


export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/dashboard" replace />} />


        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/orders" element={<OrdersPage />} />


        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/products" element={<AddProductPage />} />
        <Route path="//admin-role" element={<ProfileUpdate />} />


        <Route path="/orders" element={<div className="p-8 text-2xl font-bold">Order Page (Coming soon)</div>} />
        <Route path="/customers" element={<div className="p-8 text-2xl font-bold">Custumer Page (Coming soon)</div>} />
        <Route path="/categories" element={<div className="p-8 text-2xl font-bold">Categories Page (Coming soon)</div>} />
        <Route path="/products" element={<div className="p-8 text-2xl font-bold">Products Page (Coming soon)</div>} />


        <Route path="*" element={<div className="p-8 text-2xl font-bold text-red-500">404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;