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
    useOutsideClick
} from '@chakra-ui/react';

import { FlowcashTypeThunks } from '../../../../../../store/slices/flowcash/flowcashType/FlowcashTypeThunks';
import { errorsClear, deleteClear } from '../../../../../../store/slices/flowcash/flowcashType/FlowcashType';


export default function DeleteFlowcash({ onClose, isOpen }) {

    // Redux
    const dispatch = useDispatch();

    const {
        isDeleting, // deleting in process
        target, //storage the ID to delete
        isDeleted, // confirm deleted successfull
        errors,
        rows
    } = useSelector(state => state.flowcashType);

    const cancelRef = useRef();
    const alertDialogRef = useRef();

    /**
     * Use Hook for when it do clic outside
     */
    useOutsideClick({
        ref: alertDialogRef,
        handler: () => {
            handleDeleteErrors();
        }
    });

    useEffect(() => {
      if(isDeleted){
        dispatch(deleteClear());
        dispatch(errorsClear());
        onClose();
      }   
    }, [isDeleted, dispatch]);
    

    function handleDelete(id) {

        // is errors
        if (errors) {
            dispatch(errorsClear());
        }
    
        dispatch(FlowcashTypeThunks.deleteFlowcashType(id));
    
    }

    function handleDeleteErrors(){
        dispatch(errorsClear());
        onClose();
    }


    return (
        <>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                
            >
                <AlertDialogOverlay>
                    <AlertDialogContent ref={alertDialogRef}>
                        <AlertDialogHeader fontSize='lg' bgColor={"#6c584c"} color={"white"}>
                            {String("Borrar caja")}
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

                            <Text>Estas seguro de eliminar la caja: </Text>{(!errors) ? 
                            <Text fontFamily={"Input-SemiBold"}>{String(rows[target]?.name).toLocaleUpperCase()}?</Text> :
                            <Text fontFamily={"Input-SemiBold"}>{String(rows[target]?.name).toLocaleUpperCase()}?</Text>}
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
                                isLoading={isDeleting} 
                                onClick={()=>{
                                    handleDelete(rows[target]?.id);
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
