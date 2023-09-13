"use client";
import React from "react";
import {
  ArrowUpCircleIcon,
  ArrowDownCircleIcon,
} from "@heroicons/react/24/solid";
import { Rating, Typography } from "@material-tailwind/react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

export default function ({
  topRated,
  bottomRated,
  reports,
  resolved,
  unresolved,
}) {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const chartData = {
    labels: ["Reports", "Resolved", "Unresolved"],
    datasets: [
      {
        label: "# of Reports",
        data: [reports, resolved, unresolved],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4 h-full w-full flex items-center space-x-2">
      {/* charts */}
      <div className="border w-2/3 h-4/5 flex items-center justify-center shadow-md ">
        <Doughnut data={chartData} />
      </div>
      {/* top and least rating */}
      <div className="h-4/5 w-1/3 flex flex-col ">
        <div className="w-full h-1/2 shadow-md">
          <div className="flex items-center justify-center p-2">
            <ArrowUpCircleIcon className="h-6 text-green-600" />
            <h1 className="text-xl font-semibold">Top Rated Agencies </h1>
          </div>
          <div className="p-2">
            {topRated?.map((agency) => (
              <div className="flex items-center justify-between space-y-2 border-b">
                <h1>{agency?.agencyName}</h1>
                <Rating value={parseInt(agency?.rating)} />
              </div>
            ))}
          </div>
        </div>
        <hr></hr>
        <div className="w-full h-1/2 shadow-md">
          <div className="flex items-center justify-center p-2">
            <ArrowDownCircleIcon className="h-6 text-red-600" />
            <h1 className="text-xl font-semibold">Bottom Rated Agencies </h1>
          </div>
          <div className="p-2">
            {bottomRated?.map((agency) => (
              <div className="flex items-center justify-between space-y-2 border-b">
                <h1>{agency?.agencyName}</h1>
                <Rating value={parseInt(agency?.rating)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}