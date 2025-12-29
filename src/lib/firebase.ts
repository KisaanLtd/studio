// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASSCe639w3ixIXMmRpD_diEaaILFoYLGs",
  authDomain: "studio-2243883462-63f35.firebaseapp.com",
  projectId: "studio-2243883462-63f35",
  storageBucket: "studio-2243883462-63f35.appspot.com",
  messagingSenderId: "764383211778",
  appId: "1:764383211778:web:6a1ba85f88f8075d26d21b",
  measurementId: ""
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
