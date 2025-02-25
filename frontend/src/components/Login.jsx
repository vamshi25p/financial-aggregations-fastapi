import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  Paper,
  Box,
  Stack,
} from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginUser({ email, password }))
      .then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          navigate("/financials");
        }
      })
      .catch((error) => console.error("Login failed:", error));
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Paper
        elevation={3}
        sx={{ padding: 4, width: "400px", textAlign: "center" }}
      >
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        {token && (
          <Typography color="success.main">Login Successful!</Typography>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <Typography color="error.main" variant="body2">
              {error}
            </Typography>
          )}
          <Stack spacing={2} mt={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
            <Typography variant="body2">Don&apos;t have an account?</Typography>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
