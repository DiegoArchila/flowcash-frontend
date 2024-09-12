import { useEffect } from "react";
import { useDispatch } from "react-redux";
import FlowcashType from "./components/flowcashType/FlowcashType";
import { VStack } from "@chakra-ui/react";
import Operation from "./components/operation/Operation";
import { OperationTypeThunks } from "../../../store/slices/flowcash/operationTypeThunks";

export default function Flowcash() {

   // Redux
   const dispatch = useDispatch();

   useEffect(() => {

    dispatch(OperationTypeThunks.getOperationsType());
  
  }, [dispatch]);

  return (
    <VStack bgColor={"#F0F8FF"}>
        <FlowcashType />
        <Operation />
    </VStack>
  )
}
