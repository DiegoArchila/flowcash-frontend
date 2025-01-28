
//REACT
import { useState } from 'react';
import PropTypes from 'prop-types';

//COMPONENTS
import { Flex, Divider, Box, Text, Spacer } from '@chakra-ui/react';
import ToolbarItem from './ToolbarItem';

//ICONS
import { RiMenuUnfold3Fill, RiMenuUnfold4Fill } from "react-icons/ri";
import { RiAccountBoxLine } from "react-icons/ri";
import { FaCashRegister } from "react-icons/fa";
import { MdOutlineHomeWork, MdFactory } from "react-icons/md";
import { FaBoxes } from "react-icons/fa";
import { FaFileInvoiceDollar, FaPeopleGroup } from "react-icons/fa6";

function Toolbar({ children, ...rest }) {

  const [fullSize, setFullSize] = useState(false);

  const toggleFullSize = () => {
    setFullSize(!fullSize);
  }

  return (

    <Box h={'100vh'} mr={'5px'}>

      <Flex
        bg={"#003262"}
        py={3}
        h={'100%'}
        w={fullSize ? '200px' : '53px'}
        justifyContent={"center"}
        alignItems={"center"}
        alignContent={"center"}
        flexDir={"column"}
        gap={5}
        transition={"all 100ms ease"}
        boxSizing='border-box'
        boxShadow={'0px 6px 15px rgba(0, 0, 0, 0.2), 0px 2px 6px rgba(0, 50, 98, 0.4)'}

        {...rest}
      >
        <Box cursor={"pointer"} className='ToolbarHead'>
          <Flex gap={8} alignContent={'center'} alignItems={'center'} justifyContent={'center'}>

            {
              (fullSize) ?
                <Text
                  fontFamily={"brand"}
                  color='#FFF0F5'
                  fontSize={"22px"}
                  w={'112px'}
                  wordBreak={''}
                >
                  Mabla POS
                </Text> :
                null

            }

            <Box onClick={toggleFullSize}>
              {
                (fullSize) ?
                  <RiMenuUnfold4Fill size={24} color='#FFF0F5' /> :
                  <RiMenuUnfold3Fill size={24} color='#FFF0F5' />
              }
            </Box>
          </Flex>
        </Box>

        <Divider orientation='horizontal' color={"FFF0F5"} />

        <Flex
          flexDir={'column'}
          gap={5} H={"100%"}
          width={"inherit"}
          justifyContent={'center'}
          alignContent={'center'}
          alignItems={'flex-start'}
          pl={3}
        >

          {/* HOME */}
          <ToolbarItem
            ToolbarItemCaption='Inicio'
            ToolbarItemIcon={MdOutlineHomeWork}
            ToolbarItemSubRoute='/private/home'
            isFullSize={fullSize}
            key={'ToolbarItem-Home'}
          />

          {/* PRODUCTS */}
          <ToolbarItem
            ToolbarItemCaption='Productos'
            ToolbarItemIcon={FaBoxes}
            ToolbarItemSubRoute='/private/products'
            isFullSize={fullSize}
            key={'ToolbarItem-Products'}
          />

          {/* FLOWCASH */}
          <ToolbarItem
            ToolbarItemCaption='Caja'
            ToolbarItemIcon={FaCashRegister}
            ToolbarItemSubRoute='/private/flowcash'
            isFullSize={fullSize}
            key={'ToolbarItem-Flowcash'}
          />

          {/* INVOICES */}
          <ToolbarItem
            ToolbarItemCaption='Facturas'
            ToolbarItemIcon={FaFileInvoiceDollar}
            ToolbarItemSubRoute='/private/invoices'
            isFullSize={fullSize}
            key={'ToolbarItem-Invoices'}
          />

          {/* COSTUMERS */}
          <ToolbarItem
            ToolbarItemCaption='Clientes'
            ToolbarItemIcon={FaPeopleGroup}
            ToolbarItemSubRoute='/private/costumers'
            isFullSize={fullSize}
            key={'ToolbarItem-Costumers'}
          />

          {/* SUPPLIES */}
          <ToolbarItem
            ToolbarItemCaption='Proveedores'
            ToolbarItemIcon={MdFactory}
            ToolbarItemSubRoute='/private/supplies'
            isFullSize={fullSize}
            key={'ToolbarItem-Factory'}
          />

        </Flex>

        <Spacer />

        <Divider orientation='horizontal' color={"FFF0F5"} mt={'auto'} />

        <Flex mt={'auto'}
          flexDir={'column'} gap={5} H={"100%"} width={"inherit"}
          justifyContent={'center'} alignContent={'center'} alignItems={'flex-start'}
          pl={3}
        >
          {/* ACCOUNT */}
          <ToolbarItem
            ToolbarItemCaption='Cuenta'
            ToolbarItemIcon={RiAccountBoxLine}
            ToolbarItemSubRoute='/private/account'
            isFullSize={fullSize}
            ToolbarItemIconSize={26}
            key={'ToolbarItem-Account'}
          />

        </Flex>


      </Flex>

    </Box>
  );
}

Toolbar.propTypes = {
  children: PropTypes.node.isRequired
}

export default Toolbar;