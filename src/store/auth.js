import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loaded: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

  }
});

export default authSlice.reducer;