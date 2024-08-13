import { Button } from "@chakra-ui/react";

import { Link } from "react-router-dom";

export default function User() {

  // Emulate an any user

  const ButtonLogin = (
    <Button
        variant={"outline"}
        isDisabled={true}
        border={"0.5px solid white"}
        color={"white"}
        size={"sm"}
    >
      Login
    </Button>
  );


  return (
    
    <>
        {ButtonLogin}
    </>
  )
}
