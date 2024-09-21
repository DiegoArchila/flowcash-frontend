import { useState, useEffect, Fragment } from "react";
import PropTypes from 'prop-types'

//Redux
import { useDispatch, useSelector } from "react-redux";

//Chakra UI
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
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
    Box
} from '@chakra-ui/react'

//Icons
import { MdAddBox  } from "react-icons/md";
import { IoMdRemove } from "react-icons/io";
import { RiAddLargeLine } from "react-icons/ri";
import { CiCircleInfo } from "react-icons/ci";


//Utils
import { formatCurrencyCOP } from "../../../../../../utils/formatCurrency";
import { FlowcashThunks } from "../../../../../../store/slices/flowcash/FlowcashThunks";
import { resetStates, errorsClear as errorsClearFlowcash } from "../../../../../../store/slices/flowcash/Flowcash";


function CreateFlowcash({ isOpen, onClose, title}) {

    // Redux
    const dispatch = useDispatch();
    const { isDone: isDoneFlowcash, inProcess, errors } = useSelector(state => state.flowcash);
    const { rows: dataFlowcashType } = useSelector(state => state.flowcashType);
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
        if (isDoneFlowcash) {
            closeCreateFlowcash();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isDoneFlowcash]);


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

        if (name=="value") {
            setdisplaybalanceFormat(value);
        } 
        
    }

    const HandleBlurForm = () => {
        if (newFlowcash.value!=null || newFlowcash.value!="") {
            setdisplaybalanceFormat(formatCurrencyCOP(newFlowcash.value));
        }
    }
    const HandleFocusForm = () => {
        
        setdisplaybalanceFormat(newFlowcash.value);
        
    }

    //Function Create
    const HandleCreate= () => {
        
        // is errors
        if (errors) {
            dispatch(errorsClearFlowcash());
        }
        
        dispatch(FlowcashThunks.createFlowcash(newFlowcash));
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
        onClose();
    }

  return (
    <Fragment>
        <Drawer isOpen={isOpen} onClose={onClose} size={{
            base:"full",
            sm: "md",
            md:"sm"
        }}>
            <DrawerOverlay />
            <DrawerContent>
            <DrawerHeader display={"flex"} gap={2} bgColor={"#0072bb"} color={"#FFFFFF"}>
                <MdAddBox  size={32} color='#FFFFFF' /> {"Nuevo movimiento".toLocaleUpperCase()}
            </DrawerHeader>
                <Divider orientation="horizontal" />

            <DrawerBody>

                    {/* Error Message */}
                    <Alert status='error' mb={3} display={!(errors===null) ? "block" : "none"}>
                        <HStack>
                            <AlertIcon />
                            <AlertTitle>¡Ha ocurrido un error!</AlertTitle>
                        </HStack>
                        <AlertDescription>{(errors) ? (JSON.stringify(errors?.parent?.detail) || JSON.stringify(errors?.parent)) : ""}</AlertDescription>                            
                    </Alert>

                <form>
                     {/* FIELD: Caja */}
                     <FormControl isRequired mt={5}>
                            <FormLabel fontFamily={"Input-SemiBold"}>{"Caja"}</FormLabel>
                            
                            <Select 
                                placeholder="Elije la caja" 
                                onChange={HandleForm}
                                required
                                onBlur={HandleForm}
                                value={newFlowcash.flowcash_type_id}
                                name="flowcash_type_id"
                                multiple={false}
                            >
                                { dataFlowcashType?.map((e,i) =>{
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

                                        {dataOperation.map((operation, i) =>{
                                            if (operation.id == newFlowcash.operation_id) {
                                                
                                                const res = dataOperationType.length === 0 ? null : dataOperationType.find(elementOperationType => 
                                                    operation.operation_type_id === elementOperationType.id);

                                                const color = res.is_sum ? "#7BA05B" : "#BF4F51CC";
                                                const fontColor = "#FFFFFF";
                                                
                                                return (
                                                    <Tag key={operation.type+i} size={"sm"} bgColor={color} variant={"outline"} color={fontColor} mr={"auto"}>
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
                                    required
                                    onBlur={HandleForm}
                                    value={newFlowcash.operation_id}
                                    name="operation_id"
                                    multiple={false}
                                >
                                    { dataOperation?.map((e,i) =>{
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
                            <Textarea value={[newFlowcash.description]} name="description" onChange={HandleForm} />

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
                <Button colorScheme='blue' mr={3} onClick={HandleCreate} isLoading={inProcess}
                    isDisabled={checkFormErrors.description || checkFormErrors.value || checkFormErrors.flowcash_type_id || checkFormErrors.operation_id}
                >
                    {"Guardar"}
                </Button>
                <Button colorScheme='red' mr={3} onClick={()=>{
                    closeCreateFlowcash();
                }}>
                    {"Cancelar"}
                </Button>
            </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </Fragment>
  )
}

CreateFlowcash.propTypes = {}

export default CreateFlowcash