import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Box,
    Heading,
    HStack,
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Spinner,
    useDisclosure,
    Center,
    Tag,
    TagLabel,
    TagLeftIcon,
    TagRightIcon,
} from '@chakra-ui/react'

//ICONS
import { PiMathOperationsFill } from "react-icons/pi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaRegEdit, FaRegEye } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { FaTurnDown, FaTurnUp } from "react-icons/fa6";

import { OperationThunks } from '../../../../../store/slices/flowcash/OperationThunks';
import NewFlowcashType from './components/Create';
import DeleteFlowcash from "./components/Delete";
import { setTarget } from "../../../../../store/slices/flowcash/FlowcashType";
import Detail from "./components/Detail";
import Edit from "./components/Edit";


function showFlowcash(
    data, //Rows in the state
    onOpenDelete,//Reference to windows delete flowcashtype
    onOpenDetail, //Reference to show details flowcashtype
    target, // Target to any event: delete, detail or delete,
    onOpenEdit, //Reference to windows Edit flowcashtype
    dispatch,
    dataOperationType //Array of data's OperationType
    ) {


    return (

        <TableContainer
            maxHeight={"246px"}
            paddingBottom={3}
            overflowX={"auto"}
            overflowY={"auto"}
        >
            <Table
                size={"sm"}
                variant={"simple"}

            >

                {/* TABLE HEADER */}
                <Thead>
                    <Tr>
                        <Th>
                            <Heading
                                as={"h5"}
                                size={"sx"}
                                textAlign={'center'}
                            >
                                {"nombre"}
                            </Heading>
                        </Th>

                        <Th isNumeric>
                            <Heading
                                as={"h5"}
                                size={"sx"}
                                textAlign={'center'}
                            >
                                {"tipo"}
                            </Heading>
                        </Th>
                        <Th>
                            <Heading
                                as={"h5"}
                                size={"sx"}
                                textAlign={'center'}
                            >
                                {"acciones"}
                            </Heading>
                        </Th>

                    </Tr>
                </Thead>

                {/* TABLE BODY */}

                <Tbody>
                    {
                        data.map((element, i) => {
                            return (
                                <Tr key={i}>

                                    {/* COLUMN: name */}
                                    <Td fontFamily={"Parrafs-light"}>{String(element.type).toLocaleUpperCase()}</Td>

                                    {/* COLUMN: type */}
                                    {dataOperationType.map((e,i)=>{
                                        if (e.id==element.operation_type_id) {
                                            let color="#BF4F51CC";
                                            let fontColor="#FFFFFF";
                                            
                                            if (e.is_sum) {
                                                color="#7BA05B";
                                            }

                                            return (<Td key={e.type+i} textAlign={"center"}>
                                                        <Tag size={"sm"} bgColor={color} variant={"outline"} color={fontColor}>
                                                            <TagLeftIcon as={(e.is_sum) ? FaTurnDown : FaTurnUp} />
                                                            <TagLabel fontSize={11} >{String(e.type).toLocaleUpperCase()}</TagLabel>
                                                        </Tag>
                                                    </Td>);
                                            
                                        }
                                    })}                                    


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
                                                        dispatch(setTarget(i));
                                                        onOpenDetail();
                                                    }}
                                                >
                                                    <FaRegEye size={22} color={"#007FFF"} />
                                                </Box>

                                                {/* COLUMN: Edit */}
                                                <Box cursor={"pointer"}
                                                    onClick={() => {
                                                        dispatch(setTarget(i));
                                                        onOpenEdit();
                                                    }}
                                                >
                                                    <FaRegEdit size={22} color={"#7BA05B"} />
                                                </Box>

                                                {/* COLUMN: Delete */}
                                                <Box cursor={"pointer"}
                                                    onClick={() => {
                                                        dispatch(setTarget(i));
                                                        onOpenDelete();
                                                    }}
                                                >
                                                    <MdOutlineDeleteForever size={26} color={"#E23D28"} />
                                                </Box>
                                            </HStack>
                                        </Center>
                                    </Td>
                                </Tr>
                            );
                        })
                    }
                </Tbody>

            </Table>
        </TableContainer>
    );
}

function loading() {
    return (
        <Center mt={3} mb={3}>
            <Spinner size={"xl"} />
        </Center>
    );
}


export default function Operation() {

    //modal handle
    const {
        isOpen: isOpenNew,
        onOpen: onOpenNew,
        onClose: onCloseNew
    } = useDisclosure();

    const {
        isOpen: isOpenDetail,
        onOpen: onOpenDetail,
        onClose: onCloseDetail
    } = useDisclosure();

    const {
        isOpen: isOpenEdit,
        onOpen: onOpenEdit,
        onClose: onCloseEdit
    } = useDisclosure();

    //AlertDialog
    const {
        isOpen: isOpenDelete,
        onOpen: onOpenDelete,
        onClose: onCloseDelete
    } = useDisclosure();

    // Redux
    const dispatch = useDispatch();
    const { data = [], isLoading, target } = useSelector(state => state.operation);
    const { data: dataOperationType } = useSelector(state => state.operationType);

    useEffect(() => {
        dispatch(OperationThunks.getOperations());
    }, [dispatch]);


    return (
        <Box
            width={"95%"}
            bgColor={'#EDF2F7'}
            borderTopRadius="md"
            mt={3} pb={3}
            border={"1px"}
            borderColor={"#69DC9E"}
            maxHeight={"305px"}
        >

            {/* HEADER */}

            <HStack
                pt={1} w={"100%"}
                justifyContent={"space-between"}
                px={2} bgColor={"#BA5A31"}
                borderTopRadius="md"
            >

                <HStack pb={1}>
                    <Box>
                        <PiMathOperationsFill size={32} color='#FFFFFF' />
                    </Box>

                    <Box borderRadius={2}>
                        <Heading
                            textAlign={'center'}
                            fontFamily={"Input-SemiBold"}
                            color={"#FFFFFF"}
                            as={"h3"}
                            size={"md"}
                        >
                            {"operaciones".toLocaleUpperCase()}
                        </Heading>
                    </Box>
                </HStack>

                <Button
                    colorScheme='whiteAlpha'
                    size={"xs"}
                    color={"#FFFFFF"}
                    variant={"ghost"}
                    onClick={onOpenNew}
                >
                    Nueva
                    <IoIosAdd size={24} />
                </Button>

                <NewFlowcashType isOpen={isOpenNew} onClose={onCloseNew} />

            </HStack>

            {/* BODY */}

            {
                isLoading ?
                    <>
                        <Center>
                            {loading()}
                        </Center>

                    </>
                    :
                    <>
                        {/* 
              target is to set the ID in the store for delete in the DB
            */}
                        {showFlowcash(
                            data,
                            onOpenDelete,
                            onOpenDetail,
                            target,
                            onOpenEdit,
                            dispatch,
                            dataOperationType
                        )
                        }

                        {/* Windows to show when the action id dispatch or deploy */}
                        <DeleteFlowcash isOpen={isOpenDelete} onClose={onCloseDelete} />
                        <Detail isOpen={isOpenDetail} onClose={onCloseDetail} />
                        <Edit isOpenEdit={isOpenEdit} onCloseEdit={onCloseEdit} />

                    </>

            }

        </Box>
    )
}