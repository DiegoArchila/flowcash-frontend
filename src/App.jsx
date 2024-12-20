import { Fragment } from "react";
import { Divider, Flex } from "@chakra-ui/react";

import Header from "./partials/header/Header";
import Footer from "./partials/footer/Footer";
import { PublicRoutes } from "./routes/PublicRoutes";
import { PrivateRoutes } from "./routes/PrivateRoutes";

function App() {

  console.log("Me renderize")

  return (
    <div className="containerAPP">
     
      <Header/>
      
      <Divider />
      
      <main>
        <PublicRoutes />
        <PrivateRoutes />
      </main>

      {/*<Footer />*/}

    </div>

  );
}

export default App;
