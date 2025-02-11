import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
/* eslint-disable */
const BarChart = ({ data }) => {
  const countryCode = data.map((item) => item.country_code);
  const companyCount = data.map((item) => item.companies_count);
  const activeCount = data.map((item) => item.active_companies_count);
  const inactiveCount = data.map((item) => item.inactive_companies_count);

  const chartData = {
    labels: countryCode,
    datasets: [
      {
        label: "Total Companies",
        data: companyCount,
        backgroundColor: "black",
      },
      {
        label: "Active Companies",
        data: activeCount,
        backgroundColor: "grey",
      },
      {
        label: "Inactive Companies",
        data: inactiveCount,
        backgroundColor: "orange",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Company Aggregation by Country" },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default BarChart;
