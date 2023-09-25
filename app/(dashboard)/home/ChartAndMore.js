"use client";
import React from "react";
import {
  ArrowUpCircleIcon,
  ArrowDownCircleIcon,
} from "@heroicons/react/24/solid";
import { Rating, Typography, Progress } from "@material-tailwind/react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

export default function ChartAndMore({
  reportTagData,
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
    <div className="p-4 h-full w-full flex items-start space-x-2 bg-[#F8FAFB]">
      {/* charts */}
      <div className="w-2/3 h-full">
        <div className=" w-full h-3/5 flex items-center justify-center  bg-white ">
          <Doughnut data={chartData} />
        </div>
        <div className="w-full h-[22rem] border bg-white mt-8 p-4">
          <h1 className="font-md text-xl">Report Tag Overview</h1>
          <div className="w-full h-full flex items-center  ">
            {reportTagData && (
              <>
                <div className="border w-1/5 h-full p-4 flex flex-col">
                  <Typography color="blue-gray" variant="h6">
                    Availabiliy
                  </Typography>
                  <Typography color="blue-gray" variant="h6">
                    Bribery
                  </Typography>
                  <Typography color="blue-gray" variant="h6">
                    Delay
                  </Typography>
                  <Typography color="blue-gray" variant="h6">
                    Rude Staff
                  </Typography>
                </div>
                <div className="border w-3/5 h-full p-4 flex flex-col space-y-4">
                  <Typography color="blue-gray" variant="h6">
                    <Progress value={reportTagData.availabilityCount} />
                  </Typography>
                  <Typography color="blue-gray" variant="h6">
                    <Progress value={reportTagData?.briberyCount} />
                  </Typography>
                  <Typography color="blue-gray" variant="h6">
                    <Progress value={reportTagData?.delayCount} />
                  </Typography>
                  <Typography color="blue-gray" variant="h6">
                    <Progress value={reportTagData?.rudeStaffCount} />
                  </Typography>
                  <div className="w-full flex items-center justify-between text-xs ">
                    <h1>0</h1>
                    <h1>10</h1>
                    <h1>20</h1>
                    <h1>30</h1>
                    <h1>40</h1>
                    <h1>50</h1>
                    <h1>60</h1>
                    <h1>70</h1>
                    <h1>80</h1>
                    <h1>90</h1>
                    <h1>100</h1>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* top and least rating */}
      <div className="h-4/5 w-1/3 flex flex-col bg-white ">
        <div className="w-full h-1/2 ">
          <div className="flex items-center justify-center p-2">
            <ArrowUpCircleIcon className="h-6 text-green-600" />
            <h1 className="text-xl font-semibold">Top Rated Agencies </h1>
          </div>
          <div className="p-2">
            {topRated?.map((agency) => (
              <div
                key={agency.id}
                className="flex items-center justify-between space-y-2 border-b"
              >
                <h1>{agency?.agencyName}</h1>
                <Rating value={parseInt(agency?.rating)} />
              </div>
            ))}
          </div>
        </div>
        <hr></hr>
        <div className="w-full h-1/2 ">
          <div className="flex items-center justify-center p-2">
            <ArrowDownCircleIcon className="h-6 text-red-600" />
            <h1 className="text-xl font-semibold">Bottom Rated Agencies </h1>
          </div>
          <div className="p-2">
            {bottomRated?.map((agency) => (
              <div
                key={agency.id}
                className="flex items-center justify-between space-y-2 border-b"
              >
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
