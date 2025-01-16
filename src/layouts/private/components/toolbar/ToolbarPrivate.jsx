//REACT

//COMPONENTS
import Toolbar from "../../../../components/toolbar/Toolbar.jsx";

//CHAKRA UI
import { Box, Divider } from '@chakra-ui/react';

//ICONS
import { TbReportAnalytics} from "react-icons/tb";
import { FaCashRegister } from "react-icons/fa";
import { MdOutlineHomeWork, MdFactory } from "react-icons/md";
import { FaBoxes } from "react-icons/fa";
import { FaFileInvoiceDollar, FaPeopleGroup } from "react-icons/fa6";


function ToolbarPrivate() {
  return (
    <Toolbar justifyContent={"flex-start"} pl={"10px"}>
      
      {/** Home */}
      <Box cursor={"pointer"}>
        <MdOutlineHomeWork size={30} color='#FFF0F5' />
      </Box>

      <Divider orientation='vertical' color={"FFF0F5"} h={"28px"}/>

      {/** Products */}
      <Box cursor={"pointer"} >
        <FaBoxes size={30} color='#FFF0F5' />
      </Box>

      <Divider orientation='vertical' color={"FFF0F5"} h={"28px"}/>

      {/** Flowcash */}
      <Box cursor={"pointer"} >
        <FaCashRegister size={30} color='#FFF0F5' />
      </Box>

      <Divider orientation='vertical' color={"FFF0F5"} h={"28px"}/>

      {/** Invoices */}
      <Box cursor={"pointer"} >
        <FaFileInvoiceDollar size={30} color='#FFF0F5' />
      </Box>

      <Divider orientation='vertical' color={"FFF0F5"} h={"28px"}/>

      {/** Costumers */}
      <Box cursor={"pointer"} >
        <FaPeopleGroup size={30} color='#FFF0F5' />
      </Box>

      <Divider orientation='vertical' color={"FFF0F5"} h={"28px"}/>

      {/** Supplies */}
      <Box cursor={"pointer"} >
        <MdFactory size={30} color='#FFF0F5' />
      </Box>

    </Toolbar>
  )
}

ToolbarPrivate.propTypes = {}

export default ToolbarPrivate;