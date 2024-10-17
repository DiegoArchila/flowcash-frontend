import { resetStates, setCreated, setDeleted, setErrors, setFlowcashData, setUpdated, startCreating, startDeleting, startLoadingData, startUpdating } from "./Flowcash";
import { flowcashApi } from "../../../api/flowcashApi";
import { reportsThunks } from "./reports/reportsThunks";



export const FlowcashThunks = {

    getFlowcash: () => {
        return async (dispatch) => {

            try {
                dispatch(startLoadingData());
    
                // Request HTTP
                const resp = await flowcashApi.get("/flowcash");

                const data= resp.data.data.rows;
    
                dispatch(setFlowcashData({ data: data }));
                
            } catch (error) {
                dispatch(setErrors(error.response.data));
                dispatch(resetStates());
            }


        }
    },


    createFlowcash: (NewFlowcash) => {
        return async (dispatch) => {

            try {
                dispatch(startCreating());


                await flowcashApi.post("/flowcash/create", {
                    NewFlowcash
                });

                dispatch(setCreated());

                //Reload the state of data
                dispatch(FlowcashThunks.getFlowcash());
                 
                //On every update from the state Flowcash, the we update the Report's state
                dispatch(reportsThunks.getReportsFlowcash());


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
                await flowcashApi.delete(`/flowcash/${id}/delete`);
                
                await dispatch(setDeleted());

                //Reload the state of data
                dispatch(FlowcashThunks.getFlowcash());

                //On every update from the state Flowcash, the we update the Report's state
                dispatch(reportsThunks.getReportsFlowcash());
                
            } catch (error) {
                dispatch(setErrors(error.response.data));
                dispatch(resetStates());
            }
        }
    }
};