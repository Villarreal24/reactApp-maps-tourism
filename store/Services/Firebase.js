import * as firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyCNCEH6i5K43P2QQDpNkB876NITWFYwhFI",
  authDomain: "vr-tourism-1559586745843.firebaseapp.com",
  databaseURL: "https://vr-tourism-1559586745843.firebaseio.com",
  projectId: "vr-tourism-1559586745843",
  storageBucket: "vr-tourism-1559586745843.appspot.com",
  messagingSenderId: "615709924243",
  appId: "1:615709924243:web:298a1d1278420d4f"
};
// Initialize Firebase
firebase.initializeApp(config);

export const authentication = firebase.auth();
export const dataBase = firebase.database();
export const db = firebase.firestore();
