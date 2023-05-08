import { useState } from "react";
import styled from "styled-components";

const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const LabelField = styled.label`
  margin: 1.2rem;
  font-size: 1.4rem;
  font-weight: 500;
  color: #000;
`;

const InputField = styled.input`
  height: 4rem;
  width: 30rem;
  padding: 1.3rem 2rem;
  border: 1px solid #555;
  border-radius: 7px;

  &[aria-invalid="true"] {
    border: 1px solid red;
  }
`;

const ErrorMessage = styled.span`
  font-size: 1.4rem;
  padding: 0.5rem 2rem;
  color: red;
  display: ${({ show }) => (show ? "block" : "none")};
`;

const InputLogin = ({ label, errorMessage, onChange, id, ...inputProps }) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  return (
    <FormInput>
      <LabelField htmlFor={id}>{label}</LabelField>
      <InputField
        {...inputProps}
        id={id}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-invalid={!!errorMessage}
      />
      {errorMessage && <ErrorMessage show={focused}>{errorMessage}</ErrorMessage>}
    </FormInput>
  );
};

export default InputLogin;
