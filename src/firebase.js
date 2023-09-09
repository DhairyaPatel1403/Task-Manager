// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPFOMj6d-l1opu0hJt_-onIl3fXLDIeOA",
  authDomain: "taskmanager-c75b4.firebaseapp.com",
  projectId: "taskmanager-c75b4",
  storageBucket: "taskmanager-c75b4.appspot.com",
  messagingSenderId: "506754374694",
  appId: "1:506754374694:web:762faa62eef27922d91ae7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export default app;