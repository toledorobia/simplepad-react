import React, { useRef, useMemo, useCallback, useState, useEffect, } from "react";
import { useDispatch, useSelector, } from "react-redux";
import Editor from "@monaco-editor/react";
import _ from "lodash";

import { setNotepadUnsaved, } from "../features/notepad/notepadSlice";
import { updateNotepad, } from "../backend/notepads";
import { toastError, } from "../libs/toast";

const NotepadEditor = () => {
  console.log("NotepadEditor");

  const dispatch = useDispatch();
  const notepad = useSelector((state) => state.notepad.notepad);
  const editorRef = useRef(null);

  const saveContent = useCallback(async (value) => {
    console.log("saveContent", notepad.name);
    try {
      await updateNotepad(notepad.id, { content: value, });
    } catch (e) {
      console.error(e);
      toastError(e);
    }
  }, [notepad]);

  const saveDebounce = useMemo(() => _.debounce(async (value) => {
    await saveContent(value);
  }, 2000), [notepad]);

  const onChange = useCallback((value) => {
    dispatch(setNotepadUnsaved({ id: notepad.id, }));
    saveDebounce(value);
  }, [notepad]);

  const handleEditorDidMount = useCallback((editor, monaco) => {
    // console.log("handleEditorDidMount", editor);
    editorRef.current = editor;
  });

  useEffect(() => {
    return () => {
      if (editorRef.current == null) {
        return;
      }

      console.log("useeffect", notepad.name, editorRef.current.getValue());
      // saveContent(editorRef.current.getValue());
    };
  });

  if (notepad == null) {
    return (
      <div className="d-flex justify-content-center align-items-center w-75 sp-editor-container text-muted">
        <div>Select a simplepad</div>
      </div>
    );
  }

  return <>
    <div className="w-75 sp-editor-container">
      {notepad && <Editor theme="vs-dark"
        height="100%"
        value={notepad.content}
        defaultLanguage="plaintext"
        onChange={onChange}
        onMount={handleEditorDidMount}
        options={{
          wordWrap: "off",
          quickSuggestions: false,
          minimap: {
            enabled: false,
          },
        }} />
      }
    </div>
  </>;
};

export default NotepadEditor;
