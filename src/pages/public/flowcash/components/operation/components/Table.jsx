
import { useDispatch, useSelector } from "react-redux";
import {
    Box,
    Heading,
    HStack,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Center,
    Tag,
    TagLabel,
    TagLeftIcon,
    Text
} from '@chakra-ui/react'

//ICONS
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { RiAddLargeLine } from "react-icons/ri";
import { IoMdRemove } from "react-icons/io";
import { IoIosInformationCircleOutline } from "react-icons/io";

import { setTarget } from "../../../../../../store/slices/flowcash/operation/Operation";


export default function TableOperation({onOpenDetail, onOpenEdit, onOpenDelete}) {

    // Redux
    const dispatch = useDispatch();
    const { data = []  } = useSelector(state => state.operation);
    const { data: dataOperationType } = useSelector(state => state.operationType);

    return (
        <TableContainer
            maxHeight={"246px"}
            paddingBottom={3}
            overflowX={"auto"}
            overflowY={"auto"}
        >
            <Table
                size={"sm"}
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
                                    <Td textAlign={"left"}>
                                        <Text fontFamily={"Parrafs-light"} color={"#242124"} fontSize={14}>
                                            {String(element.type).toLocaleUpperCase()}
                                        </Text>
                                    </Td>
                                    
                                      
                                    {/* COLUMN: type */}
                                    {dataOperationType.map((e, i) => {
                                        if (e.id == element.operation_type_id) {
                                            let color = "#BF4F51CC";
                                            let fontColor = "#FFFFFF";

                                            if (e.is_sum) {
                                                color = "#7BA05B";
                                            }

                                            return (<Td key={e.type + i} textAlign={"center"}>
                                                <Tag size={"sm"} bgColor={color} variant={"outline"} color={fontColor}>
                                                    <TagLeftIcon as={(e.is_sum) ? RiAddLargeLine : IoMdRemove} />
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
                                                    <IoIosInformationCircleOutline size={22} color={"#007FFF"} />
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
    )
}
