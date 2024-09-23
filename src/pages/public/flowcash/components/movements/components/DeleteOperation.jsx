import React from 'react'
import PropTypes from 'prop-types'

//Redux
import { useDispatch, useSelector } from "react-redux";

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
    Text
} from '@chakra-ui/react';

function DeleteOperation({ onClose, isOpen, toDelete }) {
    
    // Redux
    const dispatch = useDispatch();

    const { errors, inProcess, isDone } = useSelector(state => state.flowcash);



    function handleDeleteErrors() {
        dispatch(deleteClear());
        dispatch(errorsClear());
        onClose();
    }

    return (
        <>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                onOverlayClick={handleDeleteErrors}

            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' bgColor={"#6c584c"} color={"white"}>
                            {String("Borrar operación")}
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

                            <Text>Estas seguro de eliminar el movimiento: </Text>{(!errors) ?
                                <Text fontFamily={"Input-SemiBold"}>{String(data[target]?.type).toLocaleUpperCase()}?</Text> :
                                <Text fontFamily={"Input-SemiBold"}>{String(data[target]?.type).toLocaleUpperCase()}?</Text>}
                            <Text>Luego de ejecutada esta acción no se puede recuperar los datos eliminados.</Text>

                        </AlertDialogBody>


                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={() => {
                                handleDeleteErrors();
                            }}>
                                Cancelar
                            </Button>
                            <Button
                                colorScheme='red'
                                isLoading={inProcess}
                                onClick={() => {
                                    handleDelete(data[target]?.id);
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
