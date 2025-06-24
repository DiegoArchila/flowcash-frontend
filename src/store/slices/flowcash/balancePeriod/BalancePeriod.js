import { createSlice } from '@reduxjs/toolkit'

// Redux slice for balance period state management
export const balancePeriodSlice = createSlice({
  name: 'balancePeriod',
  initialState: {
    data: [],
    isLoading: false,
    inProcess: false,
    isDone: false,
    errors: null,
    target: null
  },
  reducers: {
    // Data loading
    startLoadingData: (state) => {
      state.isLoading = true;
    },
    setBalanceData: (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
    },

    // Create process
    startCreating: (state) => {
      state.inProcess = true;
    },
    setCreated: (state) => {
      state.inProcess = false;
      state.isDone = true;
    },

    // Target management
    setTarget: (state, action) => {
      state.target = action.payload;
    },
    clearTarget: (state) => {
      state.target = null;
    },

    // Error handling
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    errorsClear: (state) => {
      state.errors = null;
    },

    // Reset process flags
    resetStates: (state) => {
      state.inProcess = false;
      state.isDone = false;
    }
  }
});

export const {
  startLoadingData,
  setBalanceData,
  startCreating,
  setCreated,
  setTarget,
  clearTarget,
  setErrors,
  errorsClear,
  resetStates
} = balancePeriodSlice.actions;

export default balancePeriodSlice.reducer;