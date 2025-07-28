import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaFilter,
  FaShareAlt,
  FaSpinner,
  FaTrash,
} from "react-icons/fa";
import supabase from "../supabaseClient.js";

export default function History() {
  const [historyItems, setHistoryItems] = useState([]);
  const [filterVerdict, setFilterVerdict] = useState("All");
  const [filterBias, setFilterBias] = useState("All");
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHistory = async () => {
    setIsLoading(true);
    setError(null);

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      console.error("No active session found:", sessionError?.message);
      setError("Please log in to view your history.");
      setHistoryItems([]);
      setIsLoading(false);
      return;
    }

    const user = session.user;

    const { data, error: fetchError } = await supabase
      .from("history")
      .select("id, created_at, verdict, bias, claim, article_text")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (fetchError) {
      console.error("Error fetching history:", fetchError.message);
      setError("Failed to load history. Please try again.");
      setHistoryItems([]);
    } else {
      // Normalize verdict and filter/normalize bias categories
      const normalizedData = data.map((item) => {
        let normalizedVerdict = item.verdict
          ? item.verdict.charAt(0).toUpperCase() +
            item.verdict.slice(1).toLowerCase()
          : "Uncertain"; // Default to Uncertain if verdict is missing

        // Filter and normalize bias categories
        let normalizedBias = item.bias || "Neutral"; // Default to Neutral if bias is missing
        const allowedBiases = [
          "Neutral",
          "Left",
          "Slightly Left",
          "Right",
          "Slightly Right",
        ];
        if (!allowedBiases.includes(normalizedBias)) {
          normalizedBias = "Neutral"; // Default to Neutral if it's an unrecognized/unwanted bias
        }

        return {
          ...item,
          verdict: normalizedVerdict,
          bias: normalizedBias,
        };
      });
      setHistoryItems(normalizedData);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    let tempItems = [...historyItems];

    if (filterVerdict !== "All") {
      tempItems = tempItems.filter((item) => item.verdict === filterVerdict);
    }

    if (filterBias !== "All") {
      tempItems = tempItems.filter((item) => item.bias === filterBias);
    }

    setFilteredItems(tempItems);
  }, [historyItems, filterVerdict, filterBias]);

  const handleDelete = async (id) => {
    // Confirmation dialog - using window.confirm as per project guidelines
    if (!window.confirm("Are you sure you want to delete this history item?")) {
      return;
    }

    const { error: deleteError } = await supabase
      .from("history")
      .delete()
      .eq("id", id);

    if (deleteError) {
      alert("Error deleting item. Please try again.");
      console.error("Delete error:", deleteError.message);
    } else {
      setHistoryItems((prevItems) =>
        prevItems.filter((item) => item.id !== id)
      );
      alert("Item deleted successfully!");
    }
  };

  const handleShare = (item) => {
    const shareText = `Check out this news analysis from TruthLens!\nHeadline: "${
      item.claim
    }"\nVerdict: ${item.verdict}\nBias: ${item.bias}\nDate: ${new Date(
      item.created_at
    ).toLocaleDateString()}\nSnippet: "${
      item.article_text
        ? item.article_text.substring(0, 100) + "..."
        : "No snippet available."
    }"`;
    // Use document.execCommand('copy') for clipboard as navigator.clipboard.writeText() may not work in iframes
    const el = document.createElement("textarea");
    el.value = shareText;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    alert("Analysis details copied to clipboard!");
  };

  const getVerdictBadgeClass = (verdict) => {
    switch (verdict) {
      case "Real":
        return "bg-green-600 text-white";
      case "Fake":
        return "bg-red-600 text-white";
      case "Uncertain": // Added for Uncertain
      case "Unknown": // Added for Unknown
        return "bg-yellow-600 text-white";
      default:
        return "bg-gray-500 text-white"; // Fallback
    }
  };

  const getBiasTagClass = (bias) => {
    switch (bias) {
      case "Neutral":
        return "bg-gray-600 text-gray-100";
      case "Left":
        return "bg-indigo-600 text-white";
      case "Slightly Left":
        return "bg-indigo-400 text-white";
      case "Right":
        return "bg-red-660 text-white"; // Using a slightly different red for "Right"
      case "Slightly Right":
        return "bg-amber-400 text-white";
      default:
        return "bg-gray-500 text-white"; // Fallback for any unexpected bias
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-white text-center mb-12">
          Your Detection History
        </h1>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 mb-10">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <FaFilter className="text-sky-400" /> Filter Results
          </h2>
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex flex-wrap gap-3">
              <span className="text-gray-300 font-medium">Verdict:</span>
              {["All", "Real", "Fake", "Uncertain", "Unknown"].map(
                (
                  verdict // Added Uncertain, Unknown
                ) => (
                  <button
                    key={verdict}
                    onClick={() => setFilterVerdict(verdict)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200
                    ${
                      filterVerdict === verdict
                        ? "bg-sky-600 text-white shadow-md"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                    }`}
                  >
                    {verdict}
                  </button>
                )
              )}
            </div>

            <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
              <span className="text-gray-300 font-medium">Bias:</span>
              {[
                "All",
                "Neutral",
                "Left",
                "Slightly Left",
                "Right",
                "Slightly Right",
              ].map(
                (
                  bias // Removed other bias types
                ) => (
                  <button
                    key={bias}
                    onClick={() => setFilterBias(bias)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200
                    ${
                      filterBias === bias
                        ? "bg-sky-600 text-white shadow-md"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                    }`}
                  >
                    {bias}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="lg:col-span-3 text-center py-10 bg-gray-800 rounded-xl shadow-lg border border-gray-700 flex items-center justify-center gap-3">
            <FaSpinner className="animate-spin text-sky-400 text-2xl" />
            <p className="text-sky-400 text-xl">Loading your history...</p>
          </div>
        ) : error ? (
          <div className="lg:col-span-3 text-center py-10 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
            <p className="text-red-400 text-xl">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.length === 0 ? (
              <div className="lg:col-span-3 text-center py-10 bg-gray-800 rounded-xl shadow-lg border border-gray-700">
                <p className="text-gray-400 text-xl">
                  No history items match your filters.
                </p>
              </div>
            ) : (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 flex flex-col justify-between transform hover:scale-[1.01] transition duration-300 ease-in-out"
                >
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                      {item.claim}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      <FaCalendarAlt className="inline-block mr-2 text-gray-500" />
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-gray-300 text-base mb-4 line-clamp-3">
                      {item.article_text
                        ? item.article_text.substring(0, 150) + "..."
                        : "No snippet available."}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getVerdictBadgeClass(
                        item.verdict
                      )}`}
                    >
                      {/* Display verdict with appropriate icon */}
                      {item.verdict === "Real" && "Real"}
                      {item.verdict === "Fake" && "Fake"}
                      {(item.verdict === "Uncertain" ||
                        item.verdict === "Unknown") &&
                        "❓ " + item.verdict}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getBiasTagClass(
                        item.bias
                      )}`}
                    >
                      ⚖️ {item.bias}
                    </span>
                  </div>
                  <div className="flex justify-end gap-3 mt-auto">
                    <button
                      onClick={() => handleShare(item)}
                      className="p-3 bg-sky-600 text-white rounded-full hover:bg-sky-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      title="Share Analysis"
                    >
                      <FaShareAlt className="text-lg" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                      title="Delete Record"
                    >
                      <FaTrash className="text-lg" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
