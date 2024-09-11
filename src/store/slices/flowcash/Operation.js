import { createSlice } from '@reduxjs/toolkit'

export const operationSlice = createSlice({
  name: 'operation',
  initialState: {
    data:[], // Storage the data
    isLoading: false, // loading data

    inProcess:false,
    isDone:false,

    errors: null,
    target: null //this is for set the id to edit or delete

  },
  reducers: {
    
    //Function's load data
    startLoadingData: (state) =>{
        state.isLoading= true;
    },
    setOperationData: (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data
    },

    //Function's create 
    startCreating: (state) => {
      state.inProcess=true
    },
    setCreated: (state) => {
      state.inProcess=false,
      state.isDone=true
    },

    //Function's update 
    startUpdating: (state) => {
      state.inProcess=true
    },
    setUpdated: (state) => {
      state.inProcess=false,
      state.isDone=true
    },

    //Function's delete 
    startDeleting: (state) => {
      state.inProcess=true
    },
    setDeleted: (state) => {
      state.inProcess=false,
      state.isDone=true
    },

    //Function's target 
    setTarget: (state, action) => {
      state.target = action.payload
    },
    clearTarget: (state) => {
      state.target=null
    },

    
    //Function's errors 
    setErrors: (state, action) => {
      state.errors=action.payload
    },
    errorsClear: (state) => {
      state.errors=null
    },
    
    
    //Function's reset states
    //Deploy this function after some process is done
    resetStates: (state) => {
      state.inProcess=false,
      state.isDone=false
    },
  }
})

// Action creators are generated for each case reducer function
export const { 

  //load Data
  startLoadingData, 
  setOperationData,
  
  //start States
  startCreating,
  startUpdating,
  startDeleting,

  //set states
  setCreated,
  setUpdated,
  setDeleted,
  
  //Target
  setTarget,
  clearTarget,

  //errors
  setErrors,
  errorsClear,

  //reset states
  resetStates

} = operationSlice.actions

export default operationSlice.reducer