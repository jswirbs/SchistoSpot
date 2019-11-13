// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
export const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
//require("firebase/analytics");


//export const initFirebase = () => {
  let firebaseConfig = {
    apiKey: "AIzaSyDIKWlbHQzxyJm32RvEyOb8Jk7nfqszBPU",
    authDomain: "schistospot.firebaseapp.com",
    databaseURL: "https://schistospot.firebaseio.com",
    projectId: "schistospot",
    storageBucket: "schistospot.appspot.com",
    messagingSenderId: "980206764665",
    appId: "1:980206764665:web:7fabbe12d5e0b081a34aa8",
    measurementId: "G-CF30SBBW0L"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();

//}



