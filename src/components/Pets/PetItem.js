// import react
import { Link } from 'react-router-dom';

// import css
import styled from 'styled-components';

const CardParagraph = styled.p`
  font-size: 2rem;
  line-height: 1.5;
  padding: 0 1rem;
`;

const BreedsLeft = styled.div`
  height: 50rem;
  width: 50rem;
`;

const PetItemWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
  margin-bottom: 10rem;
`;

const BreedsRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
  background-color: ${props => (props.index % 2 !== 0 ? '#1a75bc' : '#fed201')};
`;

const CardImage = styled.img`
  object-fit: cover;
  object-position: top;
  display: block;
  height: 95%;
  width: 95%;
`;

const CardTitle = styled.h4`
  font-size: 3.6rem;
  padding: 1rem;
`;

const CardBtn = styled(Link)`
  font-size: 2rem;
  padding: 1rem 4rem;
  margin-bottom: 1rem;
  cursor: pointer;
  width: 16rem;
  border-radius: 1.5rem;
  font-weight: 600;
  border: none;
  color: #fff;
  background-color: #68b403;
  transition: all 0.25s;
  
  &:hover,
  &:active {
    background-color: #539002;
  }
`;

const PetItem = ({ pet, index }) => (
  <PetItemWrapper>
    <BreedsLeft>
      <CardImage src={pet.imageUrl} alt={pet.name} />
    </BreedsLeft>
    <BreedsRight index={index}>
      <CardTitle>{pet.name}</CardTitle>
      <CardParagraph>{pet.description}</CardParagraph>
      <CardBtn to={`/pets/${pet.id}`}>More</CardBtn>
    </BreedsRight>
  </PetItemWrapper>
);

export default PetItem;
