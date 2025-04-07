


import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Chart.js 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"],
  datasets: [
    {
      label: "방문자 수",
      data: [120, 200, 150, 180, 250, 300, 280],
      backgroundColor: "#4CAF50",
    },
  ],
};

function Stats() {
    return <Bar data={data} />;
}

export default Stats;