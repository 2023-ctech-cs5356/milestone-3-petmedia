import { useContext, useState, useEffect } from "react";

import { AuthContext } from "../context/AuthContext";
import { PetContext } from "../context/PetContext";
import PetItem from "./Pets/PetItem";

import styles from "../components/Profile.module.css"
import { Oval } from "react-loader-spinner";

const Profile = () => {
const { currentUser } = useContext(AuthContext);
const { pets } = useContext(PetContext);

const [isLoading, setIsLoading] = useState(true);
const [userPets, setUserPets] = useState([]);
const [likedPets, setLikedPets] = useState([]);

useEffect(() => {
    const fetchUserPets = async () => {
    const userPetsList = pets.filter((pet) => pet.ownerId === currentUser.uid);
    const likedPetsList = pets.filter((pet) => pet.likedBy.includes(currentUser.uid));
    setUserPets(userPetsList);
    setLikedPets(likedPetsList);
    setIsLoading(false);
    };

    setTimeout(() => {
    fetchUserPets();
    }, 3000);
}, [pets, currentUser.uid]);


return (
    <section className={styles.sectionProfile} style={{ backgroundColor: "#ffd4e1" }}>
      <div className={styles.userEmail}>Hello {currentUser.email}</div>
      <div className="container">
        <Oval
          height={90}
          width={90}
          color="#fff"
          wrapperClass="loader"
          visible={isLoading}
          ariaLabel="oval-loading"
          secondaryColor="#fff"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />

        {!isLoading && (
          <>
            <h3 className={styles.breedsWrapperTitle}>
              You listed {userPets.length} Pets
            </h3>
            <div className="grid grid--2-cols card-grid-wrapper">
              {userPets.length > 0 ? (
                userPets.map((pet) => (
                  <PetItem key={pet.id} pet={pet} index={pets.indexOf(pet)} />
                ))
              ) : (
                <h2>No pets found.</h2>
              )}
            </div>
            <h3 className={styles.breedsWrapperTitle}>
              You liked {likedPets.length} Pets
            </h3>
            <div className="grid grid--2-cols card-grid-wrapper">
              {likedPets.length > 0 ? (
                likedPets.map((pet) => (
                  <PetItem key={pet.id} pet={pet} index={pets.indexOf(pet)} />
                ))
              ) : (
                <h2>No pets found.</h2>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Profile;
