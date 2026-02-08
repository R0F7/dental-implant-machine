import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { Scatter } from "react-chartjs-2";
import dayjs from "dayjs";

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
);

const ScatterChart = ({ datasets }) => {
  const data = {
    datasets: datasets.map((ds) => ({
      ...ds,
      pointRadius: 5,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const raw = context.raw;
            const date = dayjs(raw.x).format("DD MMM YYYY, hh:mm A");
            //   const date = dayjs
            //     .utc(raw.x)
            //     .tz("America/Denver")
            //     .format("DD MMM YYYY, hh:mm A");

            return [
              `${context.dataset.label}`,
              `📅 ${date} (America/Denver)`,
              `🏥 ${raw.clinicName}`,
            ];
          },
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
        title: {
          display: true,
          text: "Day of Month (America/Denver)",
        },
      },
      y: {
        min: 0,
        max: 24,
        ticks: {
          stepSize: 3,
          callback: (value) => {
            if (value === 0) return "12 AM";
            if (value < 12) return `${value} AM`;
            if (value === 12) return "12 PM";
            return `${value - 12} PM`;
          },
        },
        title: {
          display: true,
          text: "Time of Day (America/Denver)",
        },
      },
    },
  };

  return (
    <div className="h-[450px] md:h-[500px] lg:h-[600px]">
      <Scatter data={data} options={options} /> {/* redraw */}
    </div>
  );
};

export default ScatterChart;
