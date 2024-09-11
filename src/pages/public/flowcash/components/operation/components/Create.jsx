import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    Textarea,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    HStack,
    Select
} from "@chakra-ui/react";

import { OperationThunks } from "../../../../../../store/slices/flowcash/OperationThunks";
import { errorsClear, resetStates } from "../../../../../../store/slices/flowcash/Operation";

export default function Create({ isOpen, onClose }) {

    // Redux
    const dispatch = useDispatch();
    const { isDone, inProcess, errors } = useSelector(state => state.operation);
    const { data } = useSelector(state => state.operationType);
  
    /**
     * States Form
     */
    const [newOperation, setNewOperation] = useState({
     type: "",
     operation_type_id: null,
     notes: ""
    });
    
    useEffect(() => {
    if (isDone) {
        dispatch(resetStates());
        setNewOperation({
            type: "",
            operation_type_id: null,
            notes: ""
        });
        onClose();

    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDone, inProcess, dispatch, onClose]);
    
    /**
     * Checks the error in the state newOperation
     */
    const checkFormErrors = {
        name: newOperation.type === "" || newOperation.name === null,
        balance: newOperation.operation_type_id === "" || newOperation.operation_type_id === null
    }

    /**
     * Handle form methods
     */
    const HandleForm = (e) => {
        const { name, value } = e.target;

        setNewOperation({
            ...newOperation,
            [name]: value
        });
        
    }

    const HandleCreate= () => {
        
        // is errors
        if (errors) {
            dispatch(errorsClear());
        }
        dispatch(OperationThunks.createOperation(newOperation));

    }


    return (
        <>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} >
            <ModalOverlay bg={"blackAlpha.300"} />
            <ModalContent>
                <ModalHeader bgColor={"#6c584c"} color={"white"}>Nueva Operación</ModalHeader>
                <ModalBody pb={6} mt={3}>
                    
                    {/* Error Message */}
                    <Alert status='error' mb={3} display={!(errors===null) ? "block" : "none"}>
                        <HStack>
                            <AlertIcon />
                            <AlertTitle>¡Ha ocurrido un error!</AlertTitle>
                        </HStack>
                        <AlertDescription>{(errors) ? errors?.parent?.detail : ""}</AlertDescription>                            
                    </Alert>
                    
                    <form>

                        {/* FIELD: name */}
                        <FormControl isRequired isInvalid={checkFormErrors.name} >
                            <FormLabel fontFamily={"Input-SemiBold"}>{"Nombre"}</FormLabel>
                            <Input type="text" value={[newOperation.type]} name="type" onChange={HandleForm} maxLength={64}/>
                            {
                                (checkFormErrors.name) ?
                                <FormHelperText>{"Por favor ingresa el nombre de la operación a registrar."}</FormHelperText>
                                :
                                undefined
                            }                                
                        </FormControl>

                        {/* FIELD: Operation Type */}
                        <FormControl isRequired mt={5} isInvalid={checkFormErrors.balance}>
                            <FormLabel fontFamily={"Input-SemiBold"}>{"Tipo"}</FormLabel>
                            
                            <Select 
                                placeholder="Selecciona..." 
                                onChange={HandleForm}
                                required
                                onBlur={HandleForm}
                                value={[newOperation.operation_type_id]}
                                name="operation_type_id"
                            >
                                { data.map((e,i) =>{
                                    return (
                                        <option key={i} value={e.id}>{String(e.type).toLocaleUpperCase()}</option>
                                    )
                                })}
                            </Select>

                            {
                                (checkFormErrors.balance) ?
                                <FormHelperText>{"El tipo de operación determinará la operación; sí es un INGRESO(entrada) sumará a la caja seleccionada(dentro de los eventos de caja), sí es EGRESO(salida) descontará o realizará una resta."}</FormHelperText>
                                :
                                undefined
                            }
                            
                        </FormControl>

                        {/* FIELD: notes */}
                        <FormControl mt={5}>
                            <FormLabel fontFamily={"Input-SemiBold"}>{"Descripción o notas"}</FormLabel>
                            <Textarea value={[newOperation.notes]} name="notes" onChange={HandleForm} />
                            <FormHelperText>{"Aquí puedes explicar los detalles de esta operación, o dejar notas. Este campo es opcional."}</FormHelperText>
                        </FormControl>

                    </form>
                </ModalBody>

                <ModalFooter>
                    <Button 
                        colorScheme='blue' 
                        mr={3}
                        isDisabled={(checkFormErrors.balance || checkFormErrors.name)}
                        isLoading={inProcess}
                        onClick={()=>{
                            HandleCreate();

                        }}
                    >
                        {"Guardar"}
                    </Button>
                    <Button onClick={ () => {
                        dispatch(errorsClear());
                        onClose();   
                    }}>{"Cancelar"}</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}