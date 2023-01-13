// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
// import FirebaseAuth from 'firebaseauth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// fkiptooh
// const firebaseConfig = {
//   apiKey: "AIzaSyARjzgvecAssS2oM5R9nN3uVfcQB4Wy6H8",
//   authDomain: "ecommerce-d9e07.firebaseapp.com",
//   projectId: "ecommerce-d9e07",
//   storageBucket: "ecommerce-d9e07.appspot.com",
//   messagingSenderId: "69613319493",
//   appId: "1:69613319493:web:51cb20f657ef362ceb3a2c"
// };

//harons credentials
// const firebaseConfig = {
//   apiKey: "AIzaSyB-l6C674jABGOY3lvKKCOzw7QAKViNdH4",
//   authDomain: "ecommerce-d8dd5.firebaseapp.com",
//   projectId: "ecommerce-d8dd5",
//   storageBucket: "ecommerce-d8dd5.appspot.com",
//   messagingSenderId: "37525746088",
//   appId: "1:37525746088:web:ce550a111ce36f9acaed9d"
// };

// fkiptooh.r
const firebaseConfig = {
  apiKey: "AIzaSyACtwE0LjhO1wFimtqFrfDBvP7_ELUmc_U",
  authDomain: "ecommerce-8d7c9.firebaseapp.com",
  projectId: "ecommerce-8d7c9",
  storageBucket: "ecommerce-8d7c9.appspot.com",
  messagingSenderId: "884724736035",
  appId: "1:884724736035:web:7c61744ab72aba23ad9196"
};

firebase.initializeApp(firebaseConfig);
// const FirebaseAuth = require('firebaseauth'); // or import FirebaseAuth from 'firebaseauth';
// // const firebase = new FirebaseAuth(process.env.FIREBASE_API_KEY);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
