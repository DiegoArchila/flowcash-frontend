
import { flowcashApi } from "../../../api/flowcashApi";
import { 
    setCreated, 
    isError, 
    setFlowcashTypes, 
    startCreating, 
    startLoading, 
    createClear,

    startDeleting, //Initialize the deleting
    setDeleted, //Set the done the delete
    deleteClear, //Clear all states in delete

} from "./FlowcashType";



export const FlowcashTypeThunks = {

    getFlowcashTypes: () => {
        return async (dispatch) => {
            dispatch(startLoading());

            // Request HTTP
            const resp = await flowcashApi.get("/flowcash/flowcashtype");

            const data= resp.data.data.rows.sort((a, b) => a.name.localeCompare(b.name));

            dispatch(setFlowcashTypes({ rows: data }));
        }
    },


    createFlowcashType: (NewFlowcash_type) => {
        return async (dispatch) => {

            try {
                dispatch(startCreating());


                await flowcashApi.post("/flowcash/flowcashtype/create", {
                    NewFlowcash_type
                });

                dispatch(setCreated());

                //Update the state:rows
                // Agregar un pequeño retraso de 100ms antes de continuar con las otras acciones
                dispatch(FlowcashTypeThunks.getFlowcashTypes()); // Actualiza el estado: rows

            } catch (error) {
                dispatch(createClear());
                dispatch(isError(error.response.data));
            }

        }
    },

    updateFlowcashType: (updateFlowcash_type, id) => {
        return async (dispatch) => {

            
            try {
                dispatch(startCreating());
                
                
                await flowcashApi.post(`/flowcash/flowcashtype/${id}/update`, {
                    updateFlowcash_type
                });
                
                
                dispatch(setCreated()); //establece isCreated=true
                
                // Agregar un pequeño retraso de 100ms antes de continuar con las otras acciones
                dispatch(FlowcashTypeThunks.getFlowcashTypes()); // Actualiza el estado: rows
                

            } catch (error) {
                dispatch(createClear());
                dispatch(isError(error.response?.data));
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
                // Agregar un pequeño retraso de 100ms antes de continuar con las otras acciones
                setTimeout(() => {
                    dispatch(FlowcashTypeThunks.getFlowcashTypes()); // Actualiza el estado: rows
                }, 50);
                
            } catch (error) {
                dispatch(deleteClear());
                dispatch(isError(error.response.data));
            }
        }
    }
};