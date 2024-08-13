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
} from '@chakra-ui/react'
import { FaMoneyBills } from "react-icons/fa6";
import { IoIosAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { FlowcashTypeThunks } from '../../../../../store/slices/flowcash/FlowcashTypeThunks';
import { OperationThunks } from '../../../../../store/slices/flowcash/OperationThunks';
import { useEffect } from "react";


function showFlowcash(data) {
  return (
    
    <TableContainer>
        <Table size={"sm"}>

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

            </Tr>
          </Thead>

          {/* TABLE BODY */}

          <Tbody>
            {
              data.map(flowcash => {
                return (
                  <Tr key={flowcash.id}>
                    <Td>{flowcash.name}</Td>
                    <Td>{flowcash.balance}</Td>
                    <Td>{flowcash.datetime}</Td>
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
    <Spinner size={"lg"}/>
  );
}

export default function FlowcashType() {

  const dispatch = useDispatch();
  const flowcashs = useSelector(state => state.flowcashType);
  const isLoading=flowcashs.isLoading;

  useEffect(() => {
    
    dispatch(OperationThunks.getOperations());
    dispatch(FlowcashTypeThunks.getFlowcashTypes());
    console.log("isLoading? : ", flowcashs.isLoading);
    console.log("Si Trajo DATOS? : ", flowcashs.data)
  
  }, [])
  

  return (
    <Box width={"95%"} bgColor={'#EDF2F7'} borderTopRadius="md" mt={3} pb={3} border={"1px"} borderColor={"#E2E8F0"}>
      
      {/* HEADER */}
      
      <HStack 
        pt={1} w={"100%"} 
        justifyContent={"space-between"} 
        px={2} bgColor={"#41d3bd"}
        borderTopRadius="md"  
      >

        <HStack pb={1}>
          <Box>
            <FaMoneyBills size={32} color='#2F855A'/>
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
        >
          Nueva
          <IoIosAdd size={24}/>
        </Button>

      </HStack>

      {/* BODY */}

      {
        isLoading ?
          loading()
        : 
        showFlowcash(flowcashs.data.rows)
      }

      
    </Box>
  )
}