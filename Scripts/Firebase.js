
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js'
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCxG9II0Uag55anNb74pjujPc1eM4ZIHPI",
    authDomain: "mypolling-app.firebaseapp.com",
    projectId: "mypolling-app",
    storageBucket: "mypolling-app.appspot.com",
    messagingSenderId: "352276002415",
    appId: "1:352276002415:web:ee8a21e88f6f5e2ac27f9a",
    measurementId: "G-HMVHFXG44E"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
