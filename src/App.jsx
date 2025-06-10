
import { Routes } from "react-router-dom";

import { PublicRoutes } from "./routes/PublicRoutes";
import { PrivateRoutes } from "./routes/PrivateRoutes";


function App() {

  return (
    <Routes>
      {/* Public Routes */}

      {PublicRoutes()}


      {/* Private Routes */}
      {PrivateRoutes()}
     
    </Routes>
  );
}

export default App;