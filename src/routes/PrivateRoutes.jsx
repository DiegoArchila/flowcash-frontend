import { Route, Routes, Navigate } from "react-router-dom";
import Flowcash from "../pages/private/flowcash/Flowcash";
import Home from "../pages/private/home/Home";
import Products from "../pages/private/products/Products";
import Suppliers from "../pages/private/suppliers/Suppliers";
import Costumers from "../pages/private/costumers/Costumers";
import Invoices from "../pages/private/invoices/Invoices";


export const PrivateRoutes= () => {



  return (

    <Routes>
        <Route path="/flowcash" element={<Flowcash />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/costumers" element={<Costumers />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/*" element={<Navigate to={"/home"}/>} />
    </Routes>

  )
}