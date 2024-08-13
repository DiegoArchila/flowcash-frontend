import { createSlice } from '@reduxjs/toolkit'

export const flowcashTypeSlice = createSlice({
  name: 'flowcashs',
  initialState: {
    rows:[],
    isLoading: false
  },
  reducers: {
    startLoading: (state) =>{
        state.isLoading= true;
    },
    setFlowcashTypes: (state, action) => {
      state.isLoading = false;
      state.rows = action.payload.rows
    }
  }
})

// Action creators are generated for each case reducer function
export const { startLoading, setFlowcashTypes } = flowcashTypeSlice.actions

export default flowcashTypeSlice.reducer