// import from firebase, react, and petService files
import { getDoc } from "firebase/firestore";
import { useEffect, createContext, useState } from "react";
import { addPet, getAll, updatePet } from "../services/petService";


// create the PetContext object with default values for each property.
export const PetContext = createContext({
    pets: [],
    addNewPet: (pet) => { },
    updateCurrentPet: (pet) => { },
    removePet: (petId) => { },
    likePet: (pet, userId) => { },
    unLikePet: (pet, userId) => { },
})

export const PetContextProvider = (props) => {

    const [pets, setPets] = useState([]);

    // fetche all pets data from some external data source using getAll() function, then maps over the data to create an array of pets with id and other properties.
    // then, updates the state of the component with the array of pets using setPets()

    useEffect(() => {
        try {
            getAll().then((pets) => {
                const currentPets = [];

                pets.forEach((p) => {
                    const pet = {
                        id: p.id,
                        ...p.data()
                    }
                    currentPets.push(pet)
                });
                setPets(currentPets);
            })
        } catch(error) {
            console.log(error)
        }
    }, [])


    // create a enw profile for a pet
    const addNewPet = async (pet) => {
        try {

            // create a pet
            const refPet = await addPet(pet);
            const docSnap = await getDoc(refPet);
            const newPet = { id: docSnap.id, ...docSnap.data() };
            setPets(prevPets => [...prevPets, newPet]);

        } catch (error) {
          console.log(error);
        }
      };

    // remove pet
    const removePet = (petId) => {

        // find the pet
        setPets((prevState) => prevState.filter(
            (pet) => pet.id !== petId));
    };

    // function to like a pet
    const likePet = async (pet, userId) => {
        try {

            // find and like the pet
            const likedBy = pet.likedBy ? [...pet.likedBy, userId] : [userId];

            // update 
            const updatedPet = { ...pet, likedBy };
            await updateCurrentPet(updatedPet);

        } catch (error) {
            console.log(error);
        }
      };

    // function to unlike the pet already liked before
    const unLikePet = async (pet, userId) => {
        try {

            // find and remove the pet
            const likedBy = pet.likedBy.filter(id => id !== userId);
            
            // update the pet
            const updatedPet = { ...pet, likedBy };
            await updateCurrentPet(updatedPet);

        } catch (error) {
            console.log(error);
        }
      };

    // update status of pet
    const updateCurrentPet = async (pet) => {
        try {
            const result = await updatePet(pet)
            
            //  not working
            // const updatedPets = pets.map(p => p.id === result.id ? { id: result.id, ...result.data() } : p);
            
            // find pet
            const index = pets.findIndex((p) => p.id === result.id)
            const updatedPets = [...pets]

            // update that pet
            updatedPets[index] = { ...result, id: pet.id }   
            setPets(updatedPets)

        } catch (error) {
            console.log(error);
        }

    }

    // return petContextValue
    const petContextValue = {
        pets,
        addNewPet,
        likePet,
        unLikePet,
        updateCurrentPet,
        removePet
      };

    // return 
    return (
    <PetContext.Provider value={petContextValue}>
        {props.children}
    </PetContext.Provider>
    );
} 
