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
    HStack
} from "@chakra-ui/react";

import { FlowcashTypeThunks } from "../../../../../../store/slices/flowcash/FlowcashTypeThunks";
import { errorsClear, createClear, setTarget } from "../../../../../../store/slices/flowcash/FlowcashType";

export default function Edit({ isOpenEdit, onCloseEdit }) {

    // Redux
    const dispatch = useDispatch();
    const { isCreated, isCreating, errors, rows, target } = useSelector(state => state.flowcashType);

    /**
     * States Form
    */
    const [editFlowcash, setEditFlowcash] = useState({
        name: rows[target]?.name,
        notes: rows[target]?.notes
    });

    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        console.log("ESta Actualizado ya?: ", isCreated);

        if (isCreated) {
            onCloseEdit();
            dispatch(setTarget(null));
            setEditFlowcash({
                name: undefined,
                notes: undefined
            });
            console.log("Se supone que ya debi haberme cerrado");
            dispatch(createClear());
            setInitialized(false);
            
        }


        if (target != undefined && !initialized) {
            setEditFlowcash({
                name: rows[target]?.name,
                notes: rows[target]?.notes
            });
            setInitialized(true);
        }

        console.log("RENDERIZACION");


    }, [isCreated, rows, onCloseEdit, dispatch, target, initialized]);

    /**
     * Checks the error in the state newFlowcash
     */
    const checkFormErrors = {
        name: editFlowcash.name === "" || editFlowcash.name === null,
    }

    /**
     * Handle form methods
     */
    const HandleForm = (e) => {
        const { name, value } = e.target;

        setEditFlowcash({
            ...editFlowcash,
            [name]: value
        });

    }

    const HandleCreate = () => {

        // is errors
        if (errors) {
            dispatch(errorsClear());
        }

        dispatch(FlowcashTypeThunks.updateFlowcashType(editFlowcash, rows[target]?.id));

        console.log("estoy dentro de HandleCreate, y el estado actual de isCreated es: ", isCreated);
        

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
                                <Input type="text" value={[editFlowcash.name]} name="name" onChange={HandleForm} maxLength={64} />
                                {
                                    (checkFormErrors.name) ?
                                        <FormHelperText>{"Por favor ingresa el nombre de caja."}</FormHelperText>
                                        :
                                        undefined
                                }
                            </FormControl>


                            {/* FIELD: notes */}
                            <FormControl mt={5}>
                                <FormLabel fontFamily={"Input-SemiBold"}>{"Descripción o notas:"}</FormLabel>
                                <Textarea value={[editFlowcash.notes]} name="notes" onChange={HandleForm} />
                                <FormHelperText>{"Aquí puedes explicar los detalles de esta caja, o dejar notas. Este campo es opcional."}</FormHelperText>
                            </FormControl>

                        </form>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme='blue'
                            mr={3}
                            isDisabled={checkFormErrors.name}
                            isLoading={isCreating}
                            onClick={() => {
                                HandleCreate();
                            }}
                        >
                            {"Guardar"}
                        </Button>
                        <Button onClick={() => {
                            setEditFlowcash({
                                name: undefined,
                                notes: undefined
                            });
                            setInitialized(false);
                            dispatch(createClear());
                            dispatch(setTarget(null));
                            onCloseEdit();
                        }}>{"Cancelar"}</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}