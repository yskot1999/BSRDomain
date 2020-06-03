import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyALEMOv6ctfJ3UMI1oUL1jVKvexakY2smQ",
    authDomain: "nlpstorage.firebaseapp.com",
    databaseURL: "https://nlpstorage.firebaseio.com",
    projectId: "nlpstorage",
    storageBucket: "nlpstorage.appspot.com",
    messagingSenderId: "551738490034",
    appId: "1:551738490034:web:ce1ab41843e4dc35f8ddab",
    measurementId: "G-1D6FLX5E0C"
  };
  const firebasereq=firebase.initializeApp(firebaseConfig);
  export default firebasereq;