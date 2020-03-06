import * as firebase from 'firebase';
import firestore from 'firebase/firestore'



const firebaseConfig = {
  apiKey: "AIzaSyA_DFgkQvuZqGs0PBHzGh6PilIyqr4aC80",
  authDomain: "reactjs-6bd27.firebaseapp.com",
  databaseURL: "https://reactjs-6bd27.firebaseio.com",
  projectId: "reactjs-6bd27",
  storageBucket: "reactjs-6bd27.appspot.com",
  messagingSenderId: "455163065356",
  appId: "1:455163065356:web:f4786778d1db4b2b"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({});

export default firebase;