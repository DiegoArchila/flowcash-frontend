
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Box,
    Heading,
    HStack,
    Button,
    Spinner,
    useDisclosure,
    Center,
} from '@chakra-ui/react'

//ICONS
import { PiMathOperationsFill } from "react-icons/pi";
import { IoIosAdd } from "react-icons/io";
import Create from './components/Create';
import DeleteFlowcash from "./components/Delete";
import Detail from "./components/Detail";
import Edit from "./components/Edit";
import TableOperation from "./components/Table";
import { OperationThunks } from "../../../../../store/slices/flowcash/OperationThunks";
import { clearTarget } from "../../../../../store/slices/flowcash/Operation";

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
    const { isLoading, isDone } = useSelector(state => state.operation);
    // Redux
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(OperationThunks.getOperations());

        if (isDone) {
            onCloseDetail();
            onCloseDelete();
            onCloseEdit();
            dispatch(clearTarget());
        }

    }, [dispatch, isDone]);

    return (
        <Box
            width={"95%"}
            bgColor={'#FFFFFF'}
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

                <Create isOpen={isOpenNew} onClose={onCloseNew} />

            </HStack>

            {/* BODY */}

            {
                isLoading ?
                    <>
                        <Center mt={3} mb={3}>
                            <Spinner size={"xl"} />
                        </Center>
                    </>
                    :
                    <>
                        {/*target is to set the ID in the store for delete in the DB*/}
                        
                        <TableOperation onOpenDelete={onOpenDelete} onOpenDetail={onOpenDetail} onOpenEdit={onOpenEdit} />

                        {/* Windows to show when the action id dispatch or deploy */}
                        <DeleteFlowcash isOpen={isOpenDelete} onClose={onCloseDelete} />
                        <Detail isOpen={isOpenDetail} onClose={onCloseDetail} />
                        <Edit isOpenEdit={isOpenEdit} onCloseEdit={onCloseEdit} />

                    </>

            }

        </Box>
    )
}