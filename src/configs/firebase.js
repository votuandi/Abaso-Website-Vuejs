import {
    initializeApp
} from "firebase/app";
import {
    getStorage
} from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyDgwmvjY400-9eTI560NXtBjrklWQri0UE",
    authDomain: "abaso-dev.firebaseapp.com",
    projectId: "abaso-dev",
    storageBucket: "abaso-dev.appspot.com",
    messagingSenderId: "982012367",
    appId: "1:982012367:web:a0d909bc37486e574602ba",
    measurementId: "G-8XEQ26TBQV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);