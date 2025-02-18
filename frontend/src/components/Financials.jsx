import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAggregations } from "../redux/dataSlice"; // Adjust the import path if needed
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import BarChart from "./BarChart";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Financials = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { aggregations, loading, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchAggregations());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const columns = [
    { field: "country_code", headerName: "Country Code", flex: 1 },
    { field: "companies_count", headerName: "Companies Count", flex: 1 },
    {
      field: "active_companies_count",
      headerName: "Active Companies",
      flex: 1,
    },
    {
      field: "inactive_companies_count",
      headerName: "Inactive Companies",
      flex: 1,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        gap: 2,
        p: 3,
        position: "relative",
      }}
    >
      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
        sx={{ position: "absolute", top: 10, right: 20 }}
      >
        Logout
      </Button>

      <Typography variant="h4" color="primary" textAlign="center">
        Company Aggregations
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Paper sx={{ width: "80%", p: 2 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((col) => (
                    <TableCell key={col.field}>{col.headerName}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {aggregations.map((item, index) => (
                  <TableRow key={index}>
                    {columns.map((col) => (
                      <TableCell key={col.field}>{item[col.field]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      <Typography variant="h5" color="primary" textAlign="center">
        Company Aggregations Chart
      </Typography>

      <Box sx={{ width: "80%", height: 400 }}>
        <BarChart data={aggregations} />
      </Box>
    </Box>
  );
};

export default Financials;
