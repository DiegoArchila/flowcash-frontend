import { 
    resetStates, 
    setErrors, 
    setBalanceData, 
    startLoadingData,
    setCreated,
} from "./BalancePeriod";

import { FlowcashThunks } from "../FlowcashThunks";
import { FlowcashTypeThunks } from "../flowcashType/FlowcashTypeThunks";
import { reportsThunks } from "../reports/reportsThunks";

import { flowcashApi } from "../../../../api/flowcashApi";

export const BalancePeriodThunks = {
    /**
     * Get all balance periods
     * @param {number} count - Number of items per page
     * @param {number} page - Page number
     */
    getBalancesPeriods: (count=20, page=1) => {
        return async (dispatch) => {

            try {
                dispatch(startLoadingData());

             
                // Request HTTP
                const resp = await flowcashApi.get("/admin/flowcash/balance",
                    {
                        params:{
                            count: count,
                            page: page
                        }
                    }
                );

                const data= resp.data;
    
                dispatch(setBalanceData({ data: data }));
                
            } catch (error) {
                dispatch(setErrors(error.response.data));
                dispatch(resetStates());
            }

        }
    },

    createBalancePeriod: () => {
        return async (dispatch) => {

            try {
                dispatch(startLoadingData());

                // Request HTTP
                const resp = await flowcashApi.post("/admin/flowcash/reports/create");

                const data = resp.data;

                console.log("Response from createBalancePeriod", data);


                dispatch(FlowcashThunks.getFlowcash());
                dispatch(FlowcashTypeThunks.getFlowcashType());
                dispatch(reportsThunks.getReportsFlowcash());
                dispatch(setCreated());

            } catch (error) {
                dispatch(setErrors(error.response.data));
                dispatch(resetStates());
            }
        }
    },
};