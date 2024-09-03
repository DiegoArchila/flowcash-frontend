import { useRef, useEffect } from 'react';

import { useDispatch, useSelector } from "react-redux";

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
} from '@chakra-ui/react';

import { FlowcashTypeThunks } from '../../../../../../store/slices/flowcash/FlowcashTypeThunks';
import { errorsClear, deleteClear } from '../../../../../../store/slices/flowcash/FlowcashType';




export default function DeleteFlowcash({ onClose, isOpen }) {

    // Redux
    const dispatch = useDispatch();

    const {
        isDeleting, // deleting in process
        toDelete, //storage the ID to delete
        isDeleted, // confirm deleted successfull
        errors,
        setDelete,
        rows
    } = useSelector(state => state.flowcashType);

    const cancelRef = useRef();

    useEffect(() => {
      if(isDeleted){
        dispatch(deleteClear());
        onClose();
      }   
    }, [rows, isDeleting, toDelete, isDeleted, errors, onClose, setDelete, dispatch]);
    

    function handleDelete(id) {

        // is errors
        if (errors) {
            dispatch(errorsClear());
        }
    
        dispatch(FlowcashTypeThunks.deleteFlowcashType(id));
    
    }


    return (
        <>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' bgColor={"#6c584c"} color={"white"}>
                            {String("Borrar Caja")}
                        </AlertDialogHeader>

                        <AlertDialogBody>

                            {/* Error Message */}
                            <Alert status='error' mb={3} display={!(errors === null) ? "block" : "none"}>
                                <HStack>
                                    <AlertIcon />
                                    <AlertTitle>¡Ha ocurrido un error!</AlertTitle>
                                </HStack>
                                <AlertDescription>{(errors) ? errors[0].message : ""}</AlertDescription>
                            </Alert>

                            <Text>Estas seguro de eliminar la caja: </Text>{(!errors) ? 
                            <Text fontFamily={"Input-SemiBold"}>{String(rows[toDelete]?.name).toLocaleUpperCase()}?</Text>:
                            ""}<Text>Luego de ejecutada esta acción no se puede recuperar los datos eliminados.</Text>

                        </AlertDialogBody>
                            

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button 
                                colorScheme='red'
                                isLoading={isDeleting} 
                                onClick={()=>{
                                    handleDelete(rows[toDelete]?.id);
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
