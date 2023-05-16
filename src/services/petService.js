// import from firebase
import { db } from "../firebase";
import { collection, doc, deleteDoc, getDocs, addDoc, setDoc, getDoc } from "firebase/firestore";


// retrieve all pet data from firebase
const petCollection = collection(db, "pets");

// function to add a new pet
export const addPet = async (data) => {
    const petDocRef = await addDoc(petCollection, data);
    return petDocRef.id;
  };

// delete a pet
export async function deletePet(petId) {
    // return await deleteDoc(doc(db, "pets", petId));
    await deleteDoc(doc(petCollection, petId));
}

// get data of all pets
export async function getAllPets() {
    const querySnapshot = await getDocs(petCollection);
    return querySnapshot;
}

// retrieve the data of a single pet with ID from firestore
export async function getPet(petId) {

    const docId = (doc(db, "pets", petId));
    const docSnap = await getDoc(docId);
    
    if (docSnap.exists()) {
        return docSnap;
    } else {
        return console.log('No pet!')
    }
}

// update a pet data in the 'pets' collection and sync with in firestore
export async function updatePet(pet) {

    const docId2 = (doc(db, "pets", pet.id));
    await setDoc(docId2, {
        ...pet
    });

    const updatedPet = await getDoc(doc(db, "pets", pet.id));
    
    return updatedPet.data();
}
