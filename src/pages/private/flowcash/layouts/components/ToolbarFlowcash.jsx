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
import { Link } from 'react-router-dom';

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
      justifyContent={
        {
          base: "center",
          lg: "start"
        }
      }
      alignItems={"center"}
      alignContent={"center"}
      flexDir={'row'}
      gap={8}
      padding={
        {
          base: "0px",
          lg: "0px 48px"
        }
      }
      transition={"all 100ms ease"}
      boxSizing='border-box'
      boxShadow={'6px -8px 12px rgba(0, 50, 98, 0.4)'}
      {...rest}
    >


      <Link to={'/private/flowcash'}>

        <FaCashRegister size={26} color='#FFFFFF' cursor={'pointer'} />

      </Link>


      <Link to={'/private/flowcash/reports'}>

        <TbReportAnalytics size={26} color='#FFFFFF' cursor={'pointer'} />

      </Link>







    </Flex>

  )
}

Toolbar.propTypes = {}

export default ToolbarFlowcash;
