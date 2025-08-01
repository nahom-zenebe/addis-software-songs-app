import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,      
  status: 'idle',   
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  
    fetchUserRequest(state) {
      state.status = 'loading';
      state.error = null;
    },
    fetchUserSuccess(state, action) {
      state.status = 'succeeded';
      state.user = action.payload;
    },
    fetchUserFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },


    loginRequest(state) {
      state.status = 'loading';
      state.error = null;
    },
    loginSuccess(state, action) {
      state.status = 'succeeded';
      state.user = action.payload;
    },
    loginFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },

    // Signup actions
    signupRequest(state) {
      state.status = 'loading';
      state.error = null;
    },
    signupSuccess(state, action) {
      state.status = 'succeeded';
      state.user = action.payload;
    },
    signupFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },

    // Logout action
    logout(state) {
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },

    // Reset error or status if needed
    clearError(state) {
      state.error = null;
    },
    resetStatus(state) {
      state.status = 'idle';
    }
  },
});

export const {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,

  loginRequest,
  loginSuccess,
  loginFailure,

  signupRequest,
  signupSuccess,
  signupFailure,

  logout,

  clearError,
  resetStatus
} = userSlice.actions;

export default userSlice.reducer;
