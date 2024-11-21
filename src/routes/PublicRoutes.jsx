import { Route, Routes, Navigate } from "react-router-dom";
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