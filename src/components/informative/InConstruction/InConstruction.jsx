//Assets

//Chakra UI
import { Box, Image, Heading } from '@chakra-ui/react'

function InConstruction() {
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
      <Heading as='h1' size='xl'>En construcción...</Heading>
      <Image src={'/public/InConstruction.gif'} />
      <Image src={'/public/Hidden.gif'} />
    </Box>
  )
}

InConstruction.propTypes = {}

export default InConstruction;