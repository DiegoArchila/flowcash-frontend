import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
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

import { formatCurrencyCOP } from "../../../../../utils/formatCurrency";
import { FlowcashTypeThunks } from "../../../../../store/slices/flowcash/FlowcashTypeThunks";
import { errorsClear } from "../../../../../store/slices/flowcash/FlowcashType";

export default function NewFlowcashType({ isOpen, onClose }) {

    // Redux
  const dispatch = useDispatch();
  const { isCreating, errors } = useSelector(state => state.flowcashType);

  
    console.log("Esta creando?: ", isCreating);

    /**
     * States Form
     */
    const [newFlowcash, setnewFlowcash] = useState({
        name: "",
        balance: 0,
        notes: ""
    });

     /**
     * Checks the error in the state newFlowcash
     */
     const checkFormErrors = {
        name: newFlowcash.name === "" || newFlowcash.name === null,
        balance: newFlowcash.balance === "" || newFlowcash.balance === null
    }

    /**
     * Display the states with format, on this case only the field: balance
     */
    const [displaybalanceFormat, setdisplaybalanceFormat] = useState("");
    
    /**
     * Handle form methods
     */
    const HandleForm = (e) => {
        const { name, value } = e.target;

        // is errors
        if (errors) dispatch(errorsClear());

        setnewFlowcash({
            ...newFlowcash,
            [name]: value
        });
        
        if (name=="balance") {
                setdisplaybalanceFormat(value);
        }   
    }

    const HandleBlurForm = () => {
        if (newFlowcash.balance!=null || newFlowcash.balance!="") {
            setdisplaybalanceFormat(formatCurrencyCOP(newFlowcash.balance));
        } 
    }

    const HandleFocusForm = () => {
        
        setdisplaybalanceFormat(newFlowcash.balance);
        
    }

    const HandleCreate= () => {
        dispatch(FlowcashTypeThunks.createFlowcashType(newFlowcash));
    }



    return (
        <>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} >
                <ModalOverlay bg={"blackAlpha.300"} backdropFilter="blur(10px) hue-rotate(90deg)"/>
                <ModalContent>
                    <ModalHeader bgColor={"#6c584c"} color={"white"}>Nueva Caja</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6} mt={3}>
                        
                        {/* Error Message */}
                        <Alert status='error' mb={3} display={!(errors===null) ? "block" : "none"}>
                            <HStack>
                                <AlertIcon />
                                <AlertTitle>¡Ha ocurrido un error!</AlertTitle>
                            </HStack>
                            <AlertDescription>{(errors) ? errors[0].message : ""}</AlertDescription>                            
                        </Alert>
                        
                        <form>

                            {/* FIELD: name */}
                            <FormControl isRequired isInvalid={checkFormErrors.name} >
                                <FormLabel fontFamily={"Input-SemiBold"}>{"Nombre"}</FormLabel>
                                <Input type="text" value={[newFlowcash.name]} name="name" onChange={HandleForm} maxLength={64}/>
                                {
                                    (checkFormErrors.name) ?
                                    <FormHelperText>{"Por favor ingresa el nombre de la nueva caja a registrar."}</FormHelperText>
                                    :
                                    undefined
                                }                                
                            </FormControl>

                            {/* FIELD: balance */}
                            <FormControl isRequired mt={5} isInvalid={checkFormErrors.balance}>
                                <FormLabel fontFamily={"Input-SemiBold"}>{"Balance"}</FormLabel>
                                <Input 
                                    type="text" 
                                    value={displaybalanceFormat} 
                                    name="balance" 
                                    onChange={HandleForm}
                                    onBlur={HandleBlurForm}
                                    onFocus={HandleFocusForm}
                                    autoComplete="off"
                                />

                                {
                                    (checkFormErrors.balance) ?
                                    <FormHelperText>{"Ingresa el saldo actual con el cual cuenta esta caja al momento de registrarla. Si la caja esta vacía, solo ingresa cero(0)."}</FormHelperText>
                                    :
                                    undefined
                                }
                                
                            </FormControl>

                            {/* FIELD: notes */}
                            <FormControl mt={5}>
                                <FormLabel fontFamily={"Input-SemiBold"}>{"Descripción o notas"}</FormLabel>
                                <Textarea value={[newFlowcash.notes]} name="notes" onChange={HandleForm} />
                                <FormHelperText>{"Aquí puedes explicar los detalles de esta caja, o dejar notas. Este campo es opcional."}</FormHelperText>
                            </FormControl>

                        </form>
                    </ModalBody>

                    <ModalFooter>
                        <Button 
                            colorScheme='blue' 
                            mr={3}
                            isDisabled={(checkFormErrors.balance || checkFormErrors.name)}
                            isLoading={isCreating}
                            onClick={()=>{
                                HandleCreate();
                            }}
                        >
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
