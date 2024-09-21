//React
import { useEffect } from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { FlowcashThunks } from "../../../../../store/slices/flowcash/FlowcashThunks" 
import { OperationTypeThunks } from "../../../../../store/slices/flowcash/operationType/OperationTypeThunks";


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
import { PiArrowsDownUpBold } from "react-icons/pi";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { IoMdRemove } from "react-icons/io";
import { RiAddLargeLine } from "react-icons/ri";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdAddBox } from "react-icons/md";

//Components
import DataManager from "../../../../../components/DataManager/DataManager";
import DataManagerBody from "../../../../../components/DataManager/DataManagerBody";

//Utils
import { formatDate } from "../../../../../utils/formatDate";
import { formatCurrencyCOP } from "../../../../../utils/formatCurrency";
import CreateFlowcash from "./components/CreateFlowcash";

export default function Movements() {

    // Redux
    const dispatch = useDispatch();

    const { data: dataFlowcash = [], isLoading: isLoadingFlowcash } = useSelector(state => state.flowcash);
    const { rows: dataFlowcashType = [] } = useSelector(state => state.flowcashType);
    const { data: dataOperation = [], isLoading: isLoadingOperation } = useSelector(state => state.operation);
    const { data: dataOperationType = [] } = useSelector(state => state.operationType);

    useEffect(() => {

        dispatch(OperationTypeThunks.getOperationsType());
        dispatch(FlowcashThunks.getFlowcash());

    }, [dispatch]);
 
     // Functions
    const { 
        isOpen: isOpenCreateTransaction, 
        onOpen : OnOpenCreateTransaction, 
        onClose: onCloseCreateTransaction 
    } = useDisclosure();

    //DataManager
    const configDataManager = {
        title: "Movimientos",
        icon: <PiArrowsDownUpBold size={24} color='#FFFFFF' />,
        buttonTitle:"Crear nuevo",
        buttonIcon: <MdAddBox size={24} color='#FFFFFF' />,
    }
    const HeadersDataManager = ["hora","caja","operación","Descripción","valor", "acciones"];

return (
    <DataManager config={configDataManager} isLoadingData={isLoadingFlowcash} createFunction={OnOpenCreateTransaction} >
        <CreateFlowcash isOpen={isOpenCreateTransaction} onClose={onCloseCreateTransaction}/>
        
        <DataManagerBody headerTable={(dataFlowcash.length > 0) ? HeadersDataManager : []}>

            {/* TABLE BODY */}

            {dataFlowcash.length > 0 ?
                dataFlowcash.map((elementFlowcash, i) => {

                    return (
                        <Tr key={i}>

                            {/* COLUMN: Hora */}
                            <Td textAlign={"center"}>
                                <Text fontFamily={"Parrafs-Prices"} color={"#2D3748"} fontSize={16}>
                                    {formatDate.getDateFormatedLarge(elementFlowcash.datetime)}
                                </Text>
                            </Td>

                            {/* COLUMN: FlowcashType */}
                            <Td textAlign={"center"}>
                                <Text fontFamily={"Parrafs-Prices"} color={"#2D3748"} fontSize={14}>
                                    {
                                        dataFlowcashType.map(elementFlowcashType => {
                                            if (elementFlowcash.flowcash_type_id === elementFlowcashType.id) {
                                                return String(elementFlowcashType.name).toLocaleUpperCase();
                                            }
                                        })

                                    }
                                </Text>
                            </Td>

                            {/* COLUMN: Operation */}
                            <Td textAlign={"center"}>
                                <Text fontFamily={"Parrafs-Prices"} color={"#2D3748"} fontSize={13}>
                                    {
                                        dataOperation.map(elementOperation => {
                                            
                                            if (elementFlowcash.operation_id === elementOperation.id) {

                                                const res = dataOperationType.length === 0 ? null : dataOperationType.find(elementOperationType => 
                                                    elementOperation.operation_type_id === elementOperationType.id);

                                                if (res===null) {
                                                    return null;
                                                }

                                                const color = res.is_sum ? "#7BA05B" : "#BF4F51CC";
                                                const fontColor = "#FFFFFF";
                                                
                                                return (
                                                    <Tag key={elementFlowcash+i+elementOperation} size={"sm"} bgColor={color} variant={"outline"} color={fontColor}>
                                                        <TagLeftIcon as={(res.is_sum) ? RiAddLargeLine : IoMdRemove} />
                                                        <TagLabel fontSize={11} >{String(elementOperation.type).toLocaleUpperCase()}</TagLabel>
                                                    </Tag>
                                                );
                                            }
                                        })
                                    }
                                </Text>
                            </Td>

                            {/* COLUMN: Description */}
                            <Td textAlign={"left"}>
                                <Text fontFamily={"Parrafs-Prices"} color={"#2D3748"} fontSize={16}>
                                    {elementFlowcash.description}
                                </Text>
                            </Td>

                            {/* COLUMN: Valor */}
                            <Td textAlign={"right"}>
                                <Text fontFamily={"Parrafs-Prices"} color={"#2D3748"} fontSize={16}>
                                    {formatCurrencyCOP(elementFlowcash.value)}
                                </Text>
                            </Td>

                            {/* COLUMN: Actions */}
                            <Td textAlign={"center"}>
                                <Center>
                                    <HStack
                                        alignContent={"space-between"}
                                        alignItems={"center"}
                                        gap={5}
                                    >

                                        {/* Open Detail Flowcash */}
                                        <Box cursor={"pointer"}
                                            onClick={() => {
                                                
                                            }}
                                        >
                                            <IoIosInformationCircleOutline size={22} color={"#007FFF"} />
                                        </Box>

                                        {/* COLUMN: Edit */}
                                        <Box cursor={"pointer"}
                                            onClick={() => {
                                                
                                            }}
                                        >
                                            <FaRegEdit size={22} color={"#7BA05B"} />
                                        </Box>

                                        {/* COLUMN: Delete */}
                                        <Box cursor={"pointer"}
                                            onClick={() => {
                                                
                                            }}
                                        >
                                            <MdOutlineDeleteForever size={26} color={"#E23D28"} />
                                        </Box>
                                    </HStack>
                                </Center>
                            </Td>

                        </Tr>)
                })
                :
                <Center my={5} gap={3}>
                    <BsFillInfoSquareFill size={32} color={"#00BFFF"} /> Sin datos.
                </Center>
            }

        </DataManagerBody>
    </DataManager>
)
}