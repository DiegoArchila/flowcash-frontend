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
import { FaRegEdit } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { FlowcashTypeThunks } from '../../../../../store/slices/flowcash/FlowcashTypeThunks';
import { OperationThunks } from '../../../../../store/slices/flowcash/OperationThunks';
import { formatDate } from '../../../../../utils/formatDate';
import NewFlowcashType from './newFlowcashType';
import { formatCurrencyCOP } from '../../../../../utils/formatCurrency';


function showFlowcash(data) {
  return (

    <TableContainer
      maxHeight={"246px"}
      paddingBottom={3}
      overflowX={"auto"}
      overflowY={"auto"}
    >
      <Table size={"sm"}

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
                {"fecha"}
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
                  <Td>{String(element.name).toLocaleUpperCase()}</Td>
                  <Td textAlign={"right"}>{formatCurrencyCOP(element.balance)}</Td>
                  <Td textAlign={"right"}>{formatDate.getDateFormatedLarge(element.datetime)}</Td>
                  <Td textAlign={"center"}>
                    <HStack 
                      alignContent={"space-between"}
                      alignItems={"center"}
                      gap={5}
                    >
                      <Box cursor={"pointer"}><MdOutlineDeleteForever size={26} color={"#FF0800"} /></Box>
                      <Box cursor={"pointer"}><FaRegEdit size={22} color={"#7BA05B"} /></Box>
                    </HStack>
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
    isOpen: isOpenNewFlowcashType,
    onOpen: onOpenNewFlowcashType,
    onClose: onCloseNewFlowcashType
  } = useDisclosure()


  // Redux
  const dispatch = useDispatch();
  const { rows, isLoading } = useSelector(state => state.flowcashType);


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
          size={"md"}
          variant={"ghost"}
          onClick={onOpenNewFlowcashType}
        >
          Nueva
          <IoIosAdd size={24} />
        </Button>

        <NewFlowcashType isOpen={isOpenNewFlowcashType} onClose={onCloseNewFlowcashType} />

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
          showFlowcash(rows)

      }

    </Box>
  )
}