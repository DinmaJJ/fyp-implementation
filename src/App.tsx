import { Route, Routes } from "react-router";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        
      </Routes>
    </>
  );
};

export default App;
