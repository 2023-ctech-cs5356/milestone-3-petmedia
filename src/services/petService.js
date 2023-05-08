import { db } from "../firebase";
import {
  collection,
  doc,
  deleteDoc,
  getDocs,
  addDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";

const petCollection = collection(db, "pets");

export async function addPet(data) {
  const petDocRef = await addDoc(petCollection, data);
  return petDocRef.id;
}

export async function getOne(petId) {
  const docId = doc(petCollection, petId);
  const docSnap = await getDoc(docId);

  if (docSnap.exists()) {
    return docSnap;
  } else {
    throw new Error("No such document");
  }
}

export async function getAll() {
  const querySnapshot = await getDocs(petCollection);
  const pets = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return pets;
}

export async function updatePet(pet) {
  const docId = doc(petCollection, pet.id);
  await setDoc(docId, { ...pet });
  const updatedDoc = await getDoc(docId);

  return updatedDoc.data();
}

export async function deletePet(petId) {
  const docId = doc(petCollection, petId);
  await deleteDoc(docId);
}
