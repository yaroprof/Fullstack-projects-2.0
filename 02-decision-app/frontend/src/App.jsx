import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Decision from "./components/Decision";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";

const App = () => {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Decision />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;