import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

//Redux
import { useDispatch, useSelector } from "react-redux";
import { errorsClear, clearTarget, resetStates } from "../../../../../../store/slices/flowcash/operation/Operation";
import { OperationThunks } from "../../../../../../store/slices/flowcash/operation/OperationThunks";

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
    Button,
    Text,
    Box
} from '@chakra-ui/react';

//ICONS
import { MdOutlineDeleteForever } from "react-icons/md";

function OperationDelete({ onClose, isOpen }) {

    // Redux
    const dispatch = useDispatch();

    const { errors, inProcess, target, isDone, data } = useSelector(state => state.operation);
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
        dispatch(OperationThunks.deleteOperation(id));
    }

    function closeDeleteOperation() {
        handleDeleteErrors();
        dispatch(clearTarget());
        dispatch(resetStates());
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
                                    {String("Borrar operación")}
                                </Text>
                            </Box>
                        </AlertDialogHeader>

                        <AlertDialogBody>

                            {/* Error Message */}
                            {errors && (
                                <Alerts
                                    status='error'
                                    title='Error al eliminar la operación'
                                    description={errors?.error || ""}
                                />
                            )}

                            <Text
                                fontFamily={"paragraphs"}
                                fontSize={"md"}
                            >Estas seguro de eliminar la operación: </Text>
                            {
                                toDelete ?
                                    <Text fontFamily={"paragraphs"} fontWeight={"bold"}>{String(toDelete.type).toLocaleUpperCase()}?</Text> :
                                    <Text fontFamily={"paragraphs"} fontWeight={"bold"}>{String("HA OCURRIDO UN ERROR").toLocaleUpperCase()}</Text>
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

OperationDelete.propTypes = {}

export default OperationDelete;