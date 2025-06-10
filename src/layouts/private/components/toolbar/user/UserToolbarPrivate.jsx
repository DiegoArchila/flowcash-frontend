//React
import React from 'react'

//Redux
import { useDispatch } from 'react-redux';

// Redux Actions
import { UserThunks } from '../../../../../store/slices/user/UserThunks';

// Chakra UI
import {
    MenuList,
    MenuItem,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    Button
} from '@chakra-ui/react'

// React Icons (Remix Icons)
import { RiUserLine, RiLogoutBoxRLine } from 'react-icons/ri';

function UserButtonToolbarPrivate() {

    // Redux
    const dispatch = useDispatch();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();

    return (

        <MenuList>
            <MenuItem icon={<RiUserLine size={18} />}>Perfil</MenuItem>
            <MenuItem
                icon={<RiLogoutBoxRLine size={18} />}
                onClick={onOpen}
            >
                Cerrar Sesión
            </MenuItem>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold' bgColor={'#3182CE'} color='white'>
                            <span style={{ display: 'flex', alignItems: 'center' }}>
                                <RiLogoutBoxRLine size={28} style={{ marginRight: '8px' }} />
                                Cerrar Sesión
                            </span>
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            ¿Estás seguro(a) de que deseas cerrar sesión?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button colorScheme='blue' onClick={() => {

                                // Dispatch the logout action

                                dispatch(UserThunks.logoutUser());
                                onClose();

                            }} ml={3}>
                                Cerrar Sesión
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

        </MenuList >
    )
}

export default UserButtonToolbarPrivate;