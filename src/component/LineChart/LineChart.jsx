// import React from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   LineElement,
//   PointElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   LineElement,
//   PointElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend
// );

// const LineChart = ({ data }) => {
//   return (
//     <div>
//       <Line
//         className="w-full h-[290px] p-10 pt-2"
//         data={{
//           //   labels: data.map((item) => item.month),
//           labels: [
//             "Jan",
//             "Feb",
//             "Mar",
//             "Apr",
//             "May",
//             "Jun",
//             "Jul",
//             "Aug",
//             "Sep",
//             "Oct",
//             "Nov",
//             "Dec",
//           ],
//           datasets: [
//             {
//               label: "Leads",
//               data: data.map((item) => item.leads),
//               borderColor: "#3b82f6",
//               backgroundColor: "rgba(59, 130, 246, 0.6)",
//               fill: true,
//               tension: 0.4,
//             },
//           ],
//         }}
//         options={{
//           responsive: true,
//           maintainAspectRatio: false,
//           interaction: {
//             mode: "index",
//             intersect: false,
//           },

//           plugins: {
//             legend: {
//               display: true,
//               position: "top",
//             },
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default LineChart;

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
        className="w-full h-fit p-6 pt-2"
        data={{
          labels: data.map((item) => item.month),

          datasets: [
            {
              label: "Total Lead",
              data: data.map((item) => item.totalLead),
              borderColor: "#3b82f6",
              backgroundColor: "rgba(59,130,246,0.2)",
              tension: 0.4,
            },
            {
              label: "Conversion",
              data: data.map((item) => item.conversion),
              borderColor: "#22c55e",
              backgroundColor: "rgba(34,197,94,0.2)",
              tension: 0.4,
            },
            {
              label: "Booking",
              data: data.map((item) => item.booking),
              borderColor: "#06b6d4",
              backgroundColor: "rgba(6,182,212,0.2)",
              tension: 0.4,
            },
            {
              label: "Showing",
              data: data.map((item) => item.showing),
              borderColor: "#eab308",
              backgroundColor: "rgba(234,179,8,0.2)",
              tension: 0.4,
            },
            {
              label: "Close",
              data: data.map((item) => item.close),
              borderColor: "#ef4444",
              backgroundColor: "rgba(239,68,68,0.2)",
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
              position: "top",
            },
            tooltip: {
              mode: "index",
              intersect: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default LineChart;
