import {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut as signOutFirebase,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";

export const signIn = async(email, password, remember) => {
  const auth = getAuth();
  await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);
  return signInWithEmailAndPassword(auth, email, password);
};

export const signUp = async(email, password) => {
  const auth = getAuth();
  await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(auth.currentUser);
  return signOutFirebase(auth);
};

export const signOut = () => {
  const auth = getAuth();
  return signOutFirebase(auth);
};

export const passwordResetEmail = (email) => {
  const auth = getAuth();
  return sendPasswordResetEmail(auth, email);
};