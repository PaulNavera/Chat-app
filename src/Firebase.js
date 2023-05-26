import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
import firebase from "firebase/compat/app";



const firebaseConfig = {
  apiKey: "AIzaSyCLl0HInyX1KhfA9TUry5z5yqoQ607-H3o",
  authDomain: "chatify-3625a.firebaseapp.com",
  projectId: "chatify-3625a",
  storageBucket: "chatify-3625a.appspot.com",
  messagingSenderId: "638444535782",
  appId: "1:638444535782:web:653bd99fde561da8bde027"
};


const app = firebase.initializeApp(firebaseConfig);

 const auth = getAuth(app);

export default auth