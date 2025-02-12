import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Financials from "./components/Financials";
import Login from "./components/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/financials" element={<Financials />} />
      </Routes>
    </Router>
  );
}

export default App;
