import { useState, useEffect, Fragment } from "react";
import PropTypes from 'prop-types'

//Redux
import { useDispatch, useSelector } from "react-redux";
import { FlowcashThunks } from "../../../../../../store/slices/flowcash/FlowcashThunks";
import { resetStates, errorsClear as errorsClearFlowcash, clearTarget as clearTargetFlowcash } from "../../../../../../store/slices/flowcash/Flowcash";

//Chakra UI
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    FormControl,
    FormLabel,
    FormHelperText,
    Select,
    Input,
    Textarea,
    Divider,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    HStack,
    Tag,
    TagLeftIcon,
    TagLabel,
    Flex,
    Box,
} from '@chakra-ui/react'

//Icons
import { IoMdRemove } from "react-icons/io";
import { RiAddLargeLine } from "react-icons/ri";


//Utils
import { formatCurrencyCOP } from "../../../../../../utils/formatCurrency";
import { formatDate } from "../../../../../../utils/formatDate";

/**
 * Componente `OperationMovement`
 *
 * Este componente representa un formulario para crear o editar movimientos de flujo de efectivo.
 * Utiliza Redux para manejar el estado global y Chakra UI para la interfaz de usuario.
 *
 * @component
 * @param {boolean} isOpen - Indica si el `Drawer` está abierto o cerrado.
 * @param {function} onClose - Función que se llama para cerrar el `Drawer`.
 * @param {string} title - Título que se muestra en el encabezado del `Drawer`.
 * @param {ReactNode} icon - Icono que se muestra junto al título en el encabezado.
 * @param {'CREATE' | 'EDIT' | 'DETAIL'} [type] - Tipo de operación. Puede ser `CREATE`, `EDIT` o `DETAIL`.
 *
 * @returns {JSX.Element} - El componente `OperationMovement` renderizado.
 */
