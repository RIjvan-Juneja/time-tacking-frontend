import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    name: null,
    role: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.name = null;
      state.role = null;
    },
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.role = action.payload.role;
    }
  },
});

export const { logout } = userSlice.actions;
export const { loginSuccess } = userSlice.actions;
export default userSlice.reducer;
