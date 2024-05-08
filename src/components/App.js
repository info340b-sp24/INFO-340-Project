import { Route, Routes } from "react-router-dom";
import '../CSS/App.css';
import LoginPage from "./LoginPage";
import Home from "./Home";
import UserProfile from "./UserProfile";

function App() {
  return (
    <div>
      <Routes>
        <Route index element = {<Home/>} />
          <Route path={"/login"} element = {<LoginPage/>} />
          <Route path={"/userProfile"} element = {<UserProfile redirectUri="http://localhost:3000/login"/>} />
      </Routes>
    </div>
  );
}

export default App;
