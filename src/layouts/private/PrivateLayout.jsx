import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom'
import ToolbarPrivate from './components/toolbar/ToolbarPrivate';

function PrivateLayout() {
  return (

    <Flex flexDir={{
      base: 'column',
      lg: 'row'
    }}
      w={'100%'}
      h={'100%'}
      position={'relative'}
    >

      <ToolbarPrivate />

      <Box
        w={'100%'}
        h={'100%'}
        //padding={'0px 5px'}
      >
        <Outlet />
      </Box>

    </Flex>
  );
}

export default PrivateLayout;