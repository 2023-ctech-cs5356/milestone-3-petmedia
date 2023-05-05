
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletePet, getOne } from "../../services/petService";
import { PetContext } from "../../context/PetContext";
import { AuthContext } from "../../context/AuthContext";
import styles from "../Pets/PetDetails.module.css";
// import styled from "styled-components";

const PetDetails = () => {
  const { currentUser } = useContext(AuthContext);
  const { petId } = useParams();
  const navigate = useNavigate();
  const { likePet, unLikePet, removePet } = useContext(PetContext);
  const [pet, setPet] = useState({});
  const [isLiked, setIsLiked] = useState(null);
  const isOwner = pet.ownerId === currentUser?.uid;

  useEffect(() => {
    async function fetchPet() {
      try {
        const pet = await getOne(petId);
        setPet({ id: pet.id, ...pet.data() });
        setIsLiked(pet.data().likedBy.includes(currentUser?.uid));
      } catch (error) {
        console.log(error);
        navigate("/pets");
      }
    }
    fetchPet();
  }, [petId, currentUser?.uid, navigate]);

  const handleEdit = (e) => {
    e.preventDefault();
    navigate(`/pets/${petId}/edit`, {
      state: { ...pet, id: petId },
    });
  };

  const handleLike = (e) => {
    e.preventDefault();
    const likeAction = isLiked ? unLikePet : likePet;
    setIsLiked(!isLiked);
    likeAction(pet, currentUser.uid);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deletePet(petId);
    removePet(petId);
    navigate("/pets");
  };

  return (
    <div className="container">
      <div className={styles.details}>
        <div className={styles["img-holder"]}>
          <img src={pet.imageUrl} alt={pet.name} />
        </div>
        <div className={styles["description"]}>
          <h4 className={styles["card-title"]}>{pet.name}</h4>
          <p className={styles["desc-paragraph"]}>{pet.description}</p>
          <div className={styles["btn-holder"]}>
            {currentUser && !isOwner && (
              <button className={styles["desc-btn"]} onClick={handleLike}>
                {isLiked ? "Liked" : "Like"}
              </button>
            )}
            {isOwner && (
              <button className={styles["desc-btn"]} onClick={handleEdit}>
                Edit{" "}
              </button>
            )}
            {isOwner && (
              <button className={styles["desc-btn-red"]} onClick={handleDelete}>
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default PetDetails;