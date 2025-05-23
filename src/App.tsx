import { Route, Routes } from "react-router";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Dashboard from "./components/Dashboard";
import Analysis from "./components/Analysis";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/" element={<Dashboard />}></Route>{" "}
        <Route path="/analysis" element={<Analysis />}></Route>
      </Routes>
    </>
  );
};

export default App;
