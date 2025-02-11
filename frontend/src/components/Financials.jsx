import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import BarChart from "./BarChart";

const Financials = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/aggregations");

        if (!response.ok) {
          throw new Error(`Failed to fetch the json file`);
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h2
        style={{ color: "#565c5b", textAlign: "center", marginBottom: "15px" }}
      >
        Company Aggregations
      </h2>

      <Table bordered hover variant="light" style={{ width: "600px" }}>
        <thead>
          <tr>
            <th>country_code</th>
            <th>companies_count</th>
            <th>active_companies_count</th>
            <th>inactive_companies_count</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id || index}>
              <td>{item.country_code}</td>
              <td>{item.companies_count}</td>
              <td>{item.active_companies_count}</td>
              <td>{item.inactive_companies_count}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h2 style={{ color: "#565c5b", textAlign: "center", marginTop: "20px" }}>
        Company Aggregations Chart
      </h2>

      <div style={{ width: "600px", height: "400px" }}>
        <BarChart data={data} />
      </div>
    </div>
  );
};

export default Financials;
