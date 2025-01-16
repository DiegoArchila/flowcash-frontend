import { Box, Stack, HStack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom'
import ToolbarPrivate from './components/toolbar/ToolbarPrivate';

function PrivateLayout() {
  return (

    <HStack>
        
        <Box>
          <ToolbarPrivate />
        </Box>

        <Box>
          <Outlet />
        </Box>

    </HStack>
  );
}

export default PrivateLayout;