
import { flowcashApi } from "../../../api/flowcashApi";
import { 
    isCreated, 
    isError, 
    setFlowcashTypes, 
    startCreating, 
    startLoading, 
    createClear,
    isDeleting, // deleting in process
    toDelete, //storage the ID to delete
    isDeleted, // confirm deleted successfull

    startDeleting, //Initialize the deleting
    setDeleted, //Set the done the delete
    deleteClear, //Clear all states in delete
    setDelete, //sets the id to delete

} from "./FlowcashType";



export const FlowcashTypeThunks = {

    getFlowcashTypes: () => {
        return async (dispatch) => {
            dispatch(startLoading());

            // Request HTTP
            const resp = await flowcashApi.get("/flowcash/flowcashtype");

            dispatch(setFlowcashTypes({ rows: resp.data.data.rows }));
        }
    },


    createFlowcashType: (NewFlowcash_type) => {
        return async (dispatch) => {

            try {
                dispatch(startCreating());


                await flowcashApi.post("/flowcash/flowcashtype/create", {
                    NewFlowcash_type
                });

                dispatch(isCreated());

                //Update the state:rows
                dispatch(FlowcashTypeThunks.getFlowcashTypes());


            } catch (error) {
                dispatch(createClear());
                dispatch(isError(error.response.data));
            }

        }
    },

    deleteFlowcashType: (id) => {
        return async (dispatch) => {

            try {
                dispatch(startDeleting());
            
                // Request HTTP
                await flowcashApi.delete(`/flowcash/flowcashtype/${id}/delete`);
                
                dispatch(setDeleted());

                //Update the state:rows
                dispatch(FlowcashTypeThunks.getFlowcashTypes());
                
            } catch (error) {
                dispatch(deleteClear());
                dispatch(isError(error.response.data));
            }
        }
    }
};