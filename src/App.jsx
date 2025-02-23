import { Divider } from "@chakra-ui/react";

import Header from "./partials/header/Header";
import { PublicRoutes } from "./routes/PublicRoutes";
import { PrivateRoutes } from "./routes/PrivateRoutes";

function App() {

  return (
    <div className="containerAPP">
     
      {/* <Header/>
      
      <Divider /> */}
      
      <main>
        {/* <PublicRoutes /> */}
        <PrivateRoutes />
      </main>

      {/*<Footer />*/}

    </div>

  );
}

export default App;