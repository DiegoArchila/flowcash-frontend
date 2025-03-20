import { Box, Stack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom'
import ToolbarFlowcash from './components/ToolbarFlowcash';

function FlowcashLayout() {
  return (

    <Stack
      direction={{
        base: 'column-reverse'
      }}
      position={'relative'}
    >

      <Box
        position={'fixed'}
        bottom={'0px'}
        m={'0px'}
        zIndex={'1'}
        height={'48px'}
        w={'100%'}
      >
        <ToolbarFlowcash />
      </Box>

      <Box
        marginBottom={'48px'}
        padding={'0px 5px'}
        width={'100%'}
        height={'100%'}
        overflow={'auto'}
      >
        <Outlet />
      </Box>

    </Stack>
  );
}

export default FlowcashLayout;