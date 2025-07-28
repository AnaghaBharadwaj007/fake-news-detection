import { useEffect, useRef, useState } from "react";
import {
  FaBalanceScale,
  FaCheckCircle,
  FaExclamationTriangle,
  FaKeyboard,
  FaLightbulb,
  FaLink,
  FaSearch,
  FaShareAlt,
  FaSpinner,
  FaTimesCircle,
} from "react-icons/fa";
import supabase from "../supabaseClient.js"; // Import your Supabase client

export default function Detection() {
  const [activeTab, setActiveTab] = useState("text"); // 'text', 'url'
  const [inputText, setInputText] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null); // Stores analysis results
  const [error, setError] = useState(null); // Stores API errors
  const [currentUserId, setCurrentUserId] = useState(null); // State to store the current user's ID

  const resultsRef = useRef(null); // Ref for auto-scrolling to results

  // Fetch current user ID on component mount
  useEffect(() => {
    const getUserId = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setCurrentUserId(session.user.id);
      } else {
        // Handle case where no user is logged in (e.g., for anonymous usage or prompt login)
        // For this project, we'll use a generic ID if not logged in.
        setCurrentUserId("anonymous_user");
        console.warn("No active Supabase session. Using anonymous_user_id.");
      }
    };
    getUserId();

    // Listen for auth state changes (e.g., user logs in/out)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setCurrentUserId(session.user.id);
        } else {
          setCurrentUserId("anonymous_user");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleAnalyzeContent = async () => {
    setIsLoading(true);
    setResults(null); // Clear previous results
    setError(null); // Clear previous errors

    if (!currentUserId) {
      setError("User ID not available. Please wait or log in.");
      setIsLoading(false);
      return;
    }

    let requestBody = {
      user_id: currentUserId, // Use the actual Supabase user ID
    };

    if (activeTab === "text") {
      if (!inputText.trim()) {
        setError("Please enter some text to analyze.");
        setIsLoading(false);
        return;
      }
      requestBody.article_text = inputText;
    } else if (activeTab === "url") {
      if (!inputUrl.trim()) {
        setError("Please enter a URL to analyze.");
        setIsLoading(false);
        return;
      }
      requestBody.article_url = inputUrl;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "An unknown error occurred during analysis.");
        setResults(null);
        return;
      }

      // Map backend response to frontend results structure
      const mappedResults = {
        verdictHF: data.model_output,
        extractedClaim: data.claim,
        searchQueryUsed: data.search_query,
        backedInfoFound: {
          // This logic might need fine-tuning based on precise backend 'backed_info' content
          verdict:
            data.sources &&
            data.sources.length > 0 &&
            typeof data.sources[0] === "string" &&
            data.sources[0].startsWith("http")
              ? "confirms"
              : "no_info",
          text: data.backed_info,
        },
        finalVerdict: data.verdict,
        sources: data.sources,
        biasScore: data.bias,
        conclusion: data.conclusion,
        analyzedInput: data.article_text || data.article_url_input,
        inputType: activeTab,
      };

      setResults(mappedResults);
      setError(null);
    } catch (err) {
      console.error("API call failed:", err);
      setError(
        "Failed to connect to the analysis server. Please ensure the backend is running."
      );
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShareOutput = () => {
    // This is a placeholder function.
    console.log("Sharing output:", results);
    alert("Share functionality coming soon! Output logged to console.");
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
          Paste text or enter a URL to get instant fake news and bias detection.
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
              !currentUserId || // Disable if user ID is not yet determined
              (activeTab === "text" && !inputText.trim()) ||
              (activeTab === "url" && !inputUrl.trim())
            }
            className={`px-10 py-4 rounded-full text-xl font-bold transition-all duration-300 shadow-lg flex items-center justify-center gap-3 mx-auto
              ${
                isLoading || !currentUserId
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-sky-600 text-white hover:bg-sky-700"
              }`}
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin h-5 w-5 text-white" />
                Analyzing...
              </>
            ) : !currentUserId ? (
              <>
                <FaSpinner className="animate-spin h-5 w-5 text-white" />
                Loading User...
              </>
            ) : (
              "Analyze Content"
            )}
          </button>
        </div>

        {/* Error Message Display */}
        {error && (
          <div className="mt-8 p-4 bg-red-800 rounded-lg text-white text-center">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        )}
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
                  : "bg-yellow-700 border-yellow-600" // For Uncertain/Unknown
              }`}
          >
            <div className="flex flex-col items-center justify-center mb-4">
              {results.finalVerdict === "Real" && (
                <FaCheckCircle className="text-white text-6xl mb-2" />
              )}
              {results.finalVerdict === "Fake" && (
                <FaTimesCircle className="text-white text-6xl mb-2" />
              )}
              {(results.finalVerdict === "Uncertain" ||
                results.finalVerdict === "Unknown") && (
                <FaExclamationTriangle className="text-white text-6xl mb-2" />
              )}
              <h3 className="text-4xl md:text-5xl font-extrabold text-white">
                {results.finalVerdict}
              </h3>
            </div>
            <p className="text-white text-lg md:text-xl font-semibold mb-4">
              Verdict on the analyzed content
            </p>
            {/* AI Model initial prediction (sentiment-based) */}
            <p className="text-gray-200 text-sm flex items-center justify-center gap-2">
              Model initial prediction:{" "}
              {results.verdictHF.includes("Potentially Fake") ? (
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
            <div className="text-gray-300 text-lg">
              {results.backedInfoFound.text}
            </div>
          </div>

          {/* Sources Card */}
          <div className="bg-gray-700 p-6 rounded-lg border border-gray-600 shadow-md mb-8">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <FaLink className="text-sky-400 text-2xl" /> Sources
            </h3>
            <ul className="list-disc list-inside text-gray-300 mt-2 space-y-2 pl-4">
              {results.sources && results.sources.length > 0 ? (
                results.sources.map((source, index) => (
                  <li key={index}>
                    {source.startsWith("http") ? (
                      <a
                        href={source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-400 hover:underline transition-colors duration-200 text-base break-words"
                      >
                        {source}
                      </a>
                    ) : (
                      <span className="text-gray-300 text-base">{source}</span>
                    )}
                  </li>
                ))
              ) : (
                <li className="text-gray-400">
                  No external sources found for this analysis.
                </li>
              )}
            </ul>
          </div>

          {/* Detailed Conclusion Card */}
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
              Analysis powered by AI and external fact-checking. For
              informational purposes only.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
