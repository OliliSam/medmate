// import { createSlice } from "@reduxjs/toolkit";
// import { Users } from "./pages/Users";


// const initialState={
//     users: [Users],
// };

// const userSlice = createSlice({
//     name: "users",
//     initialState,
//     reducers: {
//        addUser: (state, action) => {
//            state.users.push(action.payload);
//        },
//        removeUser: (state, action) => {
//        }
//     }  
// });
// export const{addUser, removeUser} = userSlice.actions;
// export default userSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import customFetch from './utils/axios';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, thunkAPI) =>{
try {
  const response = await customFetch.get('/users')
} catch (error) {
  thunkAPI.rejectWithValue(error)
}
})

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsersRequest(state) {
      state.loading = true;
    },
    fetchUsersSuccess(state, action) {
      state.loading = false;
      state.users = action.payload;
    },
    fetchUsersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    loginUserRequest(state, action) {
      const user = state.users.find((user) => user.id === action.payload);
      if (user) {
        user.loggedIn = true;
      }
    },
    logoutUserRequest(state, action) {
      const user = state.users.find((user) => user.id === action.payload);
      if (user) {
        user.loggedIn = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true
    }).addCase(fetchUsers.fulfilled, (state, {payload}) =>{
      state.loading = false;
      state.users = payload
    })
  }
});

export const {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  loginUserRequest,
  logoutUserRequest,
} = userSlice.actions;

export default userSlice.reducer;


