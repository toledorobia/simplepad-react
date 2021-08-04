import React, { useContext, useMemo } from "react";
import Editor from "@monaco-editor/react";
import _ from "lodash";

import { DataContext } from "../providers/DataProvider";

const NotepadEditor = (props) => {
  console.log("NotepadEditor");
  const { notepad, updateNotepad } = useContext(DataContext);

  const onChange = useMemo(() => _.debounce((value, event) => {
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
      <div className="d-flex justify-content-center align-items-center w-75 vh-100 text-muted">
        <div>Select a simplepad</div>
      </div>
    );
  }

  return <>
    <div className="w-75">
      {notepad && <Editor
        theme="vs-dark"
        height="100vh"
        value={notepad.content}
        defaultLanguage="plaintext"
        onChange={onChange}
        options={{
          wordWrap: "on",
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
