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

import { OperationThunks } from '../../../../../../store/slices/flowcash/OperationThunks';
import { errorsClear, deleteClear } from '../../../../../../store/slices/flowcash/FlowcashType';


export default function DeleteFlowcash({ onClose, isOpen }) {

    // Redux
    const dispatch = useDispatch();

    const {
        inProcess, // deleting in process
        target, //storage the ID to delete
        isDone, // confirm deleted successfull
        errors,
        data=[]
    } = useSelector(state => state.operation);

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

    useEffect( () => {
      if(isDone){
        dispatch(deleteClear());
        dispatch(errorsClear());
        onClose();
      }

    }, [dispatch, isDone]);
    

    function handleDelete(id) {

        // is errors
        if (errors) {
            dispatch(errorsClear());
        }
    
        dispatch(OperationThunks.deleteOperation(id));
    
    }

    function handleDeleteErrors(){
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
                
            >
                <AlertDialogOverlay>
                    <AlertDialogContent ref={alertDialogRef}>
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

                            <Text>Estas seguro de eliminar la operación: </Text>{(!errors) ? 
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
                                onClick={()=>{
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
