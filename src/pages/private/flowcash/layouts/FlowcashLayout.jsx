import { Box, Stack, HStack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom'
import ToolbarFlowcash from './components/ToolbarFlowcash';

function FlowcashLayout() {
  return (

    <HStack direction={"row"}>
        
        <Box>
          <ToolbarFlowcash />
        </Box>

        <Box>
          <Outlet />
        </Box>

    </HStack>
  );
}

export default FlowcashLayout;