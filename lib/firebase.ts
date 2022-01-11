import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBNAsvrnVT7kAO1Jy1XPrjdBoKiAZwNZ2E',
  authDomain: 'next-social-blog.firebaseapp.com',
  projectId: 'next-social-blog',
  storageBucket: 'next-social-blog.appspot.com',
  messagingSenderId: '313688976774',
  appId: '1:313688976774:web:fca3e1223cf1532661d007',
  measurementId: 'G-MMM0MY5544',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// auth export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();
