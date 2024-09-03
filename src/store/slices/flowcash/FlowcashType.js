import { createSlice } from '@reduxjs/toolkit'

export const flowcashTypeSlice = createSlice({
  name: 'flowcashs',
  initialState: {
    rows: [],
    isLoading: false,
    
    //CREATE
    isCreating: false,
    isCreated: false,
    
    //DELETE
    isDeleting: false, // deleting in process
    toDelete: null, //storage the ID to delete
    isDeleted: false, // confirm deleted successfull

    //ERRORS
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


    //CREATE
    startCreating: (state) => {
      state.isCreating = true
    },
    isCreated: (state) => {
      state.isCreating = false;
      state.isCreated = true;
    },
    createClear: (state) => {
      state.isCreating = false;
      state.isCreated = false;
    },
    
    //DELETE
    startDeleting: (state) =>{ //Initialize the deleting
      state.isDeleting=true;
    },
    setDeleted: (state) =>{ //Set the done the delete
      state.isDeleted=true;
      state.isDeleting=false;
    },
    deleteClear:(state) =>{ //Clear all states in delete
      state.isDeleting=false;
      state.isDeleted=false;
    },
    //set the ID to deleted 
    setDelete: (state, action) => { //sets the id to delete
      state.toDelete = action.payload;
    },

    //ERRORS
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

  //LOADING
  startLoading,
  setFlowcashTypes,

  //CREATE
  startCreating,
  isCreated,
  createClear,

  //DELETE
  isDeleting, // deleting in process
  toDelete, //storage the ID to delete
  isDeleted, // confirm deleted successfull

  startDeleting, //Initialize the deleting
  setDeleted, //Set the done the delete
  deleteClear, //Clear all states in delete
  setDelete, //sets the id to delete

  isError,
  errorsClear

} = flowcashTypeSlice.actions

export default flowcashTypeSlice.reducer