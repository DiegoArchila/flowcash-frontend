import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Box } from '@chakra-ui/react'
import Login from './Login'

function LayoutLogin() {
  return (
    <Flex
      justify={"center"}
      align={"center"}
      minHeight="100vh"
      width="100%"
      bgColor={"blue.50"}
    >

      <Login />

    </Flex>
  )
}

LayoutLogin.propTypes = {}

export default LayoutLogin
