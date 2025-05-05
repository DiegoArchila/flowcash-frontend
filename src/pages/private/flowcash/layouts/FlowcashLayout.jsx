import { GridItem, Grid } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom'
import ToolbarFlowcash from './components/ToolbarFlowcash';

function FlowcashLayout() {
  return (

    <Grid
    templateAreas={`"toolbarFlowcash" "outlet"`}
      width={'100%'}
      height={'100%'}
      overflow={'hidden'}
      boxSizing={'border-box'}
      boxShadow={'0px 6px 15px rgba(0, 0, 0, 0.2), 0px 2px 6px rgba(0, 50, 98, 0.4)'}
      backgroundColor={'#FFFFFF'}
      alignContent={'baseline'}
    >

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

      <GridItem
      gridArea={'outlet'}
        marginTop={'0px'}
        width={'100%'}
        height={'100%'}
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

    </Grid>
  );
}

export default FlowcashLayout;