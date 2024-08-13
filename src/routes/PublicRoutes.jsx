import { Route, Routes, Navigate } from "react-router-dom";
import Flowcash from "../pages/public/flowcash/Flowcash";

export const PublicRoutes= () => {
  return (

    <Routes>
        <Route path="/flowcash" element={<Flowcash />} />
        <Route path="/*" element={<Navigate to={"/flowcash"}/>} />
    </Routes>

  )
}