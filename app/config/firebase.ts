import * as firebase from "firebase/app";
import {getFirestore} from "firebase/firestore";


// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};
// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firestoreDb = getFirestore(firebaseApp);