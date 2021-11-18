import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc, addDoc, updateDoc, deleteDoc, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { firebaseDocToObject, firebaseDateNow } from "../libs/helpers";
import _ from "lodash";

export const snapshotNotepads = async(uid, onSuccess, onError) => {
  const db = getFirestore();

  const q = query(collection(db, "notepads"), where("uid", "==", uid), orderBy("name"));
  return onSnapshot(q, (snapshot) => {
    const items = [];

    snapshot.forEach((doc) => {
      items.push(firebaseDocToObject(doc));
    });

    if (_.isFunction(onSuccess)) {
      onSuccess(items);
    }
  }, (err) => {
    if (_.isFunction(onError)) {
      onError(err);
    }
  });
};

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