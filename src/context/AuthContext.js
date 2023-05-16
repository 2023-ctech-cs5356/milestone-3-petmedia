// import from react
import { createContext, useEffect, useReducer } from "react";

const initialState = {
    currentUser: JSON.parse(localStorage.getItem("user")) || null,
  };
  
export const AuthContext = createContext(initialState);

// reducer function to manage the state of the authentication context
function authReducer(state, action) {
  
  // different logging cases
  switch (action.type) {
    case "LOGIN":
        return { ...state, currentUser: action.payload };
    case "LOGOUT":
        return { ...state, currentUser: null };
    case "REGISTER": 
        return {...state, currentUser: action.payload,};
    default:
        return state;
    }
  }
  
  // provide an authentication context for the children components
  export function AuthContextProvider({ children }) {

    // hook to manage the authentication state and dispatch actions
    const [state, dispatch] = useReducer(authReducer, initialState);
  
    // used to persist the currentUser object in local storage whenever it changes
    useEffect(() => {
      localStorage.setItem("user", JSON.stringify(state.currentUser));
    }, [state.currentUser]);
  
    // contains the 'currentUser' state and 'dispatch' method
    const authContextValue = {
      currentUser: state.currentUser,
      dispatch,
    };
  
    // return
    return (
      <AuthContext.Provider value={authContextValue}>
        {children}
      </AuthContext.Provider>
    );
  }
