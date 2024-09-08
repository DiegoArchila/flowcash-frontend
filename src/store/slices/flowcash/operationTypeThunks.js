import { setOperationTypeData,  startLoadingData } from "./operationType";
import { flowcashApi } from "../../../api/flowcashApi";

export const OperationTypeThunks = {

    getOperationsType: () => {
        return async (dispatch) => {
            dispatch(startLoadingData());

            // Request HTTP
            const resp = await flowcashApi.get("/flowcash/operationtype");

            const data= resp.data.data.rows.sort((a, b) => a.type.localeCompare(b.type));

            dispatch(setOperationTypeData({ data: data }));
        }
    },

};