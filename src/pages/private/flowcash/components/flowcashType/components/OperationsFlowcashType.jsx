import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

//Redux
import { useDispatch, useSelector } from "react-redux";
import { FlowcashTypeThunks } from '../../../../../../store/slices/flowcash/flowcashType/FlowcashTypeThunks';
import { clearTarget,  errorsClear, resetStates } from "../../../../../../store/slices/flowcash/flowcashType/FlowcashType";

//CHAKRA UI
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    HStack,
    FormControl,
    FormLabel,
    FormHelperText,
    Select,
    Input,
    Textarea,
    Divider,
    Box,
  } from '@chakra-ui/react'

//UTILS
import { formatCurrencyCOP } from '../../../../../../utils/formatCurrency';
import { formatDate } from '../../../../../../utils/formatDate';


  /**
 * Componente `OperationsFlowcashType`
 *
 * Este componente representa un formulario para crear o editar cajas para el flujo de efectivo.
 *
 * @component
 * @param {boolean} isOpen - Indica si el `Modal` está abierto o cerrado.
 * @param {function} onClose - Función que se llama para cerrar el `Modal`.
 * @param {string} title - Título que se muestra en el encabezado del `Modal`.
 * @param {ReactNode} icon - Icono que se muestra junto al título en el encabezado.
 * @param {'CREATE' | 'EDIT' | 'DETAIL'} [type] - Tipo de operación. Puede ser `CREATE`, `EDIT` o `DETAIL`.
 *
 * @returns {JSX.Element} - El componente `OperationsFlowcashType` renderizado.
 */
