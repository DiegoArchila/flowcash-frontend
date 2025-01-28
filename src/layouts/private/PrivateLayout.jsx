import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom'
import ToolbarPrivate from './components/toolbar/ToolbarPrivate';

function PrivateLayout() {
  return (

    <Flex flexDir={"row"}>

      <Box>
        <ToolbarPrivate />
      </Box>

      <Box>
        <Outlet />
      </Box>

    </Flex>
  );
}

export default PrivateLayout;