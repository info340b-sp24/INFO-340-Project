import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { BrowserRouter } from "react-router-dom";


import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyB1pVDJEkN02aSAWtoriJorH00d1ah7atk",
    authDomain: "nutrigenius-e3752.firebaseapp.com",
    databaseURL: "https://nutrigenius-e3752-default-rtdb.firebaseio.com",
    projectId: "nutrigenius-e3752",
    storageBucket: "nutrigenius-e3752.appspot.com",
    messagingSenderId: "265612865454",
    appId: "1:265612865454:web:0f4ac66b5a3f0572ce623f",
    measurementId: "G-QSMYZFHVQW"
};

initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
);


