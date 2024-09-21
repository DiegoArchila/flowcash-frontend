//React
import { Fragment, useEffect } from "react";

//Redux
import { useDispatch  } from "react-redux";
import { FlowcashThunks } from "../../../store/slices/flowcash/FlowcashThunks";
import { OperationTypeThunks } from "../../../store/slices/flowcash/operationType/OperationTypeThunks";


//Chakra UI
import {
    Stack,
    VStack
} from "@chakra-ui/react";

//Icons


//Components
import Operation from "./components/operation/Operation";
import FlowcashType from "./components/flowcashType/FlowcashType";

//Utils
import Movements from "./components/movements/Movements";

function Flowcash() {

    // Redux
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(OperationTypeThunks.getOperationsType());
        dispatch(FlowcashThunks.getFlowcash());

    }, [dispatch]);



    return (
        <Fragment>
            <VStack bgColor={"#F0F8FF"}>
                <Movements />
            </VStack>
            <Stack direction={"column"} bgColor={"#F0F8FF"}>
                <FlowcashType />
                <Operation />
            </Stack>
        </Fragment>
    )
}

export default Flowcash;