"use client";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  ArcElement,
  Tooltip,
  Legend
);

export function PieChart({ data }: { data: any[] }) {
  return (
    <div className="container relative m-auto h-[50vh] w-[50vw]">
      <Pie
        data={{
          labels: data.map((d) => d.cat),
          datasets: [
            {
              label: "Sales",
              data: data.map((d) => d.totalsales),
              backgroundColor: [
                "#f1cbff",
                "#ffbdbd",
                "#68c4af",
                "#96ead7",
                "#bae1ff",
                "#c9c9ff",
              ],
              borderWidth: 1,
            },
          ],
        }}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Your Store's Sales Chart",
            },
            legend: {
              display: true,
              position: "bottom",
            },
          },
        }}
      />
    </div>
  );
}