function OperationMovement({ isOpen, onClose, title, icon, type }) {

    // Redux
    const dispatch = useDispatch();
    const { isDone: isDoneFlowcash, inProcess, errors, data: {data: dataFlowcash}, target: targetFlowcash } = useSelector(state => state.flowcash);
    const { data: dataFlowcashType } = useSelector(state => state.flowcashType);
    const { data: dataOperation } = useSelector(state => state.operation);
    const { data: dataOperationType } = useSelector(state => state.operationType);


    /**
     * States Form
     */
    const [newFlowcash, setNewFlowcash] = useState({
        flowcash_type_id: null,
        operation_id: null,
        value: 0,
        description: null
    });

    /**
     * Display the states with format, on this case only the field: balance
     */
    const [displaybalanceFormat, setdisplaybalanceFormat] = useState("");

    useEffect(() => {

        /**
        *If the state targetFlowcash in flowcash is not empty or null, complete the state local
        *newFlowcash for show the field selected for edit
        */
        if (targetFlowcash != null) {

            setdisplaybalanceFormat("");

            let flowcashUpdate = (dataFlowcash.length === 0) ? null : dataFlowcash.find(flowcash => targetFlowcash == flowcash.id);

            if (flowcashUpdate) {
                setNewFlowcash({
                    datetime: flowcashUpdate.datetime,
                    flowcash_type_id: flowcashUpdate.flowcash_type_id,
                    operation_id: flowcashUpdate.operation_id,
                    value: flowcashUpdate.value,
                    description: flowcashUpdate.description
                });

                if (flowcashUpdate.value && flowcashUpdate.value !== 0) {
                    setdisplaybalanceFormat(formatCurrencyCOP(flowcashUpdate.value));
                } else {
                    setdisplaybalanceFormat("");
                }
                
            } else {
                setNewFlowcash({
                    flowcash_type_id: null,
                    operation_id: null,
                    value: 0,
                    description: null
               })
            }

            // To null for help to gargabe collector
            flowcashUpdate = undefined;


        } else {
            setNewFlowcash({
                flowcash_type_id: null,
                operation_id: null,
                value: 0,
                description: null
            });
            setdisplaybalanceFormat("");

        }


        if (isDoneFlowcash) {
            closeCreateFlowcash();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDoneFlowcash, targetFlowcash]);

    /**
     * Checks the error in the state newOperation
     */

    const checkFormErrors = {
        flowcash_type_id: newFlowcash.flowcash_type_id === "" || newFlowcash.flowcash_type_id === null,
        operation_id: newFlowcash.operation_id === "" || newFlowcash.operation_id === null,
        value: newFlowcash.value === "" || newFlowcash.value === null || newFlowcash.value === 0,
        description: newFlowcash.description === "" || newFlowcash.description === null,
    }

    /**
     * Handle form methods
     */
    const HandleForm = (e) => {
        const { name, value } = e.target;

        setNewFlowcash({
            ...newFlowcash,
            [name]: value
        });

        if (name == "value") {
            setdisplaybalanceFormat(value);
        }

    }

    const HandleBlurForm = () => {
        if (newFlowcash.value != null || newFlowcash.value != "") {
            setdisplaybalanceFormat(formatCurrencyCOP(newFlowcash.value));
        }
    }
    const HandleFocusForm = () => {

        setdisplaybalanceFormat(newFlowcash.value);

    }

    //Function Create
    const HandleCreate = () => {

        // is errors
        if (errors) {
            dispatch(errorsClearFlowcash());
        }

        if (targetFlowcash != null) {
            let updateFlowcash = {
                flowcash_type_id: newFlowcash.flowcash_type_id,
                operation_id: newFlowcash.operation_id,
                value: newFlowcash.value,
                description: newFlowcash.description
            }
            dispatch(FlowcashThunks.updateFlowcash(updateFlowcash, Number.parseInt(targetFlowcash)));
            updateFlowcash=undefined;
        } else {

            dispatch(FlowcashThunks.createFlowcash(newFlowcash));
        }

    }

    //Function close
    const closeCreateFlowcash = () => {

        dispatch(errorsClearFlowcash());

        setNewFlowcash({
            flowcash_type_id: null,
            operation_id: null,
            value: 0,
            description: null
        });

        dispatch(resetStates());
        setdisplaybalanceFormat("");

        //Clear the targe for prevents conflicts
        dispatch(clearTargetFlowcash());
        onClose();
    }

    return (
        <Fragment>
            <Drawer isOpen={isOpen} onClose={onClose} size={{
                base: "full",
                sm: "md",
                md: "sm"
            }}
            onOverlayClick={closeCreateFlowcash}
            >
                <DrawerOverlay/>
                <DrawerContent >
                    <DrawerHeader display={"flex"} gap={2} bgColor={"#0072bb"} color={"#FFFFFF"}>

                        {icon}
                        {String(title).toLocaleUpperCase()}

                    </DrawerHeader>


                    <DrawerCloseButton color={"#FFFFFF"} onClick={closeCreateFlowcash}/>
                    <Divider orientation="horizontal" />


                    <DrawerBody>

                        {/* Error Message */}
                        <Alert status='error' mb={3} display={!(errors === null) ? "block" : "none"}>
                            <HStack>
                                <AlertIcon />
                                <AlertTitle>¡Ha ocurrido un error!</AlertTitle>
                            </HStack>
                            <AlertDescription>{(errors) ? (JSON.stringify(errors?.parent?.detail) || JSON.stringify(errors?.parent)) : ""}</AlertDescription>
                        </Alert>

                        <form>

                            
                            {/* FIELD: DATETIME */}
                            { (type === "DETAIL") ? 
                                <FormControl mt={5}>
                                    <FormLabel fontFamily={"Input-SemiBold"}>{"Hora"}</FormLabel>
                                    <Input
                                        type="text"
                                        isReadOnly={type==="DETAIL" ? true:false}
                                        value={formatDate.getDateFormatedLarge(newFlowcash.datetime)}
                                        name="datetime"
                                        textAlign={"center"}
                                        autoComplete="off"
                                    />

                                </FormControl>
                                :
                                null
                            }

                            {/* FIELD: Caja */}
                            <FormControl isRequired mt={5}>
                                <FormLabel fontFamily={"Input-SemiBold"}>{"Caja"}</FormLabel>

                                <Select
                                    placeholder="Elije la caja"
                                    onChange={HandleForm}
                                    isDisabled={type==="DETAIL" ? true:false}
                                    required
                                    onBlur={HandleForm}
                                    value={newFlowcash.flowcash_type_id || ""}
                                    name="flowcash_type_id"
                                    multiple={false}
                                >
                                    {dataFlowcashType?.map((e, i) => {
                                        return (
                                            <option key={i} value={e.id}>{String(e.name).toLocaleUpperCase()}</option>
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

                            {/* FIELD: Operación */}
                            <FormControl isRequired mt={5}>
                                <Flex>

                                    <FormLabel fontFamily={"Input-SemiBold"}>
                                        {"Operación"}
                                    </FormLabel>
                                    <Box ml={"auto"}>

                                        {dataOperation.map((operation, i) => {
                                            if (operation.id == newFlowcash.operation_id) {

                                                const res = dataOperationType.length === 0 ? null : dataOperationType.find(elementOperationType =>
                                                    operation.operation_type_id === elementOperationType.id);

                                                const color = res.is_sum ? "#7BA05B" : "#BF4F51CC";
                                                const fontColor = "#FFFFFF";

                                                return (
                                                    <Tag key={operation.type + i} size={"sm"} bgColor={color} variant={"outline"} color={fontColor} mr={"auto"}>
                                                        <TagLeftIcon as={(res.is_sum) ? RiAddLargeLine : IoMdRemove} />
                                                        <TagLabel fontSize={11} >{String(res.type).toLocaleUpperCase()}</TagLabel>
                                                    </Tag>
                                                );
                                            }
                                        })}

                                    </Box>

                                </Flex>

                                <Select
                                    placeholder="Elige la operación"
                                    onChange={HandleForm}
                                    isDisabled={type==="DETAIL" ? true:false}
                                    required
                                    onBlur={HandleForm}
                                    value={newFlowcash.operation_id || ""}
                                    name="operation_id"
                                    multiple={false}
                                >
                                    {dataOperation?.map((e, i) => {
                                        return (
                                            <option key={i} value={e.id} color="#ff6f61">{String(e.type).toLocaleUpperCase()}</option>
                                        )
                                    })}
                                </Select>

                                {/*
                                    (checkFormErrors.operation_id) ?
                                    <FormHelperText fontStyle={"italic"} color={"red"}>{"Selecciona la operación a realizar, este campo es obligatorio"}</FormHelperText>
                                    :
                                    undefined
                                */}



                            </FormControl >

                            {/* FIELD: Operation Type Only Informative */}


                            {/* FIELD: Value */}
                            <FormControl isRequired mt={5}>
                                <FormLabel fontFamily={"Input-SemiBold"}>{"Valor"}</FormLabel>
                                <Input
                                    type="text"
                                    isReadOnly={type==="DETAIL" ? true:false}
                                    value={displaybalanceFormat}
                                    name="value"
                                    onChange={HandleForm}
                                    onBlur={HandleBlurForm}
                                    onFocus={HandleFocusForm}
                                    autoComplete="off"
                                />

                                {
                                    (checkFormErrors.value) ?
                                        <FormHelperText fontStyle={"italic"} color="red">{"Por favor ingresar el valor, este campo es obligatorio."}</FormHelperText>
                                        :
                                        undefined
                                }

                            </FormControl>

                            {/* FIELD: notes */}
                            <FormControl mt={5} isRequired>
                                <FormLabel fontFamily={"Input-SemiBold"}>{"Descripción"}</FormLabel>
                                <Textarea value={[newFlowcash.description]} name="description" onChange={HandleForm} isReadOnly={type==="DETAIL" ? true:false}/>

                                {
                                    (checkFormErrors.description) ?
                                        <FormHelperText fontStyle={"italic"} color={"red"}>{"Por favor ingresa la descripción del movimiento."}</FormHelperText>
                                        :
                                        undefined
                                }

                            </FormControl>
                        </form>
                    </DrawerBody>
                    <Divider orientation="horizontal" />

                    <DrawerFooter>

                        {
                            type==="DETAIL" ?
                            <Button colorScheme='blue' mr={3} onClick={() => {
                                closeCreateFlowcash();
                            }}>
                                {"Cerrar"}
                            </Button>
                            :
                            <Box>
                                <Button colorScheme='blue' mr={3} onClick={HandleCreate} isLoading={inProcess}
                                    isDisabled={checkFormErrors.description || checkFormErrors.value || checkFormErrors.flowcash_type_id || checkFormErrors.operation_id}
                                >
                                    {"Guardar"}
                                </Button>
                                <Button colorScheme='red' mr={3} onClick={() => {
                                    closeCreateFlowcash();
                                }}>
                                    {"Cancelar"}
                                </Button>
                            </Box>
                        }
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Fragment>
    )
}

OperationMovement.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    type: PropTypes.oneOf(["CREATE", "EDIT", "DETAIL"])
}

export default OperationMovement;