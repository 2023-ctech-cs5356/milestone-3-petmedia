// import from firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

// import react and react-router-dom
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

// import input login and authentication
import InputLogin from "../components/InputLogin";
import { AuthContext } from "../context/AuthContext";

// import css style
import styles from "./Login.module.css";

// function that handles the login process
const Login = () => {
  const [error, setError] = useState(false);

  const [values, setValues] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

const handleLogin = async (e) => {
  e.preventDefault();

  // attempts to sign in the user with the provided email and password
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    
    // if successful, it retrieves the user object from the userCredential
    const user = userCredential.user;
    dispatch({ type: "LOGIN", payload: user });
    navigate("/");

  } catch (error) {
    setError(true);
  }
};

const inputs = [
  {
    id: "email",
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Email",
    required: true,
    validation: {
      pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      errorMessage: "Please enter a valid email address.",
    },
  },
  {
    id: "password",
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Password",
    required: true,
    validation: {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      errorMessage:
        "Minimum six characters, at least one letter and one number.",
    },
  },
];

return (
  <div className="container">
    <div className={styles.login}>

      <h2>
        <font size="10" color="black">
          Sign In
          </font>
      </h2>
      
      <div className={styles.divBtn}>
        <p className={styles["p-auth-info"]}>
          Hello returning user!
          <br></br>
          Welcome back. Please enter your account name (Email) and password to
          login.
          <br></br>
          If you don't have an account, you'r a new user.
          <br></br>
          Please check below information to register. Enjoy Petmedia from
          today!
        </p>
      </div>

      <form className={styles.form} onSubmit={handleLogin}>
        {inputs.map((input) => (
          <InputLogin
            key={input.id}
            value={values[input.name]}
            onChange={handleInputChange}
            {...input}
          />
        ))}
        <div className={styles.divBtn}>
          <button disabled={error} className={styles.loginBtn}>
            Login
          </button>
          <p className={styles["p-auth-info"]}>
            Don't Have an Account?
            {/* <br></br> */}
            {/* If you don't have an account, you'r a new user. */}
            <br></br>
            We welcome anyone who likes to share story about their pets. Plase
            click the below Register to create a new account!<br></br>{" "}
            <Link className="link-auth" to="/register">
              {" "}
              Sign Up
            </Link>{" "}
          </p>
          {error && (
            <p className={styles["login-error"]}>
              Incorrect Credentials. Please check carefully and try again!
            </p>
          )}
        </div>
      </form>
      <br></br>
      <p className="heading-tertiary contrast-color">
        Join PetMedia today and become part of a vibrant and supportive
        community that celebrates the love and companionship that pets bring
        to our lives!
      </p>
    </div>
  </div>
);
};


export default Login;
