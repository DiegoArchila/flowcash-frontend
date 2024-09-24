import { resetStates, setCreated, setDeleted, setErrors, setFlowcashTypeData, setUpdated, startCreating, startDeleting, startLoadingData, startUpdating } from "./FlowcashType";
import { flowcashApi } from "../../../../api/flowcashApi";


export const FlowcashTypeThunks = {

    getFlowcashType: () => {
        return async (dispatch) => {

            try {
                dispatch(startLoadingData());
    
                // Request HTTP
                const resp = await flowcashApi.get("/flowcash/flowcashtype");
    
                const dataFlowcashType= resp.data.data.rows.sort((a, b) => a.name.localeCompare(b.name));

                console.log("Datos recibidos FlowcashType", dataFlowcashType);
    
                dispatch(setFlowcashTypeData({ data: dataFlowcashType }));
                
            } catch (error) {
                dispatch(setErrors(error.response.data));
                dispatch(resetStates());
            }


        }
    },


    createFlowcashType: (NewFlowcashType) => {
        return async (dispatch) => {

            try {
                dispatch(startCreating());


                await flowcashApi.post("/flowcash/flowcashType/create", {
                    NewFlowcashType
                });

                dispatch(setCreated());

                //Reload the state of data
                dispatch(FlowcashTypeThunks.getFlowcashType());


            } catch (error) {
                dispatch(setErrors(error.response.data));
                dispatch(resetStates());
            }

        }
    },

    updateFlowcash: (updateFlowcash, id) => {
        return async (dispatch) => {

            console.log("updateFlowcash: ", updateFlowcash);

            try {
                dispatch(startUpdating());
                
                
                await flowcashApi.post(`/flowcash/${id}/update`, {
                    updateFlowcash
                });
                
                
                dispatch(setUpdated()); //set the operation as done
                
                //Reload the state of data
                dispatch(FlowcashThunks.getFlowcash());
                     
               
            } catch (error) {
                dispatch(setErrors(error.response.data));
                dispatch(resetStates());
            }

        }
    },

    deleteFlowcash: (id) => {
        return async (dispatch) => {

            try {
                dispatch(startDeleting());
            
                // Request HTTP
                await flowcashApi.delete(`/flowcash/${id}/delete`);
                
                await dispatch(setDeleted());

                //Reload the state of data
                dispatch(FlowcashThunks.getFlowcash());
                
            } catch (error) {
                dispatch(setErrors(error.response.data));
                dispatch(resetStates());
            }
        }
    }
};