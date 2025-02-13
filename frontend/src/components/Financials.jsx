import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAggregations } from "../redux/dataSlice"; // Adjust the import path if needed
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, Paper, CircularProgress, Alert } from "@mui/material";
import BarChart from "./BarChart";

const Financials = () => {
  const dispatch = useDispatch();
  const { aggregations, loading, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchAggregations());
  }, [dispatch]);

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
      }}
    >
      <Typography variant="h4" color="primary" textAlign="center">
        Company Aggregations
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Paper sx={{ width: "80%", height: 400, p: 2 }}>
          <DataGrid
            rows={aggregations.map((item, index) => ({ id: index, ...item }))}
            columns={columns}
            pageSize={5}
          />
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
