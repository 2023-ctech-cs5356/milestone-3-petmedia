import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import { getAnalytics } from "firebase/analytics";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDUCvx8r5EGKXiwA6U90zkiKI3EcllHpWA",
    authDomain: "petlove-f46c2.firebaseapp.com",
    projectId: "petlove-f46c2",
    storageBucket: "petlove-f46c2.appspot.com",
    messagingSenderId: "557928792960",
    appId: "1:557928792960:web:a6b292d5349d47be277765",
    measurementId: "G-PBGCFXEFG2"
};
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export const auth = getAuth();
const analytics = getAnalytics(app);