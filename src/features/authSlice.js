import { createSlice } from "@reduxjs/toolkit";

// The access token lives in memory only; the refresh token is an httpOnly cookie.
// `status` is "checking" until the session restore on page load has finished.
const initialState = {
  user: null,
  accessToken: null,
  status: "checking", // "checking" | "authenticated" | "unauthenticated"
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.status = "authenticated";
    },
    clearCredentials: () => ({ ...initialState, status: "unauthenticated" }),
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
