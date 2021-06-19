import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

import Navbar from "../components/Navbar";
import NoteListItem from "../components/NoteListItem";
import FloatingActionButton from "../components/FloatingActionButton";

const MonacoEditorPage = () => {
  console.log("Editor page");

  const onPaste = async (e) => {
    const text = await navigator.clipboard.readText();
    console.log("on paste", e, text);
  };

  useEffect(() => {
    document.body.addEventListener('paste', onPaste);

    return () => {
      document.body.removeEventListener('paste', onPaste);
    }
  });

  const items = [...Array(30).keys()].map(i => <NoteListItem key={i} />);

  return <>
    <div className="d-flex">
      <div className="w-25 vh-100 overflow-auto">
        <Navbar />
        <div className="list-group rounded-0">
          <a href="#" className="list-group-item list-group-item-action active" aria-current="true">
            The current link item
          </a>
          {items}
        </div>
        {/* <FloatingActionButton /> */}
      </div>
      <div className="w-75 vh-100 border-left-grey">
        <Editor
          theme="vs-dark"
          height="100vh"
          defaultLanguage="plaintext"
          defaultValue="// some comment"
          options={{
            wordWrap: "on",
            quickSuggestions: false,
            minimap: {
              enabled: false
            }
          }}
        />
      </div>

    </div>
  </>
}

export default MonacoEditorPage;