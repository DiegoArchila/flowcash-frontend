import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

//Redux
import { useDispatch, useSelector } from "react-redux";
import { BalancePeriodThunks } from "../../../../../store/slices/flowcash/balancePeriod/BalancePeriodThunks";

//COMPONENTS
import Pagination from '../../../../../components/Pagination/Pagination';
import DataManager from '../../../../../components/DataManager/DataManager';
import DataManagerBody from '../../../../../components/DataManager/DataManagerBody';
import FlowcashReportView from './FlowcashReportView';


//Chakra UI
import { Center, Tr, Td, Text, HStack, Box, useDisclosure, IconButton } from "@chakra-ui/react";

//ICONS
import { TbReportAnalytics } from "react-icons/tb";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaRegFolderOpen } from "react-icons/fa6";
import { BiSolidPrinter } from "react-icons/bi";

//utils
import { formatDate } from "../../../../../utils/formatDate";
import { formatCurrencyCOP } from '../../../../../utils/formatCurrency';


function FlowcashReports() {

    // Redux
    const dispatch = useDispatch();

    // State for FlowcashReportView modal
    const { isOpen: isOpenReportView,
        onOpen: onOpenReportView,
        onClose: onCloseReportView } = useDisclosure();

    // Local state to manage the report data to be viewed
    const [selectedReport, setSelectedReport] = useState(null);


    const {
        data: {
            data: dataBalancePeriod = [],
            count, currentPage
        },
        isLoading: isLoadingBalancePeriod

    } = useSelector(state => state.balancePeriod);

    useEffect(() => {
        dispatch(BalancePeriodThunks.getBalancesPeriods());
        if (selectedReport !== null) {
            console.log("TEST selectedReport", selectedReport);
        }
    }, [dispatch, selectedReport]);

    // Function to handle opening the modal and setting the selected report
    const handleViewReport = (reportData) => {
        setSelectedReport(reportData);
        onOpenReportView();
    };

    // Config for DataManager
    const configDataManager = {
        title: "Reportes",
        icon: <TbReportAnalytics size={24} color='#4a5568' />
    }

    const HeadersDataManager = ["Fecha final", "Fecha inicial", "Total Entradas", "Total Salidas", "Total Saldo en Cajas", "Acciones"];


    return (

        <React.Fragment>

            <DataManager config={configDataManager} isLoadingData={isLoadingBalancePeriod} height={'100%'}>

                <DataManagerBody headerTable={HeadersDataManager}>

                    {
                        dataBalancePeriod.length > 0 ? (
                            dataBalancePeriod.map((balance, index) => {
                                
                                return (
                                    <Tr key={"dataBalancePeriod" + index} height={'fit-content'}>

                                        {/* Column End Date */}
                                        <Td>
                                            <Text
                                                textAlign={"center"}
                                                fontFamily={"label"}
                                                color={"text.paragraphs"}
                                                fontSize={"md"}>
                                                {formatDate.getDateFormatedDayOfWeek(balance.datetime_end)}
                                            </Text>
                                        </Td>

                                        {/* Column Start Date */}
                                        <Td>
                                            <Text
                                                textAlign={"center"}
                                                fontFamily={"label"}
                                                color={"text.paragraphs"}
                                                fontSize={"md"}>
                                                {formatDate.getDateFormatedDayOfWeek(balance.datetime_start)}
                                            </Text>
                                        </Td>

                                        {/* Column input */}
                                        <Td isNumeric>
                                            <Text
                                                textAlign={"center"}
                                                fontFamily={"label"}
                                                fontSize={"md"}>
                                                {formatCurrencyCOP(balance.total_input)}
                                            </Text>
                                        </Td>

                                        {/* Column output */}
                                        <Td isNumeric>
                                            <Text
                                                textAlign={"center"}
                                                fontFamily={"label"}
                                                fontSize={"md"}>
                                                {formatCurrencyCOP(balance.total_output)}
                                            </Text>
                                        </Td>

                                        {/* Column total balance */}
                                        <Td isNumeric>
                                            <Text
                                                textAlign={"center"}
                                                fontFamily={"label"}
                                                fontSize={"md"}
                                            >
                                                {formatCurrencyCOP(balance.total_balance)}
                                            </Text>
                                        </Td>

                                        {/* Column Actions */}
                                        <Td>
                                            <HStack
                                                justifyContent={"center"}
                                                spacing={2}
                                            >
                                                {/* Open Detail balance */}
                                                <IconButton
                                                    icon={<FaRegFolderOpen size={18} />}
                                                    aria-label="Ver reporte"
                                                    size="sm"
                                                    colorScheme="gray"
                                                    variant="ghost"
                                                    onClick={() => handleViewReport(balance)}
                                                />

                                                {/* Open Detail printer */}
                                                <IconButton
                                                    icon={<BiSolidPrinter size={18} />}
                                                    aria-label="Imprimir reporte"
                                                    size="sm"
                                                    colorScheme="gray"
                                                    variant="ghost"
                                                    onClick={() => {
                                                        // Add print logic here
                                                    }}
                                                />
                                            </HStack>
                                        </Td>
                                    </Tr>
                                )
                            })
                        ) : (
                            <Tr>
                                <Td colSpan={HeadersDataManager.length} alignContent={"center"}>
                                    <Center my={5} gap={3}>
                                        <BsFillInfoSquareFill size={32} color={"#00BFFF"} />
                                        <Text fontFamily={"paragraphs"} fontSize="md">Sin datos.</Text>
                                    </Center>
                                </Td>
                            </Tr>
                        )
                    }

                </DataManagerBody>

            </DataManager>

            {/* Pagination Component */}
            {
                dataBalancePeriod.length > 0 && (
                    <Pagination
                        key={"PaginationBalancePeriod" + Date.now()}
                        length={count || 0}
                        queryFunction={BalancePeriodThunks.getBalancesPeriods}
                        currentPage={currentPage}
                    />
                )
            }

            {/* Modal para ver el reporte (renderizado una sola vez) */}
            <FlowcashReportView
                isOpen={isOpenReportView}
                onClose={onCloseReportView}
                reportData={selectedReport}
            />

        </React.Fragment>
    );

}

FlowcashReports.propTypes = {}

export default FlowcashReports;