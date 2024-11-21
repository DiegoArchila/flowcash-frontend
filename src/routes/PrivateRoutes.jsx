import { Route, Routes, Navigate } from "react-router-dom";
import Flowcash from "../pages/private/flowcash/Flowcash";
import Home from "../pages/private/home/Home";
import Products from "../pages/private/products/Products";
import Suppliers from "../pages/private/suppliers/Suppliers";
import Costumers from "../pages/private/costumers/Costumers";
import Invoices from "../pages/private/invoices/Invoices";


export const PrivateRoutes= () => {

    const SUB_ROUTE="/manage";


  return (

    <Routes>
        <Route path={`${SUB_ROUTE}/flowcash`} element={<Flowcash />} />
        <Route path={`${SUB_ROUTE}/home`} element={<Home />} />
        <Route path={`${SUB_ROUTE}/products`} element={<Products />} />
        <Route path={`${SUB_ROUTE}/suppliers`} element={<Suppliers />} />
        <Route path={`${SUB_ROUTE}/costumers`} element={<Costumers />} />
        <Route path={`${SUB_ROUTE}/invoices`}element={<Invoices />} />
        <Route path={`${SUB_ROUTE}/*`} element={<Navigate to={"/home"}/>} />
    </Routes>

  )
}