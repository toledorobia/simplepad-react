import React, { useCallback, useContext, useMemo, } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { getFirestore, doc, updateDoc, } from "firebase/firestore";
import Editor from "@monaco-editor/react";
import _ from "lodash";

const NotepadEditor = () => {
  const db = getFirestore();

  const notepad = useSelector((state) => state.notepad.notepad);
  console.log("NotepadEditor", notepad);
  // const { notepad, setNotepad, updateNotepad, } = useContext(DataContext);

  const onChangeSave = useMemo(() => _.debounce(async (value) => {
    try {
      // updateNotepad(notepad.id, { content: value, });

      const ref = doc(db, "notepads", notepad.id);
      await updateDoc(ref, { content: value, });

      console.log("guardado");
    } catch (e) {
      console.log(e);
      alert(e);
    }
  }, 1000), [notepad]);

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
