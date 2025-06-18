import { Route, Navigate } from "react-router-dom";
import Home from "../pages/private/home/Home";
import Products from "../pages/private/products/Products";
import Suppliers from "../pages/private/suppliers/Suppliers";
import Costumers from "../pages/private/costumers/Costumers";
import Invoices from "../pages/private/invoices/Invoices";
import PrivateLayout from "../layouts/private/PrivateLayout";
import FlowcashRoutes from "../pages/private/flowcash/routes/FlowcashRoutes";
import { useSelector } from "react-redux";

export const PrivateRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (

    <>
      <Route path="/private" element={ isAuthenticated!=undefined && isAuthenticated ? <PrivateLayout /> : <Navigate to="/login" />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="supplies" element={<Suppliers />} />
        <Route path="flowcash/*" element={<FlowcashRoutes />} />
        <Route path="costumers" element={<Costumers />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="*" element={<Navigate to="/private" />} />
      </Route>

    </>


  );
}