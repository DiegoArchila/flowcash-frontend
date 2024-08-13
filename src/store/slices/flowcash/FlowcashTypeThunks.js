import { flowcashApi } from "../../../api/flowcashApi";
import { setFlowcashTypes, startLoading } from "./FlowcashType";

export const FlowcashTypeThunks = {

    getFlowcashTypes: ()=>{
        return async (dispatch, getState)=>{
            dispatch( startLoading() );

            // Request HTTP
            const { data } = await flowcashApi.get("/flowcash/flowcashtype");

            console.log("DESDE TL THUNKS: ", data)

            dispatch(setFlowcashTypes( { rows: data.data}));
        }
    }
};