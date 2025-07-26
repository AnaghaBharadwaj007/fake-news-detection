import { useEffect, useRef, useState } from "react";
import {
  FaBalanceScale, // For alert/fake
  FaCheckCircle,
  FaExclamationTriangle,
  FaFileAlt,
  FaKeyboard, // For real/verified
  FaLightbulb,
  FaLink, // For extracted claim (brain/idea)
  FaSearch, // For loading
  FaShareAlt, // For negative confirmation
  FaSpinner, // For bias
  FaTimesCircle, // For negative confirmation
} from "react-icons/fa";

export default function Detection() {
  const [activeTab, setActiveTab] = useState("text"); // 'text', 'file', 'url'
  const [inputText, setInputText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [inputUrl, setInputUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null); // Stores analysis results

  const resultsRef = useRef(null); // Ref for auto-scrolling to results

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleAnalyzeContent = () => {
    setIsLoading(true);
    setResults(null); // Clear previous results

    // Simulate API call with a delay
    setTimeout(() => {
      // Default results for demonstration, matching the new sample output format
      const defaultResults = {
        verdictHF: "Potentially Fake", // "Potentially Fake" or "Likely Real"
        extractedClaim: "India banned TikTok in June 2020",
        searchQueryUsed:
          "India banned TikTok in June 2020 site:snopes.com OR site:politifact.com",
        backedInfoFound: {
          verdict: "confirms", // "confirms", "refutes", "no_info"
          text: "Snopes.com confirms: 'India did ban TikTok in June 2020 over security concerns'",
        },
        finalVerdict: "Real", // "Real", "Fake", or "Uncertain"
        sources: [
          "https://www.snopes.com/fact-check/india-bans-tiktok/",
          "https://www.reuters.com/article/india-china-apps-idUSKBN24016Q", // Added another sample source
        ],
        biasScore: "Neutral", // "Neutral", "Slightly Left", "Right", "Heavily Left", "Heavily Right"
        conclusion:
          "The content aligns with verified facts regarding India's TikTok ban. The analysis found no significant discrepancies, affirming the claims made in the article. The overall tone appears objective.", // Added for detailed conclusion card
      };

      setResults(defaultResults);
      setIsLoading(false);
    }, 2500); // 2.5-second delay to simulate analysis time
  };

  const handleShareOutput = () => {
    // This is a placeholder function, Boss.
    // In a real application, you might:
    // 1. Generate a unique shareable URL for this specific analysis.
    // 2. Use the Web Share API (navigator.share) if available.
    // 3. Copy the output text to the clipboard.
    // For now, let's just log and alert!
    console.log("Sharing output:", results);
    alert("Share functionality coming soon, Boss! Output logged to console.");
  };

  useEffect(() => {
    if (results && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [results]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans py-16 px-4">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-2xl p-8 md:p-12 border border-gray-700">
        <h1 className="text-4xl font-extrabold text-white text-center mb-8">
          Analyze Content for Truth
        </h1>
        <p className="text-gray-400 text-center mb-10 text-lg">
          Paste text, upload a file, or enter a URL to get instant fake news and
          bias detection.
        </p>

        {/* Input Type Tabs */}
        <div className="flex justify-center mb-8 space-x-4">
          <button
            onClick={() => setActiveTab("text")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-lg font-semibold transition-all duration-200
              ${
                activeTab === "text"
                  ? "bg-sky-600 text-white shadow-lg"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
              }`}
          >
            <FaKeyboard /> Text
          </button>
          <button
            onClick={() => setActiveTab("file")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-lg font-semibold transition-all duration-200
              ${
                activeTab === "file"
                  ? "bg-sky-600 text-white shadow-lg"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
              }`}
          >
            <FaFileAlt /> File
          </button>
          <button
            onClick={() => setActiveTab("url")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-lg font-semibold transition-all duration-200
              ${
                activeTab === "url"
                  ? "bg-sky-600 text-white shadow-lg"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
              }`}
          >
            <FaLink /> URL
          </button>
        </div>

        {/* Input Area based on active tab */}
        <div className="mb-10">
          {activeTab === "text" && (
            <textarea
              placeholder="Paste the article text or news content you want to analyze..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows="10"
              className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors duration-200 resize-y"
            ></textarea>
          )}
          {activeTab === "file" && (
            <div className="flex flex-col items-center justify-center p-8 rounded-lg bg-gray-700 border border-gray-600">
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-200 text-lg"
              >
                Upload File
              </label>
              <input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
              {selectedFile && (
                <p className="mt-4 text-gray-300 text-center">
                  Selected file: {selectedFile.name}
                </p>
              )}
              <p className="mt-2 text-gray-400 text-sm">
                Supported formats: .txt, .pdf, .docx
              </p>
            </div>
          )}
          {activeTab === "url" && (
            <input
              type="url"
              placeholder="Enter the URL of the news article..."
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="w-full p-4 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors duration-200"
            />
          )}
        </div>

        {/* Analyze Button */}
        <div className="text-center">
          <button
            onClick={handleAnalyzeContent}
            disabled={
              isLoading ||
              (activeTab === "text" && !inputText) ||
              (activeTab === "file" && !selectedFile) ||
              (activeTab === "url" && !inputUrl)
            }
            className={`px-10 py-4 rounded-full text-xl font-bold transition-all duration-300 shadow-lg flex items-center justify-center gap-3 mx-auto
              ${
                isLoading
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-sky-600 text-white hover:bg-sky-700"
              }`}
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin h-5 w-5 text-white" />
                Analyzing...
              </>
            ) : (
              "Analyze Content"
            )}
          </button>
        </div>
      </div>

      {/* Analysis Results Section */}
      {results && (
        <div
          ref={resultsRef}
          className="mt-16 max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-2xl p-8 md:p-12 border border-gray-700 animate-fadeIn"
        >
          <h2 className="text-4xl font-extrabold text-white mb-8 text-center">
            ⚙️ Analysis Output
          </h2>

          {/* Main Final Verdict Card (most prominent) */}
          <div
            className={`p-8 rounded-lg shadow-lg mb-8 text-center
              ${
                results.finalVerdict === "Real"
                  ? "bg-green-700 border-green-600"
                  : results.finalVerdict === "Fake"
                  ? "bg-red-700 border-red-600"
                  : "bg-yellow-700 border-yellow-600"
              }`}
          >
            <div className="flex flex-col items-center justify-center mb-4">
              {results.finalVerdict === "Real" && (
                <FaCheckCircle className="text-white text-6xl mb-2" />
              )}
              {results.finalVerdict === "Fake" && (
                <FaTimesCircle className="text-white text-6xl mb-2" />
              )}
              {results.finalVerdict === "Uncertain" && (
                <FaExclamationTriangle className="text-white text-6xl mb-2" />
              )}
              <h3 className="text-4xl md:text-5xl font-extrabold text-white">
                {results.finalVerdict}
              </h3>
            </div>
            <p className="text-white text-lg md:text-xl font-semibold mb-4">
              Verdict on the analyzed content
            </p>
            {/* Smaller HF verdict below */}
            <p className="text-gray-200 text-sm flex items-center justify-center gap-2">
              HuggingFace Model initial prediction:{" "}
              {results.verdictHF === "Potentially Fake" ? (
                <span className="text-red-300 flex items-center gap-1">
                  <FaExclamationTriangle className="text-sm" />{" "}
                  {results.verdictHF}
                </span>
              ) : (
                <span className="text-green-300 flex items-center gap-1">
                  <FaCheckCircle className="text-sm" /> {results.verdictHF}
                </span>
              )}
            </p>
          </div>

          {/* Grid for key details: Claim & Bias */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Extracted Claim Card */}
            <div className="bg-gray-700 p-6 rounded-lg border border-gray-600 shadow-md">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <FaLightbulb className="text-sky-400 text-2xl" /> Extracted
                Claim
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                "{results.extractedClaim}"
              </p>
            </div>

            {/* Bias Score Card */}
            <div className="bg-gray-700 p-6 rounded-lg border border-gray-600 shadow-md">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <FaBalanceScale className="text-sky-400 text-2xl" /> Bias Level
              </h3>
              <p className="text-sky-400 text-3xl font-extrabold">
                {results.biasScore}
              </p>
              <p className="text-gray-300 text-sm mt-1">
                Based on article tone & keywords
              </p>
            </div>
          </div>

          {/* Backed Information Card */}
          <div className="bg-gray-700 p-6 rounded-lg border border-gray-600 shadow-md mb-8">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <FaSearch className="text-sky-400 text-2xl" /> Backed Information
            </h3>
            <p className="text-gray-300 text-base mb-3">
              Search Query Used:{" "}
              <span className="text-gray-400 italic">
                "{results.searchQueryUsed}"
              </span>
            </p>
            {results.backedInfoFound.verdict === "confirms" ? (
              <div className="flex items-center gap-2 text-green-400 text-lg">
                <FaCheckCircle className="text-2xl" />{" "}
                {results.backedInfoFound.text}
              </div>
            ) : results.backedInfoFound.verdict === "refutes" ? (
              <div className="flex items-center gap-2 text-red-400 text-lg">
                <FaTimesCircle className="text-2xl" />{" "}
                {results.backedInfoFound.text}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-yellow-400 text-lg">
                <FaExclamationTriangle className="text-2xl" />{" "}
                {results.backedInfoFound.text ||
                  "No direct confirmation/refutation found."}
              </div>
            )}
          </div>

          {/* Sources Card */}
          <div className="bg-gray-700 p-6 rounded-lg border border-gray-600 shadow-md mb-8">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <FaLink className="text-sky-400 text-2xl" /> Sources
            </h3>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2 pl-4">
              {results.sources.length > 0 ? (
                results.sources.map((source, index) => (
                  <li key={index}>
                    <a
                      href={source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-400 hover:underline transition-colors duration-200 text-base break-words"
                    >
                      {source}
                    </a>
                  </li>
                ))
              ) : (
                <li className="text-gray-400">
                  No external sources found for this analysis.
                </li>
              )}
            </ul>
          </div>

          {/* Detailed Conclusion Card (if available) */}
          {results.conclusion && (
            <div className="bg-gray-700 p-6 rounded-lg border border-gray-600 shadow-md mb-8">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <FaCheckCircle className="text-sky-400 text-2xl" /> Detailed
                Conclusion
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                {results.conclusion}
              </p>
            </div>
          )}

          {/* Share Button & Footer Text */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-10 gap-4">
            <button
              onClick={handleShareOutput}
              className="bg-sky-600 text-white py-3 px-8 rounded-full hover:bg-sky-700 shadow-md transition duration-200 font-semibold text-lg flex items-center justify-center gap-2"
            >
              <FaShareAlt /> Share Output
            </button>
            <p className="text-center md:text-right text-gray-400 text-sm">
              Analysis powered by external fact-checking. For informational
              purposes only.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
