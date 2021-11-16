import { configureStore, } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import notepadReducer from "./features/notepad/notepadSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    notepad: notepadReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        "notepad/setNotepads",
        "notepad/setNotepad",
        "notepad/setFilter",
        "notepad/setNotepadUnsaved",
        "notepad/putNotepadUpdate"
      ],
    },
  }),

});
