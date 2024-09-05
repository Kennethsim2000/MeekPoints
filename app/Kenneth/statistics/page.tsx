"use client";

import { useEffect, useState } from "react";
import StatisticsComponent from "../../components/statistics";

export const dynamic = "force-dynamic";

type Stats = {
  totalPoints: number;
  year: string;
  month: string;
};

export default function Page() {
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    async function fetchTasks() {
      const res = await fetch(`/api/aggregate?owner=Kenneth`);
      const statistics = await res.json();
      const points = statistics.map((stat: Stats) => {
        return stat.totalPoints;
      });
      setData(points);
      const labels = statistics.map((stat: Stats) => {
        const monthName = monthNames[parseInt(stat.month) - 1];
        return monthName + " " + stat.year;
      });
      setLabels(labels);
    }

    fetchTasks();
  }, []);
  return (
    <main>
      <StatisticsComponent data={data} labels={labels} />
    </main>
  );
}
