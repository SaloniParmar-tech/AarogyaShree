import { useNavigate } from "react-router-dom";
import questionnaireImg from "../assets/assessment/questionnaire.png";
import imageAnalysisImg from "../assets/assessment/image-analysis.png";

export default function AssessmentChoice() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center 
      bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100 px-6"
    >
      <div className="w-full max-w-5xl">
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-semibold text-center text-pink-700 mb-3">
          Start Your Assessment 🌸
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Choose how you’d like Sakhi to understand your health better
        </p>

        {/* Options */}
        <div className="grid md:grid-cols-2 gap-10">
          
          {/* Questionnaire Option */}
          <div
            onClick={() => navigate("/assessment/age")}
            className="cursor-pointer bg-white rounded-3xl p-8 shadow-lg 
            hover:shadow-2xl transition border border-pink-200 text-center"
          >
            <img
              src={questionnaireImg}
              alt="Questionnaire based health assessment"
              className="w-full h-56 object-contain mb-6"
            />

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Questionnaire
            </h2>
            <p className="text-sm text-gray-600">
              Answer structured questions about your cycle, pain, and lifestyle
              to receive personalized health insights.
            </p>
          </div>

          {/* Image Analysis Option */}
          <div
            onClick={() => navigate("/assessment/image")}
            className="cursor-pointer bg-white rounded-3xl p-8 shadow-lg 
            hover:shadow-2xl transition border border-pink-200 text-center"
          >
            <img
              src={imageAnalysisImg}
              alt="AI based image health analysis"
              className="w-full h-56 object-contain mb-6"
            />

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Image Analysis
            </h2>
            <p className="text-sm text-gray-600">
              Upload an image and let Sakhi analyze it using AI-powered
              assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