function OperationsFlowcashType({isOpen, onClose, title, icon, type}) {
    
    /**
     * States Form
     */
    const [newFlowcashType, setNewFlowcashType] = useState({
        name: null,
        balance: 0,
        notes: null
    });

     /**
     * Display the states with format, on this case only the field: balance
     */
     const [displaybalanceFormat, setdisplaybalanceFormat] = useState("");

    //REDUX
    const dispatch = useDispatch();
    const { 
        data = [], 
        inProcess,
        target,
        errors,
        isDone
    } = useSelector(state => state.flowcashType);

    //LOAD COMPONENT
    useEffect(() => {

        if (type==="CREATE") {
            
            setNewFlowcashType({
                name: null,
                balance: 0,
                notes: null
            });
            setdisplaybalanceFormat("");

        } else if (type==="DETAIL" || type==="EDIT") {

            let temp = data.find(e => e.id === target);

            if (temp) {
                setNewFlowcashType({
                    id: temp.id,
                    datetime: formatDate.getDateFormatedLarge(temp.datetime),
                    name: temp.name,
                    balance: temp.balance,
                    notes: temp.notes
    
                });
                setdisplaybalanceFormat(formatCurrencyCOP(temp.balance));

                //Set to undefined to help the garbage collector
                temp=undefined;
            }

        }

        if(isDone){
            closeFlowcashType();
        }

    }, [type, isDone, target])


    /**
     * Checks the error in the state newFlowcashType
     */
    const checkFormErrors = {
        name: newFlowcashType.name === "" || newFlowcashType.name === null,
        balance: newFlowcashType.balance === "" || newFlowcashType.balance === null,
        notes: newFlowcashType.notes === "" || newFlowcashType.notes === null,
    }


     /**
     * Handle form methods
     */
     const HandleForm = (e) => {
        const { name, value } = e.target;

        setNewFlowcashType({
            ...newFlowcashType,
            [name]: value
        });

        if (name == "balance") {
            setdisplaybalanceFormat(value);
        }

    }

    const HandleBlurForm = () => {
        if (newFlowcashType.balance != null || newFlowcashType.balance != "") {
            setdisplaybalanceFormat(formatCurrencyCOP(newFlowcashType.balance));
        }
    }
    const HandleFocusForm = () => {

        setdisplaybalanceFormat(newFlowcashType.balance);

    }

     //Function Create
     const HandleCreate = () => {

        // is errors
        if (errors) {
            dispatch(errorsClear());
        }

        switch (type) {
            case "CREATE":
                
                dispatch(FlowcashTypeThunks.createFlowcashType(newFlowcashType));
                break;

            case "EDIT":
                
                dispatch(FlowcashTypeThunks.updateFlowcashType(newFlowcashType, newFlowcashType.id));
                break;
        }

    }

     //Function close
     const closeFlowcashType = () => {

        dispatch(errorsClear());

        setNewFlowcashType({
            name: null,
            balance: 0,
            notes: null
        });

        setdisplaybalanceFormat("");

        //Clear the targe for prevents conflicts
        dispatch(clearTarget());
        dispatch(resetStates());
        onClose();
    }


    return (
    <React.Fragment>

        <Modal isOpen={isOpen} onClose={onClose} onOverlayClick={closeFlowcashType} size={{
                md: "sm"
            }}        
        >
        
        <ModalOverlay />
        
        <ModalContent>
          
          {/*MODAL HEADER*/}
          <ModalHeader display={"flex"} gap={2} bgColor={"#0072bb"} color={"#FFFFFF"}>
            {icon}
            {String(title).toLocaleUpperCase()}
          </ModalHeader>

          <ModalCloseButton color={"#FFFFFF"} onClick={closeFlowcashType}/>

          <ModalBody>

            {/* Error Message */}
            <Alert status='error' mb={3} display={!(errors === null) ? "block" : "none"}>
                <HStack>
                    <AlertIcon />
                    <AlertTitle>¡Ha ocurrido un error!</AlertTitle>
                </HStack>
                <AlertDescription>{(errors) ? (JSON.stringify(errors[0]?.original) || JSON.stringify(errors[0]?.message)) : ""}</AlertDescription>
            </Alert>

            <form>

                {/* FIELD: Datetime */}
                <FormControl mt={5} display={type ==="DETAIL" ? "block":"none"}>
                    <FormLabel fontFamily={"Input-SemiBold"}>{"Creada en"}</FormLabel>
                    <Input
                        type="text"
                        isReadOnly={type ==="DETAIL" ? true:false}
                        value={newFlowcashType.datetime || ""}
                        onChange={HandleForm}
                        name="datetime"
                        textAlign={"left"}
                        autoComplete="off"
                    />

                </FormControl>
    
                {/* FIELD: Name */}
                <FormControl mt={5} isRequired >
                    <FormLabel fontFamily={"Input-SemiBold"}>{"Nombre"}</FormLabel>
                    <Input
                        type="text"
                        isReadOnly={type==="DETAIL" ? true:false}
                        value={newFlowcashType.name || ""}
                        onChange={HandleForm}
                        name="name"
                        textAlign={"left"}
                        autoComplete="off"
                        placeholder='Nombre de la caja a crear'
                    />

                </FormControl>

                {/* FIELD: Balance */}
                {
                    (type != "EDIT") ?
                    <FormControl mt={5} isRequired>
                        <FormLabel fontFamily={"Input-SemiBold"}>{"Saldo"}</FormLabel>
                        <Input
                            type="text"
                            onChange={HandleForm}
                            onBlur={HandleBlurForm}
                            onFocus={HandleFocusForm}
                            isReadOnly={type==="DETAIL" ? true:false}
                            value={displaybalanceFormat || ""}
                            name="balance"
                            textAlign={"left"}
                            autoComplete="off"
                            placeholder='Ingrese el saldo inicial'
                            
                        />
                    </FormControl>
                    :
                    null

                }


                {/* FIELD: notes */}
                <FormControl mt={5} >
                    <FormLabel fontFamily={"Input-SemiBold"}>{"Notas"}</FormLabel>

                    <Textarea 
                        value={newFlowcashType.notes || ""}
                        name="notes" 
                        onChange={HandleForm}
                        isReadOnly={type==="DETAIL" ? true:false}
                        placeholder='Proporciona la descripción de la caja.'
                    />

                </FormControl>

            
            </form>

          </ModalBody>

            <Divider mt={5}/>

          <ModalFooter>

            {
                type === "DETAIL" ?

                <Button colorScheme='blue' mr={3} onClick={() => {
                    closeFlowcashType();
                }}>
                    {"Cerrar"}
                </Button>
                :

                <Box>

                    <Button 
                        isDisabled={checkFormErrors.name || checkFormErrors.balance}
                        isLoading={inProcess}
                        colorScheme='blue' 
                        mr={3} 
                        onClick={HandleCreate}
                    >
                        {"Guardar"}
                    </Button>
                
                    <Button 
                        variant='solid' 
                        colorScheme='red' 
                        onClick={closeFlowcashType}
                    >
                        {"Cancelar"}
                    </Button>

                </Box>

            }
          
          
          </ModalFooter>

        </ModalContent>
      
      </Modal>
    </React.Fragment>
  )
}


OperationsFlowcashType.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    type: PropTypes.oneOf(["CREATE", "EDIT", "DETAIL"])
}

export default OperationsFlowcashType;