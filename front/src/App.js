import "./App.css";
import { Routes, Route, HashRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import "./components/styles/variables.css";
import Login from "./components/Login";
import Register from "./components/Register";
const URL = "http://localhost:8000";
function App() {
  return (
    <div className="App">
      <HashRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register URL={URL} />} />
          <Route path="/login" element={<Login URL={URL} />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
