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
  Text
} from '@chakra-ui/react'

import { MdOutlineDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { LiaCashRegisterSolid } from "react-icons/lia";
import { IoIosInformationCircleOutline } from "react-icons/io";

import { FlowcashTypeThunks } from '../../../../../store/slices/flowcash/FlowcashTypeThunks';
import NewFlowcashType from './components/Create';
import { formatCurrencyCOP } from '../../../../../utils/formatCurrency';
import DeleteFlowcash from "./components/Delete";
import { setTarget, errorsClear, createClear, deleteClear } from "../../../../../store/slices/flowcash/FlowcashType";
import Detail from "./components/Detail";
import Edit from "./components/Edit";


function showFlowcash(
  data, //Rows in the state
  onOpenDelete,//Reference to windows delete flowcashtype
  onOpenDetail, //Reference to show details flowcashtype
  target, // Target to any event: delete, detail or delete,
  onOpenEdit, //Reference to windows Edit flowcashtype
  dispatch) {


  return (

    <TableContainer
      maxHeight={"246px"}
      paddingBottom={3}
      overflowX={"auto"}
      overflowY={"auto"}
    >
      <Table
        size={"sm"}
        variant={"striped"}
        colorScheme={"cyan"}

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
                {"Base"}
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
                      {String(element.name).toLocaleUpperCase()}
                    </Text>
                  </Td>

                  {/* COLUMN: Base */}
                  <Td textAlign={"right"}>
                    <Text fontFamily={"Parrafs-Prices"} color={"#242124"} fontSize={16}>
                      {formatCurrencyCOP(element.balance)}
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
  );
}

function loading() {
  return (
    <Center mt={3} mb={3}>
      <Spinner size={"xl"} />
    </Center>
  );
}


export default function FlowcashType() {

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
  const { rows = [], isLoading, target, isCreated, isDeleted } = useSelector(state => state.flowcashType);

  useEffect(() => {
    dispatch(FlowcashTypeThunks.getFlowcashTypes());

    /**
     * Closes the component 
     */
    if (isCreated || isDeleted) {
      dispatch(setTarget(null));
      dispatch(errorsClear());
      dispatch(createClear());
      dispatch(deleteClear());
      onCloseDelete();
      onCloseEdit();
      onCloseNew();
    }

  }, [dispatch, isCreated, isDeleted]);


  return (
    <Box
      width={"95%"}
      bgColor={'#FFFFFF'}
      borderTopRadius="md"
      mt={3} pb={3}
      border={"1px"}
      borderColor={"#E2E8F0"}
      maxHeight={"305px"}
    >

      {/* HEADER */}

      <HStack
        pt={1} w={"100%"}
        justifyContent={"space-between"}
        px={2} bgColor={"#2F4F4F"}
        borderTopRadius="md"
      >

        <HStack pb={1}>
          <Box>
            <LiaCashRegisterSolid size={32} color='#FFFFFF' />
          </Box>

          <Box borderRadius={2}>
            <Heading
              textAlign={'center'}
              fontFamily={"Input-SemiBold"}
              color={"#FFFFFF"}
              as={"h3"}
              size={"md"}
            >
              CAJAS
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
              rows,
              onOpenDelete,
              onOpenDetail,
              target,
              onOpenEdit,
              dispatch)
            }

            {/* Windows to show when the acction does dispatch */}
            <DeleteFlowcash isOpen={isOpenDelete} onClose={onCloseDelete} />
            <Detail isOpen={isOpenDetail} onClose={onCloseDetail} />
            <Edit isOpenEdit={isOpenEdit} onCloseEdit={onCloseEdit} />

          </>

      }

    </Box>
  )
}