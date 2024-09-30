//REACT
import React from 'react'
import PropTypes from 'prop-types'

//COMPONENTS
import Toolbar from "../../../../../components/toolbar/Toolbar";

//CHAKRA UI
import { Box, Divider } from '@chakra-ui/react';

//ICONS
import { TbReportAnalytics} from "react-icons/tb";
import { FaCashRegister } from "react-icons/fa";



function ToolbarFlowcash() {
  return (
    <Toolbar>
      
      <Box cursor={"pointer"}>
        <FaCashRegister size={30} color='#FFF0F5' />
      </Box>

      <Divider orientation='vertical' color={"FFF0F5"} h={"28px"}/>

      <Box cursor={"pointer"} >
        <TbReportAnalytics size={36} color='#FFF0F5' />
      </Box>

    </Toolbar>
  )
}

Toolbar.propTypes = {}

export default ToolbarFlowcash;
