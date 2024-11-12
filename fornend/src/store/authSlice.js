import { createSlice } from "@reduxjs/toolkit";

const storedToken = localStorage.getItem('token');
const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;


const initialState = {
  token: storedToken || null,
  userData: storedUser || null,
  status: storedToken && storedUser ? true : false, 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData; // Assuming userData is part of the payload
      state.token = action.payload.token; // Assuming token is part of the payload
    },
    logout: (state) => {
      state.status = false;
      state.token = null;
      state.userData = null;
      localStorage.removeItem('token'); // Clear token from localStorage
      localStorage.removeItem('user'); 
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
