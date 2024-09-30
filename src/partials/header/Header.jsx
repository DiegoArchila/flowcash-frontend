//REACT
import { Link } from "react-router-dom";

//COMPONENTS
import User from "./components/user/User";

//CHAKRA UI
import { Box, Flex, Text } from "@chakra-ui/react";

//ICONS
import { FaAngleDoubleDown } from "react-icons/fa";

function Header() {

  return (
    <Flex
      px={"10px"}
      id={"navbar"}
      minHeight={"48px"}
      minWidth='100%'
      alignItems={"center"}
      justifyContent={"space-between"}
      bgColor={"#003262"}
      boxShadow={"sx"}
      pos={"fixed"}
      zIndex={100}
      top={"0px"}
      borderBottom={"0px"}
      borderBottomWidth={"3px"}
      borderBottomStyle={"solid"}
      borderBottomColor={"#F0F8FF"}
    >

      {/* MENU AND BRAND */}
      <Box id={"navbar-container-MenuBrand"} display={"inline-flex"} alignItems={"center"} gap={"24px"}>

        {/* <Menu /> */}

        <FaAngleDoubleDown size={24} color='#FFFFFF' />

        <Text fontWeight={800} fontFamily={"brand"} fontSize={28} color={"#FFFFFF"} fontStyle={"revert-layer"}>
          <Link to={"/"}>
            {"Flowcash".toLocaleUpperCase()}
          </Link>
        </Text>

      </Box>

      {/* LOG IN AND SING UP */}
      <User />

    </Flex>
  );
}

export default Header;