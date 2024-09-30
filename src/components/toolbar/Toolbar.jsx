import React from 'react'
import PropTypes from 'prop-types'
import { HStack } from '@chakra-ui/react'

function Toolbar({children}) {
  return (
    <HStack 
        w={"100%"} 
        h={"48px"} 
        bg={"#003262"}
        bottom={"0px"}
        pos={"fixed"}
        borderTop={"0px"}
        borderTopWidth={"3px"}
        borderTopStyle={"solid"}
        borderTopColor={"#F0F8FF"}
        alignContent={"center"}
        justifyContent={"center"}
        gap={5}
    >

        {children}
    </HStack>
  )
}

Toolbar.propTypes = {}

export default Toolbar
