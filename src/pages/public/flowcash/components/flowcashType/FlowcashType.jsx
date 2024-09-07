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
  Center
} from '@chakra-ui/react'
import { FaMoneyBills } from "react-icons/fa6";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaRegEdit, FaRegEye } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { FlowcashTypeThunks } from '../../../../../store/slices/flowcash/FlowcashTypeThunks';
import { OperationThunks } from '../../../../../store/slices/flowcash/OperationThunks';
import NewFlowcashType from './components/newFlowcashType';
import { formatCurrencyCOP } from '../../../../../utils/formatCurrency';
import DeleteFlowcash from "./components/DeleteFlowcash";
import { setTarget } from "../../../../../store/slices/flowcash/FlowcashType";
import Detail from "./components/Detail";
import Edit from "./components/Edit";


function showFlowcash(
  data, //Rows in the state
  onOpenDelete,//Reference to windows delete flowcashtype
  onOpenDetail, //Reference to show details flowcashtype
  target, // Target to any event: delete, detail or delete,
  onOpenEdit, //Reference to windows Edit flowcashtype
  dispatch ){

   
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
                  <Td fontFamily={"Parrafs-light"}>{String(element.name).toLocaleUpperCase()}</Td>
                  
                  {/* COLUMN: Base */}
                  <Td textAlign={"right"} fontFamily={"Parrafs-light"}>{formatCurrencyCOP(element.balance)}</Td>
                  
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
                          onClick={()=>{
                            dispatch(setTarget(i));
                            onOpenDetail();
                          }}
                        >
                          <FaRegEye size={22} color={"#007FFF"}/>
                        </Box>
                        
                        {/* COLUMN: Edit */}
                        <Box cursor={"pointer"}
                          onClick={()=>{
                            dispatch(setTarget(i));
                            onOpenEdit();
                          }}
                        >
                          <FaRegEdit size={22} color={"#7BA05B"} />
                        </Box>
                        
                        {/* COLUMN: Delete */}
                        <Box cursor={"pointer"}
                          onClick={ ()=> {
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
  const { rows=[], isLoading, target } = useSelector(state => state.flowcashType);

  useEffect(() => {
    dispatch(FlowcashTypeThunks.getFlowcashTypes());
    dispatch(OperationThunks.getOperations());
  }, [dispatch]);


  return (
    <Box
      width={"95%"}
      bgColor={'#EDF2F7'}
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
        px={2} bgColor={"#41d3bd"}
        borderTopRadius="md"
      >

        <HStack pb={1}>
          <Box>
            <FaMoneyBills size={32} color='#2F855A' />
          </Box>

          <Box borderRadius={2}>
            <Heading
              textAlign={'center'}
              fontFamily={"Input-SemiBold"}
              color={"#276749"}
              as={"h3"}
              size={"md"}
            >
              CAJAS
            </Heading>
          </Box>
        </HStack>

        <Button
          colorScheme='red'
          size={"xs"}
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