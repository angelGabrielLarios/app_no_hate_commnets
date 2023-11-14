import { initializeApp } from "firebase/app"
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD9gPgyiQH9lMcBp_LKVbHcJSr1i6M9CAU",
    authDomain: "app-no-comments-hate.firebaseapp.com",
    databaseURL: "https://app-no-comments-hate-default-rtdb.firebaseio.com",
    projectId: "app-no-comments-hate",
    storageBucket: "app-no-comments-hate.appspot.com",
    messagingSenderId: "302973680060",
    appId: "1:302973680060:web:b0fbf85f3ac2ce135ad3b9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app);