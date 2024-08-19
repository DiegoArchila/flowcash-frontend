
import { flowcashApi } from "../../../api/flowcashApi";
import { created, isError, setFlowcashTypes, startCreating, startLoading } from "./FlowcashType";

export const FlowcashTypeThunks = {

    getFlowcashTypes: ()=>{
        return async (dispatch, getState)=>{
            dispatch( startLoading() );

            // Request HTTP
            const resp = await flowcashApi.get("/flowcash/flowcashtype");

            dispatch(setFlowcashTypes( { rows: resp.data.data.rows }));
        }
    }, 
    
    createFlowcashType: (NewFlowcash_type)=>{
        return async (dispatch, getState) =>{

            dispatch(startCreating());
            
            try {

                await flowcashApi.post("/flowcash/flowcashtype/create",{
                    NewFlowcash_type
                });

                dispatch(created());

                //Update the state:rows
                dispatch(FlowcashTypeThunks.getFlowcashTypes());


            } catch (error) {
                dispatch(created());
                dispatch(isError(error.response.data));
            }

        }
    },
};