// import react and react-router-dom
import { useContext, useState, useEffect } from "react";

// import pet context and pet authtication
import { AuthContext } from "../context/AuthContext";
import { PetContext } from "../context/PetContext";

// import pet item
import PetItem from "./Pets/PetItem";

// import from react-loader-spinner
import { Oval } from "react-loader-spinner";

// import css style
import styles from "../components/Profile.module.css"

const Profile = () => {
// set up constant
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
    <section className={styles.profile} style={{ backgroundColor: "#f0b6c8" }}>

      <br></br>
      <h2>
        Profile
      </h2>
      
      <div className={styles.userName}>
        Hello {currentUser.email}! Welcome to your profile on Petmedia.
        <br></br> You can see your pet's profile and other owner's pets you liked here.
        <br></br>
        <br></br>
      </div>
      <div className="container">
        <Oval
          height={92}
          width={92}
          color="#000"
          wrapperClass="loader"

          visible={isLoading}
          ariaLabel="oval-loading"
          
          secondaryColor="#fff"

          strokeWidth={2}
          strokeWidthSecondary={2}
        />

        {!isLoading && (
          <>
            <h3>
              You listed {userPets.length} Pets
            </h3>

            <div className="grid grid--2-cols card-grid-wrapper">
              {userPets.length > 0 ? (
                  userPets.map((pet) => (
                    <PetItem key={pet.id} pet={pet} index={pets.indexOf(pet)} />
                ))
              ) : (
                <font size="5" >
                  <br></br> You haven't uploaded any pet yet. 
                  <br></br> You can simply click "Add a pet".
                  <br></br> Then, start to share your pet! 
                </font>
              )}
            </div>

            <h3>
              You liked {likedPets.length} Pets
            </h3>
            <div className="grid grid--2-cols card-grid-wrapper">
              {likedPets.length > 0 ? (
                likedPets.map((pet) => (
                  <PetItem key={pet.id} pet={pet} index={pets.indexOf(pet)} />
                ))
              ) : (
                <font size="5" >
                  <br></br> You haven't liked any pet yet. 
                  <br></br> You can simply click "All pets".
                  <br></br> Then, start to see some beloved pets. 
                </font>
              )}
            </div>
          </>
        )}
      </div>

      <p className="heading-tertiary contrast-color">           
          Join PetMedia today and become part of a vibrant and supportive community that celebrates the love and 
          companionship that pets bring to our lives!
      </p>

    </section>
  );
};

export default Profile;

