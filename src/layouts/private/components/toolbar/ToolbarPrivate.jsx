//REACT
import { Link } from "react-router-dom";

//COMPONENTS
import Toolbar from "../../../../components/toolbar/Toolbar.jsx";

//CHAKRA UI
import { Box, Flex, Text } from '@chakra-ui/react';

//ICONS
import { FaCashRegister } from "react-icons/fa";
import { MdOutlineHomeWork, MdFactory } from "react-icons/md";
import { FaBoxes } from "react-icons/fa";
import { FaFileInvoiceDollar, FaPeopleGroup } from "react-icons/fa6";


function ToolbarPrivate() {

  const SUB_ROUTE = "/private";

  return (
    <Toolbar>

      {/** Home */}
      <Box cursor={"pointer"}>
        <Link to={`${SUB_ROUTE}`}>
          <Flex gap={3}>
            <MdOutlineHomeWork size={24} color='#FFF0F5' />
            <Text color='#FFF0F5'>Inicio</Text>
          </Flex>
        </Link>
      </Box>


      {/** Products */}
      <Box cursor={"pointer"} >
        <Link to={`${SUB_ROUTE}/products`}>
          <Flex gap={3}>
            <FaBoxes size={24} color='#FFF0F5' />
            <Text color='#FFF0F5'>Productos</Text>
          </Flex>
        </Link>
      </Box>



      {/** Flowcash */}
      <Box cursor={"pointer"} >
        <Link to={`${SUB_ROUTE}/flowcash`}>
          <Flex gap={3}>
            <FaCashRegister size={22} color='#FFF0F5' />
            <Text color='#FFF0F5'>Caja</Text>
          </Flex>
        </Link>
      </Box>



      {/** Invoices */}
      <Box cursor={"pointer"} >
        <Link to={`${SUB_ROUTE}/invoices`}>
          <Flex gap={3}>
            <FaFileInvoiceDollar size={24} color='#FFF0F5' />
            <Text color='#FFF0F5'>Facturas</Text>
          </Flex>
        </Link>
      </Box>



      {/** Costumers */}
      <Box cursor={"pointer"} >
        <Link to={`${SUB_ROUTE}/costumers`}>
          <Flex gap={3}>
            <FaPeopleGroup size={24} color='#FFF0F5' />
            <Text color='#FFF0F5'>Clientes</Text>
          </Flex>
        </Link>
      </Box>



      {/** Supplies */}
      <Box cursor={"pointer"}>
        <Link to={`${SUB_ROUTE}/supplies`}>
          <Flex gap={3}>
            <MdFactory size={24} color='#FFF0F5' />
            <Text color='#FFF0F5'>Proveedores</Text>
          </Flex>
        </Link>
      </Box>

    </Toolbar>
  )
}

ToolbarPrivate.propTypes = {}

export default ToolbarPrivate;