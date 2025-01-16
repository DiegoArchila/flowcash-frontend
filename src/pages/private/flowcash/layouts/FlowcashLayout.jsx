import { Box, Stack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom'
import ToolbarFlowcash from './components/ToolbarFlowcash';

function FlowcashLayout() {
  return (

    <Stack direction={"row"}>
        
        <Box>
          <ToolbarFlowcash />
        </Box>

        <Box>
          <Outlet />
        </Box>

    </Stack>
  );
}

export default FlowcashLayout;