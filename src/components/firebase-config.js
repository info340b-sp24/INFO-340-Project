import { initializeApp } from 'firebase/app';
import {getDatabase} from "@firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDEe935eaRW40BWCJcS_kkrWbOIHjvfsp0",
    authDomain: "signinjwtdemo1.firebaseapp.com",
    projectId: "signinjwtdemo1",
    storageBucket: "signinjwtdemo1.appspot.com",
    messagingSenderId: "419321902284",
};

const app = initializeApp(firebaseConfig);

export { app };