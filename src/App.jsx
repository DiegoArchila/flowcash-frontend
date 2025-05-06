//Redux
import { useSelector } from "react-redux";

import { PublicRoutes } from "./routes/PublicRoutes";
import { PrivateRoutes } from "./routes/PrivateRoutes";

function App() {

  const { isAuthenticated } = useSelector((state) => state.user);

  console.log('Esta autenticado?: ',isAuthenticated);

  return (
    <div className="containerAPP">
      
    {
      isAuthenticated ?
      <PrivateRoutes /> :
      <PublicRoutes />

    }

    </div>

  );
}

export default App;