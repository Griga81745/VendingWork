//import { initializeApp } from 'firebase/compat/app';

import firebase from 'firebase/app';
import 'firebase/auth';
//import { getAuth } from 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyBsncHeydOQQPsqVTTwcNHItPHqtifw-Kg",
    authDomain: "dexa-49698.firebaseapp.com",
    projectId: "dexa-49698",
    storageBucket: "dexa-49698.appspot.com",
    messagingSenderId: "732716289193",
    appId: "1:732716289193:web:d0b063f94417ccf952adb8",
    measurementId: "G-0B0NH9NWZS"
};
const fire = firebase.initializeApp(firebaseConfig);

//const auth = getAuth();
//console.log("fire.auth.EmailAuthProvider222")
//const provider = new fire.auth.GoogleAuthProvider()
//console.log(auth.GoogleAuthProvider)

//firebase.analytics();

export default fire;