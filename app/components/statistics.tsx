"use client";

import LineChartComponent from "../components/lineChart";

export const dynamic = "force-dynamic";

type PropType = {
  data: number[];
  labels: string[];
};

export default function StatisticsComponent(props: PropType) {
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: "Points Earned",
        data: props.data,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Points Earned Over Time",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-screen bg-slate-100 p-4">
      <div className="w-full max-w-[80%] bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">My Line Chart</h1>
        <div className="w-full h-full">
          <LineChartComponent data={data} options={options} />
        </div>
      </div>
    </main>
  );
}
