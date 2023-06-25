import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  addDoc as addFirebaseDoc,
  setDoc as setFirebaseDoc,
  updateDoc as updateFirebaseDoc,
  arrayUnion,
} from 'firebase/firestore';
import {
  useCollection as useFirebaseCollection,
  useDocument as useFirebaseDoc,
  useDocumentOnce as useFirebaseDocOnce,
} from 'react-firebase-hooks/firestore';
import firebaseConfig from './firebase.config';

const firebaseApp = initializeApp(firebaseConfig);

export const currentUser = {
  id: 'javi',
};

export const useCollection = (path: string) =>
  useFirebaseCollection(
    collection(getFirestore(firebaseApp), `users/${currentUser.id}/${path}`),
    { snapshotListenOptions: { includeMetadataChanges: true } }
  );

export const useDoc = (...path: string[]) => {
  return useFirebaseDoc(
    doc(getFirestore(firebaseApp), `users/${currentUser.id}`, ...path),
    { snapshotListenOptions: { includeMetadataChanges: true } }
  );
};

export const useDocOnce = (...path: string[]) => {
  return useFirebaseDocOnce(
    doc(getFirestore(firebaseApp), `users/${currentUser.id}`, ...path)
  );
};

export const addDoc = async (data: object, ...path: string[]) => {
  await addFirebaseDoc(
    collection(getFirestore(firebaseApp), `users/${currentUser.id}`, ...path),
    data
  );
};

export const setDoc = async (data: object, ...path: string[]) => {
  await setFirebaseDoc(
    doc(getFirestore(firebaseApp), `users/${currentUser.id}`, ...path),
    data,
    { merge: true }
  );
};

export const updateDoc = async (data: object, ...path: string[]) => {
  const docRef = doc(
    getFirestore(firebaseApp),
    `users/${currentUser.id}`,
    ...path
  );
  await updateFirebaseDoc(docRef, data);
};

export const addItemToArrayDoc = async (
  data: object,
  attribute: string,
  ...path: string[]
) => {
  const docRef = doc(
    getFirestore(firebaseApp),
    `users/${currentUser.id}`,
    ...path
  );
  await updateFirebaseDoc(docRef, { [attribute]: arrayUnion(data) });
};
