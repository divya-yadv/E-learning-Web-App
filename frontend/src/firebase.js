import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_apiKey}`,
  authDomain: `${process.env.REACT_APP_FIREBASE_authDomain}`,
  databaseURL: `${process.env.REACT_APP_FIREBASE_databaseURL}`,
  projectId: `${process.env.REACT_APP_FIREBASE_projectId}`,
  storageBucket: `${process.env.REACT_APP_FIREBASE_storageBucket}`,
  messagingSenderId: `${process.env.REACT_APP_FIREBASE_messagingSenderId}`,
  appId: `${process.env.REACT_APP_FIREBASE_appId}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
