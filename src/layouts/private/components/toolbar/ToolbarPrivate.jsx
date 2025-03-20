//REACT
import { useState } from "react";

//COMPONENTS
import Toolbar from "../../../../components/toolbar/Toolbar.jsx";
import ToolbarItem from "../../../../components/toolbar/components/ToolbarItem.jsx";

//CHAKRA UI
import { Divider, Spacer, Box, Flex, Text, useBreakpointValue } from '@chakra-ui/react';

//ICONS
import { FaCashRegister } from "react-icons/fa";
import { MdOutlineHomeWork, MdFactory } from "react-icons/md";
import { FaBoxes } from "react-icons/fa";
import { FaFileInvoiceDollar, FaPeopleGroup } from "react-icons/fa6";
import { RiAccountBoxLine } from "react-icons/ri";
import { RiMenuUnfold3Fill, RiMenuUnfold4Fill } from "react-icons/ri";
import { HiMiniBarsArrowDown, HiMiniBarsArrowUp } from "react-icons/hi2";


function ToolbarPrivate() {

  const SUB_ROUTE = "/private";

  const [expandedMenu, setExpandedMenu] = useState(false);

  const toggleExpandedMenu = () => {
    setExpandedMenu(!expandedMenu);
  }

  const currentViewDivider = useBreakpointValue({
    base: 'vertical',
    lg: 'horizontal'
  });

  const isViewMobile = useBreakpointValue({
    base: true,
    lg: false
  });


  return (
    <Toolbar

      flexDir={{
        base: (expandedMenu) ? 'column' : 'row',
        lg: 'column'
      }}

      w={expandedMenu ?
        isViewMobile ?
          '100%' :
          '200px'
        :
        isViewMobile ?
          '100%' :
          '53px'
      }

      h={
        isViewMobile ?
          expandedMenu ?
            'fit-content' :
            '56px'
          :
          '100%'
      }

      justifyContent={{
        base: 'center',
        lg: 'space-evenly'
      }}

      position={{
        base: 'fixed',
        lg: 'static'
      }}

      top={{
        base: '0px'
      }}      

    >

      <Flex
        flexDir={{
          base: 'row'
        }}
        gap={5}
        alignContent={'center'}
        alignItems={'center'}
        justifyContent={'center'}
      >

        {/****************************************************************** 
          * HEAD
          *******************************************************************/}
        {
          (expandedMenu) ?
            <Text
              fontFamily={"brand"}
              color='#FFF0F5'
              fontSize={"22px"}
              w={'112px'}
              wordBreak={''}
              cursor={'pointer'}
            >
              Mabla POS
            </Text>
            :
            null

        }

        <Box onClick={toggleExpandedMenu} cursor={'pointer'}>
          {
            (expandedMenu) ?
              (isViewMobile) ?
                <HiMiniBarsArrowUp size={28} color='#FFF0F5' /> :
                <RiMenuUnfold4Fill size={28} color='#FFF0F5' />

              :
              (isViewMobile) ?
                <HiMiniBarsArrowDown size={28} color='#FFF0F5' /> :
                <RiMenuUnfold3Fill size={28} color='#FFF0F5' />
          }
        </Box>

      </Flex>

      <Divider 
        orientation={currentViewDivider}
        color={"#FFF0F5"} 
        m={'0px'} 
      />


      {/****************************************************************** 
       * BODY
      *******************************************************************/}

      <Flex
        h={'100%'}
        w={'100%'}
        flexDir={{
          base: (expandedMenu) ? 'column' : 'row',
          lg: 'column'
        }}
        gap={4}
        width={"inherit"}
        justifyContent={'flex-start'}
        alignContent={{
          base: (expandedMenu) ? 'baseline' : 'center'
        }}
        alignItems={{
          base: (expandedMenu) ? 'baseline' : 'center',
          lg: 'flex-start'
        }}
        pl={3}
        overflow={{
          base: 'auto',
          lg: 'unset'
        }}

      >

        {/* HOME */}
        <ToolbarItem
          ToolbarItemCaption='Inicio'
          ToolbarItemIcon={MdOutlineHomeWork}
          ToolbarItemSubRoute='/private/home'
          isFullSize={expandedMenu}
          key={'ToolbarItem-Home'}
        />

        {/* PRODUCTS */}
        <ToolbarItem
          ToolbarItemCaption='Productos'
          ToolbarItemIcon={FaBoxes}
          ToolbarItemSubRoute='/private/products'
          isFullSize={expandedMenu}
          key={'ToolbarItem-Products'}
        />

        {/* FLOWCASH */}
        <ToolbarItem
          ToolbarItemCaption='Caja'
          ToolbarItemIcon={FaCashRegister}
          ToolbarItemSubRoute='/private/flowcash'
          isFullSize={expandedMenu}
          key={'ToolbarItem-Flowcash'}
        />

        {/* INVOICES */}
        <ToolbarItem
          ToolbarItemCaption='Facturas'
          ToolbarItemIcon={FaFileInvoiceDollar}
          ToolbarItemSubRoute='/private/invoices'
          isFullSize={expandedMenu}
          key={'ToolbarItem-Invoices'}
        />

        {/* COSTUMERS */}
        <ToolbarItem
          ToolbarItemCaption='Clientes'
          ToolbarItemIcon={FaPeopleGroup}
          ToolbarItemSubRoute='/private/costumers'
          isFullSize={expandedMenu}
          key={'ToolbarItem-Costumers'}
        />

        {/* SUPPLIES */}
        <ToolbarItem
          ToolbarItemCaption='Proveedores'
          ToolbarItemIcon={MdFactory}
          ToolbarItemSubRoute='/private/supplies'
          isFullSize={expandedMenu}
          key={'ToolbarItem-Factory'}
        />

      </Flex>

      <Spacer />


      {/****************************************************************** 
      * FOOTER
      *******************************************************************/}

      <Divider 
        orientation={currentViewDivider}
        color={"#FFF0F5"} 
        m={'0px'} 
      />

      <Flex
        flexDir={{
          base: 'row'
        }}
        alignContent={'center'}
        alignItems={'center'}
        justifyContent={'center'}
        alignSelf={{
          base: 'center',
          lg: 'flex-start'
        }}
        pl={{
          base: '0px'
        }}
      >


        {/* ACCOUNT */}
        <ToolbarItem
          ToolbarItemCaption='Cuenta'
          ToolbarItemIcon={RiAccountBoxLine}
          ToolbarItemSubRoute='/private/account'
          isFullSize={expandedMenu}
          ToolbarItemIconSize={26}
          key={'ToolbarItem-Account'}
        />

      </Flex>

    </Toolbar >
  )
}

ToolbarPrivate.propTypes = {}

export default ToolbarPrivate;