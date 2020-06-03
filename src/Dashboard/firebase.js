import firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyALEMOv6ctfJ3UMI1oUL1jVKvexakY2smQ",
  authDomain: "nlpstorage.firebaseapp.com",
  databaseURL: "https://nlpstorage.firebaseio.com",
  projectId: "nlpstorage",
  storageBucket: "nlpstorage.appspot.com",
  messagingSenderId: "551738490034",
  appId: "1:551738490034:web:7d02af36bba86ff0f8ddab",
  measurementId: "G-0JSR5E34KM"
};
  const firebasereq=firebase.initializeApp(firebaseConfig);
  export default firebasereq;