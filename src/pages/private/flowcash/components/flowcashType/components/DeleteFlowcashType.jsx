import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

//Redux
import { useDispatch, useSelector } from "react-redux";
import { errorsClear, clearTarget  } from "../../../../../../store/slices/flowcash/flowcashType/FlowcashType";
import { FlowcashTypeThunks } from "../../../../../../store/slices/flowcash/flowcashType/FlowcashTypeThunks";

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

/**
 * Component to deleted a field FlowcashType
 * 
 * @component
 * @param {Function} onClose Function to close the component
 * @param {boolean} isOpen Indicate if the component ´Alert´ is open or close.
 * @returns {JSX.Element} Component ´DeleteFlowcashType´ rendered
 */
function DeleteFlowcashType({ isOpen, onClose }) {

    // Redux
    const dispatch = useDispatch();

    const { errors, inProcess, target, isDone, data } = useSelector(state => state.flowcashType);
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
        dispatch(FlowcashTypeThunks.deleteFlowcash(id));
    }

    function closeDeleteOperation() {
        handleDeleteErrors();
        setToDelete(null);
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
                            {String("Borrar caja").toLocaleUpperCase()}
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

                        <Text>Estas seguro de eliminar la caja: </Text>
                            {
                                toDelete ?
                                <Text fontFamily={"Input-SemiBold"}>{String(toDelete.name).toLocaleUpperCase()}?</Text>:
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

DeleteFlowcashType.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default DeleteFlowcashType;