import { createSlice } from '@reduxjs/toolkit'

const getInitialState = () => {

  const storedUser = localStorage.getItem('MablaUser');

  if (storedUser) {

    const user = JSON.parse(storedUser);

    return {
      userId: user.id,
      userName: user.username,
      role: user.role,
      JWTToken: user.token,
      isAuthenticated: (user.token != null) ? true : false,
      isLoading: false,
      errors: null,
    }
  }
  return {
    userId: null,
    userName: null,
    role: null,
    JWTToken: null,
    isAuthenticated: false,
    isLoading: false,
    errors: null,
  };

};

export const UserSlice = createSlice({
  name: 'user',
  initialState: getInitialState(),
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
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
      state.userName = null;
      state.role = null;
      state.JWTToken = null;
    },

    //Function's errors 
    setErrors: (state, action) => {
      state.errors = action.payload
    },
    errorsClear: (state) => {
      state.errors = null
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