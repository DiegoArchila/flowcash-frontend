//React
import { useEffect } from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";

import { OperationThunks } from "../../../../../store/slices/flowcash/operation/OperationThunks";
import { setTarget } from "../../../../../store/slices/flowcash/operation/Operation";


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
import { PiMathOperationsFill } from "react-icons/pi";
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
import OperationOperations from "./components/OperationOperations";
import OperationDelete from "./components/OperationDelete";
import RoleFilter from "../../../../../components/RoleFilter/RoleFilter";

export default function Operation() {

    // Redux
    const dispatch = useDispatch();

    const {
        data = [],
        isLoading
    } = useSelector(state => state.operation);

    const {
        data: dataOperationType = [],
    } = useSelector(state => state.operationType);


    useEffect(() => {

        dispatch(OperationThunks.getOperations());

    }, [dispatch]);

    // Functions to displays operations over movements
    const {
        isOpen: isOpenCreateOperation,
        onOpen: OnOpenCreateOperation,
        onClose: onCloseCreateOperation
    } = useDisclosure();

    const {
        isOpen: isOpenEditOperation,
        onOpen: OnOpenEditOperation,
        onClose: onCloseEditOperation
    } = useDisclosure();

    const {
        isOpen: isOpenDetailOperation,
        onOpen: OnOpenDetailOperation,
        onClose: onCloseDetailOperation
    } = useDisclosure();

    const {
        isOpen: isOpenDeleteOperation,
        onOpen: OnOpenDeleteOperation,
        onClose: onCloseDeleteOperation
    } = useDisclosure();

    //DataManager
    const configDataManager = {
        title: "Operaciones",
        icon: <PiMathOperationsFill size={24} color='#4a5568' />,
        buttonTitle: "Crear nueva",
        buttonIcon: <MdAddBox size={24} color='#4a5568' />,
        colorSchemeButton: "teal",
        variantButton: "outline",
    }

    const HeadersDataManager = ["nombre", "tipo", "acciones"];

    return (
        <DataManager config={configDataManager} isLoadingData={isLoading} createFunction={OnOpenCreateOperation} >

            {/* COMPONENT TO CREATE A NEW MOVEMENT */}
            <OperationOperations
                isOpen={isOpenCreateOperation}
                onClose={onCloseCreateOperation}
                title={"Nueva operación"}
                icon={<MdAddBox size={32} color='#3182ce' />}
                type={"CREATE"}
            />

            {/* COMPONENT TO EDIT THE MOVEMENT */}
            <OperationOperations
                isOpen={isOpenEditOperation}
                onClose={onCloseEditOperation}
                title={"Editar operación"}
                icon={<FaRegEdit size={32} color='#3182ce' />}
                type={"EDIT"}
            />

            {/* COMPONENT TO VIEW DETAIL */}
            <OperationOperations
                isOpen={isOpenDetailOperation}
                onClose={onCloseDetailOperation}
                title={"Detalle operación"}
                icon={<IoIosInformationCircleOutline size={32} color='#3182ce' />}
                type={"DETAIL"}
            />

            {/* COMPONENT TO DELETE OPERATION */}
            <OperationDelete
                isOpen={isOpenDeleteOperation}
                onClose={onCloseDeleteOperation}
            />


            <DataManagerBody headerTable={(data.length > 0) ? HeadersDataManager : []}>

                {/* TABLE BODY */}

                {data.map((elementOperation, i) => {

                    return (
                        <Tr key={i}>

                            {/* COLUMN: type */}
                            <Td textAlign={"left"}>
                                <Text
                                    fontFamily={"label"}
                                    color={"text.paragraphs"}
                                    fontSize={"sm"}
                                >
                                    {String(elementOperation.type).toLocaleUpperCase()}
                                </Text>
                            </Td>

                            {/* COLUMN: OperationType */}
                            <Td textAlign={"center"}>
                                <Text
                                    fontFamily={"label"}
                                    color={"text.paragraphs"}
                                    fontSize={"sm"}
                                >
                                    {
                                        dataOperationType.map(elementOperationType => {

                                            if (elementOperation.operation_type_id === elementOperationType.id) {

                                                const color = elementOperationType.is_sum ? "#7BA05B" : "#BF4F51CC";
                                                const fontColor = "#FFFFFF";

                                                return (
                                                    <Tag key={elementOperation.type + i + elementOperationType.type} size={"sm"} bgColor={color} variant={"outline"} color={fontColor}>
                                                        <TagLeftIcon as={(elementOperationType.is_sum) ? RiAddLargeLine : IoMdRemove} />
                                                        <TagLabel
                                                            fontSize={"xs"}
                                                            fontFamily={"button"}
                                                        >{String(elementOperationType.type).toLocaleUpperCase()}</TagLabel>
                                                    </Tag>
                                                );
                                            }
                                        })
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
                                                dispatch(setTarget(elementOperation.id));
                                                OnOpenDetailOperation();
                                            }}
                                        >
                                            <IoIosInformationCircleOutline size={22} color={"#007FFF"} />
                                        </Box>

                                        <RoleFilter roles={["admin"]}>

                                            {/* COLUMN: Edit */}
                                            <Box cursor={"pointer"}
                                                onClick={() => {
                                                    dispatch(setTarget(elementOperation.id));
                                                    OnOpenEditOperation();
                                                }}
                                            >
                                                <FaRegEdit size={22} color={"#7BA05B"} />
                                            </Box>

                                            {/* COLUMN: Delete */}
                                            <Box cursor={"pointer"}
                                                onClick={() => {
                                                    dispatch(setTarget(elementOperation.id));
                                                    OnOpenDeleteOperation();
                                                }}
                                            >
                                                <MdOutlineDeleteForever size={26} color={"#E23D28"} />
                                            </Box>
                                        </RoleFilter>
                                    </HStack>
                                </Center>
                            </Td>

                        </Tr>)
                })
                }
            </DataManagerBody>
            {
                data.length === 0 ?

                    <Center my={5} gap={3}>
                        <BsFillInfoSquareFill size={32} color={"#00BFFF"} /> Sin datos.
                    </Center>
                    :
                    null
            }
        </DataManager>
    )
}