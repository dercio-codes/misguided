// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// export const firebaseConfig = {
//   apiKey: "AIzaSyB4-n-MDLbjfqoNt55KU9zuiAJbU1e_gT8",
//   authDomain: "misguided-79fcc.firebaseapp.com",
//   projectId: "misguided-79fcc",
//   storageBucket: "misguided-79fcc.appspot.com",
//   messagingSenderId: "189387423210",
//   appId: "1:189387423210:web:70c1a06279af92299d0693",
// };
export const firebaseConfig = {
  apiKey: "AIzaSyBeVBu9mS2bTOtvy_OUO7m6EAoRlyb_nnc",
  authDomain: "misguided-946f0.firebaseapp.com",
  projectId: "misguided-946f0",
  storageBucket: "misguided-946f0.appspot.com",
  messagingSenderId: "773134794746",
  appId: "1:773134794746:web:776aafb7512825f72fae43",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const facebookProvider = new FacebookAuthProvider();
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
