//React
import { useEffect } from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { FlowcashTypeThunks } from "../../../../../store/slices/flowcash/flowcashType/FlowcashTypeThunks";
import { setTarget } from "../../../../../store/slices/flowcash/flowcashType/FlowcashType";

//Components
import DataManager from '../../../../../components/DataManager/DataManager'
import DataManagerBody from '../../../../../components/DataManager/DataManagerBody'
import OperationsFlowcashType from "./components/OperationsFlowcashType";
import DeleteFlowcashType from "./components/DeleteFlowcashType";

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


//UTILS
import { formatCurrencyCOP } from "../../../../../utils/formatCurrency";
import RoleFilter from "../../../../../components/RoleFilter/RoleFilter";

function FlowcashType() {

    // Redux
    const dispatch = useDispatch();

    const {
        data: dataFlowcashType = [],
        isLoading: isLoadingFlowcashType
    } = useSelector(state => state.flowcashType);

    const {
        data: dataReportsFlowcash = []
    } = useSelector(state => state.reportsFlowcash);

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

    const HeadersDataManager = ["caja", "saldo actual", "acciones"];

    return (
        <DataManager config={configDataManager} isLoadingData={isLoadingFlowcashType} createFunction={OnOpenCreateFlowcashType}>

            <OperationsFlowcashType
                isOpen={isOpenCreateFlowcashType}
                onClose={onCloseCreateFlowcashType}
                title={"Nueva caja"}
                icon={<MdAddBox size={32} color='#3182ce' />}
                type={"CREATE"}
            />

            <OperationsFlowcashType
                isOpen={isOpenDetailFlowcashType}
                onClose={onCloseDetailFlowcashType}
                title={"Detalle caja"}
                icon={<IoIosInformationCircleOutline size={32} color='#3182ce' />}
                type={"DETAIL"}
            />

            <OperationsFlowcashType
                isOpen={isOpenEditFlowcashType}
                onClose={onCloseEditFlowcashType}
                title={"Editar caja"}
                icon={<FaRegEdit size={32} color='#3182ce' />}
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
                                    <Text fontFamily={"label"} color={"text.paragraphs"} fontSize={"sm"}>
                                        { String(elementFlowcashType.name).toLocaleUpperCase()  }
                                    </Text>
                                </Td>

                                {/* COLUMN: balance */}
                                <Td textAlign={"left"}>
                                    <Text fontFamily={"label"} color={"text.paragraphs"} fontSize={"md"} align={"right"}>
                                        {
                                            formatCurrencyCOP(
                                                Number.parseFloat(dataReportsFlowcash
                                                    .filter(report => report.flowcashtypeid === elementFlowcashType.id)
                                                    .reduce((Total, report) => {
                                                        return report.is_sum
                                                            ? Total + Number(report.total)
                                                            : Total - Number(report.total);
                                                    }, 0)) + (Number.parseFloat(elementFlowcashType.balance) || 0)
                                            )
                                        }
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

                                            <RoleFilter roles={["admin"]}>
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
                                            </RoleFilter>
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
