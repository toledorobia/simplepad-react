import React, { useState, useEffect, useContext } from "react";
import { db } from "../firebase";

import { AuthContext } from "./AuthProvider";

export const DataContext = React.createContext({
  query: "",
  notepad: null,
  notepads: null,
  notepadsFilter: null,
  newNotepad: null,
  updateNotepad: null,
  deleteNotepad: null,
  setNotepadById: null,
  setQuery: null,
});

export const DataProvider = (props) => {
  const { uid } = useContext(AuthContext);

  const [notepads, setNotepads] = useState(null);
  const [notepadsFilter, setNotepadsFilter] = useState(null);
  const [notepad, setNotepad] = useState(null);
  const [query, setQuery] = useState("");

  const newNotepad = (data) => {
    return db.collection("notepads").add({ 
      content: "",
      updateAt: null,
      createdAt: Date.now(), 
      ...data 
    });
  }

  const updateNotepad = (id, data) => {
    return db.collection("notepads").doc(id).update({ updateAt: Date.now(), ...data });
  }

  const deleteNotepad = (id) => {
    if (notepad != null && notepad.id == id) {
      setNotepad(null);
    }
    
    return db.collection("notepads").doc(id).delete();
  }

  const setNotepadById = async (id) => {
    const doc = await db.collection("notepads").doc(id).get();
    console.log("set notepad", doc);
  }

  useEffect(() => {
    console.log("notepads useEffect");
    const unsubscribe = db
      .collection('notepads')
      // .orderBy('nombre')
      .onSnapshot(
        snap => {
          const items = snap.docs.map(doc => {
            let d = doc.data();
            let id = doc.id;

            return { ...d, id };
          });

          setNotepads(items);
        },
        err => {
          console.log(err);
        },
      );

    return () => unsubscribe();
  }, [uid]);

  useEffect(() => {
    let _query = query === null ? '' : query.replace(/ /g, '').toUpperCase();
    let _notepads = notepads === null ? null : notepads.filter(item => {
      return query.length === 0 || item.name.toUpperCase().indexOf(_query) > -1;
    });

    setNotepadsFilter(_notepads);
  }, [notepads, query]);

  return (
    <DataContext.Provider value={{
      notepad,
      notepads,
      notepadsFilter,
      setNotepad,
      newNotepad,
      updateNotepad,
      deleteNotepad,
      setNotepadById,
      setQuery,
    }}>
      {props.children}
    </DataContext.Provider>
  );
};