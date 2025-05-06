import { createSlice } from '@reduxjs/toolkit'

export const UserSlice = createSlice({
  name: 'user',
  initialState: {

    userId: null,
    userName: null,
    role: null,
    JWTToken: localStorage.getItem('JWTToken') || null,
    isAuthenticated: false,
    isLoading: false, // loading data

    errors: null,

  },
  reducers: {

    startLoading: (state) => {
      state.isLoading = true;
    },
    
    stopLoading: (state) => {
      state.isLoading = false;
    },

    SetUser: (state, action) => {
      state.isAuthenticated = true;
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      state.role = action.payload.role;
      state.JWTToken = action.payload.JWTToken;
      localStorage.setItem('JWTToken', action.payload.JWTToken);
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
      state.userName = null;
      state.role = null;
      state.JWTToken = null;
      localStorage.removeItem('JWTToken');
    },

    //Function's errors 
    setErrors: (state, action) => {
      state.errors=action.payload
    },
    errorsClear: (state) => {
      state.errors=null
    }
  }
})

// Action creators are generated for each case reducer function
export const { 

  SetUser,
  logout,

  startLoading,
  stopLoading,
  
  //errors
  setErrors,
  errorsClear,

} = UserSlice.actions

export default UserSlice.reducer