import { createSlice } from "@reduxjs/toolkit";

interface authState {
  user: object | null;
  token: string | null;
  userId: string | null;
}

const initialState = {
  user: JSON.parse(localStorage.getItem("user") || "{}") || null, // token data
  token: localStorage.getItem("token") || "",
  userId: localStorage.getItem("userId") || "",
} satisfies authState as authState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.userId = action.payload.user.sub;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("userId", action.payload.user.sub);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.userId = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
