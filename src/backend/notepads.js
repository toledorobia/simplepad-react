import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { firebaseDateNow } from "../libs/helpers";

export const newNotepad = (data) => {
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;
  const now = firebaseDateNow();

  return addDoc(collection(db, "notepads"), {
    uid: user.uid,
    content: "",
    updateAt: now,
    createdAt: now,
    ...data,
  });
};

export const updateNotepad = (id, data) => {
  const db = getFirestore();
  const now = firebaseDateNow();
  const ref = doc(db, "notepads", id);
  return updateDoc(ref, { updateAt: now, ...data });
};

export const deleteNotepad = (id) => {
  const db = getFirestore();
  const ref = doc(db, "notepads", id);
  return deleteDoc(ref);
};