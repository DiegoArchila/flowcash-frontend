import PropTypes from 'prop-types';

//Chakara UI
import { 
    Box,
    Heading,
    HStack,
    Button,
    Spinner,
    Center 
} from '@chakra-ui/react';

//Icons
import { FaDatabase } from "react-icons/fa6";
import { BsDatabaseFillAdd } from "react-icons/bs";

/**
 * Data manager is a component to create, show, edit and delete element from a entity given.
 * 
 * @param {Object} [config] Object with the configuration for the data manager
 * @param {string} [config.title] The title to display, the value default is 'Administrador de datos.'
 * @param {React.ReactNode} [config.icon=null] An optinal icon to display. Default icon <FaDatabase /> from ReactIcons
 * @param {string} [config.buttonTitle='Nueva'] The label for the create button.
 * @param {React.ReactNode} [config.buttonIcon=null] An optinal icon to display. Default icon <BsDatabaseFillAdd /> from ReactIcons
 * @param {boolean} isLoadingData Flag to indicate if the data is loading
 * @returns {JSX.Element} the component DataManager rendered
 */
function DataManager({config = {
    title: "Administrador de datos",
    icon: <FaDatabase size={32} color='#FFFFFF' />,
},children,isLoadingData=true,createFunction}) {

  return (
    <Box
        width={"100%"}
        h={"100%"}
        minHeight={"100%"}
        bgColor={'#FFFFFF'}
        borderTopRadius="md"
        mt={3} pb={3}
        border={"1px"}
        borderColor={"#E2E8F0"}
    >

        {/* HEADER */}

        <HStack
            pt={1} w={"100%"}
            justifyContent={"space-between"}
            px={2} bgColor={"#0072BB"}
            borderTopRadius="md"
        >

            <HStack pb={1}>

                {/* Sets an icon */}
                <Box>
                    {config.icon ?
                        config.icon
                        :
                        <FaDatabase size={24} color={"#FFFFFF"}/>
                    }
                </Box>

                <Box borderRadius={2}>
                    <Heading
                        textAlign={'center'}
                        fontFamily={"Input-SemiBold"}
                        color={"#FFFFFF"}
                        as={"h3"}
                        size={"md"}
                    >
                        {config.title ?
                            config.title
                            :
                            String(config.title).toLocaleUpperCase()
                        }
                    </Heading>
                </Box>
            </HStack>

            {
                config.buttonTitle!= null || undefined ?
                    <Button
                        colorScheme='whiteAlpha'
                        size={"xs"}
                        color={"#FFFFFF"}
                        variant={"ghost"}
                        gap={3}
                        onClick={createFunction}
                    >
                        {config.buttonTitle ?
                            config.buttonTitle
                            :
                            String("Crear nueva")
                        
                        }

                        {config.buttonIcon ?
                            config.buttonIcon
                            :
                            <BsDatabaseFillAdd size={24} color='#FFFFFF' />
                        }
                    </Button>
                :
                null

            }


        </HStack>

        {/* SHOW DATA */}
        
        { (isLoadingData) ?
            Loading()
            :
            children
        }

    </Box>
  )
}

//Props
DataManager.propTypes = {
    children: PropTypes.node,
    config: PropTypes.shape({
        title: PropTypes.string,
        icon: PropTypes.node,
        buttonTitle: PropTypes.string,
        buttonIcon: PropTypes.node
    }),
    isLoadingData: PropTypes.bool,
    createFunction: PropTypes.func
}

//Functions Secundaries

function Loading() {
    return (
        <Center mt={3} mb={3}>
            <Spinner size={"xl"} color='teal'/>
        </Center>
    )
}

export default DataManager;