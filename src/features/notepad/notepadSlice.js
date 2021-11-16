import { createSlice, } from "@reduxjs/toolkit";
import { isObjectWithId, } from "../../libs/helpers";

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
    setNotepadById: (state, action) => {
      state.notepad = state.notepads == null ? null : state.notepads.find((n) => n.id === action.payload);
    },
    setNotepadUnsaved: (state, action) => {
      if (state.notepad != null) {
        state.notepad.saved = false;
      }
    },
  },

});

export const { setNotepad, setNotepads, setNotepadById, setFilter, setNotepadUnsaved, } = notepadSlice.actions;

export default notepadSlice.reducer;
