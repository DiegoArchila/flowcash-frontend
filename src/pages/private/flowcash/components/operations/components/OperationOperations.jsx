import { useState, useEffect, Fragment } from "react";
import PropTypes from 'prop-types'

//Redux
import { useDispatch, useSelector } from "react-redux";
import { OperationThunks } from "../../../../../../store/slices/flowcash/operation/OperationThunks";
import { resetStates, errorsClear, clearTarget } from "../../../../../../store/slices/flowcash/operation/Operation";

//Components
import Alerts from "../../../../../../components/Alerts/Alerts";

//Chakra UI
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    FormHelperText,
    Select,
    Input,
    Textarea,
    Divider,
    Tag,
    TagLeftIcon,
    TagLabel,
    Flex,
    Box,
} from '@chakra-ui/react';

//Icons
import { IoMdRemove } from "react-icons/io";
import { RiAddLargeLine } from "react-icons/ri";


/**
 * Componente `OperationOperations`
 *
 * Este componente representa un formulario para crear o editar movimientos de flujo de efectivo.
 * Utiliza Redux para manejar el estado global y Chakra UI para la interfaz de usuario.
 *
 * @component
 * @param {boolean} isOpen - Indica si el `Modal` está abierto o cerrado.
 * @param {function} onClose - Función que se llama para cerrar el `Modal`.
 * @param {string} title - Título que se muestra en el encabezado del `Modal`.
 * @param {ReactNode} icon - Icono que se muestra junto al título en el encabezado.
 * @param {'CREATE' | 'EDIT' | 'DETAIL'} [type] - Tipo de operación. Puede ser `CREATE`, `EDIT` o `DETAIL`.
 *
 * @returns {JSX.Element} - El componente `OperationOperations` renderizado.
 */
