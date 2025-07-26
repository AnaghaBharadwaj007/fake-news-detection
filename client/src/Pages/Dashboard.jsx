import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  FaArrowDown,
  FaArrowUp,
  FaChartBar,
  FaCheckDouble,
  FaHistory,
} from "react-icons/fa";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

export default function Dashboard() {
  const [detectionData, setDetectionData] = useState({
    totalDetections: 1250,
    fakeCount: 450,
    realCount: 800,
    biasDistribution: {
      left: 200,
      neutral: 700,
      right: 350,
    },
    recentActivity: [
      {
        id: 1,
        content: "Political article on economy",
        verdict: "Real",
        time: "2 hours ago",
      },
      {
        id: 2,
        content: "Social media post about health",
        verdict: "Fake",
        time: "5 hours ago",
      },
      {
        id: 3,
        content: "News report on technology",
        verdict: "Neutral",
        time: "1 day ago",
      },
      {
        id: 4,
        content: "Opinion piece on climate",
        verdict: "Slightly Left",
        time: "2 days ago",
      },
      {
        id: 5,
        content: "Celebrity gossip blog",
        verdict: "Fake",
        time: "3 days ago",
      },
    ],
    trends: {
      fakeNews: "up 10% this week", // or "down 5%", "stable"
      biasDetections: "stable", // or "increasing", "decreasing"
    },
  });

  const pieChartData = {
    labels: ["Fake Detections", "Real Detections"],
    datasets: [
      {
        data: [detectionData.fakeCount, detectionData.realCount],
        backgroundColor: ["#ef4444", "#22c55e"], // Red-500, Green-500
        borderColor: ["#b91c1c", "#16a34a"], // Darker border for contrast
        borderWidth: 1,
      },
    ],
  };

  const barChartData = {
    labels: ["Left", "Neutral", "Right"],
    datasets: [
      {
        label: "Number of Articles",
        data: [
          detectionData.biasDistribution.left,
          detectionData.biasDistribution.neutral,
          detectionData.biasDistribution.right,
        ],
        backgroundColor: ["#3b82f6", "#6b7280", "#dc2626"], // Blue-500, Gray-500, Red-600
        borderColor: ["#2563eb", "#4b5563", "#991b1b"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#d1d5db", // gray-300
        },
      },
      tooltip: {
        titleColor: "#ffffff", // white
        bodyColor: "#d1d5db", // gray-300
        backgroundColor: "rgba(31, 41, 55, 0.9)", // gray-800 with opacity
        borderColor: "#4b5563", // gray-600
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: "#4b5563", // gray-600
          drawBorder: false,
        },
        ticks: {
          color: "#d1d5db", // gray-300
        },
      },
      y: {
        grid: {
          color: "#4b5563", // gray-600
          drawBorder: false,
        },
        ticks: {
          color: "#d1d5db", // gray-300
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-white text-center mb-12">
          Dashboard Overview
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card: Total Detections */}
          <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700 flex flex-col items-center justify-center text-center">
            <FaCheckDouble className="text-sky-400 text-5xl mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">
              Total Detections
            </h2>
            <p className="text-5xl font-extrabold text-green-500">
              {detectionData.totalDetections}
            </p>
          </div>

          {/* Chart Card: Fake vs Real Ratios */}
          <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700 flex flex-col items-center justify-center relative min-h-[300px]">
            <h2 className="text-2xl font-bold text-white mb-4">
              Fake vs Real Content
            </h2>
            <div className="w-full h-64">
              <Pie data={pieChartData} options={chartOptions} />
            </div>
          </div>

          {/* Chart Card: Bias Distribution */}
          <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700 flex flex-col items-center justify-center relative min-h-[300px]">
            <h2 className="text-2xl font-bold text-white mb-4">
              Bias Distribution
            </h2>
            <div className="w-full h-64">
              <Bar data={barChartData} options={chartOptions} />
            </div>
          </div>

          {/* Card: Most Recent Activity */}
          <div className="md:col-span-2 lg:col-span-1 bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <FaHistory className="text-sky-400" /> Most Recent Activity
            </h2>
            <ul className="space-y-4">
              {detectionData.recentActivity.map((activity) => (
                <li
                  key={activity.id}
                  className="bg-gray-700 p-4 rounded-lg flex justify-between items-center border border-gray-600 shadow-sm transition-transform hover:scale-[1.01] duration-200"
                >
                  <div>
                    <p className="text-white text-lg font-medium">
                      {activity.content}
                    </p>
                    <p
                      className={`text-sm mt-1 ${
                        activity.verdict === "Fake"
                          ? "text-red-400"
                          : activity.verdict === "Real"
                          ? "text-green-400"
                          : "text-gray-400"
                      }`}
                    >
                      Verdict: {activity.verdict}
                    </p>
                  </div>
                  <p className="text-gray-500 text-sm flex-shrink-0">
                    {activity.time}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Card: Trends */}
          <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <FaChartBar className="text-sky-400" /> Trends
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                {detectionData.trends.fakeNews.includes("up") && (
                  <FaArrowUp className="text-red-500 text-xl" />
                )}
                {detectionData.trends.fakeNews.includes("down") && (
                  <FaArrowDown className="text-green-500 text-xl" />
                )}
                {detectionData.trends.fakeNews.includes("stable") && (
                  <span className="text-gray-500 text-xl">➖</span>
                )}
                <p className="text-gray-300 text-lg">
                  Fake News:{" "}
                  <span className="font-semibold text-white">
                    {detectionData.trends.fakeNews}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                {detectionData.trends.biasDetections.includes("up") && (
                  <FaArrowUp className="text-red-500 text-xl" />
                )}
                {detectionData.trends.biasDetections.includes("down") && (
                  <FaArrowDown className="text-green-500 text-xl" />
                )}
                {detectionData.trends.biasDetections.includes("stable") && (
                  <span className="text-gray-500 text-xl">➖</span>
                )}
                <p className="text-gray-300 text-lg">
                  Bias Detections:{" "}
                  <span className="font-semibold text-white">
                    {detectionData.trends.biasDetections}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
