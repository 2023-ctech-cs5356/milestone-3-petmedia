//  import react
import { useContext, useMemo } from 'react';
import React from 'react';

// import pet item and pet context
import PetItem from './PetItem';
import { PetContext } from '../../context/PetContext';

// import css style
import styled from 'styled-components';

const Wrapper = styled.div`
  .container {
    h3 {
      font-size: 4.6rem;
      text-transform: capitalize;
      color: #000;
      margin-bottom: 1.2em;
      font-weight: 600;
      text-align: center;
      position: relative;
    }
  }

  .grid--2-cols {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2.4rem;
  }
`;

const AvailablePets = () => {
  const { pets } = useContext(PetContext);
  const petList = useMemo(() => {
    if (pets.length > 0) {
      return pets.map((pet, index) => <PetItem key={pet.id} pet={pet} index={index} />);
    }
    return <h2>No pets available at this moment</h2>;
  }, [pets]);

  return (
    <Wrapper>
      <div className="container">
        <h3>Available Pets</h3>
        <div className="grid--2-cols card-grid-wrapper">{petList}</div>
      </div>
    </Wrapper>
  );
};

export default React.memo(AvailablePets);
