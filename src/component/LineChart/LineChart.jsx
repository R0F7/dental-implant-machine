import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const LineChart = ({ data }) => {
  return (
    <div>
      <Line
        className="w-full h-[290px] p-10 pt-2"
        data={{
          //   labels: data.map((item) => item.month),
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "Leads",
              data: data.map((item) => item.leads),
              borderColor: "#3b82f6",
              backgroundColor: "rgba(59, 130, 246, 0.6)",
              fill: true,
              tension: 0.4,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: "index",
            intersect: false,
          },

          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
        }}
      />
    </div>
  );
};

export default LineChart;
