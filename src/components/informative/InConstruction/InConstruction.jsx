//Assets
import InConstructionGif from '../../../assets/images/app/InConstruction.gif'
import HiddenGif from '../../../assets/images/app/Hidden.gif'

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
      <Image src={InConstructionGif} />
      <Image src={HiddenGif} />
    </Box>
  )
}

InConstruction.propTypes = {}

export default InConstruction;