import { Timestamp } from "firebase/firestore";
import _ from "lodash";

export const firebaseClearUser = (fbuser) => {
  if (fbuser == null) {
    return null;
  }

  return {
    uid: fbuser.uid,
    email: fbuser.email,
    displayName: fbuser.displayName,
    photoURL: fbuser.photoURL,
    phoneNumber: fbuser.phoneNumber,
  };
};

export const firebaseClearError = (error) => {
  return error == null ? null : { code: error.code, message: error.message };
};

export const firebaseDocToObject = (doc, extraData = {}) => {
  if (doc == null) {
    return null;
  }

  let d = doc.data();
  let id = doc.id;
  return { ...d, ...extraData, id };
};

export const firebaseDateNow = () => {
  return Timestamp.fromDate(new Date());
};

export const isNothing = (obj) => {
  return _.isUndefined(obj) || _.isNull(obj) || _.isNaN(obj);
};

export const isSomething = (obj) => {
  return !isNothing(obj);
};

export const isObjectWithId = (obj) => {
  return _.isObject(obj) && isSomething(obj.id);
};

export const preventDefault = (e) => {
  e.preventDefault();
};
