import { Route, Routes, Navigate } from "react-router-dom";
import Flowcash from "../pages/private/flowcash/Flowcash";
import Reports from "../pages/private/flowcash/pages/reports/Reports";
import Login from "../pages/public/login/Login";
import Home from "../pages/public/home/Home";

export const PublicRoutes= () => {
  return (

    <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/*" element={<Navigate to={"/home"}/>} /> */}
    </Routes>

  )
}