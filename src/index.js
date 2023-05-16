// improt react and react-dom
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

// import authentication and pet context
import { AuthContextProvider } from './context/AuthContext';
import { PetContextProvider } from './context/PetContext';

// import css style
import './index.css';

// import from app
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PetContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PetContextProvider>
    </AuthContextProvider>

  </React.StrictMode>
);
reportWebVitals();
