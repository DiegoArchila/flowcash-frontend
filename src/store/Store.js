import { configureStore } from "@reduxjs/toolkit";
import { flowcashTypeSlice } from "./slices/flowcash/FlowcashType";
import { operationSlice } from "./slices/flowcash/Operation";
import { operationTypeSlice } from "./slices/flowcash/operationType";

export const Store = configureStore({
    reducer: {
        flowcashType: flowcashTypeSlice.reducer,
        operation: operationSlice.reducer,
        operationType: operationTypeSlice.reducer
    }
});