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
    Text

} from "@chakra-ui/react";

import { formatCurrencyCOP } from "../../../../../../utils/formatCurrency";
import { formatDate } from "../../../../../../utils/formatDate";
import { setTarget } from "../../../../../../store/slices/flowcash/Operation";

function Detail({ isOpen, onClose }) {

    // Redux
    const dispatch = useDispatch();
    const { rows, target } = useSelector(state => state.flowcashType);

    return (
        <>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} >
                <ModalOverlay bg={"blackAlpha.300"} />
                <ModalContent>
                    <ModalHeader bgColor={"#276749"} color={"white"}>{String(rows[target]?.name).toUpperCase()}</ModalHeader>
                    <ModalBody pb={6} mt={3}>

                        {(rows[target]?.notes) ?

                            <>
                                <Text fontFamily={"Input-SemiBold"}>
                                    {"Descripción:"}
                                </Text>

                                <Text fontFamily={"Parrafs-light"} pb={2}>
                                    {rows[target]?.notes}
                                </Text>
                            </> :
                            ""
                        }

                        {(rows[target]?.balance) ?

                            <>
                                <Text fontFamily={"Input-SemiBold"}>
                                    Última Actualización:
                                </Text>

                                <Text fontFamily={"Parrafs-light"} pb={2}>
                                    {formatDate.getDateFormatedLarge(rows[target]?.datetime)}
                                </Text>
                            </> :
                            ""
                        }

                        {(rows[target]?.balance) ?

                            <>
                                <Text fontFamily={"Input-SemiBold"}>
                                    Balance:
                                </Text>

                                <Text fontFamily={"Parrafs-light"}>
                                    {formatCurrencyCOP(rows[target]?.balance)}
                                </Text>
                            </> :
                            ""
                        }


                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            onClick={() => {
                                dispatch(setTarget(null));
                                onClose();
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