//React

//Redux

//Chakra UI
import {
    Box,
    Stack
} from "@chakra-ui/react";

//Icons


//COMPONENTS
import Movements from "./components/movements/Movements";
import FlowcashType from "./components/flowcashType/FlowcashType";
import Operation from "./components/operations/Operations";
import ToolbarFlowcash from "./pages/components/ToolbarFlowcash";
import Reports from "./components/reports/Reports";

function Flowcash() {


    return (
        <Box minH="100vh" overflowY={"auto"}>

           { /*Container Movements*/}
            <Stack 
                direction={{
                    base:"column-reverse",
                    lg:"row"
                }}
                >
                <Box
                    w={{
                        base:"100%",
                        lg: "70%"
                    }}
                    h={{
                        base: "100%"
                    }}
                    overflowY={"auto"}
                    >
                    <Movements />
                </Box>

                <Stack
                    w={{
                        base: "100%",
                        lg: "30%"
                    }}
                    h={"100%"}
                    gap={0}
                >

                    <Box  minH={"33.3%"}>
                        <Reports />
                    </Box>

                    <Box minH={"33.3%"}>
                        <FlowcashType />
                    </Box>
                    
                    <Box minH={"33.3%"}>
                        <Operation />
                    </Box>

                </Stack>

            </Stack>
            
            <ToolbarFlowcash />
        </Box>
    )
}

export default Flowcash;