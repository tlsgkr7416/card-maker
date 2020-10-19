import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration // For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
        projectId: process.env.REACT_APP_FIREBASE_PORJECT_ID,
        storageBucket:process.env.REACT_APP_FIREBASE_STORAGE_BUCKETS,
};
      // Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const providerGoogle = new firebase.auth.GoogleAuthProvider();
providerGoogle.setCustomParameters({prompt: 'select_account'});

const providerGitHub = new firebase.auth.GithubAuthProvider();
providerGitHub.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(providerGoogle);
export const signInWithGithub = () => auth.signInWithPopup(providerGitHub);

export default firebase;
