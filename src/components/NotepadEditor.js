import React, { useRef, useEffect, useMemo, useCallback, } from "react";
import { useDispatch, useSelector, } from "react-redux";
import Editor, { useMonaco, } from "@monaco-editor/react";
import _ from "lodash";

import { setNotepadUnsaved, } from "../features/notepad/notepadSlice";
import { updateNotepad, } from "../backend/notepads";
import { toastError, } from "../libs/toast";

const NotepadEditor = () => {
  console.log("NotepadEditor");
  const dispatch = useDispatch();
  const monaco = useMonaco();

  const notepad = useSelector((state) => state.notepad.notepad);
  console.log("notepad name", notepad == null ? 'none' : notepad.name);

  const onChangeSave = useMemo(() => _.debounce(async (value) => {
    console.log("onChangeSave", notepad.name);

    try {
      await updateNotepad(notepad.id, { content: value, });
    } catch (e) {
      console.error(e);
      toastError(e);
    }
  }, 1000), [notepad]);

  useEffect(() => {
    return () => {
      if (monaco != null && monaco.editor != null && monaco.editor.getModels().length > 0) {
        const value = monaco.editor.getModels()[0].getValue();
        onChangeSave(value);
      }
    };
  });

  // const handleEditorDidMount = useCallback((editor, monaco) => {
  //   editorRef.current = editor;
  //   editor.onDidChangeModelContent(event => {
  //     dispatch(setNotepadUnsaved());
  //   });
  // }, [notepad]);

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
        onChange={onChangeSave}
        // onMount={handleEditorDidMount}
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
