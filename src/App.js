// import react and react-router-dom
import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// import home, header, and login ... basic functions
import Home from './components/Home';
import Header from './components/Header';
import Login from './components/Login';
import Profile from './components/Profile';
import Footer from './components/Footer';

// import register
import Register from './components/Register';

// import function to add a pet, authentication, edit a pet, available pets, and pet details
import AddNewPet from './components/Pets/AddNewPet';
import { AuthContext } from './context/AuthContext';
import EditPet from './components/Pets/EditPet';
import AvailablePets from './components/Pets/AvailablePets';
import PetDetails from './components/Pets/PetDetails';

import { PetContext } from './context/PetContext';


function App() {

  const { currentUser } = useContext(AuthContext);
  const { pets } = useContext(PetContext);

  // Route component for checking if the user is the owner of a pet
  const OwnerRoute = ({ children }) => {
    const isItValid = pets.find((pet) => pet.ownerId === currentUser.uid);
    return isItValid ? (children) : <Navigate to="/" />
  }

  // Route component for checking if the user is authenticated
  const PrivateRoute = ({ children }) => {
    return currentUser ? (children) : <Navigate to="/login" />
  }

  // Route component for checking if the user is not authenticated
  const PublicRoute = ({ children }) => {
    return !currentUser ? (children) : <Navigate to="/" />
  }

  return (
    <div className="App">
      <Header />
        <Routes>
          
          {/* home and register/login route */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

          {/* profile  */}
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

          {/* pet related function */}
          <Route path="/pets" element={<AvailablePets />} />
          <Route path="/pets/:petId" element={<PetDetails />} />

          {/* add and edit pets */}
          <Route path="/pets/add" element={<PrivateRoute><AddNewPet /></PrivateRoute>} />
          <Route path="/pets/:petId/edit" element={<PrivateRoute><OwnerRoute><EditPet /></OwnerRoute></PrivateRoute>} />

          <Route path="/*" element={<Navigate to="/" replace />} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
