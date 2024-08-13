import { createSlice } from '@reduxjs/toolkit'

export const operationSlice = createSlice({
  name: 'operation',
  initialState: {
    data:[],
    isLoading: false
  },
  reducers: {
    startLoading: (state) =>{
        state.isLoading= true;
    },
    setOperation: (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data
    }
  }
})

// Action creators are generated for each case reducer function
export const { startLoading, setOperation } = operationSlice.actions

export default operationSlice.reducer