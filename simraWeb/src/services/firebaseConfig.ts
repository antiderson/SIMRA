import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


export const firebaseConfig = {
    apiKey: 'AIzaSyCZGGLT_Gasd41CUILt-zSuntIKqK2140g',
    authDomain: 'simra1-0.firebaseapp.com',
    databaseURL: 'https://simra1-0-default-rtdb.firebaseio.com',
    projectId: 'simra1-0',
    storageBucket: 'simra1-0.firebasestorage.app',
    messagingSenderId: '674802207877',
    appId: '1:674802207877:web:81c98694dc34484670edec',
    measurementId: 'G-XWCXXJ5SH6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getDatabase(app);

export { db };
