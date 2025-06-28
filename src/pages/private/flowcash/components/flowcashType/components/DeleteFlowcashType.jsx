import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

//Redux
import { useDispatch, useSelector } from "react-redux";
import { errorsClear, clearTarget } from "../../../../../../store/slices/flowcash/flowcashType/FlowcashType";
import { FlowcashTypeThunks } from "../../../../../../store/slices/flowcash/flowcashType/FlowcashTypeThunks";

//Components
import Alerts from "../../../../../../components/Alerts/Alerts";

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

    useEffect(() => {
        if (isDone) {
            closeDeleteOperation();
        }
        if (target != null) {
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
                        <AlertDialogHeader bgColor={"error.500"}>
                            <Box display={"flex"} gap={3}>
                                <MdOutlineDeleteForever size={28} color={"#FFFFFF"} />
                                <Text
                                    fontFamily={"heading"}
                                    fontWeight={"bold"}
                                    fontSize={"xl"}
                                    color={"gray.50"}
                                >
                                    {String("Borrar caja")}
                                </Text>
                            </Box>
                        </AlertDialogHeader>

                        <AlertDialogBody>

                            {/* Error Message */}

                            {errors && (
                                <Alerts
                                    status='error'
                                    title='Error al eliminar la caja.'
                                    description={errors?.error || ""}
                                />
                            )}

                            <Text
                                fontFamily={"paragraphs"}
                                fontSize={"md"}
                            >Estas seguro de eliminar la caja: </Text>
                            {
                                toDelete ?
                                    <Text fontFamily={"paragraphs"} fontWeight={"bold"}>{String(toDelete.name).toUpperCase()}?</Text> :
                                    <Text fontFamily={"paragraphs"} fontWeight={"bold"}>{String("HA OCURRIDO UN ERROR")}</Text>
                            }
                            <Text
                                fontFamily={"paragraphs"}
                                fontSize={"md"}
                            >Luego de ejecutada esta acción no se puede recuperar los datos eliminados.</Text>

                        </AlertDialogBody>


                        <AlertDialogFooter>
                            <Button ref={cancelRef} fontFamily={"button"} onClick={() => {
                                closeDeleteOperation();

                            }}>
                                Cancelar
                            </Button>
                            <Button
                                fontFamily={"button"}
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