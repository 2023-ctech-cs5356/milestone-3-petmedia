import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import { getAnalytics } from "firebase/analytics";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDqcO4c0fflI7nJOhStJroOnymdNWl80Zw",
    authDomain: "petmedia-milestone3.firebaseapp.com",
    projectId: "petmedia-milestone3",
    storageBucket: "petmedia-milestone3.appspot.com",
    messagingSenderId: "594772756103",
    appId: "1:594772756103:web:6fcbc3404c846af4521a22",
    measurementId: "G-71DXQ6Y9DC"
};
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export const auth = getAuth();
const analytics = getAnalytics(app);
