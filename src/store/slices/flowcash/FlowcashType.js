import { createSlice } from '@reduxjs/toolkit'

export const flowcashTypeSlice = createSlice({
  name: 'flowcashs',
  initialState: {
    rows: [],
    isLoading: false,
    isCreating: false,
    isCreated: false,
    errors: null
  },
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    setFlowcashTypes: (state, action) => {
      state.isLoading = false;
      state.rows = action.payload.rows
    },
    startCreating: (state) => {
      state.isCreating = true
    },
    isCreated: (state) => {
      state.isCreated
    },
    created: (state) => {
      state.isCreating = false
    },
    isError: (state, action) => {
      state.isCreating = false
      state.errors = action.payload
    },
    errorsClear: (state) => {
      state.errors = null;
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  startLoading,
  setFlowcashTypes,
  startCreating,
  created,
  isError,
  errorsClear

} = flowcashTypeSlice.actions

export default flowcashTypeSlice.reducer