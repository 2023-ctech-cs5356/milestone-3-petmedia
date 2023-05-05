// import from firebase

import { db } from "../firebase";
import { collection, doc, deleteDoc, getDocs, addDoc, setDoc, getDoc } from "firebase/firestore";

// retrieve pet data from firebase
const petCollection = collection(db, "pets");


// function to add a new pet
export const addPet = async (data) => {
    const petDocRef = await addDoc(petCollection, data);
    return petDocRef.id;
  };


// retrieve the data of a single pet with ID from firestore
export async function getOne(petId) {

    const docId = (doc(db, "pets", petId));
    const docSnap = await getDoc(docId);
    
    if (docSnap.exists()) {
        return docSnap;
    } else {
        return console.log('No such document')
    }

}


// get data of all pets
export async function getAll() {
    const querySnapshot = await getDocs(petCollection);
    return querySnapshot;
}

// update a pet data in the 'pets' collection and sync with in firestore
export async function updatePet(pet) {

    await setDoc(doc(db, "pets", pet.id), {
        ...pet
    });
    const docId = doc(db, "pets", pet.id);
    const docSnap = await getDoc(docId);
    
    return docSnap.data();
}

// delete a pet
export async function deletePet(petId) {
    // return await deleteDoc(doc(db, "pets", petId));
    await deleteDoc(doc(petCollection, petId));

}


