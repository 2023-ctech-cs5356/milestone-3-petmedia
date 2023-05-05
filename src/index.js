import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { PetContextProvider } from './context/PetContext';

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
