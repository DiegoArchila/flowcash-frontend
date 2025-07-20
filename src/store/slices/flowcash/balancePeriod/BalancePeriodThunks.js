import { 
    resetStates, 
    setErrors, 
    setBalanceData, 
    startLoadingData
} from "./BalancePeriod";

import { flowcashApi } from "../../../../api/flowcashApi";

export const BalancePeriodThunks = {

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

                console.log("data",data);
    
                dispatch(setBalanceData({ data: data }));
                
            } catch (error) {
                dispatch(setErrors(error.response.data));
                dispatch(resetStates());
            }

        }
    }
};