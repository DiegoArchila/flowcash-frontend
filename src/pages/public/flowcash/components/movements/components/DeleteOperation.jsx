import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

//Redux
import { useDispatch, useSelector } from "react-redux";
import { errorsClear, clearTarget  } from "../../../../../../store/slices/flowcash/Flowcash";
import { FlowcashThunks } from "../../../../../../store/slices/flowcash/FlowcashThunks";

//CHAKRA UI
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    HStack,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Button,
    Text,
    Box
} from '@chakra-ui/react';

//ICONS
import { MdOutlineDeleteForever } from "react-icons/md";

function DeleteOperation({ onClose, isOpen }) {
    
    // Redux
    const dispatch = useDispatch();

    const { errors, inProcess, target, isDone, data } = useSelector(state => state.flowcash);
    const [toDelete, setToDelete] = useState(null);

    useEffect( () => {
        if(isDone){
            closeDeleteOperation();
        }
        if (target!=null) {
            setToDelete(data.find(e => e.id === target));
        }
  
    }, [dispatch, isDone, target]);

    const cancelRef = useRef();

    //FUNCTIONS
    function handleDeleteErrors() {
        dispatch(errorsClear());
    }

    function handleDelete(id) {
        dispatch(FlowcashThunks.deleteFlowcash(id));
    }

    function closeDeleteOperation() {
        handleDeleteErrors();
        dispatch(clearTarget());
        onClose();
    }

    return (
        <>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                onOverlayClick={closeDeleteOperation}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' bgColor={"#E23D28"} color={"white"}>
                            <Box display={"flex"} gap={3}>
                                <MdOutlineDeleteForever size={28} color={"#FFFFFF"} />
                                {String("Borrar movimiento").toLocaleUpperCase()}
                            </Box>
                        </AlertDialogHeader>

                        <AlertDialogBody>

                            {/* Error Message */}
                            <Alert status='error' mb={3} display={!(errors === null) ? "block" : "none"}>
                                <HStack>
                                    <AlertIcon />
                                    <AlertTitle>¡Ha ocurrido un error!</AlertTitle>
                                </HStack>
                                <AlertDescription>{(errors) ? errors?.error : ""}</AlertDescription>
                            </Alert>

                            <Text>Estas seguro de eliminar el movimiento: </Text>
                                {
                                    toDelete ?
                                    <Text fontFamily={"Input-SemiBold"}>{String(toDelete.description).toLocaleUpperCase()}?</Text>:
                                    <Text fontFamily={"Input-SemiBold"}>{String("HA OCURRIDO UN ERROR").toLocaleUpperCase()}</Text>
                                }
                            <Text>Luego de ejecutada esta acción no se puede recuperar los datos eliminados.</Text>

                        </AlertDialogBody>


                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={() => {
                                closeDeleteOperation();
                                
                            }}>
                                Cancelar
                            </Button>
                            <Button
                                colorScheme='red'
                                isLoading={inProcess}
                                onClick={() => {
                                    handleDelete(toDelete.id);
                                }}
                                ml={3}>
                                Eliminar
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

DeleteOperation.propTypes = {}

export default DeleteOperation
