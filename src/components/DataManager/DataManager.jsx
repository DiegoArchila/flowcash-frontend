
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
import RoleFilter from '../RoleFilter/RoleFilter';

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
const DataManager = ({ config = {
    title: "Administrador de datos",
    icon: <FaDatabase size={32} color='gray.100' colorSchemeButton='teal' variantButton='outline' />,
}, children, isLoadingData = true, createFunction, roles = [] }) => {

    return (
        <Box
            width={"100%"}
            h={"100%"}
            minHeight={"100%"}
            borderTopRadius="md"
            borderWidth={1}
            borderColor={"gray.200"}
            borderBottomRadius={"md"}
            mt={3} pb={3} mb={3}
        >

            {/* HEADER */}

            <HStack
                pt={1} w={"100%"}
                justifyContent={"space-between"}
                px={2}
                borderTopRadius="md"
                bgColor={"gray.100"}
                height={"2.5rem"}
            >
                {/* Header */}
                <HStack pb={1}>

                    {/* Sets an icon */}
                    <Box>
                        {config.icon ?
                            config.icon
                            :
                            <FaDatabase size={24} color={"#4a5568"} />
                        }
                    </Box>

                    <Box borderRadius={2}>
                        <Heading
                            textAlign={'center'}
                            fontFamily={"label"}
                            color={"#4a5568"}
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


                {config.buttonTitle != null || undefined ?
                    <RoleFilter
                        roles={["admin",roles]}
                    >
                        <Button
                            colorScheme={config.colorSchemeButton}
                            size={"xs"}
                            variant={config.variantButton}
                            fontFamily={"button"}
                            gap={3}
                            height={"1.8rem"}
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
                                <BsDatabaseFillAdd size={24} color='#e9f5ff' />
                            }
                        </Button>

                    </RoleFilter>
                    :
                    null
                }


            </HStack>

            {/* SHOW DATA */}

            {
                (isLoadingData) ?
                    Loading()
                    :
                    children
            }

        </Box >
    )
}

//Props
DataManager.propTypes = {
    children: PropTypes.node,
    config: PropTypes.shape({
        title: PropTypes.string,
        icon: PropTypes.node,
        buttonTitle: PropTypes.string,
        buttonIcon: PropTypes.node,
        colorSchemeButton: PropTypes.string,
        variantButton: PropTypes.string,
    }),
    isLoadingData: PropTypes.bool,
    createFunction: PropTypes.func,
    roles: PropTypes.arrayOf(PropTypes.string)
}

//Functions Secundaries

function Loading() {
    return (
        <Center mt={3} mb={3}>
            <Spinner size={"xl"} color='teal' />
        </Center>
    )
}

export default DataManager;