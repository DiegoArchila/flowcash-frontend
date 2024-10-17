import { 
    resetStates, 
    setErrors, 
    setReportsData, 
    startLoadingData
} from "./Reports";

import { flowcashApi } from "../../../../api/flowcashApi";
import { FlowcashTypeThunks } from "../flowcashType/FlowcashTypeThunks";

export const reportsThunks = {

    getReportsFlowcash: () => {
        return async (dispatch) => {

            try {
                dispatch(startLoadingData());
    
                // Request HTTP
                const resp = await flowcashApi.get("/flowcash/reports");
    
                const data= resp.data;
    
                dispatch(setReportsData({ data: data }));
                
            } catch (error) {
                dispatch(setErrors(error.response.data));
                dispatch(resetStates());
            }

        }
    }
};