import React, { useState, useEffect, useContext } from "react";
import { db } from "../firebase";
import { firebaseDocToObject, firebaseDateNow } from "../libs/helpers";
import _ from "lodash";

import { AuthContext } from "./AuthProvider";

export const DataContext = React.createContext({
  query: "",
  notepad: null,
  notepads: null,
  newNotepadId: null,
  notepadsFilter: null,
  getNotepads: null,
  newNotepad: null,
  updateNotepad: null,
  deleteNotepad: null,
  setNewNotepadId: null,
  setQuery: null,
});

export const DataProvider = (props) => {
  const { auth } = useContext(AuthContext);

  const [notepads, setNotepads] = useState(null);
  const [notepadsFilter, setNotepadsFilter] = useState(null);
  const [notepad, setNotepad] = useState(null);
  const [newNotepadId, setNewNotepadId] = useState(null);
  const [query, setQuery] = useState("");

  const getNotepads = async () => {
    const snap = await db.collection("notepads").where("uid", "==", auth.uid).orderBy('name').get();
    const items = snap.docs.map(doc => firebaseDocToObject(doc, { saved: true }));
    setNotepads(items);
  }

  const newNotepad = (data) => {
    const now = firebaseDateNow();

    return db.collection("notepads").add({
      uid: auth.uid,
      content: "",
      updateAt: now,
      createdAt: now,
      ...data
    });
  }

  const updateNotepad = (id, data) => {
    const now = firebaseDateNow();
    return db.collection("notepads").doc(id).update({ updateAt: now, ...data });
  }

  const deleteNotepad = (id) => {
    if (notepad != null && notepad.id == id) {
      setNotepad(null);
    }

    return db.collection("notepads").doc(id).delete();
  }

  useEffect(() => {
    const unsubscribe = db
      .collection('notepads')
      .where("uid", "==", auth.uid)
      .orderBy('name')
      .onSnapshot(
        snap => {
          const items = snap.docs.map(doc => firebaseDocToObject(doc, { saved: true }));
          setNotepads(items);
        },
        err => {
          console.log(err);
        },
      );

    return () => unsubscribe();

    // getNotepads();


  }, [auth]);

  useEffect(() => {
    if (newNotepadId != null) {
      const _notepad = _.find(notepads, { id: newNotepadId });
      if (_notepad != null) {
        setNotepad(_notepad);
      }

      setNewNotepadId(null);
    }
  }, [newNotepadId]);

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
      // getNotepads,
      setNotepad,
      newNotepad,
      updateNotepad,
      deleteNotepad,
      setNewNotepadId,
      setQuery,
    }}>
      {props.children}
    </DataContext.Provider>
  );
};