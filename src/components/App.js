import { Route, Routes } from "react-router-dom";
import '../CSS/App.css';
import LoginPage from "./LoginPage";
import Home from "./Home";

function App() {
  return (
    <div>
      <Routes>
        <Route index element = {<Home/>} />
          <Route path={"/login"} element = {<LoginPage/>} />
      </Routes>
    </div>
  );
}

export default App;
