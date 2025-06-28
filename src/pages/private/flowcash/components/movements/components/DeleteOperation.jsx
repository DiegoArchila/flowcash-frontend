import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

//Redux
import { useDispatch, useSelector } from "react-redux";
import { errorsClear, clearTarget } from "../../../../../../store/slices/flowcash/Flowcash";
import { FlowcashThunks } from "../../../../../../store/slices/flowcash/FlowcashThunks";

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

function DeleteOperation({ onClose, isOpen }) {

    // Redux
    const dispatch = useDispatch();

    const { errors, inProcess, target, isDone, data: { data } } = useSelector(state => state.flowcash);
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
                        <AlertDialogHeader
                            bgColor={"error.500"}>
                            <Box display={"flex"} gap={3}>
                                <MdOutlineDeleteForever size={28} color={"#FFFFFF"} />
                                <Text
                                    fontFamily={"heading"}
                                    fontWeight={"bold"}
                                    fontSize={"xl"}
                                    color={"gray.50"}
                                >
                                    {String("Borrar movimiento")}
                                </Text>
                            </Box>
                        </AlertDialogHeader>

                        <AlertDialogBody>

                            {/* Error Message */}

                            {errors && (
                                <Alerts
                                    status='error'
                                    title='Error al eliminar el movimiento'
                                    description={errors?.error || ""}
                                />
                            )}

                            <Text
                                fontFamily={"paragraphs"}
                                fontSize={"md"}
                            >Estas seguro de eliminar el movimiento: </Text>

                            {
                                toDelete ?
                                    <Text fontFamily={"paragraphs"} fontWeight={"bold"}>{String(toDelete.description).toUpperCase()}?</Text> :
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
                                colorScheme='red'
                                fontFamily={"button"}
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
