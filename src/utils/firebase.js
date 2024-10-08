// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvYSH8yXFBBIuDSeiIrC2XkEhR6j9t2uA",
  authDomain: "netflixgpt-e2051.firebaseapp.com",
  projectId: "netflixgpt-e2051",
  storageBucket: "netflixgpt-e2051.appspot.com",
  messagingSenderId: "205613306595",
  appId: "1:205613306595:web:9855dfc6d57d78f2c16bd6",
  measurementId: "G-62VYRWB1WX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
