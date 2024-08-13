import { Box } from '@chakra-ui/react';
import { CiMenuBurger } from "react-icons/ci";

export default function Menu() {
  return (
    <Box id={"navbar-menu"} fontWeight={50}>
      <CiMenuBurger size={26} color={"black"} opacity={1} />
    </Box>
  )
}
