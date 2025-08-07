//React
import React from 'react'
import PropTypes from 'prop-types'

//Components


//Chakra UI
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    Box,
    Flex,
    Heading,
    Divider,
    Tag,
    TagLabel,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    SimpleGrid
} from '@chakra-ui/react'

//Utils
import { formatCurrencyCOP } from '../../../../../utils/formatCurrency';
import { formatDate } from '../../../../../utils/formatDate';
import { formatUUID } from '../../../../../utils/formatUUID';


function FlowcashReportView({ isOpen, onClose, reportData }) {

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            closeOnOverlayClick={false}
            motionPreset="slideInBottom"
            size="2xl"
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Flex alignItems="center" justifyContent="space-evenly" flexDirection={{ base: "column", md: "row" }}>
                        <Heading size="lg" color="text.subheadings" fontFamily="heading">
                            Reporte de flujos de caja
                        </Heading>
                        <Tag size="lg" colorScheme="gray" borderRadius="full" marginLeft={5}>
                            <TagLabel fontFamily="label">
                                ID: {formatUUID.getUUIDShort(reportData?.id)}
                            </TagLabel>
                        </Tag>
                    </Flex>
                    <Text fontFamily="paragraphs" color="gray.600" mt={1}>
                        Generado por: {String(reportData?.["report-user"]?.names).toLocaleUpperCase()}
                    </Text>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                        {/* Periodo del reporte */}
                        <Box>
                            <Text fontWeight="semibold" color="text.subheadings">Periodo</Text>
                            <Box mt={2}>
                                <Text fontFamily="paragraphs">
                                    <Text as="span" fontWeight="bold">Inicio:</Text> {formatDate.getDateFormatedDayOfWeekWithTime(reportData?.datetime_start)}
                                </Text>
                                <Text fontFamily="paragraphs">
                                    <Text as="span" fontWeight="bold">Fin:</Text> {formatDate.getDateFormatedDayOfWeekWithTime(reportData?.datetime_end)}
                                </Text>
                                <Text fontFamily="paragraphs">
                                    <Text as="span" fontWeight="bold">Duración:</Text> {formatDate.getDuration(reportData?.datetime_start, reportData?.datetime_end)}
                                </Text>
                            </Box>
                        </Box>
                    </SimpleGrid>

                    <Divider my={6} />

                    {/* Caja's table */}
                    <Box>
                        <Text fontWeight="semibold" color="text.subheadings">
                            Detalle de Cajas
                        </Text>

                        {reportData?.balance_periods?.length > 0 ? (
                            <Box borderWidth="1px" borderRadius="lg" overflowX="auto">
                                <Table variant="simple" size="sm">
                                    <Thead bg="gray.100">
                                        <Tr>
                                            <Th color="text.subheadings" fontFamily="label">Caja</Th>
                                            <Th color="text.subheadings" fontFamily="label" isNumeric>Entradas</Th>
                                            <Th color="text.subheadings" fontFamily="label" isNumeric>Salidas</Th>
                                            <Th color="text.subheadings" fontFamily="label" isNumeric>Saldo</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {reportData.balance_periods.map((flowcash, index) => (
                                            <Tr key={index}>
                                                <Td fontFamily="paragraphs">{String(flowcash.flowcash_types.name).toLocaleUpperCase()}</Td>
                                                <Td fontFamily="paragraphs" isNumeric fontWeight="bold">{formatCurrencyCOP(flowcash.input)}</Td>
                                                <Td fontFamily="paragraphs" isNumeric fontWeight="bold">{formatCurrencyCOP(flowcash.output)}</Td>
                                                <Td fontFamily="paragraphs" isNumeric fontWeight="bold">{formatCurrencyCOP(flowcash.balance)}</Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </Box>
                        ) : (
                            <Text fontFamily="paragraphs" color="text.paragraphs">
                                No hay cajas asociadas a este reporte.
                            </Text>
                        )}
                    </Box>

                    <Divider my={6} />

                    {/* Summary financial */}
                    <Box>
                        <Text fontWeight="semibold" color="text.subheadings" mb={2}>
                            Resumen Financiero
                        </Text>
                        <Flex justifyContent="space-between" mb={1}>
                            <Text fontFamily="paragraphs" fontWeight="bold">Total Entradas:</Text>
                            <Text fontFamily="paragraphs" fontWeight="bold">{formatCurrencyCOP(reportData?.total_input)}</Text>
                        </Flex>
                        <Flex justifyContent="space-between" mb={2}>
                            <Text fontFamily="paragraphs" fontWeight="bold">Total Salidas:</Text>
                            <Text fontFamily="paragraphs" fontWeight="bold" color="error.500">{formatCurrencyCOP(reportData?.total_output)}</Text>
                        </Flex>
                        <Divider my={2} />
                        <Flex justifyContent="space-between" fontWeight="bold">
                            <Text fontFamily="paragraphs" fontWeight="bold">Saldo Total:</Text>
                            <Text fontFamily="paragraphs" fontWeight="bold">{formatCurrencyCOP(reportData?.total_balance)}</Text>
                        </Flex>
                    </Box>

                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="brand" onClick={onClose} fontFamily="button">
                        Cerrar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

FlowcashReportView.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    reportData: PropTypes.object
}

export default FlowcashReportView