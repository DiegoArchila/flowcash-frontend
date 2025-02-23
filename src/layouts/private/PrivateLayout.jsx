import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom'
import ToolbarPrivate from './components/toolbar/ToolbarPrivate';

function PrivateLayout() {
  return (

    <Flex flexDir={{
      base: 'column',
      lg: 'row'
    }}
    >


      <ToolbarPrivate />



      <Outlet />


    </Flex>
  );
}

export default PrivateLayout;