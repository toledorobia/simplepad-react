import { createSlice, } from "@reduxjs/toolkit";

const initialState = {
  notepad: null,
  notepads: null,
  filter: "",
};

export const notepadSlice = createSlice({
  name: "notepad",
  initialState,
  reducers: {
    setNotepads: (state, action) => {
      state.notepads = action.payload;
    },
    setNotepad: (state, action) => {
      state.notepad = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },

});

export const { setNotepad, setNotepads, setFilter, } = notepadSlice.actions;

export default notepadSlice.reducer;
