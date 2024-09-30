//React
import { Fragment, useEffect } from "react";

//Redux
import { useDispatch  } from "react-redux";
import { FlowcashThunks } from "../../../store/slices/flowcash/FlowcashThunks";
import { OperationTypeThunks } from "../../../store/slices/flowcash/operationType/OperationTypeThunks";
import { OperationThunks } from "../../../store/slices/flowcash/operation/OperationThunks";


//Chakra UI
import {
    Box,
    Flex,
    HStack,
    Stack
} from "@chakra-ui/react";

//Icons


//COMPONENTS
import Movements from "./components/movements/Movements";
import FlowcashType from "./components/flowcashType/FlowcashType";
import Operation from "./components/operations/Operations";
import ToolbarFlowcash from "./pages/components/ToolbarFlowcash";

function Flowcash() {

    // Redux
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(OperationTypeThunks.getOperationsType());
        dispatch( OperationThunks.getOperations() );
        dispatch(FlowcashThunks.getFlowcash());

    }, [dispatch]);



    return (
        <Box minH="100vh" overflowY={"auto"}>

           { /*Container Movements*/}
            <Stack 
                direction={{
                    base:"column",
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
                >
                    <Box mH={"50%"}>
                        <FlowcashType />
                    </Box>

                    <Box  mH={"50%"}>
                        <Operation />
                    </Box>

                </Stack>

            </Stack>
            
            <ToolbarFlowcash />
        </Box>
    )
}

export default Flowcash;