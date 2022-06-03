import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };
const firebaseConfig = {
  apiKey: 'AIzaSyATsL0INCf1mcvclbUIdieLJV2dnVf97_Y',
  authDomain: 'e-learning-auth-dev.firebaseapp.com',
  databaseURL: 'https://e-learning-auth-dev-default-rtdb.firebaseio.com',
  projectId: 'e-learning-auth-dev',
  storageBucket: 'e-learning-auth-dev.appspot.com',
  messagingSenderId: '136394273630',
  appId: '1:136394273630:web:d2787aa94b8fbd38f2d5cf',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
