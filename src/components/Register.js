// import from react and react-router-dom
import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// import from firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

// import input login and authentication
import InputLogin from "../components/InputLogin";
import { AuthContext } from "../context/AuthContext";

// import css style
import styles from "./Register.module.css";

const Register = () => {
  const [error, setError] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  // need further research to handle situation when password doesn't match!
  // https://stackoverflow.com/questions/1653425/a-za-z-a-za-z0-9-regular-expression
  // handle thre situatios
  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Email",
      required: true,
      errorMessage: "Enter a valid email address. Please re-enter again.",
    },
    {
      id: 2,
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Password",
      required: true,
      errorMessage: "",
    },
    {
      id: 3,
      name: "repeatPassword",
      type: "password",
      label: "Re-type Password",
      placeholder: "Confirm Password",
      required: true,
      errorMessage: "Password doesn't not match. Please re-enter again.",
    },
  ];

  // handle sibmission
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {

    event.preventDefault();

    const { password, repeatPassword, email } = values;

    // situation when two passwords not matching
    if (password !== repeatPassword) {
      setError(true);
      return;
    }

    setError(false);

    // try to create account and response when error occurs
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({ type: "REGISTER", payload: user });
        navigate("/");
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <div className={styles.register}>

      <h2>
        <font size="10" color="black">
          Sign Up
          </font>
      </h2>

      <div className={styles.divBtn}>
        <p className={styles["p-auth-info"]}>
          Hello new user! Welcome to Petmedia.
          <br></br>
          Please create an account name with a valid Email and a password.
          <br></br>
          Please confirm password by re-typing again.
          <br></br>
          If you already have an account, you'r a returning user. Please check
          below information to login.
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <InputLogin
            key={input.id}
            type={input.type}
            name={input.name}
            label={input.label}
            pattern={input.pattern}
            value={values[input.name]}
            onChange={handleInputChange}
            placeholder={input.placeholder}
            required={input.required}
            errorMessage={input.errorMessage}
          />
        ))}

        <div className={styles["divBtn"]}>
          <button className={styles["loginbtn"]} type="submit">
            Register
          </button>
          <p className={styles["p-auth-info"]}>
            Already have an account?
            {/* <br></br>
              If you don't have an account, you'r a new user. */}
            <br></br>
            Welcome back! Ready to share the photo and story about your pet?
            Plase click the below Login to start!
            <br></br>{" "}
            <Link className="link-auth" to="/login">
              {" "}
              Sign up
            </Link>{" "}
          </p>
          {error && (
            <p className={styles["error-register"]}>{inputs[2].errorMessage}</p>
          )}
        </div>
      </form>
      
      <br></br>
      <br></br>
      {/* <br></br> */}

      <p className="heading-tertiary contrast-color">
        Join PetMedia today and become part of a vibrant and supportive
        community that celebrates the love and companionship that pets bring to
        our lives!
      </p>
    </div>
  );
};


export default Register;
