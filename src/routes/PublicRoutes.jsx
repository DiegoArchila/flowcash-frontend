import { Route, Navigate } from "react-router-dom";
import Login from "../pages/public/login/Login";
import PublicLayout from "../layouts/public/PublicLayout";
import LayoutLogin from "../pages/public/login/LayoutLogin";
import { useSelector } from "react-redux";

export const PublicRoutes = () => {

  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <>

      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Navigate to={isAuthenticated ? "/private" : "/login"} />} />
        <Route path="login" element={isAuthenticated ? <Navigate to="/private" /> : <LayoutLogin />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Route>

    </>

  )
}