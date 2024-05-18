import React from 'react';
import { Route, Routes } from "react-router-dom";
import "../CSS/Footer.css"
import NavigationBar from './Header';
import Home from './Home';
import LoginPage from './LoginPage';
import Profile from './Profile'
import QuizPage from './Learn';
import Footer from './Footer';
import { ContextProvider } from './Context';
import Users from '../Data/JSON/users.json';
import Diet from "./DietPage";

function App() {
    return (
        <div className="app-container">
            <NavigationBar />
            <ContextProvider>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/Login" element={<LoginPage users={Users} />} />
                    <Route path="/Profile" element={<Profile />} />
                    <Route path="/Diet" element={<Diet />} />
                    <Route path="/Learn" element={<QuizPage />} />
                </Routes>
            </ContextProvider>
            <Footer />
        </div>
    );
}

export default App;
