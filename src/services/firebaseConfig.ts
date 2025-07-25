import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import Constants from "expo-constants";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebase = Constants.expoConfig?.extra?.firebase;

export const firebaseConfig = {
  apiKey: firebase?.apiKey,
  authDomain: firebase?.authDomain,
  databaseURL: firebase?.databaseURL,
  projectId: firebase?.projectId,
  storageBucket: firebase?.storageBucket,
  messagingSenderId: firebase?.messagingSenderId,
  appId: firebase?.appId,
  measurementId: firebase?.measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getDatabase(app);

export { db };
