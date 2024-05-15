import { Route, Routes } from "react-router-dom";
import "../CSS/App.css"
import LoginPage from "./LoginPage";

import Home from "./Home";
import UserProfile from "./UserProfile";
import NavigationBar from "./Header";
import Footer from "./Footer";

function App() {
  return (
    <div className="app-container">
        <NavigationBar />
      <Routes>
        <Route index element = {<Home/>} />
          <Route path={"/api/auth"} element = {<LoginPage/>} />
          <Route path={"/userProfile"} element = {<UserProfile redirectUri="http://localhost:3000/login"/>} />
      </Routes>
        <Footer />
    </div>
  );
}

export default App;
