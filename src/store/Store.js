import { configureStore } from "@reduxjs/toolkit";
import { flowcashTypeSlice } from "./slices/flowcash/FlowcashType";
import { operationSlice } from "./slices/flowcash/Operation";

export const Store = configureStore({
    reducer: {
        flowcashType: flowcashTypeSlice.reducer,
        operation: operationSlice.reducer
    }
});