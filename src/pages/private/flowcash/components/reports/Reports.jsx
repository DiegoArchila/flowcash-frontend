//React
import { useEffect, useRef } from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { reportsThunks } from "../../../../../store/slices/flowcash/reports/reportsThunks";

//Chakra UI
import {
    Tr,
    Td,
    Text,
    Center,
    useDisclosure
} from "@chakra-ui/react";

//Icons
import { BsFillInfoSquareFill } from "react-icons/bs";
import { TbReportAnalytics } from "react-icons/tb";

//Components
import DataManager from "../../../../../components/DataManager/DataManager";
import DataManagerBody from "../../../../../components/DataManager/DataManagerBody";
import { formatCurrencyCOP } from "../../../../../utils/formatCurrency";
import AlertCloseFlowcash from "./components/AlertCloseFlowcash";


export default function Reports() {

    // Redux
    const dispatch = useDispatch();

    const {
        data = [],
        isLoading,
    } = useSelector(state => state.reportsFlowcash);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();    

    useEffect(() => {
        dispatch(reportsThunks.getReportsFlowcash());
    }, [dispatch]);

    // group data by flowcashtypeid and calculate total ingresos and egresos
    const groupedData = data.reduce((acc, curr) => {
        const { flowcashtypeid, is_sum, total } = curr;

        if (!acc[flowcashtypeid]) {
            acc[flowcashtypeid] = { ingresos: 0, egresos: 0, ...curr };
        }
        if (is_sum) {
            acc[flowcashtypeid].ingresos = total;
        } else {
            acc[flowcashtypeid].egresos = total;
        }

        return acc;
    }, {});

    // Cast grouped data to an array
    const reportArray = Object.values(groupedData);

    const configDataManager = {
        title: "Reporte actual",
        icon: <TbReportAnalytics size={24} color='#4a5568' />,
        buttonTitle: "Cerrar período",
        colorSchemeButton: "red",
        variantButton: "solid",
    }

    const HeadersDataManager = ["Caja", "Ingresos", "Egresos"];

    return (
        <DataManager 
            config={configDataManager} 
            isLoadingData={isLoading} 
            createFunction={onOpen}
            roles={["admin"]}
            >

                <AlertCloseFlowcash
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                    cancelRef={cancelRef}
                />
            <DataManagerBody headerTable={(data.length > 0) ? HeadersDataManager : []}>


                {/* TABLE BODY */}
                {reportArray.map((elementReportFlowcash, i) => (
                    <Tr key={i}>

                        {/* COLUMN: Caja */}
                        <Td textAlign={"left"}>
                            <Text
                                fontFamily={"paragraphs"}
                                fontSize={"sm"}
                                color={"text.paragraphs"}
                            >
                                {String(elementReportFlowcash.flowcashtypename).toLocaleUpperCase()}
                            </Text>
                        </Td>

                        {/* COLUMN: Ingresos*/}
                        <Td textAlign={"right"}>
                            <Text
                                fontFamily={"paragraphs"}
                                fontSize={"md"}
                                color={"text.paragraphs"}
                            >
                                {formatCurrencyCOP(elementReportFlowcash.ingresos)}
                            </Text>
                        </Td>

                        {/* COLUMN: Egresos*/}
                        <Td textAlign={"right"}>
                            <Text
                                fontFamily={"paragraphs"}
                                fontSize={"md"}
                                color={"text.paragraphs"}
                            >
                                {formatCurrencyCOP(elementReportFlowcash.egresos)}
                            </Text>
                        </Td>

                    </Tr>
                ))}
            </DataManagerBody>

            {data.length === 0 && (
                <Center my={5} gap={3}>
                    <BsFillInfoSquareFill size={32} color={"#00BFFF"} /> Sin datos.
                </Center>
            )}
        </DataManager>
    );
}