import { resetStates, setCreated, setDeleted, setErrors, setOperationData, setUpdated, startCreating, startDeleting, startLoadingData, startUpdating } from "./Operation";
import { flowcashApi } from "../../../api/flowcashApi";

export const OperationThunks = {

    getOperations: () => {
        return async (dispatch) => {
            dispatch(startLoadingData());

            // Request HTTP
            const resp = await flowcashApi.get("/flowcash/operation");

            const data= resp.data.data.rows.sort((a, b) => a.type.localeCompare(b.type));

            dispatch(setOperationData({ data: data }));
        }
    },


    createOperation: (NewOperation) => {
        return async (dispatch) => {

            try {
                dispatch(startCreating());


                await flowcashApi.post("/flowcash/operation/create", {
                    NewOperation
                });

                dispatch(setCreated());

                //Update the state:rows
                dispatch(OperationThunks.getOperations());


            } catch (error) {
                dispatch(setErrors(error.response.data));
                dispatch(resetStates());
            }

        }
    },

    updateOperation: (updateOperation, id) => {
        return async (dispatch) => {

            
            try {
                dispatch(startUpdating());
                
                
                await flowcashApi.post(`/flowcash/operation/${id}/update`, {
                    updateOperation
                });
                
                
                dispatch(setUpdated()); //set the operation as done
                
                // ass a small delay of 100ms before to continue with other operations
                setTimeout(() => {
                    dispatch(OperationThunks.getOperations());
                }, 50);
               
                

            } catch (error) {
                dispatch(setErrors(error.response.data));
                dispatch(resetStates());
            }

        }
    },

    deleteOperation: (id) => {
        return async (dispatch) => {

            try {
                dispatch(startDeleting());
            
                // Request HTTP
                await flowcashApi.delete(`/flowcash/operation/${id}/delete`);
                
                dispatch(setDeleted());

                // ass a small delay of 100ms before to continue with other operations
                setTimeout(() => {
                    dispatch(OperationThunks.getOperations());
                }, 50);
                
            } catch (error) {
                dispatch(setErrors(error.response.data));
                dispatch(resetStates());
            }
        }
    }
};