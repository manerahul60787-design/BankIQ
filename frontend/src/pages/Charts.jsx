import { useEffect, useState } from "react";
import API from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A020F0",
  "#FF1493"
];

function Charts() {

  const [data, setData] = useState([]);

  useEffect(() => {

    const token = localStorage.getItem("token");

    API.get(
      "/transactions/category-wise",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    .then((res) => {

      const chartData = Object.entries(res.data).map(

        ([key, value]) => ({

          name: key,

          value: value

        })

      );

      setData(chartData);

    })

    .catch((err) => {

      console.log(err);

    });

  }, []);

  return (

    <div style={{ padding: "40px" }}>

      <h1>Expense Analysis</h1>

      <PieChart width={600} height={450}>

        <Pie

          data={data}

          dataKey="value"

          nameKey="name"

          cx="50%"

          cy="50%"

          outerRadius={140}

          label

        >

          {

            data.map((entry, index) => (

              <Cell

                key={index}

                fill={COLORS[index % COLORS.length]}

              />

            ))

          }

        </Pie>

        <Tooltip />

        <Legend />

      </PieChart>

    </div>

  );

}

export default Charts;