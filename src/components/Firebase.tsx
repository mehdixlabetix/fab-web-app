/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB5IgKVBpI0in7sgbXrAPmyGBEf5zBgWic",
    authDomain: "fablab-7d4a9.firebaseapp.com",
    projectId: "fablab-7d4a9",
    storageBucket: "fablab-7d4a9.appspot.com",
    messagingSenderId: "1037742131008",
    appId: "1:1037742131008:web:70a31f86109350ebe59ca5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
*/
import {getDatabase} from "firebase/database";
import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCKEh_LV1eCMhy19gKnB0m4uXk5xZgPP3Y",
    authDomain: "imake-1293d.firebaseapp.com",
    databaseURL: "https://imake-1293d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "imake-1293d",
    storageBucket: "imake-1293d.appspot.com",
    messagingSenderId: "561161232860",
    appId: "1:561161232860:web:79fa52b52af6ca0491af19",
    measurementId: "G-EEP23VBM1T"
};
const appRealtime = initializeApp(firebaseConfig);

export const db = getFirestore(appRealtime);
export const dbRealTime = getDatabase(appRealtime)