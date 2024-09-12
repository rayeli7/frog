"use client";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"; // For Realtime Database
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUWo7jSGUy3z6QenGgDQVCNMlyRel7TJE",
  authDomain: "frog-tbd.firebaseapp.com",
  databaseURL:
    "https://frog-tbd-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "frog-tbd",
  storageBucket: "frog-tbd.appspot.com",
  messagingSenderId: "168249661933",
  appId: "1:168249661933:web:693889bd9f92a2bf2dafe4",
  measurementId: "G-WCXQG4Y5WP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const clouddb = getFirestore(app);
const realtimeDatabase = getDatabase(app); // Initialize Realtime Database

export { auth, clouddb as db, realtimeDatabase };
