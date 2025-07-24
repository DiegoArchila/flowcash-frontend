import { GridItem, Grid } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom'
import ToolbarFlowcash from './components/ToolbarFlowcash';

function FlowcashLayout() {
  return (

    <Grid
      templateAreas={`"outlet" "flowcashToolbar"`}
      templateRows={'1fr 56px'}
      templateColumns={'100%'}
      width={'100%'}
      height={'calc(100% - 48px)'}
      overflow={'auto'}
      boxSizing={'border-box'}
      backgroundColor={'#FFFFFF'}
      alignContent={'baseline'}
    >

      <GridItem
        gridArea={'outlet'}
        marginTop={'0px'}
        width={'100%'}
        height={'calc(100% - 48px)'}
        overflow={'auto'}
        padding={
          {
            base: '0px 5px',
            lg: '0px 10px'
          }
        }

      >
        <Outlet />
      </GridItem>
      
      <GridItem
        position={'fixed'}
        gridArea={'toolbarFlowcash'}
        bottom={'0px'}
        m={'0px'}
        zIndex={'1'}
        height={'48px'}
        w={'100%'}
      >
        <ToolbarFlowcash />
      </GridItem>

    </Grid>
  );
}

export default FlowcashLayout;