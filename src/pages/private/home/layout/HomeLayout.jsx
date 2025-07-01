import PropTypes from 'prop-types'

import { Box  } from '@chakra-ui/react'

function HomeLayout({ children }) {
  return (
    <Box 
      display={'flex'} 
      alignContent={'center'} 
      alignItems={'center'}
      justifyContent={'center'}
      flexDirection={"column"}
      height={"100%"}
      width={'100%'}
      gap={5}
    >
      {children}
    </Box>
  )
}

HomeLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default HomeLayout