function OperationOperations({ isOpen, onClose, title, icon, type }) {

    /**
     * States Form
     */
    const [operation, setOperation] = useState({
        type: null,
        operation_type_id: null,
        notes: null
    });

    //REDUX
    const dispatch = useDispatch();
    const {
        data = [],
        inProcess,
        target,
        errors,
        isDone
    } = useSelector(state => state.operation);

    const {
        data: dataOperationType = [],
    } = useSelector(state => state.operationType);

    //LOAD COMPONENT
    useEffect(() => {

        if (type === "CREATE") {

            setOperation({
                type: null,
                operation_type_id: null,
                notes: null
            });

        } else if (type === "DETAIL" || type === "EDIT") {

            let temp = data.find(e => e.id === target);

            if (temp) {
                setOperation({
                    id: temp.id,
                    type: temp.type,
                    operation_type_id: temp.operation_type_id,
                    notes: temp.notes

                });

                //Set to undefined to help the garbage collector
                temp = undefined;
            }

        }

        if (isDone) {
            toClose();
        }

    }, [type, isDone, target])


    /**
     * Checks the error in the state operation
     */
    const checkFormErrors = {
        type: operation.type === "" || operation.type === null,
        operation_type_id: operation.operation_type_id === "" || operation.operation_type_id === null,
        notes: operation.notes === "" || operation.notes === null,
    }


    /**
     * Handle form methods
     */
    const HandleForm = (e) => {
        const { name, value } = e.target;

        setOperation({
            ...operation,
            [name]: value
        });

    }

    //Function Create
    const HandleCreate = () => {

        // is errors
        if (errors) {
            dispatch(errorsClear());
        }

        switch (type) {
            case "CREATE":

                dispatch(OperationThunks.createOperation(operation));
                break;

            case "EDIT":


                dispatch(OperationThunks.updateOperation({
                    type: operation.type,
                    operation_type_id: operation.operation_type_id,
                    notes: operation.notes
                }, operation.id));


                break;
        }

    }

    //Function close
    const toClose = () => {

        dispatch(errorsClear());

        setOperation({
            type: null,
            operation_type_id: null,
            notes: null
        });

        //Clear the targe for prevents conflicts
        dispatch(clearTarget());
        dispatch(resetStates());
        onClose();
    }

    return (
        <Fragment>
            <Modal isOpen={isOpen} onClose={onClose} size={{
                md: "sm"
            }}
                onOverlayClick={toClose}
            >
                <ModalOverlay />

                <ModalContent>
                    <ModalHeader
                        display={"flex"}
                        gap={2}
                        bgColor={"info.50"}
                        color={"info.700"}
                        fontFamily={"label"}
                    >

                        {icon}
                        {String(title)}

                    </ModalHeader>


                    <ModalCloseButton color={"error.900"} onClick={toClose} />
                    <Divider orientation="horizontal" />


                    <ModalBody>

                        {errors && (
                            <Alerts
                                status='error'
                                title='Ha ocurrido un error al tratar de obtener los datos'
                                description={(errors) ? (JSON.stringify(errors?.parent?.detail) || JSON.stringify(errors?.parent)) : ""}
                            />
                        )}


                        <form>


                            {/* FIELD: Type */}
                            <FormControl mt={5} isRequired>
                                <FormLabel fontFamily={"label"} color={"text.labels"}>{"Nombre operación"}</FormLabel>
                                <Input
                                    fontFamily={"input"}
                                    color={"text.paragraphs"}
                                    type="text"
                                    isReadOnly={type === "DETAIL" ? true : false}
                                    value={String(operation.type).toUpperCase() || ""}
                                    name="type"
                                    onChange={HandleForm}
                                    textAlign={"left"}
                                    autoComplete="off"
                                />

                            </FormControl>

                            {/* FIELD: Operation */}
                            <FormControl isRequired mt={5}>

                                <Flex>
                                    <FormLabel fontFamily={"label"} color={"text.labels"}>{"Tipo de operación"}</FormLabel>

                                    <Box ml={"auto"}>

                                        {dataOperationType?.map((e, i) => {

                                            if (operation.operation_type_id != e.id) {
                                                return null;
                                            }

                                            const color = e.is_sum ? "#7BA05B" : "#BF4F51CC";
                                            const fontColor = "#FFFFFF";

                                            return (
                                                <Tag key={e + i} size={"sm"} bgColor={color} variant={"outline"} color={fontColor}>
                                                    <TagLeftIcon as={(e.is_sum) ? RiAddLargeLine : IoMdRemove} />
                                                    <TagLabel
                                                        fontSize={"xs"}
                                                        fontFamily={"button"}
                                                    >{(e.is_sum) ? String("suma").toLocaleUpperCase() : "resta".toLocaleUpperCase()}</TagLabel>
                                                </Tag>
                                            );
                                        })}

                                    </Box>

                                </Flex>

                                <Select
                                    placeholder="Elije el tipo de operación"
                                    onChange={HandleForm}
                                    isDisabled={type === "DETAIL" || type === "EDIT" ? true : false}
                                    required
                                    onBlur={HandleForm}
                                    value={operation.operation_type_id || ""}
                                    name="operation_type_id"
                                    multiple={false}
                                >
                                    {dataOperationType?.map((e, i) => {
                                        return (
                                            <option key={i} value={e.id}>{String(e.type).toLocaleUpperCase()}</option>
                                        )
                                    })}
                                </Select>

                                {/*
                                (checkFormErrors.flowcash_type_id) ?
                                <FormHelperText fontStyle={"italic"} color="red">{"Selecciona la caja afectada, este campo es obligatorio"}</FormHelperText>
                                :
                                undefined
                            */}

                            </FormControl>

                            {/* FIELD: notes */}
                            <FormControl mt={5}>
                                <FormLabel fontFamily={"label"} color={"text.labels"}>{"Descripción"}</FormLabel>
                                <Textarea
                                    fontFamily={"input"}
                                    color={"text.paragraphs"}
                                    value={operation.notes || ""}
                                    name="notes"
                                    onChange={HandleForm}
                                    isReadOnly={type === "DETAIL" ? true : false}
                                    height={"150px"}
                                    />

                                {
                                    (checkFormErrors.description) ?
                                        <FormHelperText fontStyle={"italic"} color={"red"}>{"Por favor ingresa la descripción de la nueva operación."}</FormHelperText>
                                        :
                                        undefined
                                }

                            </FormControl>
                        </form>
                    </ModalBody>

                    <Divider orientation="horizontal" mt={5} />

                    <ModalFooter>

                        {
                            type === "DETAIL" ?
                                <Button colorScheme='blue' mr={3} fontFamily={"button"} onClick={toClose}>
                                    {"Cerrar"}
                                </Button>
                                :
                                <Box>
                                    <Button colorScheme='blue' fontFamily={"button"} mr={3} onClick={HandleCreate} isLoading={inProcess}
                                        isDisabled={checkFormErrors.type || checkFormErrors.operation_type_id}
                                    >
                                        {"Guardar"}
                                    </Button>
                                    <Button colorScheme='red' fontFamily={"button"} mr={3} onClick={toClose}>
                                        {"Cancelar"}
                                    </Button>
                                </Box>
                        }
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Fragment>
    );

}

OperationOperations.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    type: PropTypes.oneOf(["CREATE", "EDIT", "DETAIL"])
}

export default OperationOperations;