// styles.js
import styled from "styled-components";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { PetContext } from "../../context/PetContext";
import { AuthContext } from "../../context/AuthContext";

// import InputLogin from "../InputLogin";
import inputsData from "./inputsData";

export const FormWrapper = styled.div`
  background: url("/assets/img/section.jpg") no-repeat center 0px;
  background-size: cover;
  min-height: 100rem;
  object-fit: contain;
  margin-bottom: 5.6rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
`;

export const FieldForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InputField = styled.input`
  height: 4rem;
  width: 30rem;
  padding: 1.3rem 2rem;
  border: 1px solid var(--color-secondary);
  border-radius: var(--border-radius-default);
`;

export const LabelField = styled.label`
  margin: 1.2rem;
  font-size: var(--font-size-default);
  font-weight: var(--font-weight-bold);
`;

export const SubmitButton = styled.button`
  padding: 0.6rem 2.4rem;
  margin-bottom: 2.4rem;
  cursor: pointer;
  font-size: 1.8rem;
  font-weight: var(--font-weight-bold);
  width: 17.3rem;
  border-radius: var(--border-radius-default);
  border: none;
  color: var(--color-secondary);
  background-color: var(--color-primary);
  transition: all var(--transition-duration);
`;

export const Space = styled.div`
  height: 10rem;
`;

export const BtnFormContainer = styled.div`
  grid-column: span 2;
  margin-top: 6rem;
  text-align: center;
`;

// AddNewPet.js

const AddNewPet = () => {
  // ...
  const { addNewPet } = useContext(PetContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [petData, setPetData] = useState({
    name: "",
    bread: "",
    imageUrl: "",
    description: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setPetData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPet();
      navigate("/pets");
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const addPet = async () => {
    const newPetData = {
      ...petData,
      ownerId: currentUser.uid,
      likedBy: [],
    };
    await addNewPet(newPetData);
  };

  return (
    <div className="container">
      <h1>Add Pet</h1>
      <FormWrapper>
        <Space />
        <Form className="grid grid--2-cols" onSubmit={handleSubmit}>
          {inputsData.map((input) => (
            <FieldForm key={input.id}>
              <LabelField htmlFor={input.id}>{input.label}</LabelField>
              <InputField
                id={input.id}
                type={input.type}
                name={input.name}
                value={petData[input.name]}
                onChange={onInputChange}
              />
            </FieldForm>
          ))}
          <BtnFormContainer>
            <SubmitButton>Add</SubmitButton>
          </BtnFormContainer>
        </Form>
      </FormWrapper>
    </div>
  );
};

export default AddNewPet;
