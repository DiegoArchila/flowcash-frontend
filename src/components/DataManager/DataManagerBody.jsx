//React
import PropTypes from 'prop-types';

//Chakara UI
import {
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    TableContainer,
} from '@chakra-ui/react'

/**
 * This component rendered the table with the data
 * 
 * @param {Object} headerTable The headers 
 * @returns {JSX.Element} the component DataManagerData rendered
 */
function DataManagerBody({headerTable=[], children}) {

  return (
    <TableContainer
            maxHeight={"246px"}
            paddingBottom={3}
            overflowX={"auto"}
            overflowY={"auto"}
        >
            <Table
                size={"sm"}
            >

                {/* TABLE HEADER */}

                <Thead>
                    <Tr>
                        {
                            headerTable.map((element, i) => {
                                return (
                                    <Th key={i}>
                                        <Heading
                                            as={"h5"}
                                            size={"sx"}
                                            textAlign={'center'}
                                        >
                                            {element.header}
                                        </Heading>
                                    </Th>
                                );
                            })
                        }

                    </Tr>
                </Thead>

                <Tbody>
                    
                    {children}
                    
                </Tbody>

            </Table>
        </TableContainer>
  )
}

DataManagerBody.propTypes = {
    headerTable: PropTypes.array.isRequired,
    children: PropTypes.node
}

export default DataManagerBody;