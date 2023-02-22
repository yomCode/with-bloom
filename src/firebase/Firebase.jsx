import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"



const firebaseConfig = {
  apiKey: "AIzaSyBVMS4Wb9Vvbl8jVkhImMLD5Mu6E8zSJ1I",
  authDomain: "withbloom-a2fbf.firebaseapp.com",
  projectId: "withbloom-a2fbf",
  storageBucket: "withbloom-a2fbf.appspot.com",
  messagingSenderId: "82747291520",
  appId: "1:82747291520:web:160f316d9e01c538e97365",
  measurementId: "G-4LEEZH2S9V"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;