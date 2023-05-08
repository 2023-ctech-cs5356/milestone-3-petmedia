// import react
import { useState } from "react";

// import css style
import styled from "styled-components";

// css style
const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const LabelField = styled.label`
  margin: 1rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: #000;
`;

const InputField = styled.input`
  height: 5rem;
  width: 30rem;
  padding: 1.2rem 2.1rem;
  border: 1px solid #555;
  border-radius: 7px;

  &[aria-invalid="true"] {
    border: 1.3px solid red;
  }
`;

const ErrorMessage = styled.span`
  font-size: 1.5rem;
  padding: 0.6rem 2.2rem;
  color: red;
  display: ${({ show }) => (show ? "block" : "none")};
`;

// represent a login input field. It takes in several props including label, errorMessage, onChange, id, and additional inputProps
// use the useState hook to manage the focused state of the input field
const InputLogin = ({ label, errorMessage, onChange, id, ...inputProps }) => {

  // input element, a label, and an input field. 
  const [focused, setFocused] = useState(false);

  // handler sets the focused state to true
  const handleFocus = () => {
    setFocused(true);
  };

  // while the handleBlur event handler sets it to false.
  const handleBlur = () => {
    setFocused(false);
  };

  // export inputLogin component
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

