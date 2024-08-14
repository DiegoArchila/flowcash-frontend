
import { flowcashApi } from "../../../api/flowcashApi";
import { setFlowcashTypes, startLoading } from "./FlowcashType";

export const FlowcashTypeThunks = {

    getFlowcashTypes: ()=>{
        return async (dispatch, getState)=>{
            dispatch( startLoading() );

            // Request HTTP
            const rest = await flowcashApi.get("/flowcash/flowcashtype");

            dispatch(setFlowcashTypes( { rows: rest.data.data.rows }));
        }
    }  
};