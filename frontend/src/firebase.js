import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyATsL0INCf1mcvclbUIdieLJV2dnVf97_Y',
  authDomain: 'e-learning-auth-dev.firebaseapp.com',
  databaseURL: 'https://e-learning-auth-dev-default-rtdb.firebaseio.com/',
  projectId: 'e-learning-auth-dev',
  storageBucket: 'e-learning-auth-dev.appspot.com',
  messagingSenderId: '136394273630',
  appId: '1:136394273630:web:d2787aa94b8fbd38f2d5cf',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
