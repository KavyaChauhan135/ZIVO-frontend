import { createSlice } from "@reduxjs/toolkit";

// The access token lives in memory only; the refresh token is an httpOnly cookie.
const initialState = {
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    clearCredentials: () => initialState,
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
