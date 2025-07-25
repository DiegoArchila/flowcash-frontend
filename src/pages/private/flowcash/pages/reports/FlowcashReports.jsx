import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

//Redux
import { useDispatch, useSelector } from "react-redux";
import { BalancePeriodThunks } from "../../../../../store/slices/flowcash/balancePeriod/BalancePeriodThunks";

//COMPONENTS
import Pagination from '../../../../../components/Pagination/Pagination';
import DataManager from '../../../../../components/DataManager/DataManager';
import DataManagerBody from '../../../../../components/DataManager/DataManagerBody';


//Chakra UI
import { Center, Tr, Td, Text, HStack, Box } from "@chakra-ui/react";

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

    useEffect(() => {
        dispatch(BalancePeriodThunks.getBalancesPeriods());
    }, [dispatch]);

    const {
        data: {
            data: dataBalancePeriod = [],
            totalRow, currentPage
        },
        isLoading: isLoadingBalancePeriod

    } = useSelector(state => state.balancePeriod);


    // Config for DataManager
    const configDataManager = {
        title: "Reportes",
        icon: <TbReportAnalytics size={24} color='#FFFFFF' />
    }

    const HeadersDataManager = ["Fecha final", "Fecha inicial", "Total Entradas", "Total Salidas", "Total Saldo en Cajas", "Acciones"];

    console.log("dataBalancePeriod", dataBalancePeriod);


    return (

        <React.Fragment>

            <DataManager config={configDataManager} isLoadingData={isLoadingBalancePeriod} height={'100%'}>

                <DataManagerBody headerTable={(dataBalancePeriod.length > 0) ? HeadersDataManager : []} >

                    {
                        dataBalancePeriod.map((balance, index) => {
                            return (
                                <Tr key={"dataBalancePeriod" + index} height={'fit-content'}>

                                    {/* Column End Date */}
                                    <Td textAlign={'center'}>
                                        <Text
                                            fontFamily={"label"}
                                            color={"text.paragraphs"}
                                            fontSize={"sm"}>
                                            {formatDate.getDateFormatedLarge(balance.datetime_end)}
                                        </Text>
                                    </Td>

                                    {/* Column Start Date */}
                                    <Td textAlign={'center'}>
                                        <Text 
                                            fontFamily={"label"}
                                        color={"text.paragraphs"}
                                        fontSize={"sm"}>
                                            {formatDate.getDateFormatedLarge(balance.datetime_start)}
                                        </Text>
                                    </Td>

                                    {/* Column input */}
                                    <Td textAlign={'center'}>
                                        <Text
                                            fontFamily={"label"}
                                            color={"text.paragraphs"}
                                            fontSize={"md"}>
                                            {formatCurrencyCOP(balance.input)}
                                        </Text>
                                    </Td>

                                    {/* Column output */}
                                    <Td textAlign={'center'}>
                                        <Text
                                            fontFamily={"label"}
                                            color={"text.paragraphs"}
                                            fontSize={"md"}>
                                            {formatCurrencyCOP(balance.output)}
                                        </Text>
                                    </Td>

                                    {/* Column output */}
                                    <Td textAlign={'center'}>
                                        <Text
                                            fontFamily={"label"}
                                            color={"text.paragraphs"}
                                            fontSize={"md"}>
                                            {formatCurrencyCOP(balance.balance)}
                                        </Text>
                                    </Td>

                                    {/* Column Actions */}
                                    <Td alignContent={"center"} textAlign={"center"}>
                                        <HStack
                                            justifyContent={"center"}
                                            alignContent={"space-between"}
                                            alignItems={"center"}
                                            gap={5}
                                        >

                                            {/* Open Detail balance */}
                                            <Box cursor={"pointer"}
                                                onClick={() => {

                                                }}
                                            >
                                                <FaRegFolderOpen size={22} color={"#718096"} />
                                            </Box>

                                            {/* Open Detail balance */}
                                            <Box cursor={"pointer"}
                                                onClick={() => {

                                                }}
                                            >
                                                <BiSolidPrinter size={22} color={"#718096"} />
                                            </Box>

                                        </HStack>
                                    </Td>
                                </Tr>)
                        })
                    }

                </DataManagerBody>

                {
                    dataBalancePeriod.length === 0 ?

                        <Center my={5} gap={3}>
                            <BsFillInfoSquareFill size={32} color={"#00BFFF"} /> Sin datos.
                        </Center>
                        :
                        null
                }


            </DataManager>

            {/* Pagination Component */}
            {
                dataBalancePeriod.length > 0 ?
                    <Pagination
                        key={"PaginationBalancePeriod" + Date.now()}
                        length={totalRow || 0}
                        queryFunction={BalancePeriodThunks.getBalancesPeriods}
                        currentPage={currentPage}
                    />
                    : null
            }
        </React.Fragment>
    );

}

FlowcashReports.propTypes = {}

export default FlowcashReports;