import { createSlice } from "@reduxjs/toolkit";

interface authState {
  user: object | null;
  token: string | null;
  userId: string | null;
}

const initialState = {
  user: JSON.parse(localStorage.getItem("user") || "{}") || null,
  token: localStorage.getItem("token") || "",
  userId: localStorage.getItem("userId") || "",
} satisfies authState as authState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {},
    logout: (state) => {},
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
