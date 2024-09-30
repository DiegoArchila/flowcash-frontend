//React
import { useEffect } from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { FlowcashTypeThunks } from "../../../../../store/slices/flowcash/flowcashType/FlowcashTypeThunks";
import { setTarget } from "../../../../../store/slices/flowcash/flowcashType/FlowcashType";

//Components
import DataManager from '../../../../../components/DataManager/DataManager'
import DataManagerBody from '../../../../../components/DataManager/DataManagerBody'

//Chakra UI
import {
    Tr,
    Td,
    Text,
    Center,
    HStack,
    Box,
    useDisclosure
} from "@chakra-ui/react";

//Icons
import { MdAddBox } from "react-icons/md";
import { LiaCashRegisterSolid } from "react-icons/lia";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";


//UTILSA
import { formatCurrencyCOP } from "../../../../../utils/formatCurrency";
import OperationsFlowcashType from "./components/OperationsFlowcashType";
import DeleteFlowcashType from "./components/DeleteFlowcashType";

function FlowcashType() {

    // Redux
    const dispatch = useDispatch();

    const { 
        data: dataFlowcashType = [], 
        isLoading: isLoadingFlowcashType,
        target
    } = useSelector(state => state.flowcashType);

    useEffect(() => {

        dispatch(FlowcashTypeThunks.getFlowcashType());

    }, [dispatch]);

    // Functions to displays operations over movements
    const {
        isOpen: isOpenCreateFlowcashType,
        onOpen: OnOpenCreateFlowcashType,
        onClose: onCloseCreateFlowcashType
    } = useDisclosure();

    const {
        isOpen: isOpenEditFlowcashType,
        onOpen: OnOpenEditFlowcashType,
        onClose: onCloseEditFlowcashType
    } = useDisclosure();

    const {
        isOpen: isOpenDetailFlowcashType,
        onOpen: OnOpenDetailFlowcashType,
        onClose: onCloseDetailFlowcashType
    } = useDisclosure();

    const {
        isOpen: isOpenDeleteFlowcashType,
        onOpen: OnOpenDeleteFlowcashType,
        onClose: onCloseDeleteFlowcashType
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
        <DataManager config={configDataManager} isLoadingData={isLoadingFlowcashType} createFunction={OnOpenCreateFlowcashType}>

            <OperationsFlowcashType 
                isOpen={isOpenCreateFlowcashType} 
                onClose={onCloseCreateFlowcashType}
                title={"Nueva caja"}
                icon={<MdAddBox size={32} color='#FFFFFF' />}
                type={"CREATE"}
            />

            <OperationsFlowcashType 
                isOpen={isOpenDetailFlowcashType} 
                onClose={onCloseDetailFlowcashType}
                title={"Detalle caja"}
                icon={<IoIosInformationCircleOutline size={32} color='#FFFFFF' />}
                type={"DETAIL"}
            />

            <OperationsFlowcashType 
                isOpen={isOpenEditFlowcashType} 
                onClose={onCloseEditFlowcashType}
                title={"Editar caja"}
                icon={<FaRegEdit size={32} color='#FFFFFF' />}
                type={"EDIT"}
            />

            <DeleteFlowcashType 
                isOpen={isOpenDeleteFlowcashType}
                onClose={onCloseDeleteFlowcashType}
            />

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

                                 {/* COLUMN: balance */}
                                 <Td textAlign={"left"}>
                                    <Text fontFamily={"Parrafs-Prices"} color={"#2D3748"} fontSize={16} align={"right"}>
                                        {formatCurrencyCOP(elementFlowcashType.balance)}
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
                                                    dispatch(setTarget(elementFlowcashType.id));
                                                    OnOpenDetailFlowcashType();
                                                }}
                                            >
                                                <IoIosInformationCircleOutline size={22} color={"#007FFF"} />
                                            </Box>

                                            {/* COLUMN: Edit */}
                                            <Box cursor={"pointer"}
                                                onClick={() => {
                                                    dispatch(setTarget(elementFlowcashType.id));
                                                    OnOpenEditFlowcashType();
                                                }}
                                            >
                                                <FaRegEdit size={22} color={"#7BA05B"} />
                                            </Box>

                                            {/* COLUMN: Delete */}
                                            <Box cursor={"pointer"}
                                                onClick={() => {
                                                    dispatch(setTarget(elementFlowcashType.id));
                                                    OnOpenDeleteFlowcashType();
                                                }}
                                            >
                                                <MdOutlineDeleteForever size={26} color={"#E23D28"} />
                                            </Box>
                                        </HStack>
                                    </Center>
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
