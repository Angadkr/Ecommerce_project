import { urlConfig } from "../config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Import Axios

// Define the initial state
const initialState = {
  user: "",
  users: [],
  loading: false,
  error: null,
};
// Define the get user async thunk

export const getUser = createAsyncThunk("fetch/user", async (id) => {
  try {
    const response = await axios.get(`${urlConfig}/user/profile?id=${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});


// Define the fetch all users async thunk
export const fetchAllUsers = createAsyncThunk("fetch/allUsers", async () => {
  try {
    const response = await axios.get(`${urlConfig}/users`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Create the auth slice
// here in auth slice we have also created a singnOut reducer seperatly why?
// to remove any data from the state as well as local storage once the user is signed out
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = "";
      state.token = "";
      state.loading = false;
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => { // Fixed action parameter
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.users = payload;
        state.error = null;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => { // Fixed action parameter
        state.loading = false;
        state.error = action.error.message;
      })


  },
});

// Export the reducer and action creator
export const {signOut } = authSlice.actions;
export default authSlice.reducer;