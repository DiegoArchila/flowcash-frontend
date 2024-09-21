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
    FormErrorMessage,
    FormHelperText,
    Input,
 } from "@chakra-ui/react";

 import { useState } from "react";

function ManualClose() {
    
  }

export default function NewFlowcashType({isOpen, onClose}) {

    const [newFlowcash, setnewFlowcash] = useState({
        name: null,
        balance: 0,
        notes: null
    })

   const HandleForm = (e) =>{
        console.log(e.tartget.value)
        setnewFlowcash({
            ...[e.tartget.value]
        })
   }
  
    return (
      <>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader bgColor={"gray.800"} color={"white"}>Nueva Caja</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6} mt={3}>
              <form>
                <FormControl isRequired>
                    <FormLabel>{"Nombre"}</FormLabel>
                    <Input type="text" value={[newFlowcash.name]} onChange={HandleForm(e)}/>
                    <FormHelperText>{"Por favor ingresa el nombre de la nueva caja a registrar"}</FormHelperText>
                </FormControl>

              </form>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}
