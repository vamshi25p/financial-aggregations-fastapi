import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Financials from "./components/Financials";
import Login from "./components/Login";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function PrivateRoute({ element }) {
  const token = useSelector((state) => state.auth.token);
  return token ? element : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/financials"
          element={<PrivateRoute element={<Financials />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
