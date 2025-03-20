//REACT
import PropTypes from 'prop-types';

//COMPONENTS
import { Flex, Box } from '@chakra-ui/react';

//ICONS


function Toolbar({ children, ...rest }) {

  return (

    <Box
      h={{
        base: '100%',
        lg: '100vh'
      }}
      zIndex={'1'}
      marginBottom={{
        base:'50px',
        lg:'0px'
      }}
    >

      <Flex
        bg={"#003262"}
        py={3}
        px={3}
        h={{
          base: '56px',
          lg: '100%'
        }}
        w={{
          base: '100%',
          lg: '48px'
        }}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        alignContent={"center"}
        flexDir={{
          base: 'row',
          lg: 'column'
        }}
        gap={3}
        transition={"all 100ms ease"}
        boxSizing='border-box'
        boxShadow={'0px 6px 15px rgba(0, 0, 0, 0.2), 0px 2px 6px rgba(0, 50, 98, 0.4)'}
        {...rest}
      >


        {children}


      </Flex>

    </Box>

  );
}

Toolbar.propTypes = {
  children: PropTypes.node.isRequired
}

export default Toolbar;