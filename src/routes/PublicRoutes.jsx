import { Route, Routes, Navigate } from "react-router-dom";
import Flowcash from "../pages/public/flowcash/Flowcash";
import Reports from "../pages/public/flowcash/pages/reports/Reports";

export const PublicRoutes= () => {
  return (

    <Routes>
        <Route path="/flowcash" element={<Flowcash />} />
        <Route path="/flowcash/reports" element={<Reports />} />
        <Route path="/*" element={<Navigate to={"/flowcash"}/>} />
    </Routes>

  )
}