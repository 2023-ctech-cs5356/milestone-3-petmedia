// PetDetails.js
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deletePet, getOne } from "../../services/petService";
import { PetContext } from "../../context/PetContext";
import { AuthContext } from "../../context/AuthContext";
import styled from "styled-components";

export const Details = styled.div`
  display: flex;
  margin-bottom: 9.6rem;
`;

export const ImgHolder = styled.div`
  flex-basis: 60%;
  height: 50rem;
  margin-right: 2rem;
  border-radius: 7px;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 7px;
  }
`;

export const Description = styled.div`
  flex-basis: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

export const CardTitle = styled.h4`
  color: #000;
  font-size: 5.2rem;
  padding: 1rem 2rem;
  letter-spacing: -1.5px;
  margin-bottom: 3rem;
`;

export const DescParagraph = styled.p`
  line-height: 1.5;
  font-size: 1.8rem;
  color: #555;
`;

export const BtnHolder = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10rem;
  gap: 2rem;
`;

export const DescBtn = styled.button`
  font-size: 1.8rem;
  padding: 1rem 5rem;
  margin-top: 5rem;
  cursor: pointer;
  width: 15rem;
  border-radius: 1rem;
  font-weight: 600;
  border: none;
  color: #fff;
  background-color: ${({ red }) => (red ? "#b61f33" : "#68b403")};
  transition: all 0.3s;

  &:hover,
  &:active {
    background-color: ${({ red }) => (red ? "#d31730" : "#539002")};
  }
`;

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
      <Details>
        <ImgHolder>
          <img src={pet.imageUrl} alt={pet.name} />
        </ImgHolder>
        <Description>
          <CardTitle>{pet.name}</CardTitle>
          <DescParagraph>{pet.description}</DescParagraph>
          <BtnHolder>
            {currentUser && !isOwner && (
              <DescBtn onClick={handleLike}>
                {isLiked ? "Liked" : "Like"}
              </DescBtn>
            )}
            {isOwner && <DescBtn onClick={handleEdit}>Edit</DescBtn>}
            {isOwner && (
              <DescBtn
                className={styled["desc-btn-red"]}
                onClick={handleDelete}
              >
                Delete
              </DescBtn>
            )}
          </BtnHolder>
        </Description>
      </Details>
      
    </div>
  );
};
export default PetDetails;
