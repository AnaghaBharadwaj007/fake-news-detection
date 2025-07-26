import { useEffect, useState } from "react";
import { FaCalendarAlt, FaFilter, FaShareAlt, FaTrash } from "react-icons/fa";

export default function History() {
  // Placeholder data for past detection results
  const [historyItems, setHistoryItems] = useState([
    {
      id: 1,
      headline: "Government announces new economic policy to boost growth",
      date: "2024-07-20",
      verdict: "Real",
      bias: "Neutral",
      snippet:
        "Detailed analysis of the government's latest economic reform package and its projected impact.",
    },
    {
      id: 2,
      headline:
        "Aliens spotted landing in remote desert town, claims viral video",
      date: "2024-07-19",
      verdict: "Fake",
      bias: "Sensational",
      snippet:
        "A viral video purporting to show alien spacecraft has been debunked by experts and local authorities.",
    },
    {
      id: 3,
      headline:
        "New study reveals shocking health benefits of coffee consumption",
      date: "2024-07-18",
      verdict: "Real",
      bias: "Slightly Left",
      snippet:
        "Researchers found positive correlations between moderate coffee intake and cardiovascular health.",
    },
    {
      id: 4,
      headline: "Major climate conspiracy theory gains traction online",
      date: "2024-07-17",
      verdict: "Fake",
      bias: "Extremist",
      snippet:
        "An in-depth look at a widespread online theory questioning established climate science, found to be baseless.",
    },
    {
      id: 5,
      headline: "Tech giant announces record profits amid industry downturn",
      date: "2024-07-16",
      verdict: "Real",
      bias: "Slightly Right",
      snippet:
        "Despite market anxieties, a leading technology firm posted its highest quarterly earnings to date.",
    },
    {
      id: 6,
      headline: "Local politician caught in alleged corruption scandal",
      date: "2024-07-15",
      verdict: "Fake",
      bias: "Tabloid", // Another bias type
      snippet:
        "Claims of a local politician's involvement in a corruption ring were found to be unsubstantiated and based on doctored evidence.",
    },
    {
      id: 7,
      headline: "Scientific breakthrough promises cure for common cold",
      date: "2024-07-14",
      verdict: "Real",
      bias: "Neutral",
      snippet:
        "Scientists have identified a novel compound that shows promising results in early trials for combating common cold viruses.",
    },
  ]);

  const [filterVerdict, setFilterVerdict] = useState("All"); // 'All', 'Real', 'Fake'
  const [filterBias, setFilterBias] = useState("All"); // 'All', 'Neutral', 'Left', 'Right', etc.
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    // Apply filters whenever historyItems or filter states change
    let tempItems = [...historyItems];

    if (filterVerdict !== "All") {
      tempItems = tempItems.filter((item) => item.verdict === filterVerdict);
    }

    if (filterBias !== "All") {
      tempItems = tempItems.filter((item) => item.bias === filterBias);
    }

    setFilteredItems(tempItems);
  }, [historyItems, filterVerdict, filterBias]);

  const handleDelete = (id) => {
    // Your delete logic here, Boss!
    // For now, it just removes from local state
    console.log(`Deleting item with ID: ${id}`);
    setHistoryItems((prevItems) => prevItems.filter((item) => item.id !== id));
    alert(`Item ${id} deleted! (Placeholder)`);
  };

  const handleShare = (item) => {
    // Your share logic here, Boss!
    // In a real app, you might generate a unique URL or copy text to clipboard.
    const shareText = `Check out this news analysis from TruthLens!\nHeadline: "${item.headline}"\nVerdict: ${item.verdict}\nBias: ${item.bias}\nDate: ${item.date}`;
    console.log("Sharing:", shareText);
    alert(`Sharing: "${item.headline}" (Placeholder)`);
    // Example for Web Share API (requires HTTPS and user interaction)
    // if (navigator.share) {
    //   navigator.share({
    //     title: 'TruthLens Analysis Result',
    //     text: shareText,
    //     url: window.location.href, // Or a specific link to this analysis
    //   }).then(() => console.log('Successful share'))
    //     .catch((error) => console.log('Error sharing', error));
    // } else {
    //   navigator.clipboard.writeText(shareText).then(() => {
    //     alert('Analysis copied to clipboard!');
    //   }).catch((err) => {
    //     console.error('Could not copy text: ', err);
    //     alert('Failed to copy to clipboard.');
    //   });
    // }
  };

  const getVerdictBadgeClass = (verdict) => {
    switch (verdict) {
      case "Real":
        return "bg-green-600 text-white";
      case "Fake":
        return "bg-red-600 text-white";
      default:
        return "bg-gray-500 text-white";
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
        return "bg-yellow-600 text-white";
      case "Slightly Right":
        return "bg-amber-400 text-white";
      case "Sensational":
        return "bg-purple-600 text-white";
      case "Extremist":
        return "bg-pink-700 text-white";
      case "Tabloid":
        return "bg-blue-gray-700 text-white"; // Using a darker blue-gray for Tabloid
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-white text-center mb-12">
          Your Detection History
        </h1>

        {/* Filters Section */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 mb-10">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <FaFilter className="text-sky-400" /> Filter Results
          </h2>
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Verdict Filter */}
            <div className="flex flex-wrap gap-3">
              <span className="text-gray-300 font-medium">Verdict:</span>
              {["All", "Real", "Fake"].map((verdict) => (
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
              ))}
            </div>

            {/* Bias Filter */}
            <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
              <span className="text-gray-300 font-medium">Bias:</span>
              {[
                "All",
                "Neutral",
                "Left",
                "Slightly Left",
                "Right",
                "Slightly Right",
                "Sensational",
                "Extremist",
                "Tabloid",
              ].map((bias) => (
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
              ))}
            </div>
          </div>
        </div>

        {/* History Cards Grid */}
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
                    {item.headline}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    <FaCalendarAlt className="inline-block mr-2 text-gray-500" />
                    {item.date}
                  </p>
                  <p className="text-gray-300 text-base mb-4 line-clamp-3">
                    {item.snippet}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getVerdictBadgeClass(
                      item.verdict
                    )}`}
                  >
                    {item.verdict === "Real" ? "✅ Real" : "❌ Fake"}
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
      </div>
    </div>
  );
}
