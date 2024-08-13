import { setOperation, startLoading } from "./Operation";
import { flowcashApi } from "../../../api/flowcashApi";

export const OperationThunks = {

    getOperations: ()=>{
        return async (dispatch, getState)=>{
            dispatch( startLoading() );

            const { data } = await flowcashApi.get("/flowcash/operation");

            dispatch(setOperation( { data: data.data}));
        }
    }
};