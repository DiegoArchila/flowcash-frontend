import { Button } from "@chakra-ui/react";

import { Link } from "react-router-dom";

//Icons
import { FaUser } from "react-icons/fa";

export default function User() {

  // Emulate an any user

  const ButtonLogin = (
    <Button
        variant={"ghost"}
        isDisabled={true}
        border={"0.5px solid white"}
        color={"#FFFFFF"}
        size={"sm"}
        gap={2}
    >
      Login

      <FaUser color="white" />
    </Button>
  );


  return (
    
    <>
        {ButtonLogin}
    </>
  )
}
