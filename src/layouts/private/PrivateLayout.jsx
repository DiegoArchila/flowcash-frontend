import { Box, Grid } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import ToolbarPrivate from './components/toolbar/ToolbarPrivate';

function PrivateLayout() {
  return (
    <Grid
      templateAreas={{
        base: `"toolbar" "content"`,
        lg: `"toolbar content"`,
      }}
      gridTemplateRows={{
        base: 'auto 1fr',
        lg: 'auto 1fr', 
      }}
      gridTemplateColumns={{
        base: '1fr',
        lg: 'auto 1fr',
      }}
      w={'100%'}
      h={'100vh'}
      position={'fixed'}
      overflow={'hidden'}
      gap={0}
    >
      <Box gridArea="toolbar" zIndex={10}>
        <ToolbarPrivate />
      </Box>
      
      <Box
        gridArea="content"
        overflowY={'auto'}
        h={'100%'}
        position={'relative'}
        alignItems={'start'} 
        display={'flex'} 
        flexDirection={'column'} 
      >
        <Outlet />
      </Box>
    </Grid>
  );
}

export default PrivateLayout;