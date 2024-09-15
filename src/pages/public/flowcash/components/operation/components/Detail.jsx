import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Text,
    Tag,
    TagLabel,
    TagLeftIcon
} from "@chakra-ui/react";

import { setTarget } from "../../../../../../store/slices/flowcash/operation/Operation";


import { RiAddLargeLine } from "react-icons/ri";
import { IoMdRemove } from "react-icons/io";


function Detail({ isOpen, onClose }) {
    

    // Redux
    const dispatch = useDispatch();
    const { data, target } = useSelector(state => state.operation);
    const { data: dataOperationType } = useSelector(state => state.operationType);
    const [isClosed, setClosed] = useState(null);

    useEffect( () => {
        if (isClosed) {
            dispatch(setTarget(null));
        }
  
      }, [ dispatch,isClosed]);

    return (
        <>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} >
                <ModalOverlay bg={"blackAlpha.300"} />
                <ModalContent>
                    <ModalHeader bgColor={"#276749"} color={"white"}>{String(data[target]?.type).toUpperCase()}</ModalHeader>
                    <ModalBody pb={6} mt={3}>

                        {(data[target]?.notes) ?

                            <>
                                <Text fontFamily={"Input-SemiBold"}>
                                    {"Descripción:"}
                                </Text>

                                <Text fontFamily={"Parrafs-light"} pb={2}>
                                    {data[target]?.notes}
                                </Text>
                            </> :
                            ""
                        }

                        {(data[target]?.operation_type_id) ?

                            <>
                                <Text fontFamily={"Input-SemiBold"}>
                                    Tipo de operación: 
                                </Text>

                                <Text fontFamily={"Parrafs-light"} pb={2}>
                                    {dataOperationType.map((e,i)=>{
                                        if (e.id===data[target].operation_type_id) {

                                            let color = "#BF4F51CC";
                                            let fontColor = "#FFFFFF";

                                            if (e.is_sum) {
                                                color = "#7BA05B";
                                            }
                                            // String(e.type).toLocaleUpperCase()

                                            return (
                                                    <Tag key={e.type+i} size={"lg"} bgColor={color} variant={"outline"} color={fontColor}>
                                                        <TagLeftIcon as={(e.is_sum) ? RiAddLargeLine : IoMdRemove} />
                                                        <TagLabel fontSize={16} >{String(e.type).toLocaleUpperCase()}</TagLabel>
                                                    </Tag>
                                                );

                                        }})
                                    }
                                </Text>
                            </> :
                            ""
                        }



                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            onClick={() => {
                                onClose();
                                setClosed(true);
                            }}>{"Cerrar"}</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

Detail.prototype = {
    isOpen: PropTypes.func.isRequired,
    onclose: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired
}

export default Detail;