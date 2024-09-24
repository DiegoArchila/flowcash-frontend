//React
import { useEffect } from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { FlowcashTypeThunks } from "../../../../../store/slices/flowcash/flowcashType/FlowcashTypeThunks";

//Components
import DataManager from '../../../../../components/DataManager/DataManager'
import DataManagerBody from '../../../../../components/DataManager/DataManagerBody'

//Chakra UI
import {
    Tr,
    Td,
    Text,
    Center,
    Tag,
    TagLeftIcon,
    TagLabel,
    HStack,
    Box,
    useDisclosure
} from "@chakra-ui/react";

//Icons
import { MdAddBox } from "react-icons/md";
import { LiaCashRegisterSolid } from "react-icons/lia";
import { BsFillInfoSquareFill } from "react-icons/bs";


function FlowcashType() {

    // Redux
    const dispatch = useDispatch();

    const { rows: dataFlowcashType = [], isLoading: isLoadingFlowcashType } = useSelector(state => state.flowcashType);
    const { data: dataOperation = [] } = useSelector(state => state.operation);
    const { data: dataOperationType = [] } = useSelector(state => state.operationType);

    useEffect(() => {

        dispatch(FlowcashTypeThunks.getFlowcashType());

    }, [dispatch]);

    // Functions to displays operations over movements
    const {
        isOpen: isOpenCreateOperationType,
        onOpen: OnOpenCreateOperationType,
        onClose: onCloseCreateOperationType
    } = useDisclosure();

    //DataManager
    const configDataManager = {
        title: "Cajas",
        icon: <LiaCashRegisterSolid size={24} color='#FFFFFF' />,
        buttonTitle: "Crear nueva",
        buttonIcon: <MdAddBox size={24} color='#FFFFFF' />,
    }

    const HeadersDataManager = ["caja", "saldo", "acciones"];

    return (
        <DataManager config={configDataManager} isLoadingData={isLoadingFlowcashType} createFunction={OnOpenCreateOperationType}>
            <DataManagerBody headerTable={(dataFlowcashType.length > 0) ? HeadersDataManager : []}>

                {/* TABLE BODY */}
                {
                    dataFlowcashType.map((elementFlowcashType, i) => {
                        return (
                            <Tr key={i}>
                                {/* COLUMN: Name */}
                                <Td textAlign={"left"}>
                                    <Text fontFamily={"Parrafs-Prices"} color={"#2D3748"} fontSize={16}>
                                        {String(elementFlowcashType.name).toLocaleUpperCase()}
                                    </Text>
                                </Td>
                            </Tr>
                        )             
                    }) 
                }

            </DataManagerBody>

            {
                dataFlowcashType.length === 0 ?

                    <Center my={5} gap={3}>
                        <BsFillInfoSquareFill size={32} color={"#00BFFF"} /> Sin datos.
                    </Center>
                    :
                    null
            }

        </DataManager>
    )
}

FlowcashType.propTypes = {}

export default FlowcashType
