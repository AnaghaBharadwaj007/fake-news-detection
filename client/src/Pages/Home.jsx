import { useRef } from "react";

export default function Home() {
  const howItWorksRef = useRef(null);

  const handleLearnMoreClick = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="pt-8 bg-white text-gray-800">
      {/* Hero Section */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between px-8 md:px-16 py-16">
        <div className="max-w-xl">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Combat Fake News
          </h1>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Powered by Hugging Face Transformers
          </h2>
          <p className="text-gray-600 mb-6">
            TruthLens helps you identify misinformation. Stay ahead in the
            battle for real facts and public awareness.
          </p>
          <div className="flex gap-4">
            <button className="bg-black text-white px-6 py-2 rounded-full">
              Try Now
            </button>
            <button
              onClick={handleLearnMoreClick}
              className="text-red-600 font-medium underline"
            >
              Learn More
            </button>
          </div>
        </div>

        <img
          src="/Pics/Homepage.png"
          alt="AI scanning fake news"
          className="w-full max-w-md mb-8 md:mb-0"
        />
      </div>

      {/* How It Works Section */}
      <div
        ref={howItWorksRef}
        className="bg-white py-20 px-8 md:px-16 text-center"
      >
        <h2 className="text-3xl font-bold mb-12">How TruthLens Works</h2>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="bg-gray-100 p-6 rounded-xl shadow transform hover:scale-110 transition duration-300 ease-in-out">
            <h3 className="text-lg font-bold mb-2">Content Analysis</h3>
            <p>
              Submit text, URLs, or videos. We extract key claims and identify
              factual statements for verification.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-xl shadow transform hover:scale-110 transition duration-300 ease-in-out">
            <h3 className="text-lg font-bold mb-2">Fact Verification</h3>
            <p>
              Cross-reference claims against credible sources and scientific
              databases to determine accuracy.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-xl shadow transform hover:scale-110 transition duration-300 ease-in-out">
            <h3 className="text-lg font-bold mb-2">Bias Detection</h3>
            <p>
              Analyze language patterns and source selection to identify
              political or ideological bias.
            </p>
          </div>
        </div>

        {/* Bottom section */}
        <div className="grid md:grid-cols-2 gap-10 mt-12 text-left">
          <div className="bg-gray-100 p-6 rounded-xl shadow transform hover:scale-110 transition duration-300 ease-in-out">
            <h3 className="text-lg font-bold mb-2">Supported Content Types</h3>
            <ul className="list-disc list-inside">
              <li>News articles and blog posts</li>
              <li>Social media posts</li>
              <li>Video content with transcription</li>
            </ul>
          </div>

          <div className="bg-gray-100 p-6 rounded-xl shadow transform hover:scale-110 transition duration-300 ease-in-out">
            <h3 className="text-lg font-bold mb-2">Analysis Metrics</h3>
            <ul className="list-disc list-inside">
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
