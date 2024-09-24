//React
import { Fragment, useEffect } from "react";

//Redux
import { useDispatch  } from "react-redux";
import { FlowcashThunks } from "../../../store/slices/flowcash/FlowcashThunks";
import { OperationTypeThunks } from "../../../store/slices/flowcash/operationType/OperationTypeThunks";


//Chakra UI
import {
    VStack
} from "@chakra-ui/react";

//Icons


//Components
//import Operation from "./components/operation/Operation";
//import FlowcashType from "./components/flowcashType/FlowcashType";

//Utils
import Movements from "./components/movements/Movements";
import FlowcashType from "./components/flowcashType/FlowcashType";

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
                <FlowcashType />
            </VStack>
        </Fragment>
    )
}

export default Flowcash;