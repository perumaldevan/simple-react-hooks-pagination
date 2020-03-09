import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC0iFvSzmGvcPg3T2w0yV-tOfc-N-JhldE",
  authDomain: "reactjs-f6358.firebaseapp.com",
  databaseURL: "https://reactjs-f6358.firebaseio.com",
  projectId: "reactjs-f6358",
  storageBucket: "reactjs-f6358.appspot.com",
  messagingSenderId: "564975459282",
  appId: "1:564975459282:web:4fdf155e2fd680a65e060b"
};


firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({});

export default firebase;