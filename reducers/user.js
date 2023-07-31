import { createSlice } from '@reduxjs/toolkit';

const initialState = {
value: { 
  email: null,
  token: null 
},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
    }
  }
});

export const {login} = userSlice.actions;
export default userSlice.reducer;
