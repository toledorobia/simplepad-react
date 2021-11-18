import React, { useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Editor from "@monaco-editor/react";
import _ from "lodash";

import { setNotepadUnsaved } from "../features/notepad/notepadSlice";
import { updateNotepad } from "../backend/notepads";
import { toastError } from "../libs/toast";

const NotepadEditor = () => {
  console.log("NotepadEditor");

  const dispatch = useDispatch();
  const notepad = useSelector(
    (state) => state.notepad.notepads?.find((n) => n.selected === true),
    (left, right) => {
      return (_.isUndefined(left) && _.isUndefined(right))
        || (!_.isUndefined(left) && !_.isUndefined(right) && left.id === right.id);
    }
  );

  const saveContent = useCallback(async(value) => {
    try {
      await updateNotepad(notepad.id, { content: value });
    }
    catch (e) {
      console.error(e);
      toastError(e);
    }
  }, [notepad?.id]);

  const saveDebounce = useMemo(() => _.debounce(async(value) => {
    await saveContent(value);
  }, 2000), [notepad?.id]);

  const onChange = useCallback((value) => {
    if (notepad.saved == true) {
      dispatch(setNotepadUnsaved({ id: notepad.id }));
    }
    saveDebounce(value);
  }, [notepad?.id]);

  const options = useMemo(() => ({
    wordWrap: "off",
    quickSuggestions: false,
    minimap: {
      enabled: false,
    },
  }), [notepad?.id]);

  if (notepad == null) {
    return (
      <div className="d-flex justify-content-center align-items-center w-75 sp-editor-container text-muted">
        <div>
          Select a simplepad
        </div>
      </div>
    );
  }

  return <>
    <div className="w-75 sp-editor-container">
      <Editor theme="vs-dark"
        height="100%"
        value={notepad.content}
        defaultLanguage="plaintext"
        onChange={onChange}
        options={options} />
    </div>
  </>;
};

export default NotepadEditor;
