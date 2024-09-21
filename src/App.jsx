import { Fragment } from "react";
import { Divider } from "@chakra-ui/react";

import Header from "./partials/header/Header";
import Footer from "./partials/footer/Footer";
import { PublicRoutes } from "./routes/PublicRoutes";

function App() {

  return (
    <Fragment >
     
      <Header />
      
      <Divider />
      
      <main>
        <PublicRoutes />
      </main>

      {/*<Footer />*/}

    </Fragment>

  );
}

export default App;
