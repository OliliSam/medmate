import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTokenToLocalStorage,
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeTokenFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";
import customFetch from "../../utils/axios";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get("/user/all-users");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (credential, thunkAPI) => {
    try {
      const response = await customFetch.post("/auth/login", {
        email: credential.email,
        password: credential.password,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.error || "Login Failed",
      );
    }
  },
);

const initialState = {
  users: [],
  user: getUserFromLocalStorage(),
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      removeUserFromLocalStorage();
      removeTokenFromLocalStorage();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.users = payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        addUserToLocalStorage(payload.user);
        addTokenToLocalStorage(payload.token);
      });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
