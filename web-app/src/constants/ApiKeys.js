import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyAX-ckP33WCRSVPcz5T11mJWs2hFlwsC54',
  authDomain: 'sportsboost-ca4a4.firebaseapp.com',
  databaseURL: 'https://sportsboost-ca4a4.firebaseio.com',
  projectId: 'sportsboost-ca4a4',
  storageBucket: 'sportsboost-ca4a4.appspot.com',
  messagingSenderId: '291026506423',
  appId: '1:291026506423:web:c6a7c74044e916c476b332',
  measurementId: 'G-V5E5HK9F89',
});

export default app;
