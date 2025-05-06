import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/public/login/Login";
import PublicLayout from "../layouts/public/PublicLayout";

export const PublicRoutes= () => {
  return (

    <Routes>
        <Route path="/*" element={<PublicLayout />} >
          <Route index element={<Login />} />
          <Route path={`login`} element={<Login />} />
          <Route path={`*`} element={<Navigate to={`/login`}/>} />
        </Route>
    </Routes>

  )
}