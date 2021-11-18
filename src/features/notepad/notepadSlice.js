import { createSlice } from "@reduxjs/toolkit";

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
      const selected = state.notepads?.find((n) => n.selected === true);
      const notepads = action.payload?.map((n) => {
        if (selected != null && selected.id === n.id) {
          n.selected = true;
        }

        return n;
      });

      state.notepads = notepads;
    },
    setNotepad: (state, action) => {
      state.notepad = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setNotepadById: (state, action) => {
      // state.notepad = state.notepads == null ? null : state.notepads.find((n) => n.id === action.payload);
      const id = action.payload;

      state.notepads = state.notepads.map((n) => {
        if (n.id === id) {
          n.selected = true;
        }
        else {
          n.selected = false;
        }

        return n;
      });
    },
    unsetNotepad: (state) => {
      state.notepads = state.notepads.map((n) => {
        n.selected = false;
        return n;
      });
    },
    setNotepadUnsaved: (state, action) => {
      const { id } = action.payload;

      state.notepads = state.notepads.map((n) => {
        if (n.id === id) {
          n.saved = false;
        }

        return n;
      });
    },
  },

});

export const { setNotepads, setNotepadById, setFilter, setNotepadUnsaved, unsetNotepad } = notepadSlice.actions;

export default notepadSlice.reducer;
