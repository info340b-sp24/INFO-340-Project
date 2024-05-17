import React from 'react';
import { Route, Routes } from "react-router-dom";
import "../CSS/App.css"
import NavigationBar from './Header';
import Home from './Home';
import LoginPage from './LoginPage';
import Profile from './Profile'
// import Learn from './Learn';
// import Discover from './Discover';
import Footer from './Footer';
import Users from '../Data/JSON/users.json';
import Diet from "./DietPage";

function App() {
  return (
    <div className="app-container">
        <NavigationBar />
      <Routes>
        <Route index element = {<Home/>} />
          <Route path={"/Login"} element={<LoginPage users={Users} />} />
          <Route path={"/Profile"} element={<Profile />} />
          <Route path={"/Diet"} element = {<Diet/>} />
          {/*<Route path={"/Learn"} element = {<Learn/>} />*/}
          {/*<Route path={"/Discover"} element = {<Discover/>} />*/}
      </Routes>
        <Footer />
    </div>
  );
}

export default App;
