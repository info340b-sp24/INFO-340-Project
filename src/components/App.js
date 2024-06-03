import React from 'react';
import { Route, Routes } from "react-router-dom";
import "../index.css"
import NavigationBar from './NavigationComp/Header';
import Footer from './NavigationComp/Footer';
import Home from './Home';
import Diet from "./DietPage";
import UserProfileAuth from './UserAuth'
import QuizPage from './Learn';

function App() {
    return (
        <div className="app-container">
            <NavigationBar />
            <Routes>
                <Route index element={<Home />} />
                <Route path="/UserAuth" element={<UserProfileAuth />} />
                <Route path="/Diet" element={<Diet />} />
                <Route path="/Discovery" element={<QuizPage />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
