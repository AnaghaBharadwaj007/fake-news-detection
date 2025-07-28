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
import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  FaArrowDown,
  FaArrowUp,
  FaChartBar,
  FaCheckDouble,
  FaHistory,
  FaSpinner,
} from "react-icons/fa";
import supabase from "../supabaseClient.js"; // Make sure this path is correct

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
    totalDetections: 0,
    fakeCount: 0,
    realCount: 0,
    uncertainCount: 0, // Added for Uncertain
    unknownCount: 0, // Added for Unknown
    biasDistribution: {
      Neutral: 0,
      Left: 0,
      "Slightly Left": 0,
      Right: 0,
      "Slightly Right": 0,
      // Removed: Sensational, Extremist, Tabloid
    },
    recentActivity: [],
    trends: {
      fakeNews: "stable",
      biasDetections: "stable",
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      setError(null);

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session) {
        console.error("No active session found:", sessionError?.message);
        setError("Please log in to view your dashboard.");
        setIsLoading(false);
        return;
      }

      const user = session.user;

      // Fetching necessary columns for dashboard metrics
      const { data: history, error: fetchError } = await supabase
        .from("history")
        .select("id, verdict, bias, claim, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (fetchError) {
        console.error("Error fetching dashboard data:", fetchError.message);
        setError("Failed to load dashboard data. Please try again.");
        setIsLoading(false);
        return;
      }

      // Process fetched data
      const total = history.length;
      let fake = 0;
      let real = 0;
      let uncertain = 0;
      let unknown = 0;

      // Define allowed biases explicitly for filtering and counting
      const allowedBiasKeys = [
        "Neutral",
        "Left",
        "Slightly Left",
        "Right",
        "Slightly Right",
      ];
      const biasDist = allowedBiasKeys.reduce(
        (acc, key) => ({ ...acc, [key]: 0 }),
        {}
      );

      history.forEach((item) => {
        // Normalize verdict for counting
        const normalizedVerdict = item.verdict
          ? item.verdict.charAt(0).toUpperCase() +
            item.verdict.slice(1).toLowerCase()
          : "Uncertain"; // Default to Uncertain if verdict is missing

        switch (normalizedVerdict) {
          case "Fake":
            fake++;
            break;
          case "Real":
            real++;
            break;
          case "Uncertain":
            uncertain++;
            break;
          case "Unknown":
            unknown++;
            break;
        }

        // Normalize and count bias categories, only for allowed ones
        let itemBias = item.bias || "Neutral";
        if (allowedBiasKeys.includes(itemBias)) {
          biasDist[itemBias]++;
        } else {
          biasDist["Neutral"]++; // Default unrecognized biases to Neutral
        }
      });

      const recent = history.slice(0, 5).map((item) => ({
        id: item.id,
        content: item.claim,
        verdict: item.verdict, // Use original verdict from DB for display
        time: new Date(item.created_at).toLocaleDateString(),
      }));

      // Simple trend estimation
      let fakeNewsTrend = "stable";
      if (total > 0) {
        const fakePercentage = fake / total;
        if (fakePercentage > 0.4) {
          fakeNewsTrend = "high concern";
        } else if (fakePercentage < 0.2) {
          fakeNewsTrend = "low concern";
        }
      }

      let biasDetectionsTrend = "stable";
      const totalBiased = Object.keys(biasDist)
        .filter((b) => b !== "Neutral")
        .reduce((sum, key) => sum + biasDist[key], 0);
      if (total > 0 && totalBiased / total > 0.5) {
        biasDetectionsTrend = "skewed";
      }

      setDetectionData({
        totalDetections: total,
        fakeCount: fake,
        realCount: real,
        uncertainCount: uncertain,
        unknownCount: unknown,
        biasDistribution: biasDist,
        recentActivity: recent,
        trends: {
          fakeNews: fakeNewsTrend,
          biasDetections: biasDetectionsTrend,
        },
      });
      setIsLoading(false);
    };

    fetchDashboardData();
  }, []);

  const pieChartData = {
    labels: ["Fake Detections", "Real Detections", "Uncertain", "Unknown"],
    datasets: [
      {
        data: [
          detectionData.fakeCount,
          detectionData.realCount,
          detectionData.uncertainCount,
          detectionData.unknownCount,
        ],
        backgroundColor: ["#ef4444", "#22c55e", "#f59e0b", "#6b7280"], // Red, Green, Amber (Uncertain), Gray (Unknown)
        borderColor: ["#b91c1c", "#16a34a", "#d97706", "#4b5563"],
        borderWidth: 1,
      },
    ],
  };

  const barChartData = {
    // Labels are now directly from allowedBiasKeys for consistency
    labels: Object.keys(detectionData.biasDistribution),
    datasets: [
      {
        label: "Number of Articles",
        data: Object.values(detectionData.biasDistribution),
        backgroundColor: [
          "#6b7280", // Neutral (Gray-500)
          "#3b82f6", // Left (Blue-500)
          "#6366f1", // Slightly Left (Indigo-500)
          "#dc2626", // Right (Red-600)
          "#fbbf24", // Slightly Right (Amber-400)
        ],
        borderColor: ["#4b5563", "#2563eb", "#4338ca", "#991b1b", "#f59e0b"],
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

        {isLoading ? (
          <div className="text-center py-10 bg-gray-800 rounded-xl shadow-lg border border-gray-700 flex items-center justify-center gap-3">
            <FaSpinner className="animate-spin text-sky-400 text-2xl" />
            <p className="text-sky-400 text-xl">Loading dashboard data...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
            <p className="text-red-400 text-xl">{error}</p>
          </div>
        ) : (
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

            {/* Chart Card: Fake vs Real vs Uncertain vs Unknown Ratios */}
            <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700 flex flex-col items-center justify-center relative min-h-[300px]">
              <h2 className="text-2xl font-bold text-white mb-4">
                Content Verdict Distribution
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
                {detectionData.recentActivity.length === 0 ? (
                  <li className="text-gray-400 text-center py-4">
                    No recent activity found.
                  </li>
                ) : (
                  detectionData.recentActivity.map((activity) => (
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
                              : activity.verdict === "Uncertain" ||
                                activity.verdict === "Unknown"
                              ? "text-yellow-400" // Use yellow for uncertain/unknown
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
                  ))
                )}
              </ul>
            </div>

            {/* Card: Trends */}
            <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FaChartBar className="text-sky-400" /> Trends
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  {detectionData.trends.fakeNews.includes("high") ? (
                    <FaArrowUp className="text-red-500 text-xl" />
                  ) : detectionData.trends.fakeNews.includes("low") ? (
                    <FaArrowDown className="text-green-500 text-xl" />
                  ) : (
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
                  {detectionData.trends.biasDetections.includes("skewed") ? (
                    <FaArrowUp className="text-red-500 text-xl" />
                  ) : (
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
        )}
      </div>
    </div>
  );
}
