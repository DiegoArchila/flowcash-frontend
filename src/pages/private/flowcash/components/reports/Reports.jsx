//React
import { useEffect } from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { reportsThunks } from "../../../../../store/slices/flowcash/reports/reportsThunks";



//Chakra UI
import {
    Tr,
    Td,
    Text,
    Center,
} from "@chakra-ui/react";

//Icons
import { BsFillInfoSquareFill } from "react-icons/bs";
import { TbReportAnalytics } from "react-icons/tb";

//Components
import DataManager from "../../../../../components/DataManager/DataManager";
import DataManagerBody from "../../../../../components/DataManager/DataManagerBody";
import { formatCurrencyCOP } from "../../../../../utils/formatCurrency";

export default function Reports() {

    // Redux
    const dispatch = useDispatch();

    const {
        data = [],
        isLoading,
    } = useSelector(state => state.reportsFlowcash);

    useEffect(() => {
        dispatch(reportsThunks.getReportsFlowcash());
    }, [dispatch]);

    // Agrupa los datos por flowcashtypeid
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

    // Convierte el objeto agrupado en un array
    const reportArray = Object.values(groupedData);

    const configDataManager = {
        title: "Reporte actual",
        icon: <TbReportAnalytics size={24} color='#FFFFFF' />,
    }

    const HeadersDataManager = ["Caja", "Ingresos", "Egresos"];

    return (
        <DataManager config={configDataManager} isLoadingData={isLoading} >
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