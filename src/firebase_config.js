import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAybEW-YpUOzm7CBLtcE_vQQaIAcned8Fc",
    authDomain: "micarro-34d45.firebaseapp.com",
    projectId: "micarro-34d45",
    storageBucket: "micarro-34d45.appspot.com",
    messagingSenderId: "199113495543",
    appId: "1:199113495543:web:ea7e893bcf89da2815d4f2"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore()
firebase.storage()

export default firebase;
