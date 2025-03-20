//REACT
import React from 'react'
import PropTypes from 'prop-types'

//COMPONENTS
import Toolbar from "../../../../../components/toolbar/Toolbar";

//CHAKRA UI
import { Box, Divider, Flex } from '@chakra-ui/react';

//ICONS
import { TbReportAnalytics } from "react-icons/tb";
import { FaCashRegister } from "react-icons/fa";

function ToolbarFlowcash({ ...rest }) {

  return (

    <Flex
      h={{
        base: '100%',
        lg: '100%'
      }}
      zIndex={'1'}
      marginBottom={{
        base: '50px',
        lg: '0px'
      }}
      width={'100%'}
      bg={"#003262"}
      py={3}
      px={3}
      justifyContent={"center"}
      alignItems={"center"}
      alignContent={"center"}
      flexDir={'row'}
      gap={10}
      transition={"all 100ms ease"}
      boxSizing='border-box'
      boxShadow={'0px 6px 15px rgba(0, 0, 0, 0.2), 0px 2px 6px rgba(0, 50, 98, 0.4)'}
      {...rest}
    >

      <Box cursor={"pointer"}>
        <FaCashRegister size={26} color='#FFFFFF' />
      </Box>

      <Divider orientation={'vertical'} color={"FFF0F5"} h={"28px"} />

      <Box cursor={"pointer"} >
        <TbReportAnalytics size={26} color='#FFFFFF' />
      </Box>

    </Flex>

  )
}

Toolbar.propTypes = {}

export default ToolbarFlowcash;
