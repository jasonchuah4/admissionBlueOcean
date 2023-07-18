import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ students, studentInfo }) => {
  const monthlyData = [];
  const monthLabels = [];
  const passRates = [];
  const failRates = [];

  // Calculate the number of interviews and pass/fail rates for each month
  for (let month = 0; month < 12; month++) {
    const studentsInMonth = studentInfo.filter((student) => {
      const studentMonth = new Date(student.interview_date).getMonth();
      return studentMonth === month;
    });

    const passedInMonth = studentsInMonth.filter(
      (student) => student.results
    ).length;
    const failedInMonth = studentsInMonth.length - passedInMonth;

    monthlyData.push(studentsInMonth.length);
    monthLabels.push(month); // You can replace this with actual month labels

    const passRate =
      studentsInMonth.length > 0
        ? (passedInMonth / studentsInMonth.length) * 100
        : 0;
    const failRate =
      studentsInMonth.length > 0
        ? (failedInMonth / studentsInMonth.length) * 100
        : 0;

    passRates.push(passRate.toFixed(2));
    failRates.push(failRate.toFixed(2));
  }

  const data = {
    labels: monthLabels,
    datasets: [
      {
        label: "Interviews",
        data: monthlyData,
        backgroundColor: "#FFCE56",
        hoverBackgroundColor: "#FFCE56",
        yAxisID: "interviews",
      },
      {
        label: "Pass Rate",
        data: passRates,
        backgroundColor: "#36A2EB",
        hoverBackgroundColor: "#36A2EB",
        yAxisID: "rates",
      },
      {
        label: "Fail Rate",
        data: failRates,
        backgroundColor: "#FF6384",
        hoverBackgroundColor: "#FF6384",
        yAxisID: "rates",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      interviews: {
        type: "linear",
        position: "left",
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Interviews",
        },
      },
      rates: {
        type: "linear",
        position: "right",
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Rate (%)",
        },
      },
    },
  };

  return (
    <div className="h-[400px] bg-bg rounded-lg shadow-lg shadow-black">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
