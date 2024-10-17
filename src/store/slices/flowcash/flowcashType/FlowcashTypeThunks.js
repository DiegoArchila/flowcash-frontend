import { resetStates, setCreated, setDeleted, setErrors, setFlowcashTypeData, setUpdated, startCreating, startDeleting, startLoadingData, startUpdating } from "./FlowcashType";
import { flowcashApi } from "../../../../api/flowcashApi";
import { reportsThunks } from "../reports/reportsThunks";


export const FlowcashTypeThunks = {

    getFlowcashType: () => {
        return async (dispatch) => {

            try {
                dispatch(startLoadingData());
    
                // Request HTTP
                const resp = await flowcashApi.get("/flowcash/flowcashtype");
    
                const dataFlowcashType= resp.data.data.rows.sort((a, b) => a.name.localeCompare(b.name));
    
                dispatch(setFlowcashTypeData({ data: dataFlowcashType }));
                
            } catch (error) {
                dispatch(setErrors(error.response.data));
                dispatch(resetStates());
            }


        }
    },


    createFlowcashType: (NewFlowcash_type) => {
        return async (dispatch) => {

            try {
                dispatch(startCreating());


                await flowcashApi.post("/flowcash/flowcashType/create", {
                    NewFlowcash_type
                });

                dispatch(setCreated());

                //Reload the state of data
                dispatch(FlowcashTypeThunks.getFlowcashType());

                //On every update from the state Flowcash, the we update the Report's state
                dispatch(reportsThunks.getReportsFlowcash());


            } catch (error) {
                dispatch(setErrors(error.response.data));
                dispatch(resetStates());
            }

        }
    },

    updateFlowcashType: (updateFlowcash_type, id) => {
        return async (dispatch) => {

            try {
                dispatch(startUpdating());
                
                
                await flowcashApi.post(`/flowcash/flowcashtype/${id}/update`, {
                    updateFlowcash_type
                });
                
                
                dispatch(setUpdated()); //set the operation as done
                
                //Reload the state of data
                dispatch(FlowcashTypeThunks.getFlowcashType());

                //On every update from the state Flowcash, the we update the Report's state
                dispatch(reportsThunks.getReportsFlowcash());
                     
               
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
                await flowcashApi.delete(`/flowcash/flowcashType/${id}/delete`);
                
                await dispatch(setDeleted());

                //Reload the state of data
                dispatch(FlowcashTypeThunks.getFlowcashType());

                //On every update from the state Flowcash, the we update the Report's state
                dispatch(reportsThunks.getReportsFlowcash());
                
            } catch (error) {
                dispatch(setErrors(error.response.data));
                dispatch(resetStates());
            }
        }
    }
};