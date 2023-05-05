

import { db } from "../firebase";
import { collection, doc, getDocs, addDoc, setDoc, getDoc, deleteDoc } from "firebase/firestore";

export async function addPet(data) {
  try {
    const petsCollection = collection(db, "pets");
    const newPetRef = await addDoc(petsCollection, data);
    const newPetDoc = await getDoc(newPetRef);
    return newPetDoc;
  } catch (error) {
    console.error("Error adding pet: ", error);
  }
}

export async function getOne(petId) {
  try {
    const petsCollection = collection(db, "pets");
    const petDocRef = doc(petsCollection, petId);
    const petDoc = await getDoc(petDocRef);
    if (petDoc.exists()) {
      return petDoc;
    } else {
      console.log('No such document');
    }
  } catch (error) {
    console.error("Error getting pet: ", error);
  }
}

export async function getAll() {
  try {
    const petsCollection = collection(db, "pets");
    const querySnapshot = await getDocs(petsCollection);
    return querySnapshot;
  } catch (error) {
    console.error("Error getting all pets: ", error);
  }
}

export async function updatePet(pet) {
  try {
    const petsCollection = collection(db, "pets");
    const petDocRef = doc(petsCollection, pet.id);
    await setDoc(petDocRef, pet);
    const updatedPetDoc = await getDoc(petDocRef);
    return updatedPetDoc;
  } catch (error) {
    console.error("Error updating pet: ", error);
  }
}

export async function deletePet(petId) {
  try {
    const petsCollection = collection(db, "pets");
    const petDocRef = doc(petsCollection, petId);
    const deletedPetDoc = await getDoc(petDocRef);
    await deleteDoc(petDocRef);
    return deletedPetDoc;
  } catch (error) {
    console.error("Error deleting pet: ", error);
  }
}


