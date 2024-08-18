
import axios, { Axios } from "axios";
import { flowcashApi } from "../../../api/flowcashApi";
import { created, isError, setFlowcashTypes, startCreating, startLoading } from "./FlowcashType";

export const FlowcashTypeThunks = {

    global: {
        errors: null
    },

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

                dispatch(created);

                this.getFlowcashTypes();


            } catch (error) {
                dispatch(created());
                console.log("Este es el error: ", error.response.data)
                dispatch(isError(error.response.data));
            }

        }
    },
};