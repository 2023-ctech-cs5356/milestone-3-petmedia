import { createContext, useEffect, useReducer } from "react";

// import AuthReducer from "./AuthReducer";

const initialState = {
    currentUser: JSON.parse(localStorage.getItem("user")) || null,
  };
  
export const AuthContext = createContext(initialState);
  
function authReducer(state, action) {
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
  
  export function AuthContextProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, initialState);
  
    useEffect(() => {
      localStorage.setItem("user", JSON.stringify(state.currentUser));
    }, [state.currentUser]);
  
    const authContextValue = {
      currentUser: state.currentUser,
      dispatch,
    };
  
    return (
      <AuthContext.Provider value={authContextValue}>
        {children}
      </AuthContext.Provider>
    );
  }