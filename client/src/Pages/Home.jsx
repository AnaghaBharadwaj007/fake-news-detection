import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

export default function Home() {
  const howItWorksRef = useRef(null);
  const navigate = useNavigate();
  const handleLearnMoreClick = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleTryClick = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      navigate("/detect");
    } else {
      navigate("/signin");
    }
  };
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <div className="relative flex flex-col items-center justify-center px-8 md:px-16 py-28 text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('/Pics/Homepage2.png')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-90"></div>

        <div className="relative z-10 max-w-2xl">
          <h1 className="text-5xl font-extrabold text-white mb-4 leading-tight">
            Combat Fake News
          </h1>
          <h2 className="text-2xl font-semibold text-sky-400 mb-4">
            Powered by Hugging Face Transformers
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            TruthLens helps you identify misinformation. Stay ahead in the
            battle for real facts and public awareness.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleTryClick}
              className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors duration-300 shadow-lg"
            >
              Try Now
            </button>
            <button
              onClick={handleLearnMoreClick}
              className="text-sky-400 hover:text-sky-300 font-medium underline text-lg transition-colors duration-300"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      <div
        ref={howItWorksRef}
        className="bg-gray-800 py-20 px-8 md:px-16 text-center shadow-inner"
      >
        <h2 className="text-4xl font-bold mb-12 text-white">
          How TruthLens Works
        </h2>

        <div className="grid md:grid-cols-3 gap-10 text-left">
          <div className="bg-gray-700 p-8 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out border border-gray-600">
            <h3 className="text-2xl font-bold mb-3 text-sky-400">
              Content Analysis
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Submit text, URLs, or videos. We extract key claims and identify
              factual statements for verification.
            </p>
          </div>

          <div className="bg-gray-700 p-8 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out border border-gray-600">
            <h3 className="text-2xl font-bold mb-3 text-sky-400">
              Fact Verification
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Cross-reference claims against credible sources and scientific
              databases to determine accuracy.
            </p>
          </div>

          <div className="bg-gray-700 p-8 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out border border-gray-600">
            <h3 className="text-2xl font-bold mb-3 text-sky-400">
              Bias Detection
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Analyze language patterns and source selection to identify
              political or ideological bias.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10 mt-16 text-left">
          <div className="bg-gray-700 p-8 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out border border-gray-600">
            <h3 className="text-2xl font-bold mb-3 text-sky-400">
              Supported Content Types
            </h3>
            <ul className="list-disc list-inside text-gray-300 leading-relaxed">
              <li>News articles and blog posts</li>
              <li>Social media posts</li>
              <li>Video content with transcription</li>
            </ul>
          </div>

          <div className="bg-gray-700 p-8 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out border border-gray-600">
            <h3 className="text-2xl font-bold mb-3 text-sky-400">
              Analysis Metrics
            </h3>
            <ul className="list-disc list-inside text-gray-300 leading-relaxed">
              <li>Factual accuracy percentage</li>
              <li>Political bias scale (-10 to +10)</li>
              <li>Source credibility scoring</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
