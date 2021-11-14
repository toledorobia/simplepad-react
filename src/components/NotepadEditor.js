import React, { useCallback, useContext, useMemo } from "react";
import Editor from "@monaco-editor/react";
import _ from "lodash";

import { DataContext } from "../providers/DataProvider";

const NotepadEditor = (props) => {
  console.log("NotepadEditor");
  const { notepad, setNotepad, updateNotepad } = useContext(DataContext);

  const onChangeSave = useMemo(() => _.debounce((value) => {
    try {
      updateNotepad(notepad.id, { content: value });
      console.log("guardado");
    } catch (e) {
      console.log(e);
      alert(e);
    }
  }, 1000), [notepad, updateNotepad]);

  if (notepad == null) {
    return (
      <div className="d-flex justify-content-center align-items-center w-75 sp-editor-container text-muted">
        <div>Select a simplepad</div>
      </div>
    );
  }

  return <>
    <div className="w-75 sp-editor-container">
      {notepad && <Editor
        theme="vs-dark"
        height="100%"
        value={notepad.content}
        defaultLanguage="plaintext"
        onChange={onChangeSave}
        options={{
          wordWrap: "off",
          quickSuggestions: false,
          minimap: {
            enabled: false
          }
        }} />
      }
    </div>
  </>
};

export default NotepadEditor;
