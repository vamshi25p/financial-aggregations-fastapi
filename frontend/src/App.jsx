import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Financials from "./components/Financials";
import Login from "./components/Login";
import Register from "./components/Register";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

const PrivateRoute = () => {
  const token = useSelector((state) => state.auth.token);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route path="/financials" element={<Financials />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
