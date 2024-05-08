import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDDzR9nujFjazsBaz3rDfu_I0a9b4gRs00",
    authDomain: "basim-survey.firebaseapp.com",
    databaseURL: "https://basim-survey-default-rtdb.firebaseio.com",
    projectId: "basim-survey",
    storageBucket: "basim-survey.appspot.com",
    messagingSenderId: "884208751954",
    appId: "1:884208751954:web:fa7eb37014fc508b60568b",
    measurementId: "G-S5QCCVE0XM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the Firebase authentication instance
export const auth = getAuth(app);