
const apiKEY = import.meta.env.VITE_API_KEY || null
const authDOMAIN = import.meta.env.VITE_AUTH_DOMAIN || null
const projectID = import.meta.env.VITE_PROJECT_ID || null
const storageBUCKET = import.meta.env.VITE_STORAGE_BUCKET || null
const messagingSENDERID = import.meta.env.VITE_MESSAGING_SENDER_ID || null
const appID = import.meta.env.VITE_APP_ID || null
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apiKEY,
  authDomain: authDOMAIN,
  projectId: projectID,
  storageBucket: storageBUCKET,
  messagingSenderId: messagingSENDERID,
  appId: appID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;