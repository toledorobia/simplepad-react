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
  const editorRef = useRef(null);
  const disposableRef = useRef(null);
  const [firstLoad, setFirstLoad] = useState(true);
  const notepad = useSelector((state) => state.notepad.notepad);

  const onChangeSave = useMemo(() => _.debounce(async (value) => {
    console.log("onChangeSave", notepad.name);

    try {
      await updateNotepad(notepad.id, { content: value, });
    } catch (e) {
      console.error(e);
      toastError(e);
    }
  }, 1000), [notepad]);

  // useEffect(() => {
  //   console.log("useEffect editorRef", editorRef.current);
  // }, [editorRef.current]);

  // useEffect(() => {
  //   if (notepad != null) {
  //     return;
  //   }

  //   if (editorRef.current != null) {
  //     disposableRef.current = editorRef.current.onDidChangeModelContent(event => {
  //       dispatch(setNotepadUnsaved({ id: notepad.id, }));
  //       console.log("tecleo!", notepad.name, firstLoad);
  //     });
  //   }

  //   return () => {
  //     if (disposableRef.current != null) {
  //       disposableRef.current.dispose();
  //     }
  //   };
  // }, [notepad, editorRef.current]);

  const handleEditorDidMount = useCallback((editor, monaco) => {
    console.log("handleEditorDidMount", editor);
    editorRef.current = editor;
  });

  useEffect(() => {
    if (editorRef.current != null) {
      disposableRef.current = editorRef.current.onDidChangeModelContent(event => {
        dispatch(setNotepadUnsaved({ id: notepad.id, }));
        console.log("tecleo!", notepad.name, firstLoad);
      });
    }

    return () => {
      if (disposableRef.current != null) {
        disposableRef.current.dispose();
      }
    };
  }, [notepad]);

  // const handleEditorDidMount = useCallback((editor, monaco) => {
  //   editorRef.current = editor;

  //   editor.onDidChangeModelContent(event => {
  //     setFirstLoad(false);
  //     dispatch(setNotepadUnsaved({ id: notepad.id, }));
  //     console.log("tecleo!", notepad.name, firstLoad);
  //   });
  // }, [notepad, firstLoad]);

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
