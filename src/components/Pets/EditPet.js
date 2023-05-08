// import react and react-dom
import { useState, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// import pet context and authentication
import { PetContext } from "../../context/PetContext";
import { AuthContext } from "../../context/AuthContext";

// import inputsdata
import inputsData from "./inputsData";

// import input login
import InputLogin from "../InputLogin";

// import css style
import styles from "../Pets/EditPet.module.css";

const EditPet = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ctx = useContext(PetContext);
  const { currentUser } = useContext(AuthContext);
  const { petId } = useParams();

  const pets = ctx.pets;
  const pet = location.state;
  const correctPet = pets.find((pet) => pet.id === petId);

  const getInitialState = () => {
    return {
      name: pet.name,
      bread: pet.bread,
      imageUrl: pet.imageUrl,
      description: pet.description,
    };
  };

  const [values, setValues] = useState(getInitialState());

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    navigate("/pets");
  };

  const isValidUser = () => {
    return currentUser.uid === correctPet.ownerId;
  };

  const editPet = async () => {
    try {
      await ctx.updateCurrentPet({
        id: petId,
        name: values.name,
        bread: values.bread,
        imageUrl: values.imageUrl,
        description: values.description,
        likedBy: correctPet.likedBy || [],
        ownerId: currentUser.uid,
      });
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  const handlerEditPet = async (e) => {
    e.preventDefault();

    if (!correctPet || !isValidUser()) {
      navigate("/pets");
      return;
    }

    await editPet();
  };
  return (
    <div className="container">
      <h1> Edit Pet</h1>
      <div className={styles.almub}>
        <div className={styles["wrapper-form"]}>
          <div className={styles["space"]}></div>
          <form
            className="grid grid--2-cols grid--center--v"
            onSubmit={handlerEditPet}
          >
            {inputsData.map((input) => (
              <InputLogin
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <div className={styles["btn-form-container"]}>
              <button
                className={styles["cancel-button"]}
                onClick={cancelHandler}
              >
                Cancel
              </button>
            </div>
            <div className={styles["btn-form-container"]}>
              <button className={styles["submit-button"]}>Edit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPet;
