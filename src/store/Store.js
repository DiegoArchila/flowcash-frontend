import { configureStore } from "@reduxjs/toolkit";

import { flowcashSlice } from "./slices/flowcash/Flowcash";
import { flowcashTypeSlice } from "./slices/flowcash/flowcashType/FlowcashType";
import { operationSlice } from "./slices/flowcash/operation/Operation";
import { operationTypeSlice } from "./slices/flowcash/operationType/OperationType";
import { reportsFlowcashSlice } from "./slices/flowcash/reports/Reports";
import { UserSlice } from "./slices/user/User";
import { balancePeriodSlice } from "./slices/flowcash/balancePeriod/BalancePeriod";

export const Store = configureStore({
    reducer: {
        flowcash: flowcashSlice.reducer,
        flowcashType: flowcashTypeSlice.reducer,
        operation: operationSlice.reducer,
        operationType: operationTypeSlice.reducer,
        reportsFlowcash: reportsFlowcashSlice.reducer,
        balancePeriod: balancePeriodSlice.reducer,
        user: UserSlice.reducer
    }
});