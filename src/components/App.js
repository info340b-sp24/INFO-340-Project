import { Route, Routes } from "react-router-dom";
import '../CSS/App.css';
import SignUp from "./SignUp";

function App() {
  return (
    <div>
      <Routes>
        <Route index element = {<SignUp/>} />
      </Routes>
    </div>
  );
}

export default App;
