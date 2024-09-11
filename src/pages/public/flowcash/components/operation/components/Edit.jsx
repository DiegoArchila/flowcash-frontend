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
import { errorsClear, resetStates, clearTarget } from "../../../../../../store/slices/flowcash/Operation";

export default function Edit({ isOpenEdit, onCloseEdit }) {

    // Redux
    const dispatch = useDispatch();
    const {
        inProcess, // deleting in process
        target, //storage the ID to delete
        isDone, // confirm deleted successfull
        errors,
        data = []
    } = useSelector(state => state.operation);

    const { data: dataOperationType } = useSelector(state => state.operationType);

    /**
     * States Form
    */
    const [editOperation, setEditOperation] = useState({
        type: data[target]?.type,
        operation_type_id: data[target]?.operation_type_id,
        notes: data[target]?.notes
    });;

    
    function CloseComponent() {
        onCloseEdit();
        dispatch(clearTarget());
        dispatch(resetStates());
        setEditOperation({
            type: undefined,
            operation_type_id: undefined,
            notes: undefined
        });
        
    }
    
    useEffect(() => {
      if(target!= null){
        setEditOperation({
            type: data[target]?.type,
            operation_type_id: data[target]?.operation_type_id,
            notes: data[target]?.notes
      });

      if (isDone) {
        CloseComponent();
      }
      }
    }, [target, isDone])
    
    /**
     * Checks the error in the state newOperation
     */
    const checkFormErrors = {
        name: editOperation.type === "" || editOperation.name === null,
        balance: editOperation.operation_type_id === "" || editOperation.operation_type_id === null
    }


    /**
     * Handle form methods
     */
    const HandleForm = (e) => {
        const { name, value } = e.target;

        setEditOperation({
            ...editOperation,
            [name]: value
        });

        console.log("HandleForm editOperation: ", editOperation);
    }

    const HandleCreate = () => {

        // is errors
        if (errors) {
            dispatch(errorsClear());
        }

        dispatch(OperationThunks.updateOperation(editOperation, data[target]?.id));

        if (isDone) {
            CloseComponent();
        }
    }


    return (
        <>
            <Modal closeOnOverlayClick={false} isOpen={isOpenEdit} onClose={onCloseEdit} >
                <ModalOverlay bg={"blackAlpha.300"} />
                <ModalContent>
                    <ModalHeader bgColor={"#6c584c"} color={"white"}>Editar</ModalHeader>
                    <ModalBody pb={6} mt={3}>

                        {/* Error Message */}
                        <Alert status='error' mb={3} display={!(errors === null) ? "block" : "none"}>
                            <HStack>
                                <AlertIcon />
                                <AlertTitle>¡Ha ocurrido un error!</AlertTitle>
                            </HStack>
                            <AlertDescription>{(errors) ? errors[0]?.message : ""}</AlertDescription>
                        </Alert>

                        <form>

                            {/* FIELD: name */}
                            <FormControl isRequired isInvalid={checkFormErrors.name} >
                                <FormLabel fontFamily={"Input-SemiBold"}>{"Nombre"}</FormLabel>
                                <Input type="text" value={[editOperation.type]} name="type" onChange={HandleForm} maxLength={64} />
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
                                    disabled
                                    required
                                    onBlur={HandleForm}
                                    name="operation_type_id"
                                    multiple={false}
                                    value={[editOperation.operation_type_id]}
                                >
                                    {dataOperationType.map((e, i) => {

                                        return (
                                            <option key={i} value={e.id}
                                            >
                                                {String(e.type).toLocaleUpperCase()}
                                            </option>);

                                    })
                                    }
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
                                <Textarea value={[editOperation.notes]} name="notes" onChange={HandleForm} />
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
                            onClick={() => {
                                HandleCreate();

                            }}
                        >
                            {"Guardar"}
                        </Button>
                        <Button onClick={CloseComponent}>{"Salir"}</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
