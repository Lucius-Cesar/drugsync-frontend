import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    mail: null,
    token: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.mail = action.payload.email;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.mail = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
