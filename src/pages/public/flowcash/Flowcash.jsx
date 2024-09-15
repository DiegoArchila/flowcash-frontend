//React
import { useEffect } from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { OperationTypeThunks } from "../../../store/slices/flowcash/operationType/OperationTypeThunks";
import { FlowcashThunks } from "../../../store/slices/flowcash/FlowcashThunks";


//Chakra UI
import { 
  VStack,
  Tr,
  Td,
  Text 
} from "@chakra-ui/react";

//Icons
import { PiArrowsDownUpBold } from "react-icons/pi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { RiAddLargeLine } from "react-icons/ri";
import { IoMdRemove } from "react-icons/io";
import { IoIosInformationCircleOutline } from "react-icons/io";



//Components
import Operation from "./components/operation/Operation";
import FlowcashType from "./components/flowcashType/FlowcashType";
import Transactions from "../../../components/DataManager/DataManager";
import TransactionsBody from "../../../components/DataManager/DataManagerBody";

//Utils
import { formatDate } from "../../../utils/formatDate";

function Flowcash() {

  // Redux
  const dispatch = useDispatch();

  const { data: dataFlowcash = [], isLoading: isLoadingFlowcash } = useSelector(state => state.flowcash);
  const { data: dataOperation = [], isLoading: isLoadingOperation } = useSelector(state => state.operation);
  const { data: dataOperationType = [], isLoading: isLoadingOperationType } = useSelector(state => state.operationType);



  useEffect(() => {

    dispatch(OperationTypeThunks.getOperationsType());
    dispatch(FlowcashThunks.getFlowcash());

  }, [dispatch]);


  /**
 * Configutarion to DataManagers
 */

  //Transactions
  const configTransactions = {
    title: "Movimientos",
    //icon: <PiArrowsDownUpBold size={24} color='#FFFFFF' />
  }
  const HeadersTransactions=[
    {
      header: "hora"
    },
    {
      header: "operación"
    },
    {
      header: "caja"
    },
    {
      header: "Descripción"
    },
    {
      header: "valor"
    },

  ]

  return (
    <section>
      <VStack bgColor={"#F0F8FF"}>
        <FlowcashType />
        <Operation />

        <Transactions config={configTransactions} isLoadingData={isLoadingFlowcash}>
          <TransactionsBody headerTable={HeadersTransactions}>

            {/* TABLE BODY */}

            { dataFlowcash.length>=0 ?
                         dataFlowcash.map((element, i) => {

                            return (
                                <Tr key={i}>
                
                                    {/* COLUMN: Hora */}
                                    <Td textAlign={"center"}>
                                        <Text fontFamily={"Parrafs-Prices"} color={"#242124"} fontSize={14}>
                                            {formatDate.getDateFormatedLarge(element.datetime)}
                                        </Text>
                                    </Td>

                                    {/* COLUMN: Operation */}
                                    <Td textAlign={"center"}>
                                        <Text fontFamily={"Parrafs-Prices"} color={"#242124"} fontSize={14}>
                                            
                                        </Text>
                                    </Td>

                                </Tr>)
                        })
                        :
                        null
                    }

          </TransactionsBody>
        </Transactions>

      </VStack>
    </section>
  )
}

export default Flowcash;
