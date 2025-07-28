import {
  FaBalanceScale,
  FaBullseye, // Supported Content Types
  FaChartBar, // Content Analysis
  FaCheckCircle, // Bias Detection
  FaCogs, // GitHub link
  FaEnvelope, // Analysis Metrics
  FaGithub, // For Mission
  FaLightbulb, // For Purpose
  FaPencilAlt, // Content Analysis
} from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans py-16">
      {/* Hero/Introduction Section */}
      <div className="max-w-4xl mx-auto text-center px-6 mb-20">
        <h1 className="text-5xl font-extrabold text-white mb-6 leading-tight">
          About TruthLens
        </h1>
        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
          In an era flooded with information, TruthLens stands as your beacon of
          clarity. We are dedicated to providing a powerful, intuitive platform
          to combat misinformation and foster an informed global community.
        </p>
        <div className="flex justify-center items-center gap-8 mt-10">
          <div className="flex flex-col items-center">
            <FaBullseye className="text-sky-400 text-5xl mb-3" />
            <h3 className="text-2xl font-semibold text-white mb-2">
              Our Mission
            </h3>
            <p className="text-gray-400 max-w-xs leading-relaxed">
              To empower individuals with accurate, unbiased information to make
              informed decisions.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <FaLightbulb className="text-sky-400 text-5xl mb-3" />
            <h3 className="text-2xl font-semibold text-white mb-2">
              Our Purpose
            </h3>
            <p className="text-gray-400 max-w-xs leading-relaxed">
              Building a more truthful and aware society, one fact at a time,
              powered by advanced AI.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works Section - Vertically Stacked Cards */}
      <div className="max-w-4xl mx-auto px-6 mb-20">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          How TruthLens Works
        </h2>
        <div className="space-y-8">
          {/* Content Analysis Card */}
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 flex items-start gap-6 transform hover:scale-[1.10] transition duration-300 ease-in-out">
            <FaPencilAlt className="text-sky-400 text-4xl mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold mb-3 text-white">
                Content Analysis
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Submit text, URLs, or videos. We extract key claims and identify
                factual statements for verification.
              </p>
            </div>
          </div>

          {/* Fact Verification Card */}
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 flex items-start gap-6 transform hover:scale-[1.10] transition duration-300 ease-in-out">
            <FaCheckCircle className="text-sky-400 text-4xl mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold mb-3 text-white">
                Fact Verification
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Cross-reference claims against credible sources and scientific
                databases to determine accuracy.
              </p>
            </div>
          </div>

          {/* Bias Detection Card */}
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 flex items-start gap-6 transform hover:scale-[1.10] transition duration-300 ease-in-out">
            <FaBalanceScale className="text-sky-400 text-4xl mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold mb-3 text-white">
                Bias Detection
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Analyze language patterns and source selection to identify
                political or ideological bias.
              </p>
            </div>
          </div>

          {/* Supported Content Types Card */}
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 flex items-start gap-6 transform hover:scale-[1.10] transition duration-300 ease-in-out">
            <FaCogs className="text-sky-400 text-4xl mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold mb-3 text-white">
                Supported Content Types
              </h3>
              <ul className="list-disc list-inside text-gray-300 leading-relaxed pl-4">
                <li>News articles and blog posts</li>
                <li>Social media posts</li>
                <li>Video content with transcription</li>
              </ul>
            </div>
          </div>

          {/* Analysis Metrics Card */}
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 flex items-start gap-6 transform hover:scale-[1.10] transition duration-300 ease-in-out">
            <FaChartBar className="text-sky-400 text-4xl mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold mb-3 text-white">
                Analysis Metrics
              </h3>
              <ul className="list-disc list-inside text-gray-300 leading-relaxed pl-4">
                <li>Factual accuracy percentage</li>
                <li>Political bias scale (-10 to +10)</li>
                <li>Source credibility scoring</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action / Contact Section */}
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-4xl font-bold text-white mb-8">
          Join Us in the Fight Against Misinformation
        </h2>
        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
          Become a part of the TruthLens community and contribute to a more
          informed world.
        </p>
        <div className="flex justify-center gap-6">
          <a
            href="https://github.com/AnaghaBharadwaj007/fake-news-detection" // Replace with your actual GitHub repo
            target="_blank"
            rel="noopener noreferrer"
            className="bg-sky-600 text-white py-3 px-6 rounded-lg hover:bg-sky-700 shadow-md transition duration-200 font-semibold text-lg flex items-center gap-2"
          >
            <FaGithub /> Our GitHub
          </a>
          <a
            href="mailto:contact@truthlens.com" // Replace with your actual contact email
            className="bg-gray-700 text-white py-3 px-6 rounded-lg hover:bg-gray-600 shadow-md transition duration-200 font-semibold text-lg flex items-center gap-2"
          >
            <FaEnvelope /> Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
